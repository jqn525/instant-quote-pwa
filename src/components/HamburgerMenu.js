export class HamburgerMenu {
  constructor(container, onToggle) {
    this.container = container;
    this.onToggle = onToggle;
    this.isOpen = false;
    
    this.init();
  }

  init() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.container.innerHTML = `
      <button class="hamburger-menu" id="hamburger-menu" aria-label="Open Settings Menu">
        <div class="hamburger-icon">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </div>
      </button>
    `;
  }

  setupEventListeners() {
    // Remove existing listeners to prevent duplicates
    if (this.clickHandler) {
      this.container.removeEventListener('click', this.clickHandler);
    }
    
    // Create new click handler
    this.clickHandler = (e) => {
      if (e.target.closest('.hamburger-menu')) {
        this.toggle();
      }
    };
    
    // Attach new listeners
    this.container.addEventListener('click', this.clickHandler);
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.updateIcon();
    
    if (this.onToggle) {
      this.onToggle(this.isOpen);
    }
  }

  updateIcon() {
    const hamburgerMenu = this.container.querySelector('.hamburger-menu');
    const hamburgerIcon = this.container.querySelector('.hamburger-icon');
    
    if (this.isOpen) {
      hamburgerMenu.classList.add('open');
      hamburgerIcon.classList.add('open');
      hamburgerMenu.setAttribute('aria-label', 'Close Settings Menu');
    } else {
      hamburgerMenu.classList.remove('open');
      hamburgerIcon.classList.remove('open');
      hamburgerMenu.setAttribute('aria-label', 'Open Settings Menu');
    }
  }

  setOpen(isOpen) {
    this.isOpen = isOpen;
    this.updateIcon();
  }

  destroy() {
    // Clean up event listeners
    if (this.clickHandler) {
      this.container.removeEventListener('click', this.clickHandler);
    }
  }
}