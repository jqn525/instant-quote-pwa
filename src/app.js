import './styles/main.css';
import { productTypes } from './data/products.js';
import { PricingEngine } from './services/PricingEngine.js';
import { QuoteService } from './services/QuoteService.js';
import { CartService } from './services/CartService.js';
import { SettingsService } from './services/SettingsService.js';
import { ProductSelector } from './components/ProductSelector.js';
import { SizeSelector } from './components/SizeSelector.js';
import { QuantitySelector } from './components/QuantitySelector.js';
import { ExternalQuantitySelector } from './components/ExternalQuantitySelector.js';
import { PriceDisplay } from './components/PriceDisplay.js';
import { CartDisplay } from './components/CartDisplay.js';
import { HamburgerMenu } from './components/HamburgerMenu.js';
import { SettingsPanel } from './components/SettingsPanel.js';
import { VersionTag } from './components/VersionTag.js';
import { errorHandler, safeAsync } from './utils/errorHandler.js';

class InstantQuoteApp {
  constructor() {
    // Initialize settings service
    this.settingsService = new SettingsService();
    
    // Initialize pricing engine with settings service
    this.pricingEngine = new PricingEngine(this.settingsService);
    this.quoteService = new QuoteService(this.pricingEngine);
    this.cartService = new CartService(this.pricingEngine);
    
    // Application state
    this.currentProduct = null;
    this.currentSize = null;
    this.currentOptions = [];
    this.currentPaper = null;
    this.currentQuantity = 50;
    this.currentPricing = null;
    
    // Event listener storage for cleanup
    this.eventListeners = [];
    
    // DOM element cache for performance
    this.domCache = {};
    
    // Create debounced version of updateCalculation for performance
    this.debouncedUpdateCalculation = this.debounce(this.updateCalculation.bind(this), 150);
    
    this.init();
  }

  init() {
    try {
      this.initializeComponents();
      this.setupEventListeners();
      this.updateCalculation();
    } catch (error) {
      errorHandler.handleError({
        type: 'initialization',
        message: error.message,
        stack: error.stack
      }, {
        component: 'InstantQuoteApp',
        severity: 'critical',
        userMessage: 'Failed to initialize the application. Please refresh the page.',
        recoveryAction: () => {
          // Attempt to reinitialize after a delay
          setTimeout(() => {
            try {
              this.init();
            } catch (retryError) {
              errorHandler.handleError({
                type: 'initialization_retry',
                message: retryError.message,
                stack: retryError.stack
              }, { component: 'InstantQuoteApp', severity: 'critical' });
            }
          }, 2000);
        }
      });
    }
  }

  // Helper method to add event listeners with automatic cleanup tracking
  addEventListenerWithCleanup(element, event, handler) {
    if (element && element.addEventListener) {
      element.addEventListener(event, handler);
      this.eventListeners.push({ element, event, handler });
    }
  }

  // DOM element caching for performance
  getElement(id) {
    if (!this.domCache[id]) {
      this.domCache[id] = document.getElementById(id);
    }
    return this.domCache[id];
  }

  // Clear DOM cache when elements might have been removed/recreated
  clearDomCache() {
    this.domCache = {};
  }

  // Debounce utility for performance optimization
  debounce(func, delay) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
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
    this.clearDomCache();
    
    // Clean up components
    if (this.productSelector && this.productSelector.destroy) {
      this.productSelector.destroy();
    }
    if (this.sizeSelector && this.sizeSelector.destroy) {
      this.sizeSelector.destroy();
    }
    if (this.quantitySelector && this.quantitySelector.destroy) {
      this.quantitySelector.destroy();
    }
    if (this.priceDisplay && this.priceDisplay.destroy) {
      this.priceDisplay.destroy();
    }
    if (this.cartDisplay && this.cartDisplay.destroy) {
      this.cartDisplay.destroy();
    }
    if (this.hamburgerMenu && this.hamburgerMenu.destroy) {
      this.hamburgerMenu.destroy();
    }
    if (this.settingsPanel && this.settingsPanel.destroy) {
      this.settingsPanel.destroy();
    }
    if (this.versionTag && this.versionTag.destroy) {
      this.versionTag.destroy();
    }
    
