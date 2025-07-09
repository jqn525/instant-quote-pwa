import { defaultSettings } from '../data/products.js';
import { CLICK_COST } from '../data/paperStocks.js';
import { CACHE_CONFIG, PRICING_CONSTANTS, ERROR_TYPES } from '../utils/constants.js';
import { formatNumber, formatCurrency, memoize } from '../utils/helpers.js';
import { errorHandler } from '../utils/errorHandler.js';
import { ExternalPricingEngine } from './ExternalPricingEngine.js';

export class PricingEngine {
  constructor(settingsService = null) {
    this.settingsService = settingsService;
    this.settings = defaultSettings;
    
    // Initialize external pricing engine for interpolation-based products
    this.externalPricingEngine = new ExternalPricingEngine();
    
    // Pricing calculation cache for performance
    this.pricingCache = new Map();
    this.cacheMaxSize = CACHE_CONFIG.pricingCache.maxSize;
    
    // Memoization cache for expensive Math.pow operations
    this.mathPowCache = new Map();
    this.mathPowCacheMaxSize = CACHE_CONFIG.mathCache.maxSize;
    
    // Listen to settings changes to clear cache
    if (this.settingsService && this.settingsService.addEventListener) {
      this.settingsService.addEventListener('settingsChanged', () => {
        this.clearCache();
      });
    }
    
    // Authoritative imposition lookup table based on standard sizes
    this.impositionLookup = {
      '3.5x2': 21, '3.5"x2"': 21,
      '3x4': 12, '3"x4"': 12,
      '2x6': 10, '2"x6"': 10,
      '2x8': 10, '2"x8"': 10,
      '2x7': 10, '2"x7"': 10,
      '4x6': 8, '4"x6"': 8,
      '5x7': 4, '5"x7"': 4,
      '5.5x8.5': 4, '5.5"x8.5"': 4,
      '6x9': 2, '6"x9"': 2,
      '8.5x11': 2, '8.5"x11"': 2,
      '8.5x14': 1, '8.5"x14"': 1,
      '11x17': 1, '11"x17"': 1,
      '12x18': 1, '12"x18"': 1
    };
  }

  /**
   * Get empty pricing result for error cases
   * @returns {Object} Empty pricing result
   */
  getEmptyPricingResult() {
    return {
      setupFee: 0,
      unitPrice: 0,
      subtotal: 0,
      tax: 0,
      total: 0,
      breakdown: {
        setupFee: 0,
        productionCost: 0,
        materialsCost: 0,
        finishingCost: 0,
        optionModifiers: [],
        finishingOptions: [],
        variableCostPerPiece: 0,
        minimumApplied: false
      }
    };
  }

  /**
   * Generate cache key for pricing calculations
   * @param {Object} product - Product object
   * @param {Object} size - Size object  
   * @param {Array} options - Options array
   * @param {number} quantity - Quantity
   * @param {Object} paper - Paper object
   * @returns {string} Cache key
   */
  generateCacheKey(product, size, options, quantity, paper) {
    const productKey = product?.name || 'unknown';
    const sizeKey = size?.name || 'unknown';
    const optionsKey = options?.map(opt => opt.key || opt.name).sort().join(',') || 'none';
    const paperKey = paper?.id || 'default';
    const settingsHash = this.getSettingsHash();
    
    return `${productKey}:${sizeKey}:${optionsKey}:${quantity}:${paperKey}:${settingsHash}`;
  }

  /**
   * Generate hash of current settings to invalidate cache when settings change
   * @returns {string} Settings hash
   */
  getSettingsHash() {
    const settings = this.getEffectiveSettings();
    // Create a simple hash of key settings that affect pricing
    const keyData = `${settings.minimumOrder}:${JSON.stringify(settings.setupFees)}:${JSON.stringify(settings.volumeExponents)}`;
    return keyData.replace(/[^a-zA-Z0-9]/g, '').substring(0, 10);
  }

  /**
   * Get cached pricing result or null if not cached
   * @param {string} cacheKey - Cache key
   * @returns {Object|null} Cached result or null
   */
  getCachedPrice(cacheKey) {
    return this.pricingCache.get(cacheKey) || null;
  }

  /**
   * Cache pricing result with size limit management
   * @param {string} cacheKey - Cache key
   * @param {Object} result - Pricing result to cache
   */
  setCachedPrice(cacheKey, result) {
    // Implement LRU-like behavior by clearing oldest entries when cache is full
    if (this.pricingCache.size >= this.cacheMaxSize) {
      const firstKey = this.pricingCache.keys().next().value;
      this.pricingCache.delete(firstKey);
    }
    this.pricingCache.set(cacheKey, result);
  }

