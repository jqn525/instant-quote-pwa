import { createSvgIcon } from './SvgIcons.js';

export class PriceDisplay {
  constructor(container, pricingEngine, cartService = null) {
    this.container = container;
    this.pricingEngine = pricingEngine;
    this.cartService = cartService;
    this.unitPriceElement = container.querySelector('#unit-price');
    this.totalPriceElement = container.querySelector('#total-price');
    this.currentPricing = null;
    this.currentProduct = null;
    this.currentSize = null;
    this.currentOptions = null;
    this.currentQuantity = null;
    this.currentPaper = null;
    
    this.init();
  }

  init() {
    if (!this.unitPriceElement || !this.totalPriceElement) {
      console.error('PriceDisplay: Required elements not found');
      return;
    }
    
    this.reset();
    this.attachEventListeners();
  }

  attachEventListeners() {
    if (this.cartService) {
      // Add "Add to Cart" button if cart service is available
      this.addCartButton();
    }
  }

  addCartButton() {
    let addToCartBtn = this.container.querySelector('#add-to-cart');
    if (!addToCartBtn) {
      addToCartBtn = document.createElement('button');
      addToCartBtn.id = 'add-to-cart';
      addToCartBtn.className = 'btn btn-primary add-to-cart-btn';
      addToCartBtn.innerHTML = `
        ${createSvgIcon('plus')}
        <span>Add to Cart</span>
      `;
      this.container.appendChild(addToCartBtn);
      
      // Only add event listener when creating the button
      addToCartBtn.addEventListener('click', () => this.addToCart());
    }
  }

