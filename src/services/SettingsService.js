import { productTypes, defaultSettings } from '../data/products.js';
import { paperStocks, CLICK_COST } from '../data/paperStocks.js';

export class SettingsService {
  constructor() {
    this.eventTarget = new EventTarget();
    this.storageKey = 'instant-quote-settings';
    this.settings = this.loadSettings();
  }

  /**
   * Load settings from localStorage or return defaults
   * @returns {Object} Settings object
   */
  loadSettings() {
    try {
      const storedSettings = localStorage.getItem(this.storageKey);
      if (storedSettings) {
        const parsedSettings = JSON.parse(storedSettings);
        // Merge with defaults to ensure all keys are present
        return { ...this.getDefaultSettings(), ...parsedSettings };
      }
    } catch (error) {
      console.warn('Failed to load settings from localStorage:', error);
    }
    return this.getDefaultSettings();
  }

  /**
   * Save settings to localStorage
   */
  saveSettings() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.settings));
    } catch (error) {
      console.warn('Failed to save settings to localStorage:', error);
    }
  }

  /**
   * Get default settings from current hardcoded values
   * @returns {Object} Default settings object
   */
  getDefaultSettings() {
    // Extract setup fees from products
    const setupFees = {};
    Object.keys(productTypes).forEach(key => {
      setupFees[key] = productTypes[key].pricing.setupFee;
    });

    // Extract production rates and volume exponents
    const productionRates = {};
    const volumeExponents = {};
    Object.keys(productTypes).forEach(key => {
      productionRates[key] = productTypes[key].pricing.overhead.k;
      volumeExponents[key] = productTypes[key].pricing.overhead.e;
    });

    // Extract finishing costs
    const finishingCosts = {};
    Object.keys(productTypes).forEach(productKey => {
      const product = productTypes[productKey];
      if (product.finishingOptions && product.finishingOptions.length > 0) {
        product.finishingOptions.forEach(option => {
          const key = option.name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
          finishingCosts[key] = option.cost;
        });
      }
    });

    // Extract paper costs
    const paperCosts = {};
    Object.keys(paperStocks).forEach(key => {
      paperCosts[key] = paperStocks[key].costPerSheet;
    });

    return {
      setupFees,
      productionRates,
      volumeExponents,
      finishingCosts,
      paperCosts,
      clickCost: CLICK_COST,
      minimumOrder: defaultSettings.minimumOrder,
      rushOrderMultiplier: defaultSettings.rushOrderMultiplier
    };
  }

  /**
   * Get current settings
   * @returns {Object} Current settings object
   */
  getSettings() {
    return { ...this.settings };
  }

  /**
   * Get a specific setting value
   * @param {string} key - Setting key (e.g., 'minimumOrder', 'clickCost')
   * @param {string} subKey - Sub-key for nested settings (e.g., 'brochures' for setupFees)
   * @returns {*} Setting value
   */
  getSetting(key, subKey = null) {
    if (subKey) {
      return this.settings[key] && this.settings[key][subKey];
    }
    return this.settings[key];
  }

  /**
   * Update a setting value
   * @param {string} key - Setting key
   * @param {*} value - New value
   * @param {string} subKey - Sub-key for nested settings
   */
  updateSetting(key, value, subKey = null) {
    if (subKey) {
      if (!this.settings[key]) {
        this.settings[key] = {};
      }
      this.settings[key][subKey] = value;
    } else {
      this.settings[key] = value;
    }
    
    // Save to localStorage
    this.saveSettings();
    
    this.dispatchEvent('settingsChanged', { key, value, subKey });
  }

  /**
   * Reset all settings to defaults
   */
  resetToDefaults() {
    this.settings = this.getDefaultSettings();
    
    // Save to localStorage
    this.saveSettings();
    
    this.dispatchEvent('settingsChanged', { reset: true });
  }

  /**
   * Add event listener for settings changes
   * @param {string} type - Event type
   * @param {Function} listener - Event listener function
   */
  addEventListener(type, listener) {
    this.eventTarget.addEventListener(type, listener);
  }

  /**
   * Remove event listener
   * @param {string} type - Event type
   * @param {Function} listener - Event listener function
   */
  removeEventListener(type, listener) {
    this.eventTarget.removeEventListener(type, listener);
  }

  /**
   * Dispatch event
   * @param {string} type - Event type
   * @param {*} detail - Event detail data
   */
  dispatchEvent(type, detail) {
    this.eventTarget.dispatchEvent(new CustomEvent(type, { detail }));
  }

  /**
   * Export settings to JSON
   * @returns {string} JSON string of current settings
   */
  exportSettings() {
    return JSON.stringify(this.settings, null, 2);
  }

  /**
   * Import settings from JSON
   * @param {string} jsonString - JSON string of settings
   * @returns {boolean} Success status
   */
  importSettings(jsonString) {
    try {
      const importedSettings = JSON.parse(jsonString);
      this.settings = { ...this.getDefaultSettings(), ...importedSettings };
      
      // Save to localStorage
      this.saveSettings();
      
      this.dispatchEvent('settingsChanged', { imported: true });
      return true;
    } catch (error) {
      console.error('Failed to import settings:', error);
      return false;
    }
  }
}