  /**
   * Clear pricing cache (useful when settings change)
   */
  clearCache() {
    this.pricingCache.clear();
    this.mathPowCache.clear();
    // Clear external pricing engine cache as well
    if (this.externalPricingEngine) {
      this.externalPricingEngine.clearCache();
    }
  }

  /**
   * Memoized Math.pow for performance optimization
   * @param {number} base - Base number
   * @param {number} exponent - Exponent
   * @returns {number} Result of base^exponent
   */
  memoizedPow(base, exponent) {
    const key = `${base}^${exponent}`;
    
    if (this.mathPowCache.has(key)) {
      return this.mathPowCache.get(key);
    }
    
    const result = Math.pow(base, exponent);
    
    // Implement LRU-like behavior for math cache
    if (this.mathPowCache.size >= this.mathPowCacheMaxSize) {
      const firstKey = this.mathPowCache.keys().next().value;
      this.mathPowCache.delete(firstKey);
    }
    
    this.mathPowCache.set(key, result);
    return result;
  }

  /**
   * Get current effective settings (from settingsService or fallback to defaults)
   * @returns {Object} Current settings object
   */
  getEffectiveSettings() {
    if (this.settingsService) {
      return this.settingsService.getSettings();
    }
    return this.settings;
  }

  /**
   * Update settings if using settingsService
   * @param {Object} newSettings - New settings object
   */
  updateSettings(newSettings) {
    if (this.settingsService) {
      // Settings are managed by settingsService
      return;
    }
    // Fallback: update local settings
    this.settings = { ...this.settings, ...newSettings };
    
    // Clear cache when settings change
    this.clearCache();
  }

  /**
   * Get imposition value with authoritative fallback lookup
   * @param {Object} size - Size object that may contain imposition
   * @returns {number} Imposition value
   */
  getImposition(size) {
    // First try to get imposition from size object
    if (size && size.imposition && size.imposition > 0) {
      return size.imposition;
    }
    
    // Fallback to authoritative lookup table
    if (size && size.name) {
      const sizeName = size.name.toLowerCase().replace(/\s+/g, '');
      const lookupKey = Object.keys(this.impositionLookup).find(key => 
        key.toLowerCase().replace(/\s+/g, '') === sizeName
      );
      if (lookupKey) {
        return this.impositionLookup[lookupKey];
      }
    }
    
    // Final fallback - assume 2-up for medium sizes
    return 2;
  }

  /**
   * Calculate pricing using C(Q) = S + Q^e × k + Q × v formula
   * @param {Object} pricing - Object with setupFee, overhead {k, e}, and variableCost
   * @param {number} quantity - Quantity to calculate for
   * @returns {Object} Pure formula components breakdown
   */
  calculateJobCost(pricing, quantity) {
    if (!pricing || quantity <= 0) {
      return {
        setupFee: 0,
        productionCost: 0,
        materialsCost: 0,
        totalCost: 0
      };
    }
    
    const { setupFee, overhead, variableCost } = pricing;
    
    // Calculate production scaling: Q^e × k (using memoized pow for performance)
    // Add safety check for overhead
    if (!overhead || typeof overhead.e !== 'number' || typeof overhead.k !== 'number') {
      console.warn('Invalid overhead data in pricing calculation', { overhead, pricing });
      return {
        setupFee: setupFee || 0,
        productionCost: 0,
        materialsCost: variableCost ? quantity * variableCost : 0,
        totalCost: (setupFee || 0) + (variableCost ? quantity * variableCost : 0)
      };
    }
    
    const productionCost = this.memoizedPow(quantity, overhead.e) * overhead.k;
    
    // Calculate variable materials: Q × v
    const materialsCost = quantity * variableCost;
    
    // Calculate total cost: S + Q^e × k + Q × v
    const totalCost = setupFee + productionCost + materialsCost;
    
    return {
      setupFee: setupFee,
      productionCost: productionCost,
      materialsCost: materialsCost,
      totalCost: totalCost
    };
  }