  addToCart() {
    if (!this.cartService || !this.currentPricing || !this.currentProduct) {
      console.warn('Cannot add to cart: missing cart service or product data');
      return;
    }

    this.cartService.addItem(
      this.currentProduct,
      this.currentSize,
      this.currentOptions || [],
      this.currentQuantity,
      this.currentPricing,
      this.currentPaper
    );

    // Visual feedback
    const btn = this.container.querySelector('#add-to-cart');
    const originalText = btn.innerHTML;
    btn.innerHTML = `${createSvgIcon('checkmark')} <span>Added!</span>`;
    btn.disabled = true;
    
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }, 1500);
  }

  updatePricing(product, size, options, quantity, paper = null) {
    if (!product || !quantity || quantity <= 0) {
      this.reset();
      return;
    }

    try {
      this.currentPricing = this.pricingEngine.calculatePrice(product, size, options, quantity, paper);
      this.currentProduct = product;
      this.currentSize = size;
      this.currentOptions = options;
      this.currentQuantity = quantity;
      this.currentPaper = paper;
      this.render();
      
      // Add animation class for price updates
      this.animateUpdate();
      
    } catch (error) {
      console.error('Error calculating pricing:', error);
      this.reset();
    }
  }

  render() {
    if (!this.currentPricing) {
      this.reset();
      return;
    }

    // Update unit price (excluding setup fee)
    this.unitPriceElement.textContent = this.pricingEngine.formatPrice(this.currentPricing.unitPrice);
    
    // Update total price (including setup fee)
    this.totalPriceElement.textContent = this.pricingEngine.formatPrice(this.currentPricing.total);
    
    // Add setup fee display
    this.updateSetupFeeDisplay();
    
    // Add breakdown tooltip or additional info if needed
    this.updateBreakdown();
    
    // Ensure add to cart button is visible when we have pricing
    if (this.cartService && this.currentProduct) {
      this.addCartButton();
    }
  }

  updateSetupFeeDisplay() {
    if (!this.currentPricing || !this.currentPricing.setupFee) return;
    
    let setupFeeElement = this.container.querySelector('.setup-fee');
    if (!setupFeeElement) {
      setupFeeElement = document.createElement('div');
      setupFeeElement.className = 'setup-fee';
      
      // Insert in the middle of the price grid (between unit price and total price)
      const priceContainer = this.container.querySelector('.price-container');
      const totalPriceElement = priceContainer.querySelector('.total-price');
      priceContainer.insertBefore(setupFeeElement, totalPriceElement);
    }
    
    setupFeeElement.innerHTML = `
      <span class="label">Setup:</span>
      <span class="value">${this.pricingEngine.formatPrice(this.currentPricing.setupFee)}</span>
    `;
  }

  updateBreakdown() {
    if (!this.currentPricing || !this.currentPricing.breakdown) return;
    
    let breakdownElement = this.container.querySelector('.price-breakdown');
    if (!breakdownElement) {
      breakdownElement = document.createElement('div');
      breakdownElement.className = 'price-breakdown';
      this.container.appendChild(breakdownElement);
    }
    
    const breakdown = this.currentPricing.breakdown;
    const Q = this.currentQuantity;
    const paperCost = this.currentPaper ? this.currentPaper.costPerSheet : 0;
    const clickCost = 0.10; // From CLICK_COST constant
    const imposition = this.currentSize && this.currentSize.imposition ? this.currentSize.imposition : 1;
    
    breakdownElement.innerHTML = `
      <div class="formula-breakdown">
        <h4>Formula Breakdown (Testing)</h4>
        <div class="formula-display">
          <strong>C(Q) = S + Q<sup>e</sup> × k + Q × v + Ff</strong>
        </div>
        
        <div class="variables-grid">
          <div class="variable-row">
            <span class="var-name">Q (Quantity):</span>
            <span class="var-value">${Q}</span>
          </div>
          <div class="variable-row">
            <span class="var-name">S (Setup Fee):</span>
            <span class="var-value">$${breakdown.setupFee}</span>
          </div>
          <div class="variable-row">
            <span class="var-name">k (Production Rate):</span>
            <span class="var-value">$1.50</span>
          </div>
          <div class="variable-row">
            <span class="var-name">e (Exponent):</span>
            <span class="var-value">${this.currentProduct && this.currentProduct.pricing && this.currentProduct.pricing.overhead ? this.currentProduct.pricing.overhead.e : '0.75'}</span>
          </div>
          <div class="variable-row">
            <span class="var-name">v (Variable Cost):</span>
            <span class="var-value">$${breakdown.variableCostPerPiece}</span>
          </div>
          ${breakdown.finishingCost > 0 ? `
          <div class="variable-row">
            <span class="var-name">Ff (Finishing):</span>
            <span class="var-value">$${breakdown.finishingCost}</span>
          </div>
          ` : ''}
        </div>
        
        <div class="calculation-steps">
          <h5>Variable Cost Calculation:</h5>
          <div class="calc-step">
            v = (paper + clicks) × 1.5 / imposition
          </div>
          <div class="calc-step">
            v = ($${paperCost.toFixed(3)} + $${clickCost}) × 1.5 / ${imposition} = $${breakdown.variableCostPerPiece}
          </div>
          <div class="calc-step" style="font-size: 0.75rem; color: #666;">
            Debug: paper=${this.currentPaper ? 'YES' : 'NO'}, size=${this.currentSize ? 'YES' : 'NO'}, imposition=${this.currentSize ? this.currentSize.imposition : 'undefined'}
          </div>
          <div class="calc-step" style="font-size: 0.75rem; color: #666;">
            Size object: ${this.currentSize ? JSON.stringify(this.currentSize) : 'null'}
          </div>
          <div class="calc-step" style="font-size: 0.75rem; color: #666;">
            Paper: ${this.currentPaper ? `${this.currentPaper.displayName} ($${this.currentPaper.costPerSheet})` : 'none'}
          </div>
          
          <h5>Final Calculation:</h5>
          <div class="calc-step">
            Setup: $${breakdown.setupFee}
          </div>
          <div class="calc-step">
            Production: ${Q}<sup>0.75</sup> × $1.50 = $${breakdown.productionCost}
          </div>
          <div class="calc-step">
            Materials: ${Q} × $${breakdown.variableCostPerPiece} = $${breakdown.materialsCost}
          </div>
          ${breakdown.finishingCost > 0 ? `
          <div class="calc-step">
            Finishing: $${breakdown.finishingCost}
          </div>
          ` : ''}
          <div class="calc-step total-calc">
            <strong>Total: $${this.currentPricing.total}</strong>
          </div>
        </div>
      </div>
    `;
  }

  animateUpdate() {
    // Add pulse animation to indicate price update
    this.container.classList.add('price-updated');
    
    setTimeout(() => {
      this.container.classList.remove('price-updated');
    }, 300);
  }

  getCurrentPricing() {
    return this.currentPricing;
  }

  reset() {
    this.currentPricing = null;
    this.unitPriceElement.textContent = '$0.00';
    this.totalPriceElement.textContent = '$0.00';
    
    // Remove setup fee display
    const setupFeeElement = this.container.querySelector('.setup-fee');
    if (setupFeeElement) {
      setupFeeElement.remove();
    }
    
    // Remove breakdown
    const breakdownElement = this.container.querySelector('.price-breakdown');
    if (breakdownElement) {
      breakdownElement.remove();
    }
  }

  showRushOrderPricing(enabled = false) {
    if (!this.currentPricing) return;
    
    if (enabled) {
      const rushPricing = this.pricingEngine.calculateRushOrder(this.currentPricing);
      
      // Temporarily show rush pricing
      this.unitPriceElement.textContent = this.pricingEngine.formatPrice(rushPricing.unitPrice);
      this.totalPriceElement.textContent = this.pricingEngine.formatPrice(rushPricing.total);
      
      // Add rush order indicator
      this.container.classList.add('rush-order-pricing');
      
      // Update current pricing to rush pricing
      this.currentPricing = rushPricing;
      this.updateBreakdown();
      
    } else {
      this.container.classList.remove('rush-order-pricing');
      // Recalculate original pricing would require the original parameters
      // This should be handled by the parent component
    }
  }

  formatQuantityBreaks(product, selectedSize, selectedOptions) {
    if (!product || !product.formula) return '';
    
    const breaks = [25, 50, 100, 250, 500, 1000, 2500, 5000];
    let breaksHTML = '<div class="quantity-breaks"><h4>Quantity Pricing</h4><table>';
    
    breaks.forEach(qty => {
      const pricing = this.pricingEngine.calculatePrice(product, selectedSize, selectedOptions, qty);
      breaksHTML += `
        <tr>
          <td>${qty}</td>
          <td>${this.pricingEngine.formatPrice(pricing.unitPrice)}</td>
          <td>${this.pricingEngine.formatPrice(pricing.total)}</td>
        </tr>
      `;
    });
    
    breaksHTML += '</table></div>';
    return breaksHTML;
  }
}