import { createSvgIcon } from './SvgIcons.js';

export class ProductSelector {
  constructor(container, products, onProductSelect) {
    this.container = container;
    this.products = products;
    this.onProductSelect = onProductSelect;
    this.selectedProduct = null;
    
    // Event listener storage for cleanup
    this.eventListeners = [];
    
    this.render();
  }

  render() {
    // Clean up existing event listeners first
    this.cleanup();
    
    // Check if container exists
    if (!this.container) {
      console.error('❌ ProductSelector: Container element not found');
      return;
    }
    
    // Check if products exist
    if (!this.products || Object.keys(this.products).length === 0) {
      console.error('❌ ProductSelector: No products provided');
      return;
    }
    
    this.container.innerHTML = '';
    
    console.log('🔍 ProductSelector.render() - Starting render process');
    console.log('🔍 Products to render:', Object.keys(this.products));
    console.log('🔍 Container element:', this.container);
    
    let cardCount = 0;
    Object.entries(this.products).forEach(([key, product]) => {
      try {
        cardCount++;
        console.log(`🔍 Creating card ${cardCount} for product: ${key} - ${product.name}`);
        
        const productCard = this.createProductCard(key, product);
        console.log(`🔍 Product card created for ${key}:`, productCard);
        
        this.container.appendChild(productCard);
        console.log(`🔍 Product card appended to container for ${key}`);
        
        // Special logging for magnets
        if (key === 'magnets') {
          console.log('🧲 MAGNETS DEBUGGING:');
          console.log('🧲 Product object:', product);
          console.log('🧲 Card element:', productCard);
          console.log('🧲 Card innerHTML:', productCard.innerHTML);
          console.log('🧲 Card in DOM:', document.contains(productCard));
          console.log('🧲 Card visibility:', window.getComputedStyle(productCard).display);
        }
      } catch (error) {
        console.error(`❌ Error creating product card for ${key}:`, error);
      }
    });
    
    console.log(`🔍 Total cards rendered: ${cardCount}`);
    console.log('🔍 Cards in container:', this.container.children.length);
    
    // If no cards were rendered, show an error message
    if (cardCount === 0) {
      this.container.innerHTML = '<p style="color: red; padding: 20px; text-align: center;">No products could be rendered. Check console for errors.</p>';
    }
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
    this.onProductSelect = null;
  }

  createProductCard(key, product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.productKey = key;
    
    // Get appropriate icon with error handling
    let productIcon = product.icon;
    if (!productIcon) {
      try {
        // Set icons based on product key
        switch (key) {
          case 'brochures':
            productIcon = createSvgIcon('brochure');
            break;
          case 'postcards':
            productIcon = createSvgIcon('postcard');
            break;
          case 'flyers':
            productIcon = createSvgIcon('flyer');
            break;
          case 'bookmarks':
            productIcon = createSvgIcon('bookmark');
            break;
          case 'table_tents':
            productIcon = createSvgIcon('table_tent');
            break;
          case 'magnets':
            productIcon = createSvgIcon('magnet');
            break;
          case 'stickers':
            productIcon = createSvgIcon('sticker');
            break;
          case 'sticker_sheets':
            productIcon = createSvgIcon('sticker_sheet');
            break;
          default:
            productIcon = createSvgIcon('businessCard'); // Default fallback
        }
      } catch (error) {
        console.error(`❌ Error creating icon for ${key}:`, error);
        productIcon = '<div class="icon-placeholder">📄</div>'; // Fallback emoji
      }
    }
    
    try {
      card.innerHTML = `
        <div class="product-icon">${productIcon}</div>
        <div class="product-info">
          <h3 class="product-name">${product.name || 'Unknown Product'}</h3>
          <p class="product-description">${product.description || 'No description'}</p>
        </div>
        <div class="product-indicator">
          ${createSvgIcon('checkmark', 'checkmark')}
        </div>
      `;
    } catch (error) {
      console.error(`❌ Error setting innerHTML for ${key}:`, error);
      // Fallback to simple text
      card.innerHTML = `
        <div class="product-info">
          <h3 class="product-name">${product.name || 'Unknown Product'}</h3>
          <p class="product-description">${product.description || 'No description'}</p>
        </div>
      `;
    }
    
    this.addEventListenerWithCleanup(card, 'click', () => this.selectProduct(key, product));
    
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
    // Clean up event listeners first
    this.cleanup();
    
    const selectedCard = this.container.querySelector('.product-card.selected');
    if (selectedCard) {
      selectedCard.classList.remove('selected');
    }
    this.selectedProduct = null;
  }
}