  /**
   * Apply only option multipliers (no size modifiers since k is fixed)
   * @param {Object} jobCost - Job cost breakdown from calculateJobCost
   * @param {Array} options - Array of selected options with multipliers
   * @param {number} quantity - Quantity for calculations
   * @returns {Object} Job cost with option multipliers applied
   */
  applyOptionMultipliers(jobCost, options = [], quantity) {
    // Only apply option modifiers to material costs, not setup or production costs
    let optionModifier = 1;
    
    if (options && options.length > 0) {
      optionModifier = options.reduce((acc, option) => {
        // Only apply modifier if it's not a finishing option (which has cost property)
        if (option.modifier && !option.cost) {
          return acc * option.modifier;
        }
        return acc;
      }, 1);
    }
    
    // Apply modifier only to materials cost, preserve setup and production costs
    const modifiedMaterialsCost = jobCost.materialsCost * optionModifier;
    const modifiedTotalCost = jobCost.setupFee + jobCost.productionCost + modifiedMaterialsCost;
    
    return {
      setupFee: jobCost.setupFee,
      productionCost: jobCost.productionCost,
      materialsCost: modifiedMaterialsCost,
      totalCost: modifiedTotalCost,
      optionModifier: optionModifier
    };
  }

  /**
   * Calculate complete pricing breakdown using C(Q) = S + Q^e × k + Q × v + Ff
   * @param {Object} product - Product type object
   * @param {Object} size - Selected size
   * @param {Array} options - Selected options (includes finishing options)
   * @param {number} quantity - Quantity
   * @param {Object} paper - Selected paper (optional)
   * @returns {Object} Complete pricing breakdown
   */
  async calculatePrice(product, size, options, quantity, paper = null) {
    try {
      // Input validation with detailed error context
      if (!product || !product.pricing) {
        errorHandler.handleError({
          type: ERROR_TYPES.VALIDATION,
          message: 'Invalid product provided to calculatePrice',
          context: { product: product?.name || 'undefined' }
        }, { component: 'PricingEngine', severity: 'warning', suppressNotification: true });
        
        return this.getEmptyPricingResult();
      }

      if (!quantity || quantity <= 0) {
        errorHandler.handleError({
          type: ERROR_TYPES.VALIDATION,
          message: 'Invalid quantity provided to calculatePrice',
          context: { quantity, product: product.name }
        }, { component: 'PricingEngine', severity: 'warning', suppressNotification: true });
        
        return this.getEmptyPricingResult();
      }

      // Route external products to external pricing engine
      if (product.isExternal || product.pricing.type === 'interpolation') {
        // Map size name to size key for external products
        let sizeKey = size?.key || size?.name;
        // Convert format like '2" x 2"' to '2X2'
        if (sizeKey && sizeKey.includes('"')) {
          sizeKey = sizeKey.replace(/"/g, '').replace(/\s*[x×]\s*/i, 'X');
        }
        return this.externalPricingEngine.calculatePrice(product, sizeKey, quantity);
      }

    // Check cache first for performance
    const cacheKey = this.generateCacheKey(product, size, options, quantity, paper);
    const cachedResult = this.getCachedPrice(cacheKey);
    if (cachedResult) {
      return cachedResult;
    }

    // Get effective settings (either from settingsService or defaults)
    const currentSettings = this.getEffectiveSettings();
    
    // Use product defaults but override with settings if available
    let effectivePricing = { ...product.pricing };
    
    // Override with settings if available
    if (currentSettings.setupFees && currentSettings.setupFees[product.key]) {
      effectivePricing.setupFee = currentSettings.setupFees[product.key];
    }
    if (currentSettings.productionRates && currentSettings.productionRates[product.key] && effectivePricing.overhead) {
      effectivePricing.overhead.k = currentSettings.productionRates[product.key];
    }
    if (currentSettings.volumeExponents && currentSettings.volumeExponents[product.key] && effectivePricing.overhead) {
      effectivePricing.overhead.e = currentSettings.volumeExponents[product.key];
    }
    
    // Calculate variable cost based on paper + clicks with 50% markup
    const imposition = this.getImposition(size);
    
    // Get effective click cost from settings
    const effectiveClickCost = currentSettings.clickCost || CLICK_COST;
    
    if (paper && size && imposition > 0) {
      // Use paper cost from settings if available, otherwise use paper.costPerSheet
      const paperCost = (currentSettings.paperCosts && currentSettings.paperCosts[paper.id]) 
        ? currentSettings.paperCosts[paper.id] 
        : paper.costPerSheet;
      
      // Calculate v = (paper cost + clicks) × 1.5 / imposition
      const paperPlusClicks = paperCost + effectiveClickCost;
      effectivePricing.variableCost = (paperPlusClicks * 1.5) / imposition;
    } else {
      // Fallback: use default paper cost when no paper selected
      const defaultPaperCost = 0.10; // Fallback paper cost per sheet
      effectivePricing.variableCost = (defaultPaperCost + effectiveClickCost) * 1.5 / imposition;
    }
    
    // Calculate base job cost using C(Q) formula
    const baseJobCost = this.calculateJobCost(effectivePricing, quantity);
    
    // Apply option multipliers (excluding finishing options)
    const modifiedCost = this.applyOptionMultipliers(baseJobCost, options, quantity);
    
    // Calculate finishing options cost (Ff = per-piece finishing cost × quantity)
    const finishingCost = options ? options.reduce((acc, option) => {
      if (option.cost) {
        // Use finishing cost from settings if available
        const finishingKey = option.name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
        const effectiveCost = (currentSettings.finishingCosts && currentSettings.finishingCosts[finishingKey]) 
          ? currentSettings.finishingCosts[finishingKey] 
          : option.cost;
        return acc + effectiveCost * quantity;
      }
      return acc;
    }, 0) : 0;
    
    // Calculate total using pure C(Q) = S + Q^e × k + Q × v + Ff formula
    const setupFee = modifiedCost.setupFee;
    const productionCost = modifiedCost.productionCost;
    const materialsCost = modifiedCost.materialsCost;
    const subtotal = setupFee + productionCost + materialsCost + finishingCost;
    const total = subtotal; // No tax for internal cost centers
    
    // Calculate unit price for display (excluding setup and finishing)
    const unitPrice = quantity > 0 ? (productionCost + materialsCost) / quantity : 0;

    // Apply minimum order (preserve formula structure)
    const effectiveMinimumOrder = currentSettings.minimumOrder || this.settings.minimumOrder;
    const minimumApplied = total < effectiveMinimumOrder;
    const finalTotal = Math.max(total, effectiveMinimumOrder);
    
    const result = {
      setupFee: Math.round(setupFee * 100) / 100,
      unitPrice: Math.round(unitPrice * 100) / 100,
      subtotal: Math.round(subtotal * 100) / 100,
      tax: 0, // No tax for internal cost centers
      total: Math.round(finalTotal * 100) / 100,
      breakdown: {
        setupFee: Math.round(setupFee * 100) / 100,
        productionCost: Math.round(productionCost * 100) / 100,
        materialsCost: Math.round(materialsCost * 100) / 100,
        finishingCost: Math.round(finishingCost * 100) / 100,
        optionModifiers: options.filter(opt => opt.modifier && !opt.cost).map(opt => ({
          name: opt.name,
          modifier: opt.modifier
        })),
        finishingOptions: options.filter(opt => opt.cost).map(opt => ({
          name: opt.name,
          cost: opt.cost
        })),
        variableCostPerPiece: Math.round(effectivePricing.variableCost * 100) / 100,
        minimumApplied: minimumApplied
      }
    };

      // Cache the result for performance
      this.setCachedPrice(cacheKey, result);
      
      return result;

    } catch (error) {
      // Handle calculation errors gracefully
      errorHandler.handleError({
        type: ERROR_TYPES.CALCULATION,
        message: `Pricing calculation failed: ${error.message}`,
        stack: error.stack,
        context: {
          product: product?.name,
          size: size?.name,
          quantity,
          paperType: paper?.type
        }
      }, {
        component: 'PricingEngine',
        severity: 'error',
        userMessage: 'Price calculation failed. Please try again or contact support.',
        recoveryAction: () => {
          // Return safe default pricing
          return this.getEmptyPricingResult();
        }
      });

      // Return safe default result
      return this.getEmptyPricingResult();
    }
  }

  /**
   * Format price for display
   * @param {number} price - Price to format
   * @returns {string} Formatted price string
   */
  formatPrice(price) {
    try {
      return formatCurrency(price);
    } catch (error) {
      errorHandler.handleError({
        type: ERROR_TYPES.COMPONENT,
        message: 'Price formatting failed',
        context: { price }
      }, { component: 'PricingEngine', severity: 'warning', suppressNotification: true });
      
      return '$0.00';
    }
  }

  /**
   * Calculate rush order pricing
   * @param {Object} pricing - Standard pricing object
   * @returns {Object} Rush order pricing
   */
  calculateRushOrder(pricing) {
    const currentSettings = this.getEffectiveSettings();
    const rushMultiplier = currentSettings.rushOrderMultiplier || this.settings.rushOrderMultiplier;
    
    return {
      unitPrice: Math.round(pricing.unitPrice * rushMultiplier * 100) / 100,
      subtotal: Math.round(pricing.subtotal * rushMultiplier * 100) / 100,
      tax: Math.round(pricing.subtotal * rushMultiplier * this.settings.taxRate * 100) / 100,
      total: Math.round(pricing.subtotal * rushMultiplier * (1 + this.settings.taxRate) * 100) / 100,
      breakdown: {
        ...pricing.breakdown,
        rushOrder: true,
        rushMultiplier: rushMultiplier
      }
    };
  }
}