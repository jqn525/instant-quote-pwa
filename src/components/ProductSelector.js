import { createSvgIcon } from './SvgIcons.js';

export class ProductSelector {
  constructor(container, products, onProductSelect) {
    this.container = container;
    this.products = products;
    this.onProductSelect = onProductSelect;
    this.selectedProduct = null;
    
    this.render();
  }

  render() {
    this.container.innerHTML = '';
    
    Object.entries(this.products).forEach(([key, product]) => {
      const productCard = this.createProductCard(key, product);
      this.container.appendChild(productCard);
    });
  }

  createProductCard(key, product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.productKey = key;
    
    card.innerHTML = `
      <div class="product-icon">${product.icon}</div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
      </div>
      <div class="product-indicator">
        ${createSvgIcon('checkmark', 'checkmark')}
      </div>
    `;
    
    card.addEventListener('click', () => this.selectProduct(key, product));
    
    return card;
  }

  selectProduct(key, product) {
    // Remove previous selection
    const previousSelected = this.container.querySelector('.product-card.selected');
    if (previousSelected) {
      previousSelected.classList.remove('selected');
    }
    
    // Add selection to clicked card
    const selectedCard = this.container.querySelector(`[data-product-key="${key}"]`);
    selectedCard.classList.add('selected');
    
    this.selectedProduct = { key, ...product };
    
    // Trigger callback
    if (this.onProductSelect) {
      this.onProductSelect(this.selectedProduct);
    }
  }

  getSelectedProduct() {
    return this.selectedProduct;
  }

  reset() {
    const selectedCard = this.container.querySelector('.product-card.selected');
    if (selectedCard) {
      selectedCard.classList.remove('selected');
    }
    this.selectedProduct = null;
  }
}