import { productTypes, defaultSettings } from '../data/products.js';
import { paperStocks, CLICK_COST } from '../data/paperStocks.js';
import { validationService } from '../utils/validation.js';

export class SettingsService {
  constructor() {
    this.eventTarget = new EventTarget();
    this.storageKey = 'instant-quote-settings';
    this.settings = this.loadSettings();
  }

  /**
   * Load settings from localStorage with validation and sanitization
   * @returns {Object} Settings object
   */
  loadSettings() {
    try {
      const storedSettings = localStorage.getItem(this.storageKey);
      if (storedSettings) {
        // Use safe JSON parsing to prevent injection attacks
        const parsedSettings = validationService.safeJsonParse(storedSettings, null);
        
        if (parsedSettings) {
          // Validate and sanitize the loaded settings
          const validation = validationService.validateSettingsStructure(parsedSettings);
          
          if (validation.isValid) {
            // Merge sanitized settings with defaults
            return { ...this.getDefaultSettings(), ...validation.sanitizedSettings };
          } else {
            console.warn('Invalid settings detected, using defaults:', validation.errors);
            // Clear corrupted settings
            localStorage.removeItem(this.storageKey);
          }
        }
      }
    } catch (error) {
      console.warn('Failed to load settings from localStorage:', error);
      // Clear potentially corrupted settings
      localStorage.removeItem(this.storageKey);
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
    // Extract setup fees from products (only for standard products)
    const setupFees = {};
    Object.keys(productTypes).forEach(key => {
      const product = productTypes[key];
      
      // Skip external products that don't have setup fees
      if (product.isExternal || product.pricing.type === 'interpolation') {
        return;
      }
      
      // Add safety check for setup fee
      if (product.pricing && typeof product.pricing.setupFee === 'number') {
        setupFees[key] = product.pricing.setupFee;
      } else {
        console.warn(`Product ${key} missing setup fee`);
      }
    });

    // Extract production rates and volume exponents (only for standard products)
    const productionRates = {};
    const volumeExponents = {};
    Object.keys(productTypes).forEach(key => {
      const product = productTypes[key];
      
      // Skip external products that don't have overhead pricing structure
      if (product.isExternal || product.pricing.type === 'interpolation') {
        return;
      }
      
      // Add safety checks for overhead property
      if (product.pricing && product.pricing.overhead) {
        productionRates[key] = product.pricing.overhead.k;
        volumeExponents[key] = product.pricing.overhead.e;
      } else {
        console.warn(`Product ${key} missing overhead pricing structure`);
      }
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
   * Update a setting value with validation and rate limiting
   * @param {string} key - Setting key
   * @param {*} value - New value
   * @param {string} subKey - Sub-key for nested settings
   * @returns {Object} Update result with success status and errors
   */
  updateSetting(key, value, subKey = null) {
    const result = {
      success: false,
      errors: []
    };

    try {
      // Check rate limiting to prevent rapid API abuse
      const rateLimitKey = `settings_update_${key}_${subKey || 'root'}`;
      if (!validationService.checkRateLimit(rateLimitKey, 50, 60000)) {
        result.errors.push('Too many updates. Please wait before making more changes.');
        return result;
      }

      // Validate the setting value
      const validation = validationService.validatePricingParameter(key, value, subKey);
      if (!validation.isValid) {
        result.errors = validation.errors;
        return result;
      }

      // Update the setting with validated/sanitized value
      if (subKey) {
        if (!this.settings[key]) {
          this.settings[key] = {};
        }
        this.settings[key][subKey] = validation.value;
      } else {
        this.settings[key] = validation.value;
      }
      
      // Save to localStorage
      this.saveSettings();
      
      // DEBUG: Log settings change
      console.log('⚙️ SettingsService: Setting changed', {
        key,
        value: validation.value,
        subKey,
        newSettings: this.settings,
        timestamp: new Date().toISOString()
      });
      
      // Dispatch change event
      this.dispatchEvent('settingsChanged', { 
        key, 
        value: validation.value, 
        subKey 
      });

      result.success = true;
      return result;

    } catch (error) {
      console.error('Error updating setting:', error);
      result.errors.push('An error occurred while updating the setting');
      return result;
    }
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