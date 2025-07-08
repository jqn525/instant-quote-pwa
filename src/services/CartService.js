export class CartService {
  constructor(pricingEngine = null) {
    this.items = [];
    this.listeners = [];
    this.pricingEngine = pricingEngine;
    this.loadFromStorage();
  }

  setPricingEngine(pricingEngine) {
    this.pricingEngine = pricingEngine;
  }

  addItem(product, size, options, quantity, pricing, paper = null) {
    const itemId = this.generateItemId(product, size, options);
    const existingItem = this.items.find(item => item.id === itemId);

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      existingItem.quantity = newQuantity;
      
      // Recalculate pricing for new quantity using C(Q) formula
      if (this.pricingEngine) {
        existingItem.pricing = this.pricingEngine.calculatePrice(
          existingItem.product, 
          existingItem.size, 
          existingItem.options, 
          newQuantity,
          existingItem.paper || null
        );
      } else {
        existingItem.pricing = pricing; // Fallback to provided pricing
      }
    } else {
      this.items.push({
        id: itemId,
        product: { ...product },
        size: { ...size },
        options: [...options],
        quantity,
        pricing,
        paper: paper ? { ...paper } : null,
        dateAdded: new Date().toISOString()
      });
    }

    this.saveToStorage();
    this.notifyListeners();
  }

  removeItem(itemId) {
    this.items = this.items.filter(item => item.id !== itemId);
    this.saveToStorage();
    this.notifyListeners();
  }

  updateQuantity(itemId, newQuantity) {
    const item = this.items.find(item => item.id === itemId);
    
    if (item) {
      if (newQuantity <= 0) {
        this.removeItem(itemId);
      } else {
        item.quantity = newQuantity;
        
        // Recalculate pricing for new quantity using C(Q) formula
        if (this.pricingEngine) {
          item.pricing = this.pricingEngine.calculatePrice(
            item.product, 
            item.size, 
            item.options, 
            newQuantity,
            item.paper || null
          );
        }
        
        this.saveToStorage();
        this.notifyListeners();
      }
    }
  }

  clearCart() {
    this.items = [];
    this.saveToStorage();
    this.notifyListeners();
  }

  getItems() {
    return [...this.items];
  }

  getItemCount() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice() {
    return this.items.reduce((total, item) => total + item.pricing.total, 0);
  }

  getSubtotal() {
    return this.items.reduce((total, item) => total + item.pricing.subtotal, 0);
  }

  getTotalTax() {
    return this.items.reduce((total, item) => total + item.pricing.tax, 0);
  }

  generateItemId(product, size, options) {
    const optionKeys = options.map(opt => opt.key).sort().join(',');
    return `${product.key}_${size.key}_${optionKeys}`;
  }

  getItemDescription(item) {
    let description = `${item.product.name}`;
    if (item.size) {
      description += ` - ${item.size.name}`;
    }
    if (item.options.length > 0) {
      const optionNames = item.options.map(opt => opt.name).join(', ');
      description += ` (${optionNames})`;
    }
    return description;
  }

  // Event handling
  addListener(callback) {
    this.listeners.push(callback);
  }

  removeListener(callback) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  notifyListeners() {
    this.listeners.forEach(callback => callback(this.getCartSummary()));
  }

  getCartSummary() {
    return {
      items: this.getItems(),
      count: this.getItemCount(),
      subtotal: this.getSubtotal(),
      tax: this.getTotalTax(),
      total: this.getTotalPrice()
    };
  }

  // Local storage
  saveToStorage() {
    try {
      localStorage.setItem('printShopCart', JSON.stringify(this.items));
    } catch (error) {
      console.error('Failed to save cart to storage:', error);
    }
  }

  loadFromStorage() {
    try {
      const saved = localStorage.getItem('printShopCart');
      if (saved) {
        this.items = JSON.parse(saved);
      }
    } catch (error) {
      console.error('Failed to load cart from storage:', error);
      this.items = [];
    }
  }

  // Quote generation
  generateQuoteData() {
    return {
      items: this.items.map(item => ({
        description: this.getItemDescription(item),
        quantity: item.quantity,
        unitPrice: item.pricing.unitPrice,
        total: item.pricing.total
      })),
      subtotal: this.getSubtotal(),
      tax: this.getTotalTax(),
      total: this.getTotalPrice(),
      dateGenerated: new Date().toISOString(),
      itemCount: this.getItemCount()
    };
  }
}