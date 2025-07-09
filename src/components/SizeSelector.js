import { createSvgIcon } from './SvgIcons.js';
import { 
  getAllowedPapers, 
  getDefaultPaper,
  getAvailablePaperTypes,
  getAvailableWeights,
  getAvailableFinishes,
  getPaperBySpecification,
  getPaperTypeFromId,
  getWeightFromId,
  getFinishFromId
} from '../data/paperStocks.js';

export class SizeSelector {
  constructor(sizeContainer, optionsContainer, onSelectionChange) {
    this.sizeContainer = sizeContainer;
    this.optionsContainer = optionsContainer;
    this.onSelectionChange = onSelectionChange;
    this.selectedSize = null;
    this.selectedOptions = [];
    this.selectedPaper = null;
    this.currentProduct = null;
    this.currentProductKey = null;
    
    // Define recommended sizes for each product
    this.recommendedSizes = {
      'brochures': 'small', // 8.5" x 11"
      'postcards': 'medium', // 5" x 7"
      'flyers': 'medium', // 8.5" x 11"
      'bookmarks': 'tall', // 2" x 7"
      'table_tents': 'small' // 4" x 6"
    };
    
    // Paper selection state
    this.selectedPaperType = null;
    this.selectedWeight = null;
    this.selectedFinish = null;
    this.paperSelectionStep = 1; // 1=type, 2=weight, 3=finish
    
    // Event listener storage for cleanup
    this.eventListeners = [];
    
    // Find or create paper container
    this.paperContainer = this.findOrCreatePaperContainer();
  }

  hideExistingPaperUI() {
    // Hide existing paper container and header
    const existingContainer = document.querySelector('.paper-grid');
    if (existingContainer) {
      existingContainer.style.display = 'none';
    }
    
    // Hide paper header
    const paperHeaders = document.querySelectorAll('h3');
    paperHeaders.forEach(header => {
      if (header.textContent === 'Paper Type') {
        header.style.display = 'none';
      }
    });
  }

  findOrCreatePaperContainer() {
    // Skip paper container creation for external products
    if (this.currentProduct && this.currentProduct.isExternal) {
      return null;
    }
    
    // Look for existing paper container
    let container = document.querySelector('.paper-grid');
    if (!container) {
      // Create paper container and insert after options
      container = document.createElement('div');
      container.className = 'paper-grid';
      
      // Insert after options container
      this.optionsContainer.parentNode.insertBefore(container, this.optionsContainer.nextSibling);
      
      // Add header
      const header = document.createElement('h3');
      header.textContent = 'Paper Type';
      this.optionsContainer.parentNode.insertBefore(header, container);
    } else {
      // Show existing container for non-external products
      container.style.display = 'block';
      
      // Show paper header
      const paperHeaders = document.querySelectorAll('h3');
      paperHeaders.forEach(header => {
        if (header.textContent === 'Paper Type') {
          header.style.display = 'block';
        }
      });
    }
    return container;
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
    this.sizeContainer = null;
    this.optionsContainer = null;
    this.paperContainer = null;
    this.onSelectionChange = null;
  }

  updateProduct(product, productKey = null) {
    // Clean up existing event listeners before updating
    this.cleanup();
    
    this.currentProduct = product;
    this.currentProductKey = productKey;
    this.selectedSize = null;
    this.selectedOptions = [];
    this.selectedPaper = null;
    
    // Clean up any existing paper UI for external products
    if (this.currentProduct && this.currentProduct.isExternal) {
      this.hideExistingPaperUI();
    }
    
    // Refresh paper container based on product type
    this.paperContainer = this.findOrCreatePaperContainer();
    
    this.renderSizes();
    this.renderOptions();
    this.renderPapers();
    
    // Auto-select recommended size and default paper
    this.autoSelectRecommendedSize();
  }

