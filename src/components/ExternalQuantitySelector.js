/**
 * External Quantity Selector for products with interpolation-based pricing
 * Handles different quantity constraints (minimum order, increments)
 */

import { ExternalPricingEngine } from '../services/ExternalPricingEngine.js';

export class ExternalQuantitySelector {
  constructor(container, product, size, onQuantityChange) {
    this.container = container;
    this.product = product;
    this.size = size;
    this.onQuantityChange = onQuantityChange;
    this.selectedQuantity = null;
    this.pricingEngine = new ExternalPricingEngine();
    
    // Event listener storage for cleanup
    this.eventListeners = [];
    
    // State tracking for render optimization
    this.lastRenderedState = null;
    
    this.render();
  }

  generateStateKey() {
    const productKey = this.product?.key || 'none';
    const sizeKey = this.size?.key || 'none';
    return `${productKey}:${sizeKey}`;
  }

  render() {
    // Check if render is necessary
    const currentState = this.generateStateKey();
    if (this.lastRenderedState === currentState) {
      this.updateSelectionOnly();
      return;
    }

    // Clean up existing event listeners first
    this.cleanup();
    
    if (!this.product || !this.size) {
      this.container.innerHTML = '<p class="no-selection">Please select a product and size first.</p>';
      return;
    }

    // Generate valid quantity options
    const validQuantities = this.getValidQuantities();
    
    this.container.innerHTML = `
      <div class="external-quantity-selector">
        <div class="quantity-header">
          <h3>Select Quantity</h3>
          <div class="quantity-constraints">
            <span class="constraint-item">
              <strong>Minimum:</strong> ${this.product.pricing.minQuantity} pieces
            </span>
            <span class="constraint-item">
              <strong>Increments:</strong> ${this.product.pricing.quantityIncrement} pieces
            </span>
          </div>
        </div>
        
        <div class="quantity-grid">
          ${validQuantities.map(quantity => this.createQuantityButton(quantity)).join('')}
        </div>
        
        <div class="custom-quantity-section">
          <label class="custom-quantity-label">
            Custom Quantity (for orders over 1000):
          </label>
          <div class="custom-quantity-input">
            <input 
              type="number" 
              id="custom-quantity-input"
              min="${this.product.pricing.minQuantity}"
              step="${this.product.pricing.quantityIncrement}"
              placeholder="Enter quantity"
            >
            <button id="custom-quantity-btn" class="btn-secondary">Calculate</button>
          </div>
        </div>
        
        <div class="order-notes">
          <h4>Order Requirements:</h4>
          <ul>
            ${this.product.orderRules.orderNotes.map(note => `<li>${note}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;

    this.setupEventListeners();
    this.lastRenderedState = currentState;
  }

  getValidQuantities() {
    // Use product's standard quantities if available, otherwise generate
    if (this.product.standardQuantities) {
      return this.product.standardQuantities.slice(0, 16); // Limit to first 16 for UI
    }
    
    // Generate default quantities
    const quantities = [];
    const minQty = this.product.pricing.minQuantity;
    const increment = this.product.pricing.quantityIncrement;
    
    // Generate quantities up to 1000
    for (let qty = minQty; qty <= 1000; qty += increment) {
      quantities.push(qty);
      if (quantities.length >= 16) break; // Limit for UI
    }
    
    return quantities;
  }

  createQuantityButton(quantity) {
    // Calculate price for this quantity
    const pricing = this.pricingEngine.calculatePrice(this.product, this.size.key, quantity);
    const unitPrice = pricing.unitPrice;
    const totalPrice = pricing.total;
    
    const isSelected = this.selectedQuantity === quantity;
    const selectedClass = isSelected ? 'selected' : '';
    
    return `
      <button 
        class="quantity-btn ${selectedClass}" 
        data-quantity="${quantity}"
        data-unit-price="${unitPrice}"
        data-total-price="${totalPrice}"
      >
        <div class="quantity-amount">${quantity}</div>
        <div class="quantity-pricing">
          <div class="unit-price">${this.pricingEngine.formatPrice(unitPrice)}/pc</div>
          <div class="total-price">${this.pricingEngine.formatPrice(totalPrice)}</div>
        </div>
      </button>
    `;
  }

