/**
 * QuantitySelector Component
 * 
 * Manages quantity selection with product-specific ranges and live pricing display.
 * Features optimized rendering, event delegation, and pricing context management.
 * 
 * @class QuantitySelector
 * @memberof Components
 * 
 * @example
 * const quantitySelector = new QuantitySelector(
 *   document.getElementById('quantity-container'),
 *   pricingEngine,
 *   (quantity) => console.log('Quantity changed:', quantity)
 * );
 */
export class QuantitySelector {
  /**
   * Create a QuantitySelector instance
   * @param {HTMLElement} container - Container element for the quantity selector
   * @param {PricingEngine} pricingEngine - Pricing engine for calculations
   * @param {Function} onQuantityChange - Callback for quantity changes
   */
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
    
    // Event listener storage for cleanup
    this.eventListeners = [];
    
    // State tracking for render optimization
    this.lastRenderedState = null;
    
    this.init();
  }

  async init() {
    await this.render();
  }

  /**
   * Generate a unique state key for render optimization
   * @returns {string} State key representing current component state
   */
  generateStateKey() {
    const productKey = this.currentProduct?.name || 'none';
    const sizeKey = this.currentSize?.name || 'none';
    const paperKey = this.currentPaper?.id || 'none';
    const optionsKey = this.currentOptions?.map(opt => opt.name).sort().join(',') || 'none';
    return `${productKey}:${sizeKey}:${paperKey}:${optionsKey}`;
  }

  /**
   * Update only selection state without full re-render for performance
   */
  updateSelectionOnly() {
    const buttons = this.container.querySelectorAll('.quantity-btn');
    buttons.forEach(button => {
      const qty = parseInt(button.dataset.quantity);
      if (qty === this.quantity) {
        button.classList.add('selected');
      } else {
        button.classList.remove('selected');
      }
    });
  }

  getQuantitiesForProduct() {
    if (this.currentProduct && this.currentProduct.name === 'Table Tent Cards') {
      return this.productQuantities['table_tents'];
    }
    return this.productQuantities['default'];
  }

  async render() {
    // Check if render is necessary to avoid unnecessary DOM operations
    const currentState = this.generateStateKey();
    if (this.lastRenderedState === currentState) {
      // Only update selection state if needed
      this.updateSelectionOnly();
      return;
    }
    
    let quantityButtonsHTML = '';
    
    // Generate quantity buttons based on current product
    const quantities = this.getQuantitiesForProduct();
    for (const qty of quantities) {
      const isSelected = qty === this.quantity;
      const pricing = await this.calculatePricingForQuantity(qty);
      
      quantityButtonsHTML += `
        <button class="quantity-btn ${isSelected ? 'selected' : ''}" data-quantity="${qty}">
          <div class="quantity-number">${qty}</div>
          <div class="quantity-pricing">
            <div class="total-cost">${this.formatPrice(pricing.total)}</div>
            <div class="unit-cost">${this.formatPrice(pricing.unitPrice)}/ea</div>
          </div>
        </button>
      `;
    }
    

    this.container.innerHTML = `
      <div class="quantity-selector">
        <h3>Select Quantity</h3>
        <div class="quantity-grid">
          ${quantityButtonsHTML}
        </div>
      </div>
    `;
    
    // Cache current state to avoid unnecessary re-renders
    this.lastRenderedState = currentState;
    
    // Setup event listeners after DOM is updated
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Clean up existing listeners first
    this.cleanup();
    
    // Use event delegation for better performance
    this.clickHandler = async (e) => {
      // Only handle clicks on quantity buttons using event delegation
      const quantityBtn = e.target.closest('.quantity-btn');
      if (quantityBtn && this.container.contains(quantityBtn)) {
        const quantity = quantityBtn.dataset.quantity;
        if (quantity) {
          e.preventDefault();
          e.stopPropagation();
          await this.selectQuantity(parseInt(quantity));
        }
      }
    };
    
    // Use single delegated event listener for better performance
    this.addEventListenerWithCleanup(this.container, 'click', this.clickHandler);
  }

  // Helper method to add event listeners with automatic cleanup tracking
  addEventListenerWithCleanup(element, event, handler) {
    element.addEventListener(event, handler);
    this.eventListeners.push({ element, event, handler });
  }

  // Clean up all event listeners
  cleanup() {
    this.eventListeners.forEach(({ element, event, handler }) => {
      if (element && element.removeEventListener) {
        element.removeEventListener(event, handler);
      }
    });
    this.eventListeners = [];
  }

  // Destructor method for complete cleanup
  destroy() {
    this.cleanup();
    this.container = null;
    this.pricingEngine = null;
    this.onQuantityChange = null;
  }

  async calculatePricingForQuantity(quantity) {
    if (!this.currentProduct || !quantity) {
      return { total: 0, unitPrice: 0 };
    }
    
    try {
      return await this.pricingEngine.calculatePrice(
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

  async selectQuantity(quantity) {
    this.quantity = quantity;
    // Use optimized update for quantity-only changes
    const currentState = this.generateStateKey();
    if (this.lastRenderedState === currentState) {
      this.updateSelectionOnly();
    } else {
      await this.render();
    }
    this.triggerChange();
  }


  async updatePricingContext(product, size, options, paper) {
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

  async setQuantity(quantity) {
    const numQuantity = parseInt(quantity, 10);
    if (!isNaN(numQuantity)) {
      this.quantity = Math.max(this.minQuantity, Math.min(this.maxQuantity, numQuantity));
      // Always round UP to next multiple of 25
      this.quantity = Math.ceil(this.quantity / this.stepSize) * this.stepSize;
      // Ensure it's still within bounds after rounding
      if (this.quantity < this.minQuantity) {
        this.quantity = this.minQuantity;
      }
      await this.render();
      this.triggerChange();
    }
  }

  getQuantity() {
    return this.quantity;
  }

  async reset() {
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