  renderSizes() {
    if (!this.currentProduct || !this.currentProduct.sizes) {
      this.sizeContainer.innerHTML = '<p>No sizes available</p>';
      return;
    }

    this.sizeContainer.innerHTML = '';
    
    const recommendedSizeKey = this.recommendedSizes[this.currentProductKey];
    const sizes = Object.entries(this.currentProduct.sizes);
    
    // Create array to hold all cards in order
    const sizeCards = [];
    
    // Create all regular size cards first
    sizes.forEach(([key, size]) => {
      if (key !== recommendedSizeKey) { // Skip the recommended size for regular cards
        const sizeCard = this.createSizeCard(key, size);
        sizeCards.push({ key, element: sizeCard, isRecommended: false });
      }
    });
    
    // Insert recommended card at the correct position if it exists
    if (recommendedSizeKey && this.currentProduct.sizes[recommendedSizeKey]) {
      const recommendedSize = this.currentProduct.sizes[recommendedSizeKey];
      const recommendedCard = this.createRecommendedSizeCard(recommendedSizeKey, recommendedSize);
      
      // Find the correct position for the recommended card
      const recommendedIndex = sizes.findIndex(([key]) => key === recommendedSizeKey);
      
      // Insert at the correct position (accounting for removed duplicate)
      sizeCards.splice(recommendedIndex, 0, { 
        key: recommendedSizeKey, 
        element: recommendedCard, 
        isRecommended: true 
      });
    }
    
    // Append all cards in order
    sizeCards.forEach(({ element }) => {
      this.sizeContainer.appendChild(element);
    });
  }

  createRecommendedSizeCard(key, size) {
    const card = document.createElement('div');
    card.className = 'size-card size-recommended';
    card.dataset.sizeKey = key;
    
    card.innerHTML = `
      <div class="size-name">Recommended Size</div>
      <div class="size-dimensions">${size.name}</div>
      <div class="size-indicator">
        ${createSvgIcon('checkmark', 'checkmark')}
      </div>
    `;
    
    this.addEventListenerWithCleanup(card, 'click', () => this.selectSize(key, size));
    
    return card;
  }

  createSizeCard(key, size) {
    const card = document.createElement('div');
    card.className = 'size-card';
    card.dataset.sizeKey = key;
    
    card.innerHTML = `
      <div class="size-name">${size.name}</div>
      <div class="size-indicator">
        ${createSvgIcon('checkmark', 'checkmark')}
      </div>
    `;
    
    this.addEventListenerWithCleanup(card, 'click', () => this.selectSize(key, size));
    
    return card;
  }

  selectSize(key, size) {
    // Remove previous selection
    const previousSelected = this.sizeContainer.querySelector('.size-card.selected');
    if (previousSelected) {
      previousSelected.classList.remove('selected');
    }
    
    // Add selection to clicked card
    const selectedCard = this.sizeContainer.querySelector(`[data-size-key="${key}"]`);
    selectedCard.classList.add('selected');
    
    this.selectedSize = { key, ...size };
    this.triggerChange();
  }

  renderOptions() {
    this.optionsContainer.innerHTML = '';
    
    // Handle regular options
    if (this.currentProduct && this.currentProduct.options) {
      this.optionsContainer.innerHTML = '<h3>Add-on Options</h3>';
      
      Object.entries(this.currentProduct.options).forEach(([key, option]) => {
        const optionCard = this.createOptionCard(key, option);
        this.optionsContainer.appendChild(optionCard);
      });
    }
    
    // Handle finishing options (like table tent mandatory finishing)
    if (this.currentProduct && this.currentProduct.finishingOptions && this.currentProduct.finishingOptions.length > 0) {
      if (!this.optionsContainer.innerHTML) {
        this.optionsContainer.innerHTML = '<h3>Finishing Options</h3>';
      } else {
        const finishingHeader = document.createElement('h3');
        finishingHeader.textContent = 'Finishing Options';
        finishingHeader.style.marginTop = '20px';
        this.optionsContainer.appendChild(finishingHeader);
      }
      
      this.currentProduct.finishingOptions.forEach((option, index) => {
        const optionKey = `finishing_${index}`;
        const optionCard = this.createOptionCard(optionKey, option);
        this.optionsContainer.appendChild(optionCard);
      });
    }
  }

  renderPapers() {
    // Skip paper rendering entirely for external products
    if (this.currentProduct && this.currentProduct.isExternal) {
      return;
    }
    
    if (!this.currentProduct || !this.currentProductKey || !this.paperContainer) {
      if (this.paperContainer) {
        this.paperContainer.innerHTML = '<p>No product selected</p>';
      }
      return;
    }

    // Auto-select default paper to ensure pricing works
    const defaultPaper = getDefaultPaper(this.currentProductKey);
    if (defaultPaper) {
      this.selectedPaperType = getPaperTypeFromId(defaultPaper.id);
      this.selectedWeight = getWeightFromId(defaultPaper.id);
      this.selectedFinish = getFinishFromId(defaultPaper.id);
      this.selectedPaper = defaultPaper;
      this.triggerChange(); // Trigger pricing calculation with default paper
    }

    // Start with paper type selection for UI
    this.paperSelectionStep = 1;
    this.renderPaperSelector();
  }

