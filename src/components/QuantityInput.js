export class QuantityInput {
  constructor(container, onQuantityChange) {
    this.container = container;
    this.onQuantityChange = onQuantityChange;
    this.quantity = 50; // Default quantity
    this.minQuantity = 50;
    this.maxQuantity = 10000;
    this.stepSize = 25; // Only multiples of 25
    
    this.init();
  }

  init() {
    this.input = this.container.querySelector('#quantity');
    this.decreaseBtn = this.container.querySelector('[data-action="decrease"]');
    this.increaseBtn = this.container.querySelector('[data-action="increase"]');
    
    if (!this.input || !this.decreaseBtn || !this.increaseBtn) {
      console.error('QuantityInput: Required elements not found');
      return;
    }
    
    this.setupEventListeners();
    this.updateDisplay();
  }

  setupEventListeners() {
    // Input field events
    this.input.addEventListener('input', (e) => {
      this.handleInputChange(e.target.value);
    });
    
    this.input.addEventListener('blur', () => {
      this.validateAndUpdate();
    });
    
    this.input.addEventListener('keypress', (e) => {
      // Only allow numbers
      if (!/\d/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
        e.preventDefault();
      }
      
      // Submit on Enter
      if (e.key === 'Enter') {
        this.validateAndUpdate();
        this.input.blur();
      }
    });
    
    // Button events
    this.decreaseBtn.addEventListener('click', () => {
      this.changeQuantity(-this.getStepSize());
    });
    
    this.increaseBtn.addEventListener('click', () => {
      this.changeQuantity(this.getStepSize());
    });
    
    // Touch and hold for continuous increment/decrement
    this.setupTouchAndHold();
  }

  setupTouchAndHold() {
    let holdTimer;
    let holdInterval;
    
    const startHold = (button, increment) => {
      // Clear any existing timers
      this.stopHold();
      
      // Initial delay before starting continuous increment
      holdTimer = setTimeout(() => {
        holdInterval = setInterval(() => {
          this.changeQuantity(increment);
        }, 100); // Continue every 100ms
      }, 500); // Start after 500ms hold
    };
    
    const stopHold = () => {
      if (holdTimer) {
        clearTimeout(holdTimer);
        holdTimer = null;
      }
      if (holdInterval) {
        clearInterval(holdInterval);
        holdInterval = null;
      }
    };
    
    this.stopHold = stopHold;
    
    // Touch events for mobile
    this.decreaseBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      startHold(this.decreaseBtn, -this.getStepSize());
    });
    
    this.increaseBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      startHold(this.increaseBtn, this.getStepSize());
    });
    
    // Mouse events for desktop
    this.decreaseBtn.addEventListener('mousedown', () => {
      startHold(this.decreaseBtn, -this.getStepSize());
    });
    
    this.increaseBtn.addEventListener('mousedown', () => {
      startHold(this.increaseBtn, this.getStepSize());
    });
    
    // Stop hold on various events
    ['touchend', 'touchcancel', 'mouseup', 'mouseleave'].forEach(event => {
      this.decreaseBtn.addEventListener(event, stopHold);
      this.increaseBtn.addEventListener(event, stopHold);
    });
    
    // Stop hold when window loses focus
    window.addEventListener('blur', stopHold);
  }

  getStepSize() {
    // Always use multiples of 25
    return this.stepSize;
  }

  handleInputChange(value) {
    // Allow empty input while typing
    if (value === '') {
      return;
    }
    
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      this.quantity = numValue;
      // Trigger real-time updates while typing
      this.triggerChange();
    }
  }

  validateAndUpdate() {
    // Ensure quantity is within bounds
    if (this.quantity < this.minQuantity) {
      this.quantity = this.minQuantity;
    } else if (this.quantity > this.maxQuantity) {
      this.quantity = this.maxQuantity;
    }
    
    // Round to nearest multiple of 25
    this.quantity = Math.round(this.quantity / this.stepSize) * this.stepSize;
    
    // Ensure it's still within bounds after rounding
    if (this.quantity < this.minQuantity) {
      this.quantity = this.minQuantity;
    }
    
    this.updateDisplay();
    this.triggerChange();
  }

  changeQuantity(delta) {
    const newQuantity = this.quantity + delta;
    
    if (newQuantity >= this.minQuantity && newQuantity <= this.maxQuantity) {
      this.quantity = newQuantity;
      this.updateDisplay();
      this.triggerChange();
    }
  }

  updateDisplay() {
    if (this.input) {
      this.input.value = this.quantity;
    }
    
    // Update button states
    this.decreaseBtn.disabled = this.quantity <= this.minQuantity;
    this.increaseBtn.disabled = this.quantity >= this.maxQuantity;
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
      // Round to nearest multiple of 25
      this.quantity = Math.round(this.quantity / this.stepSize) * this.stepSize;
      // Ensure it's still within bounds after rounding
      if (this.quantity < this.minQuantity) {
        this.quantity = this.minQuantity;
      }
      this.updateDisplay();
      this.triggerChange();
    }
  }

  getQuantity() {
    return this.quantity;
  }

  reset() {
    this.quantity = 50;
    this.updateDisplay();
  }

  destroy() {
    if (this.stopHold) {
      this.stopHold();
    }
  }
}