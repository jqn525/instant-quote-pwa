import { productTypes } from './data/products.js';
import { PricingEngine } from './services/PricingEngine.js';
import { QuoteService } from './services/QuoteService.js';
import { CartService } from './services/CartService.js';
import { SettingsService } from './services/SettingsService.js';
import { ProductSelector } from './components/ProductSelector.js';
import { SizeSelector } from './components/SizeSelector.js';
import { QuantitySelector } from './components/QuantitySelector.js';
import { PriceDisplay } from './components/PriceDisplay.js';
import { CartDisplay } from './components/CartDisplay.js';
import { HamburgerMenu } from './components/HamburgerMenu.js';
import { SettingsPanel } from './components/SettingsPanel.js';

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
    
    this.init();
  }

  init() {
    this.initializeComponents();
    this.setupEventListeners();
    this.updateCalculation();
  }

  initializeComponents() {
    // Product Selector
    const productGrid = document.getElementById('product-grid');
    this.productSelector = new ProductSelector(
      productGrid,
      productTypes,
      (product) => this.handleProductSelection(product)
    );

    // Size Selector
    const sizeGrid = document.getElementById('size-grid');
    const optionsList = document.getElementById('options-list');
    this.sizeSelector = new SizeSelector(
      sizeGrid,
      optionsList,
      (selection) => this.handleSizeOptionSelection(selection)
    );

    // Quantity Input - will be initialized when size selector is shown
    this.quantitySelector = null;

    // Price Display
    const priceSection = document.getElementById('price-display');
    this.priceDisplay = new PriceDisplay(priceSection, this.pricingEngine, this.cartService);

    // Cart Display
    const cartContainer = document.getElementById('cart-container');
    if (cartContainer) {
      this.cartDisplay = new CartDisplay(cartContainer, this.cartService, this.pricingEngine);
    }

    // Hamburger Menu
    const hamburgerContainer = document.getElementById('hamburger-menu-container');
    if (hamburgerContainer) {
      this.hamburgerMenu = new HamburgerMenu(hamburgerContainer, (isOpen) => this.handleMenuToggle(isOpen));
    }

    // Settings Panel
    const settingsContainer = document.getElementById('settings-panel-container');
    if (settingsContainer) {
      this.settingsPanel = new SettingsPanel(settingsContainer, this.settingsService);
    }
  }

  setupEventListeners() {

    // Back button
    const backBtn = document.getElementById('back-to-products');
    if (backBtn) {
      backBtn.addEventListener('click', () => this.goBackToProducts());
    }

    // Modal controls
    const printQuoteBtn = document.getElementById('print-quote');
    const closeModalBtn = document.getElementById('close-modal');
    const modal = document.getElementById('quote-modal');

    printQuoteBtn.addEventListener('click', () => this.printQuote());
    closeModalBtn.addEventListener('click', () => this.closeModal());

    // Close modal on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeModal();
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));

    // Settings change listener
    this.settingsService.addEventListener('settingsChanged', () => this.updateCalculation());

    // Settings panel close listener
    if (this.settingsPanel) {
      this.settingsPanel.container.addEventListener('click', (e) => {
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
    this.sizeSelector.updateProduct(product, product.key);
    
    // Update the product name and description in the size selector
    const productNameElement = document.getElementById('product-name');
    const productDescriptionElement = document.getElementById('product-description');
    if (productNameElement && productDescriptionElement) {
      productNameElement.textContent = `${product.name} - Select a Size`;
      productDescriptionElement.textContent = product.description;
    }
    
    this.showStep('size-selector');
    
    // Initialize quantity input when showing size selector
    this.initializeQuantitySelector();
    
    this.updateCalculation();
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
    this.updateCalculation();
  }

  handleQuantityChange(quantity) {
    this.currentQuantity = quantity;
    this.updateCalculation();
  }

  updateCalculation() {
    // Update price display
    this.priceDisplay.updatePricing(
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
  window.instantQuoteApp = new InstantQuoteApp();
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