  renderPaperSelector() {
    if (!this.paperContainer) {
      return;
    }
    this.paperContainer.innerHTML = '';
    
    // Create step indicator
    const stepIndicator = this.createStepIndicator();
    this.paperContainer.appendChild(stepIndicator);

    // Render current step
    switch (this.paperSelectionStep) {
      case 1:
        this.renderPaperTypes();
        break;
      case 2:
        this.renderWeights();
        break;
      case 3:
        this.renderFinishes();
        break;
      case 4:
        this.renderFinalSelection();
        break;
    }
  }

  createStepIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'paper-step-indicator';
    
    let stepText = '';
    switch (this.paperSelectionStep) {
      case 1:
        stepText = 'Step 1 of 3: Choose Paper Type';
        break;
      case 2:
        stepText = 'Step 2 of 3: Choose Weight';
        break;
      case 3:
        stepText = 'Step 3 of 3: Choose Finish';
        break;
      case 4:
        stepText = 'Paper Selected (Default)';
        break;
    }
    
    indicator.innerHTML = `
      <div class="step-text">${stepText}</div>
      ${this.paperSelectionStep > 1 ? '<button class="back-step-btn">← Back</button>' : ''}
    `;
    
    const backBtn = indicator.querySelector('.back-step-btn');
    if (backBtn) {
      this.addEventListenerWithCleanup(backBtn, 'click', () => this.goBackStep());
    }
    