  setupEventListeners() {
    // Quantity button click handler
    this.quantityClickHandler = (e) => {
      const quantityBtn = e.target.closest('.quantity-btn');
      if (quantityBtn && this.container.contains(quantityBtn)) {
        const quantity = parseInt(quantityBtn.dataset.quantity);
        const unitPrice = parseFloat(quantityBtn.dataset.unitPrice);
        const totalPrice = parseFloat(quantityBtn.dataset.totalPrice);
        
        this.selectQuantity(quantity, unitPrice, totalPrice);
      }
    };

    // Custom quantity handler
    this.customQuantityHandler = () => {
      const input = this.container.querySelector('#custom-quantity-input');
      const quantity = parseInt(input.value);
      
      if (quantity && quantity >= this.product.pricing.minQuantity) {
        const validatedQuantity = this.pricingEngine.validateQuantity(
          quantity,
          this.product.pricing.minQuantity,
          this.product.pricing.quantityIncrement
        );
        
        const pricing = this.pricingEngine.calculatePrice(this.product, this.size.key, validatedQuantity);
        this.selectQuantity(validatedQuantity, pricing.unitPrice, pricing.total);
        
        // Update input to show validated quantity
        input.value = validatedQuantity;
      }
    };

    // Add event listeners
    this.container.addEventListener('click', this.quantityClickHandler);
    
    const customBtn = this.container.querySelector('#custom-quantity-btn');
    if (customBtn) {
      customBtn.addEventListener('click', this.customQuantityHandler);
    }

    const customInput = this.container.querySelector('#custom-quantity-input');
    if (customInput) {
      customInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.customQuantityHandler();
        }
      });
    }

    // Store for cleanup
    this.eventListeners.push(
      { element: this.container, event: 'click', handler: this.quantityClickHandler },
      { element: customBtn, event: 'click', handler: this.customQuantityHandler }
    );
  }

  selectQuantity(quantity, unitPrice, totalPrice) {
    // Remove previous selection
    const previousSelected = this.container.querySelector('.quantity-btn.selected');
    if (previousSelected) {
      previousSelected.classList.remove('selected');
    }
    
    // Add selection to clicked button (if it exists in the grid)
    const selectedBtn = this.container.querySelector(`[data-quantity="${quantity}"]`);
    if (selectedBtn) {
      selectedBtn.classList.add('selected');
    }
    
    this.selectedQuantity = quantity;
    
    // Calculate full pricing breakdown
    const pricing = this.pricingEngine.calculatePrice(this.product, this.size.key, quantity);
    
    // Trigger callback
    if (this.onQuantityChange) {
      this.onQuantityChange({
        quantity: quantity,
        unitPrice: unitPrice,
        totalPrice: totalPrice,
        pricing: pricing
      });
    }
  }

  updateSelectionOnly() {
    // Update selection state without full re-render
    const buttons = this.container.querySelectorAll('.quantity-btn');
    buttons.forEach(btn => {
      const quantity = parseInt(btn.dataset.quantity);
      if (quantity === this.selectedQuantity) {
        btn.classList.add('selected');
      } else {
        btn.classList.remove('selected');
      }
    });
  }

  // Clean up event listeners
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
    this.onQuantityChange = null;
    this.pricingEngine = null;
  }

  getSelectedQuantity() {
    return this.selectedQuantity;
  }

  // Update product/size and re-render
  updateProductSize(product, size) {
    this.product = product;
    this.size = size;
    this.selectedQuantity = null;
    this.render();
  }

  // Reset selection
  reset() {
    this.selectedQuantity = null;
    this.updateSelectionOnly();
  }
}