    // Clean up references
    this.settingsService = null;
    this.pricingEngine = null;
    this.quoteService = null;
    this.cartService = null;
  }

  initializeComponents() {
    console.log('🏠 Initializing components...');
    
    // Product Selector
    console.log('🏠 Initializing ProductSelector...');
    const productGrid = this.getElement('product-grid');
    console.log('🏠 Product grid element:', productGrid);
    console.log('🏠 Product types:', productTypes);
    
    if (!productGrid) {
      throw new Error('Product grid element not found');
    }
    
    this.productSelector = new ProductSelector(
      productGrid,
      productTypes,
      (product) => this.handleProductSelection(product)
    );
    console.log('✅ ProductSelector initialized');

    // Size Selector
    console.log('🏠 Initializing SizeSelector...');
    const sizeGrid = this.getElement('size-grid');
    const optionsList = this.getElement('options-list');
    this.sizeSelector = new SizeSelector(
      sizeGrid,
      optionsList,
      (selection) => this.handleSizeOptionSelection(selection)
    );
    console.log('✅ SizeSelector initialized');

    // Quantity Input - will be initialized when size selector is shown
    this.quantitySelector = null;

    // Price Display
    console.log('🏠 Initializing PriceDisplay...');
    const priceSection = this.getElement('price-display');
    this.priceDisplay = new PriceDisplay(priceSection, this.pricingEngine, this.cartService, this.settingsService);
    console.log('✅ PriceDisplay initialized');

    // Cart Display
    console.log('🏠 Initializing CartDisplay...');
    const cartContainer = this.getElement('cart-container');
    if (cartContainer) {
      this.cartDisplay = new CartDisplay(cartContainer, this.cartService, this.pricingEngine);
      console.log('✅ CartDisplay initialized');
    } else {
      console.warn('⚠️ Cart container not found');
    }

    // Hamburger Menu
    console.log('🏠 Initializing HamburgerMenu...');
    const hamburgerContainer = this.getElement('hamburger-menu-container');
    if (hamburgerContainer) {
      this.hamburgerMenu = new HamburgerMenu(hamburgerContainer, (isOpen) => this.handleMenuToggle(isOpen));
      console.log('✅ HamburgerMenu initialized');
    } else {
      console.warn('⚠️ Hamburger container not found');
    }

    // Settings Panel
    console.log('🏠 Initializing SettingsPanel...');
    const settingsContainer = this.getElement('settings-panel-container');
    if (settingsContainer) {
      this.settingsPanel = new SettingsPanel(settingsContainer, this.settingsService);
      console.log('✅ SettingsPanel initialized');
    } else {
      console.warn('⚠️ Settings container not found');
    }

    // Version Tag
    console.log('🏠 Initializing VersionTag...');
    const versionContainer = this.getElement('version-tag-container');
    if (versionContainer) {
      this.versionTag = new VersionTag(versionContainer);
      console.log('✅ VersionTag initialized');
    } else {
      console.warn('⚠️ Version tag container not found');
    }
    
    console.log('✅ All components initialized successfully');
  }

  setupEventListeners() {
    // Clean up existing listeners first
    this.cleanup();

    // Back button
    const backBtn = this.getElement('back-to-products');
    this.addEventListenerWithCleanup(backBtn, 'click', () => this.goBackToProducts());

    // Modal controls
    const printQuoteBtn = this.getElement('print-quote');
    const closeModalBtn = this.getElement('close-modal');
    const modal = this.getElement('quote-modal');

    this.addEventListenerWithCleanup(printQuoteBtn, 'click', () => this.printQuote());
    this.addEventListenerWithCleanup(closeModalBtn, 'click', () => this.closeModal());

    // Close modal on backdrop click
    this.addEventListenerWithCleanup(modal, 'click', (e) => {
      if (e.target === modal) {
        this.closeModal();
      }
    });

    // Keyboard shortcuts
    this.addEventListenerWithCleanup(document, 'keydown', (e) => this.handleKeyboard(e));

    // Settings change listener - use debounced version for rapid changes
    this.addEventListenerWithCleanup(this.settingsService, 'settingsChanged', () => {
      console.log('🏠 App.js: Settings changed, triggering debounced calculation update');
      this.debouncedUpdateCalculation();
    });

    // Settings panel close listener
    if (this.settingsPanel) {
      this.addEventListenerWithCleanup(this.settingsPanel.container, 'click', (e) => {
        if (e.target.id === 'settings-close' || e.target.classList.contains('settings-panel')) {
          if (this.hamburgerMenu) {
            this.hamburgerMenu.setOpen(false);
          }
        }
      });
    }

    // Step navigation (for potential future enhancement)
    this.setupStepNavigation();
  }

  setupStepNavigation() {
    // This could be enhanced to show step progression
    // For now, steps are automatic based on selections
  }

  handleProductSelection(product) {
    this.currentProduct = product;
    
    // Check if this is an interpolation-based product (like magnets)
    if (product.pricing.type === 'interpolation') {
      this.handleInterpolationProduct(product);
    } else {
      this.handleStandardProduct(product);
    }
  }

  handleStandardProduct(product) {
    this.sizeSelector.updateProduct(product, product.key);
    
    // Update the product name and description in the size selector
    const productNameElement = document.getElementById('product-name');
    const productDescriptionElement = document.getElementById('product-description');
    if (productNameElement && productDescriptionElement) {
      productNameElement.textContent = `${product.name} - Select a Size`;
      productDescriptionElement.textContent = product.description;
    }
    
    // Show options list for standard products
    const optionsList = this.getElement('options-list');
    if (optionsList) {
      optionsList.style.display = 'block';
    }
    
    // Show paper selection for standard products
    const paperGrid = document.querySelector('.paper-grid');
    if (paperGrid) {
      paperGrid.style.display = 'block';
    }
    
    // Show paper header
    const paperHeaders = document.querySelectorAll('h3');
    paperHeaders.forEach(header => {
      if (header.textContent === 'Paper Type') {
        header.style.display = 'block';
      }
    });
    
    this.showStep('size-selector');
    
    // Initialize quantity input when showing size selector
    this.initializeQuantitySelector();
    
    this.updateCalculation();
  }

  handleInterpolationProduct(product) {
    // Update header
    const productNameElement = document.getElementById('product-name');
    const productDescriptionElement = document.getElementById('product-description');
    if (productNameElement && productDescriptionElement) {
      productNameElement.textContent = `${product.name} - Select Size & Quantity`;
      productDescriptionElement.textContent = product.description;
    }
    
    // Create size selection for interpolation products
    const sizeGrid = this.getElement('size-grid');
    if (sizeGrid) {
      sizeGrid.innerHTML = '';
      
      // Add size options for interpolation products
      Object.entries(product.sizes).forEach(([key, size]) => {
        const sizeCard = document.createElement('div');
        sizeCard.className = 'size-card';
        sizeCard.dataset.sizeKey = size.key;
        sizeCard.innerHTML = `
          <h3>${size.name}</h3>
          <p>Custom printed ${product.name.toLowerCase()}</p>
        `;
        
        sizeCard.addEventListener('click', () => this.handleInterpolationSizeSelection(size));
        sizeGrid.appendChild(sizeCard);
      });
    }
    
    // Hide options list for interpolation products
    const optionsList = this.getElement('options-list');
    if (optionsList) {
      optionsList.style.display = 'none';
    }
    
    // Hide paper selection for external products
    const paperGrid = document.querySelector('.paper-grid');
    if (paperGrid) {
      paperGrid.style.display = 'none';
    }
    
    // Hide paper header
    const paperHeaders = document.querySelectorAll('h3');
    paperHeaders.forEach(header => {
      if (header.textContent === 'Paper Type') {
        header.style.display = 'none';
      }
    });
    
    this.showStep('size-selector');
  }

  handleInterpolationSizeSelection(size) {
    this.currentSize = size;
    this.currentOptions = []; // No options for interpolation products
    this.currentPaper = null; // No paper selection for interpolation products
    
    // Remove previous size selection
    const previousSelected = document.querySelector('.size-card.selected');
    if (previousSelected) {
      previousSelected.classList.remove('selected');
    }
    
    // Add selection to clicked card
    const selectedCard = document.querySelector(`[data-size-key="${size.key}"]`);
    if (selectedCard) {
      selectedCard.classList.add('selected');
    }
    
    // Initialize external quantity selector for interpolation products
    this.initializeInterpolationQuantitySelector();
  }

  initializeInterpolationQuantitySelector() {
    // Clean up existing quantity selector if it exists
    if (this.quantitySelector && this.quantitySelector.destroy) {
      this.quantitySelector.destroy();
    }
    
    const quantityContainer = document.querySelector('#quantity-selector');
    if (quantityContainer && this.currentProduct && this.currentSize) {
      this.quantitySelector = new ExternalQuantitySelector(
        quantityContainer,
        this.currentProduct,
        this.currentSize,
        (quantityData) => this.handleInterpolationQuantityChange(quantityData)
      );
    }
  }

  handleInterpolationQuantityChange(quantityData) {
    this.currentQuantity = quantityData.quantity;
    this.currentPricing = quantityData.pricing;
    
    // Update price display
    if (this.priceDisplay) {
      this.priceDisplay.updateExternalPricing(this.currentPricing);
    }
  }

  initializeQuantitySelector() {
    if (!this.quantitySelector) {
      const quantityContainer = document.querySelector('#quantity-selector');
      if (quantityContainer) {
        this.quantitySelector = new QuantitySelector(
          quantityContainer,
          this.pricingEngine,
          (quantity) => this.handleQuantityChange(quantity)
        );
      }
    }
  }

  handleSizeOptionSelection(selection) {
    this.currentSize = selection.size;
    this.currentOptions = selection.options;
    this.currentPaper = selection.paper;
    // Use debounced version for rapid selections
    this.debouncedUpdateCalculation();
  }

  handleQuantityChange(quantity) {
    this.currentQuantity = quantity;
    // Use debounced version for rapid quantity changes
    this.debouncedUpdateCalculation();
  }

  async updateCalculation() {
    try {
      // Update price display
      await this.priceDisplay.updatePricing(
        this.currentProduct,
        this.currentSize,
        this.currentOptions,
        this.currentQuantity,
        this.currentPaper
      );

      // Update quantity selector pricing context
      if (this.quantitySelector) {
        this.quantitySelector.updatePricingContext(
          this.currentProduct,
          this.currentSize,
          this.currentOptions,
          this.currentPaper
        );
      }

      this.currentPricing = this.priceDisplay.getCurrentPricing();

    } catch (error) {
      errorHandler.handleError({
        type: 'calculation',
        message: error.message,
        stack: error.stack,
        context: {
          product: this.currentProduct?.name,
          size: this.currentSize?.name,
          quantity: this.currentQuantity
        }
      }, {
        component: 'InstantQuoteApp',
        severity: 'error',
        userMessage: 'Price calculation failed. Some pricing may be incorrect.',
        recoveryAction: () => {
          // Reset to safe defaults and retry
          this.currentQuantity = 50;
          setTimeout(() => this.updateCalculation(), 100);
        }
      });
    }
  }


  showStep(stepId) {
    // Hide all steps
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => step.classList.remove('active'));

    // Show requested step
    const targetStep = document.getElementById(stepId);
    if (targetStep) {
      targetStep.classList.add('active');
    }
  }

  goBackToProducts() {
    // Reset current size and options
    this.currentSize = null;
    this.currentOptions = [];
    this.currentPaper = null;
    
    // Reset components
    this.sizeSelector.reset();
    
    // Clear product name and description
    const productNameElement = document.getElementById('product-name');
    const productDescriptionElement = document.getElementById('product-description');
    if (productNameElement && productDescriptionElement) {
      productNameElement.textContent = 'Choose Size & Options';
      productDescriptionElement.textContent = '';
    }
    
    // Show product selector
    this.showStep('product-selector');
    
    // Update calculation and UI
    this.updateCalculation();
  }

  handleMenuToggle(isOpen) {
    if (this.settingsPanel) {
      if (isOpen) {
        this.settingsPanel.show();
      } else {
        this.settingsPanel.hide();
      }
    }
  }


  displayQuote(quote) {
    const quoteContent = document.getElementById('quote-content');
    const formattedQuote = this.quoteService.formatQuoteHTML(quote);
    
    quoteContent.innerHTML = formattedQuote;
    
    // Show modal
    const modal = document.getElementById('quote-modal');
    modal.classList.add('active');
    
    // Store current quote for printing
    this.currentQuote = quote;
  }

  printQuote() {
    if (this.currentQuote) {
      const quoteHTML = this.quoteService.formatQuoteHTML(this.currentQuote);
      this.quoteService.printQuote(quoteHTML);
    }
  }

  closeModal() {
    const modal = document.getElementById('quote-modal');
    modal.classList.remove('active');
    this.currentQuote = null;
  }


  handleKeyboard(e) {
    // Keyboard shortcuts for power users
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'p':
          e.preventDefault();
          if (this.currentQuote) {
            this.printQuote();
          }
          break;
      }
    }

    // Escape to close modal
    if (e.key === 'Escape') {
      this.closeModal();
    }
  }

  // Method for potential future enhancements
  loadQuoteHistory() {
    return this.quoteService.getSavedQuotes();
  }

  // Method for rush order toggle (future enhancement)
  toggleRushOrder(enabled) {
    this.priceDisplay.showRushOrderPricing(enabled);
    this.updateCalculation();
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  try {
    console.log('🏠 DOM loaded, initializing app...');
    window.instantQuoteApp = new InstantQuoteApp();
    console.log('✅ App initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize app:', error);
    // Show error to user
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = 'position: fixed; top: 20px; left: 20px; right: 20px; background: #ffebee; border: 1px solid #f44336; padding: 20px; border-radius: 8px; color: #c62828; z-index: 9999;';
    errorDiv.innerHTML = `
      <h3>Application Error</h3>
      <p>Failed to initialize the application. Please check the console for details.</p>
      <p><strong>Error:</strong> ${error.message}</p>
      <button onclick="location.reload()" style="background: #f44336; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin-top: 10px;">Reload Page</button>
    `;
    document.body.appendChild(errorDiv);
  }
});

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}