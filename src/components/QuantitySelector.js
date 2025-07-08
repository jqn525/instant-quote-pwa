export class QuantitySelector {
  constructor(container, pricingEngine, onQuantityChange) {
    this.container = container;
    this.pricingEngine = pricingEngine;
    this.onQuantityChange = onQuantityChange;
    this.quantity = 50; // Default quantity
    this.minQuantity = 50;
    this.maxQuantity = 10000;
    this.stepSize = 25; // Only multiples of 25
    
    // Product-specific quantity configurations
    this.productQuantities = {
      'table_tents': [10, 25, 50, 75, 100],
      'default': [50, 75, 100, 125, 150, 200, 250, 500, 750, 1000]
    };
    
    // Current product context for pricing calculations
    this.currentProduct = null;
    this.currentSize = null;
    this.currentOptions = [];
    this.currentPaper = null;
    
    
    this.init();
  }

  init() {
    this.render();
  }

  getQuantitiesForProduct() {
    if (this.currentProduct && this.currentProduct.name === 'Table Tent Cards') {
      return this.productQuantities['table_tents'];
    }
    return this.productQuantities['default'];
  }

  render() {
    let quantityButtonsHTML = '';
    
    // Generate quantity buttons based on current product
    const quantities = this.getQuantitiesForProduct();
    quantities.forEach(qty => {
      const isSelected = qty === this.quantity;
      const pricing = this.calculatePricingForQuantity(qty);
      
      quantityButtonsHTML += `
        <button class="quantity-btn ${isSelected ? 'selected' : ''}" data-quantity="${qty}">
          <div class="quantity-number">${qty}</div>
          <div class="quantity-pricing">
            <div class="total-cost">${this.formatPrice(pricing.total)}</div>
            <div class="unit-cost">${this.formatPrice(pricing.unitPrice)}/ea</div>
          </div>
        </button>
      `;
    });
    

    this.container.innerHTML = `
      <div class="quantity-selector">
        <h3>Select Quantity</h3>
        <div class="quantity-grid">
          ${quantityButtonsHTML}
        </div>
      </div>
    `;
    
    // Setup event listeners after DOM is updated
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Remove existing listeners to prevent duplicates
    if (this.clickHandler) {
      this.container.removeEventListener('click', this.clickHandler);
    }
    
    // Create new handlers
    this.clickHandler = (e) => {
      const quantityBtn = e.target.closest('.quantity-btn');
      if (quantityBtn) {
        const quantity = quantityBtn.dataset.quantity;
        if (quantity) {
          this.selectQuantity(parseInt(quantity));
        }
      }
    };
    
    // Attach new listeners
    this.container.addEventListener('click', this.clickHandler);
  }

  calculatePricingForQuantity(quantity) {
    if (!this.currentProduct || !quantity) {
      return { total: 0, unitPrice: 0 };
    }
    
    try {
      return this.pricingEngine.calculatePrice(
        this.currentProduct,
        this.currentSize,
        this.currentOptions,
        quantity,
        this.currentPaper
      );
    } catch (error) {
      return { total: 0, unitPrice: 0 };
    }
  }

  formatPrice(amount) {
    if (typeof amount !== 'number' || isNaN(amount)) {
      return '$0.00';
    }
    return `$${amount.toFixed(2)}`;
  }

  selectQuantity(quantity) {
    this.quantity = quantity;
    this.render();
    this.triggerChange();
  }


  updatePricingContext(product, size, options, paper) {
    this.currentProduct = product;
    this.currentSize = size;
    this.currentOptions = options || [];
    this.currentPaper = paper;
    
    // Set product-specific defaults for table tents
    if (product && product.name === 'Table Tent Cards') {
      this.minQuantity = 10;
      // Only reset quantity if it's below the new minimum
      if (this.quantity < 10) {
        this.quantity = 10;
      }
      // Ensure current quantity is available for this product
      const availableQuantities = this.getQuantitiesForProduct();
      if (!availableQuantities.includes(this.quantity)) {
        this.quantity = availableQuantities[0]; // Use first available quantity
      }
    } else {
      this.minQuantity = 50;
      // Only reset quantity if it's below the new minimum
      if (this.quantity < 50) {
        this.quantity = 50;
      }
      // Ensure current quantity is available for this product
      const availableQuantities = this.getQuantitiesForProduct();
      if (!availableQuantities.includes(this.quantity)) {
        this.quantity = availableQuantities[0]; // Use first available quantity
      }
    }
    
    // Re-render to update pricing on all buttons
    this.render();
  }

  triggerChange() {
    if (this.onQuantityChange) {
      this.onQuantityChange(this.quantity);
    }
  }

  setQuantity(quantity) {
    const numQuantity = parseInt(quantity, 10);
    if (!isNaN(numQuantity)) {
      this.quantity = Math.max(this.minQuantity, Math.min(this.maxQuantity, numQuantity));
      // Always round UP to next multiple of 25
      this.quantity = Math.ceil(this.quantity / this.stepSize) * this.stepSize;
      // Ensure it's still within bounds after rounding
      if (this.quantity < this.minQuantity) {
        this.quantity = this.minQuantity;
      }
      this.render();
      this.triggerChange();
    }
  }

  getQuantity() {
    return this.quantity;
  }

  reset() {
    this.quantity = 50;
    this.currentProduct = null;
    this.currentSize = null;
    this.currentOptions = [];
    this.currentPaper = null;
    this.render();
  }

  destroy() {
    // Clean up event listeners
    if (this.clickHandler) {
      this.container.removeEventListener('click', this.clickHandler);
    }
  }
}