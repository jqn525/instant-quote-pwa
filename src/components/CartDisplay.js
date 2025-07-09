import { createSvgIcon } from './SvgIcons.js';

export class CartDisplay {
  constructor(container, cartService, pricingEngine) {
    this.container = container;
    this.cartService = cartService;
    this.pricingEngine = pricingEngine;
    this.isVisible = false;
    
    // Event listener storage for cleanup
    this.eventListeners = [];
    
    this.init();
  }

  init() {
    this.render();
    this.attachEventListeners();
    
    // Listen to cart changes
    this.cartService.addListener((cartSummary) => {
      this.updateDisplay(cartSummary);
    });
  }

  render() {
    this.container.innerHTML = `
      <div class="cart-wrapper">
        <button class="cart-toggle" id="cart-toggle">
          <span class="cart-icon">${createSvgIcon('cart')}</span>
          <span class="cart-count" id="cart-count">0</span>
        </button>
        
        <div class="cart-panel" id="cart-panel">
          <div class="cart-header">
            <h3>Shopping Cart</h3>
            <button class="cart-close" id="cart-close">&times;</button>
          </div>
          
          <div class="cart-items" id="cart-items">
            <div class="cart-empty">Your cart is empty</div>
          </div>
          
          <div class="cart-summary" id="cart-summary" style="display: none;">
            <div class="summary-row total">
              <span>Total:</span>
              <span id="cart-total">$0.00</span>
            </div>
          </div>
          
          <div class="cart-actions" id="cart-actions" style="display: none;">
            <button class="btn btn-secondary" id="clear-cart">Clear Cart</button>
            <button class="btn btn-primary" id="generate-quote">Generate Quote</button>
          </div>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    const toggleBtn = this.container.querySelector('#cart-toggle');
    const closeBtn = this.container.querySelector('#cart-close');
    const clearBtn = this.container.querySelector('#clear-cart');
    const quoteBtn = this.container.querySelector('#generate-quote');
    const panel = this.container.querySelector('#cart-panel');

    toggleBtn.addEventListener('click', () => this.toggleCart());
    closeBtn.addEventListener('click', () => this.hideCart());
    clearBtn.addEventListener('click', () => this.clearCart());
    quoteBtn.addEventListener('click', () => this.generateQuote());

    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isVisible && !this.container.contains(e.target)) {
        this.hideCart();
      }
    });
  }

  toggleCart() {
    if (this.isVisible) {
      this.hideCart();
    } else {
      this.showCart();
    }
  }

  showCart() {
    const panel = this.container.querySelector('#cart-panel');
    panel.classList.add('active');
    this.isVisible = true;
  }

  hideCart() {
    const panel = this.container.querySelector('#cart-panel');
    panel.classList.remove('active');
    this.isVisible = false;
  }

  updateDisplay(cartSummary) {
    const countEl = this.container.querySelector('#cart-count');
    const itemsEl = this.container.querySelector('#cart-items');
    const summaryEl = this.container.querySelector('#cart-summary');
    const actionsEl = this.container.querySelector('#cart-actions');

    // Update cart count
    countEl.textContent = cartSummary.count;
    countEl.style.display = cartSummary.count > 0 ? 'inline' : 'none';

    // Update items display
    if (cartSummary.items.length === 0) {
      itemsEl.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
      summaryEl.style.display = 'none';
      actionsEl.style.display = 'none';
    } else {
      this.renderCartItems(cartSummary.items);
      this.updateSummary(cartSummary);
      summaryEl.style.display = 'block';
      actionsEl.style.display = 'flex';
    }
  }

  renderCartItems(items) {
    const itemsEl = this.container.querySelector('#cart-items');
    
    itemsEl.innerHTML = items.map(item => `
      <div class="cart-item" data-item-id="${item.id}">
        <div class="item-info">
          <div class="item-name">${this.cartService.getItemDescription(item)}</div>
          <div class="item-price">${this.pricingEngine.formatPrice(item.pricing.unitPrice)} each</div>
        </div>
        <div class="item-controls">
          <div class="quantity-controls">
            <button class="qty-btn" data-action="decrease" data-item-id="${item.id}">
              ${createSvgIcon('minus')}
            </button>
            <span class="quantity">${item.quantity}</span>
            <button class="qty-btn" data-action="increase" data-item-id="${item.id}">
              ${createSvgIcon('plus')}
            </button>
          </div>
          <div class="item-total">${this.pricingEngine.formatPrice(item.pricing.total)}</div>
          <button class="remove-btn" data-item-id="${item.id}">
            ${createSvgIcon('trash')}
          </button>
        </div>
      </div>
    `).join('');

    // Attach item event listeners
    this.attachItemEventListeners();
  }

  attachItemEventListeners() {
    const itemsEl = this.container.querySelector('#cart-items');

    itemsEl.addEventListener('click', (e) => {
      const target = e.target.closest('button');
      if (!target) return;

      const itemId = target.dataset.itemId;
      const action = target.dataset.action;

      if (action === 'increase') {
        const item = this.cartService.getItems().find(item => item.id === itemId);
        if (item) {
          this.cartService.updateQuantity(itemId, item.quantity + 25);
        }
      } else if (action === 'decrease') {
        const item = this.cartService.getItems().find(item => item.id === itemId);
        if (item) {
          const newQuantity = Math.max(25, item.quantity - 25);
          this.cartService.updateQuantity(itemId, newQuantity);
        }
      } else if (target.classList.contains('remove-btn')) {
        this.cartService.removeItem(itemId);
      }
    });
  }

  updateSummary(cartSummary) {
    this.container.querySelector('#cart-total').textContent = 
      this.pricingEngine.formatPrice(cartSummary.total);
  }

  clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.cartService.clearCart();
    }
  }

  generateQuote() {
    const quoteData = this.cartService.generateQuoteData();
    
    // Quote data is ready for processing
    // This could be expanded to generate a PDF or display in a modal
    
    // Show a simple alert with quote summary
    const summary = `
Quote Summary:
Items: ${quoteData.itemCount}
Total: ${this.pricingEngine.formatPrice(quoteData.total)}
    `.trim();
    
    alert(summary);
    
    // Optionally clear cart after quote generation
    if (confirm('Quote generated! Clear cart?')) {
      this.cartService.clearCart();
      this.hideCart();
    }
  }
}