    return indicator;
  }

  renderPaperTypes() {
    // Show recommended stock first
    const defaultPaper = getDefaultPaper(this.currentProductKey);
    if (defaultPaper) {
      const recommendedCard = this.createRecommendedCard(defaultPaper);
      this.paperContainer.appendChild(recommendedCard);
    }
    
    // Show paper type options
    const types = getAvailablePaperTypes(this.currentProductKey);
    
    types.forEach(type => {
      const typeCard = this.createPaperTypeCard(type);
      this.paperContainer.appendChild(typeCard);
    });
  }

  renderWeights() {
    const weights = getAvailableWeights(this.currentProductKey, this.selectedPaperType);
    
    weights.forEach(weight => {
      const weightCard = this.createWeightCard(weight);
      this.paperContainer.appendChild(weightCard);
    });
  }

  renderFinishes() {
    const finishes = getAvailableFinishes(this.currentProductKey, this.selectedPaperType, this.selectedWeight);
    
    finishes.forEach(finish => {
      const finishCard = this.createFinishCard(finish);
      this.paperContainer.appendChild(finishCard);
    });
  }

  renderFinalSelection() {
    if (!this.selectedPaper) return;
    
    const finalCard = this.createFinalPaperCard(this.selectedPaper);
    this.paperContainer.appendChild(finalCard);
    
    const changeBtn = document.createElement('button');
    changeBtn.className = 'change-paper-btn';
    changeBtn.textContent = 'Change Paper';
    this.addEventListenerWithCleanup(changeBtn, 'click', () => {
      this.paperSelectionStep = 1;
      this.selectedPaperType = null;
      this.selectedWeight = null;
      this.selectedFinish = null;
      this.renderPaperSelector();
    });
    this.paperContainer.appendChild(changeBtn);
  }

  createRecommendedCard(defaultPaper) {
    const card = document.createElement('div');
    card.className = 'paper-recommended-card';
    
    card.innerHTML = `
      <div class="selection-name">Recommended Stock</div>
      <div class="selection-description">${defaultPaper.displayName}</div>
    `;
    
    this.addEventListenerWithCleanup(card, 'click', () => this.selectRecommendedPaper(defaultPaper));
    
    return card;
  }

  createPaperTypeCard(type) {
    const card = document.createElement('div');
    card.className = 'paper-selection-card';
    
    card.innerHTML = `
      <div class="selection-name">${type.name}</div>
      <div class="selection-description">${type.description}</div>
    `;
    
    this.addEventListenerWithCleanup(card, 'click', () => this.selectPaperType(type.key));
    
    return card;
  }

  createWeightCard(weight) {
    const card = document.createElement('div');
    card.className = 'paper-selection-card';
    
    card.innerHTML = `
      <div class="selection-name">${weight}</div>
      <div class="selection-description">Paper weight</div>
    `;
    
    this.addEventListenerWithCleanup(card, 'click', () => this.selectWeight(weight));
    
    return card;
  }

  createFinishCard(finish) {
    const card = document.createElement('div');
    card.className = 'paper-selection-card';
    
    const description = finish === 'Uncoated' 
      ? 'Natural matte finish' 
      : 'Smooth professional finish';
    
    card.innerHTML = `
      <div class="selection-name">${finish}</div>
      <div class="selection-description">${description}</div>
    `;
    
    this.addEventListenerWithCleanup(card, 'click', () => this.selectFinish(finish));
    
    return card;
  }

  createFinalPaperCard(paper) {
    const card = document.createElement('div');
    card.className = 'paper-final-card';
    
    card.innerHTML = `
      <div class="paper-name">${paper.displayName}</div>
      <div class="paper-details">
        <span class="paper-brand">${paper.brand}</span>
        <span class="paper-finish">${paper.finish}</span>
      </div>
      <div class="paper-cost">$${paper.costPerSheet.toFixed(3)}/sheet</div>
      <div class="paper-indicator">
        ${createSvgIcon('checkmark', 'checkmark')}
      </div>
    `;
    
    return card;
  }

  selectRecommendedPaper(defaultPaper) {
    this.selectedPaperType = getPaperTypeFromId(defaultPaper.id);
    this.selectedWeight = getWeightFromId(defaultPaper.id);
    this.selectedFinish = getFinishFromId(defaultPaper.id);
    this.selectedPaper = defaultPaper;
    this.paperSelectionStep = 4;
    this.renderPaperSelector();
    this.triggerChange();
  }

  selectPaperType(paperType) {
    this.selectedPaperType = paperType;
    this.paperSelectionStep = 2;
    this.renderPaperSelector();
  }

  selectWeight(weight) {
    this.selectedWeight = weight;
    this.paperSelectionStep = 3;
    this.renderPaperSelector();
  }

  selectFinish(finish) {
    this.selectedFinish = finish;
    
    // Find the specific paper
    const paper = getPaperBySpecification(
      this.currentProductKey,
      this.selectedPaperType,
      this.selectedWeight,
      this.selectedFinish
    );
    
    if (paper) {
      this.selectedPaper = paper;
      this.paperSelectionStep = 4;
      this.renderPaperSelector();
      this.triggerChange();
    }
  }

  goBackStep() {
    if (this.paperSelectionStep > 1) {
      this.paperSelectionStep--;
      if (this.paperSelectionStep === 1) {
        this.selectedPaperType = null;
      } else if (this.paperSelectionStep === 2) {
        this.selectedWeight = null;
      } else if (this.paperSelectionStep === 3) {
        this.selectedFinish = null;
      }
      this.renderPaperSelector();
    }
  }

  selectPaper(paper) {
    // Remove previous selection
    const previousSelected = this.paperContainer.querySelector('.paper-card.selected');
    if (previousSelected) {
      previousSelected.classList.remove('selected');
    }
    
    // Add selection to clicked card
    const selectedCard = this.paperContainer.querySelector(`[data-paper-id="${paper.id}"]`);
    if (selectedCard) {
      selectedCard.classList.add('selected');
    }
    
    this.selectedPaper = paper;
    this.triggerChange();
  }

  createOptionCard(key, option) {
    const card = document.createElement('div');
    card.className = 'option-card';
    card.dataset.optionKey = key;
    
    const modifierText = option.modifier !== 1 ? ` (+${Math.round((option.modifier - 1) * 100)}%)` : '';
    const costText = option.cost && option.cost > 0 ? ` (+$${option.cost.toFixed(2)}/pc)` : '';
    
    card.innerHTML = `
      <div class="option-checkbox">
        <input type="checkbox" id="option-${key}" class="option-input">
        <label for="option-${key}" class="option-label">
          <span class="option-name">${option.name}</span>
          <span class="option-modifier">${modifierText}${costText}</span>
        </label>
      </div>
    `;
    
    const checkbox = card.querySelector('.option-input');
    this.addEventListenerWithCleanup(checkbox, 'change', () => this.toggleOption(key, option, checkbox.checked));
    
    return card;
  }

  toggleOption(key, option, isSelected) {
    if (isSelected) {
      // Add option if not already selected
      if (!this.selectedOptions.find(opt => opt.key === key)) {
        this.selectedOptions.push({ key, ...option });
      }
    } else {
      // Remove option
      this.selectedOptions = this.selectedOptions.filter(opt => opt.key !== key);
    }
    
    this.triggerChange();
  }

  triggerChange() {
    if (this.onSelectionChange) {
      this.onSelectionChange({
        size: this.selectedSize,
        options: this.selectedOptions,
        paper: this.selectedPaper
      });
    }
  }

  getSelectedSize() {
    return this.selectedSize;
  }

  getSelectedOptions() {
    return this.selectedOptions;
  }

  autoSelectRecommendedSize() {
    // Auto-select the recommended size for this product
    const recommendedSizeKey = this.recommendedSizes[this.currentProductKey];
    if (recommendedSizeKey && this.currentProduct && this.currentProduct.sizes) {
      const recommendedSize = this.currentProduct.sizes[recommendedSizeKey];
      if (recommendedSize) {
        // Wait for DOM to be ready, then auto-select
        setTimeout(() => {
          this.selectSize(recommendedSizeKey, recommendedSize);
          this.autoSelectDefaultPaper();
          this.autoSelectMandatoryFinishing();
        }, 100);
      }
    }
  }

  autoSelectDefaultPaper() {
    // Skip auto-selection for external products
    if (this.currentProduct && this.currentProduct.isExternal) {
      return;
    }
    
    // Auto-select default paper for this product
    if (this.currentProductKey) {
      const defaultPaper = getDefaultPaper(this.currentProductKey);
      if (defaultPaper) {
        this.selectedPaper = defaultPaper;
        
        // Set paper selection state for hierarchical display
        this.selectedPaperType = defaultPaper.type;
        this.selectedWeight = defaultPaper.weight;
        this.selectedFinish = defaultPaper.finish;
        this.paperSelectionStep = 4; // Final step
        
        this.renderPaperSelector();
        this.triggerChange();
      }
    }
  }

  reset() {
    // Clean up event listeners first
    this.cleanup();
    
    // Reset size selection
    const selectedSizeCard = this.sizeContainer.querySelector('.size-card.selected');
    if (selectedSizeCard) {
      selectedSizeCard.classList.remove('selected');
    }
    
    // Reset option selections
    const checkboxes = this.optionsContainer.querySelectorAll('.option-input');
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
    
    // Reset paper selection
    const selectedPaperCard = this.paperContainer.querySelector('.paper-card.selected');
    if (selectedPaperCard) {
      selectedPaperCard.classList.remove('selected');
    }
    
    // Reset state
    this.selectedSize = null;
    this.selectedOptions = [];
    this.selectedPaper = null;
    this.currentProduct = null;
    
    // Reset paper selection state
    this.selectedPaperType = null;
    this.selectedWeight = null;
    this.selectedFinish = null;
    this.paperSelectionStep = 1;
    
    this.sizeContainer.innerHTML = '';
    this.optionsContainer.innerHTML = '';
    this.paperContainer.innerHTML = '';
  }

  autoSelectMandatoryFinishing() {
    // Auto-select mandatory finishing options for table tent cards
    if (this.currentProductKey === 'table_tents' && this.currentProduct && this.currentProduct.finishingOptions) {
      // Clear any existing selections first
      this.selectedOptions = [];
      
      // Auto-select all finishing options for table tents (they're all mandatory)
      this.currentProduct.finishingOptions.forEach((option, index) => {
        const optionKey = `finishing_${index}`;
        this.selectedOptions.push({ key: optionKey, ...option });
        
        // Update the UI checkbox if it exists
        setTimeout(() => {
          const checkbox = this.optionsContainer.querySelector(`#option-${optionKey}`);
          if (checkbox) {
            checkbox.checked = true;
          }
        }, 150);
      });
      
      // Trigger change to update pricing
      this.triggerChange();
    }
    
    // Auto-select scoring for brochures (default finishing)
    if (this.currentProductKey === 'brochures' && this.currentProduct && this.currentProduct.finishingOptions) {
      // Find the scoring option (now index 0 in the finishingOptions array)
      const scoringOption = this.currentProduct.finishingOptions.find(option => 
        option.name.toLowerCase().includes('scoring')
      );
      
      if (scoringOption) {
        const scoringIndex = this.currentProduct.finishingOptions.indexOf(scoringOption);
        const optionKey = `finishing_${scoringIndex}`;
        
        // Add scoring to selected options if not already present
        const isAlreadySelected = this.selectedOptions.some(opt => opt.key === optionKey);
        if (!isAlreadySelected) {
          this.selectedOptions.push({ key: optionKey, ...scoringOption });
          
          // Update the UI checkbox if it exists
          setTimeout(() => {
            const checkbox = this.optionsContainer.querySelector(`#option-${optionKey}`);
            if (checkbox) {
              checkbox.checked = true;
            }
          }, 150);
          
          // Trigger change to update pricing
          this.triggerChange();
        }
      }
    }
  }
}