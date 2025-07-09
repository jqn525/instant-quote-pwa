/**
 * External Pricing Engine for interpolation-based pricing
 * Handles supplier cost matrices with linear interpolation and markup
 */

export class ExternalPricingEngine {
  constructor() {
    this.cache = new Map();
    this.cacheMaxSize = 100;
  }

  /**
   * Calculate price using linear interpolation between supplier cost brackets
   * @param {Object} pricingData - Product pricing configuration
   * @param {string} size - Selected size (e.g., '2X2', '3X3')
   * @param {number} quantity - Desired quantity
   * @returns {Object} Pricing result with breakdown
   */
  calculatePrice(pricingData, size, quantity) {
    try {
      // Input validation
      if (!pricingData || !size || !quantity) {
        return this.getEmptyPricingResult();
      }

      // Check cache first
      const cacheKey = `${pricingData.key || 'unknown'}:${size}:${quantity}`;
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey);
      }

      // Get size-specific pricing data
      const sizeData = pricingData.pricing.supplierCosts[size];
      if (!sizeData) {
        console.warn(`No pricing data found for size: ${size}`);
        return this.getEmptyPricingResult();
      }

      // Validate quantity constraints
      const validatedQuantity = this.validateQuantity(
        quantity,
        pricingData.pricing.minQuantity,
        pricingData.pricing.quantityIncrement
      );

      // Calculate supplier cost using interpolation
      const supplierCost = this.getSupplierCost(
        sizeData.brackets,
        sizeData.costs,
        validatedQuantity
      );

      // Apply markup
      const markup = pricingData.pricing.markup || 1.25;
      const customerPrice = supplierCost * markup;

      // Calculate unit price
      const unitPrice = customerPrice / validatedQuantity;

      const result = {
        setupFee: 0, // External products have no setup fee
        unitPrice: Math.round(unitPrice * 100) / 100,
        subtotal: Math.round(customerPrice * 100) / 100,
        tax: 0, // No tax for internal cost centers
        total: Math.round(customerPrice * 100) / 100,
        breakdown: {
          supplierCost: Math.round(supplierCost * 100) / 100,
          markup: markup,
          customerPrice: Math.round(customerPrice * 100) / 100,
          validatedQuantity: validatedQuantity,
          originalQuantity: quantity,
          quantityAdjusted: quantity !== validatedQuantity,
          minimumApplied: validatedQuantity === pricingData.pricing.minQuantity && quantity < pricingData.pricing.minQuantity
        }
      };

      // Cache the result
      this.setCachedPrice(cacheKey, result);

      return result;

    } catch (error) {
      console.error('External pricing calculation failed:', error);
      return this.getEmptyPricingResult();
    }
  }

  /**
   * Validate quantity against minimum order and increment requirements
   * @param {number} quantity - Desired quantity
   * @param {number} minQuantity - Minimum order quantity
   * @param {number} increment - Required increment (e.g., 5 for magnets)
   * @returns {number} Validated quantity
   */
  validateQuantity(quantity, minQuantity = 25, increment = 5) {
    // Ensure minimum quantity
    if (quantity < minQuantity) {
      return minQuantity;
    }

    // Round to nearest valid increment
    const remainder = quantity % increment;
    if (remainder === 0) {
      return quantity;
    }

    // Round up to next valid increment
    return quantity + (increment - remainder);
  }

  /**
   * Calculate supplier cost using linear interpolation
   * @param {Array} brackets - Quantity brackets [25, 50, 100, 250, 500, 1000]
   * @param {Array} costs - Corresponding costs for each bracket
   * @param {number} quantity - Desired quantity
   * @returns {number} Interpolated supplier cost
   */
  getSupplierCost(brackets, costs, quantity) {
    if (!brackets || !costs || brackets.length !== costs.length) {
      throw new Error('Invalid brackets or costs data');
    }

    // Handle exact bracket matches
    const exactIndex = brackets.findIndex(bracket => bracket === quantity);
    if (exactIndex !== -1) {
      return costs[exactIndex];
    }

    // Handle quantity below minimum bracket
    if (quantity <= brackets[0]) {
      return costs[0];
    }

    // Handle quantity above maximum bracket (extrapolation)
    if (quantity > brackets[brackets.length - 1]) {
      return this.extrapolateAbove1000(quantity, brackets, costs);
    }

    // Find surrounding brackets for interpolation
    for (let i = 0; i < brackets.length - 1; i++) {
      if (quantity > brackets[i] && quantity <= brackets[i + 1]) {
        const q1 = brackets[i];
        const q2 = brackets[i + 1];
        const c1 = costs[i];
        const c2 = costs[i + 1];

        // Linear interpolation: C(Q) = C1 + (Q - Q1) × (C2 - C1) / (Q2 - Q1)
        const interpolatedCost = c1 + (quantity - q1) * (c2 - c1) / (q2 - q1);
        return interpolatedCost;
      }
    }

    // Fallback to highest cost if no bracket found
    return costs[costs.length - 1];
  }

  /**
   * Extrapolate pricing for quantities above 1000
   * @param {number} quantity - Quantity above 1000
   * @param {Array} brackets - Quantity brackets
   * @param {Array} costs - Corresponding costs
   * @returns {number} Extrapolated cost
   */
  extrapolateAbove1000(quantity, brackets, costs) {
    const maxBracket = brackets[brackets.length - 1]; // 1000
    const maxCost = costs[costs.length - 1];
    
    // Calculate rate from last two brackets
    const secondLastBracket = brackets[brackets.length - 2]; // 500
    const secondLastCost = costs[costs.length - 2];
    
    const rate = (maxCost - secondLastCost) / (maxBracket - secondLastBracket);
    const extraUnits = quantity - maxBracket;
    
    return maxCost + (extraUnits * rate);
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
        supplierCost: 0,
        markup: 1.25,
        customerPrice: 0,
        validatedQuantity: 0,
        originalQuantity: 0,
        quantityAdjusted: false,
        minimumApplied: false
      }
    };
  }

  /**
   * Cache pricing result with size limit management
   * @param {string} cacheKey - Cache key
   * @param {Object} result - Pricing result to cache
   */
  setCachedPrice(cacheKey, result) {
    // Implement LRU-like behavior
    if (this.cache.size >= this.cacheMaxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(cacheKey, result);
  }

  /**
   * Clear pricing cache
   */
  clearCache() {
    this.cache.clear();
  }

  /**
   * Get valid quantity options for a product
   * @param {Object} pricingData - Product pricing configuration
   * @param {number} maxQuantity - Maximum quantity to generate (default: 1000)
   * @returns {Array} Array of valid quantity options
   */
  getValidQuantityOptions(pricingData, maxQuantity = 1000) {
    const options = [];
    const minQty = pricingData.pricing.minQuantity || 25;
    const increment = pricingData.pricing.quantityIncrement || 5;
    
    // Generate quantity options
    for (let qty = minQty; qty <= maxQuantity; qty += increment) {
      options.push(qty);
    }
    
    return options;
  }

  /**
   * Format price for display
   * @param {number} price - Price to format
   * @returns {string} Formatted price string
   */
  formatPrice(price) {
    if (typeof price !== 'number' || isNaN(price)) {
      return '$0.00';
    }
    
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD'
    }).format(price);
  }
}