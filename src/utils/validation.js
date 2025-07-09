/**
 * Comprehensive input validation and sanitization utilities
 * 
 * Security Features:
 * - Input sanitization to prevent injection attacks
 * - Type validation and coercion
 * - Range validation for numerical inputs
 * - Rate limiting protection
 * - Safe JSON parsing
 */

export class ValidationService {
  constructor() {
    // Rate limiting tracking
    this.rateLimitMap = new Map();
    this.defaultRateLimit = 100; // requests per minute
    this.rateLimitWindow = 60000; // 1 minute in milliseconds
  }

  /**
   * Sanitize string input to prevent XSS and injection attacks
   * @param {string} input - Input string to sanitize
   * @param {Object} options - Sanitization options
   * @returns {string} Sanitized string
   */
  sanitizeString(input, options = {}) {
    if (typeof input !== 'string') {
      return '';
    }

    const {
      maxLength = 1000,
      allowHtml = false,
      allowLineBreaks = true
    } = options;

    // Trim and limit length
    let sanitized = input.trim().slice(0, maxLength);

    if (!allowHtml) {
      // Remove HTML tags and entities
      sanitized = sanitized
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<[^>]*>/g, '')
        .replace(/&(?:lt|gt|quot|amp|#x?\d+);/g, '');
    }

    if (!allowLineBreaks) {
      sanitized = sanitized.replace(/[\r\n]/g, ' ');
    }

    // Remove null bytes and control characters
    sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

    return sanitized;
  }

  /**
   * Validate and sanitize numerical input
   * @param {*} input - Input to validate as number
   * @param {Object} options - Validation options
   * @returns {Object} Validation result with value and errors
   */
  validateNumber(input, options = {}) {
    const {
      min = Number.NEGATIVE_INFINITY,
      max = Number.POSITIVE_INFINITY,
      allowFloat = true,
      required = false
    } = options;

    const result = {
      isValid: false,
      value: null,
      errors: []
    };

    // Handle null/undefined
    if (input == null) {
      if (required) {
        result.errors.push('Value is required');
      } else {
        result.isValid = true;
        result.value = null;
      }
      return result;
    }

    // Convert to number
    const num = Number(input);

    // Check if valid number
    if (isNaN(num) || !isFinite(num)) {
      result.errors.push('Must be a valid number');
      return result;
    }

    // Check if integer required
    if (!allowFloat && !Number.isInteger(num)) {
      result.errors.push('Must be a whole number');
      return result;
    }

    // Check range
    if (num < min) {
      result.errors.push(`Must be at least ${min}`);
      return result;
    }

    if (num > max) {
      result.errors.push(`Must be no more than ${max}`);
      return result;
    }

    result.isValid = true;
    result.value = num;
    return result;
  }

  /**
   * Validate pricing parameters with business logic constraints
   * @param {string} key - Parameter key
   * @param {*} value - Parameter value
   * @param {string} subKey - Sub-parameter key
   * @returns {Object} Validation result
   */
  validatePricingParameter(key, value, subKey = null) {
    const result = {
      isValid: false,
      value: null,
      errors: []
    };

    try {
      switch (key) {
        case 'setupFees':
          const setupValidation = this.validateNumber(value, {
            min: 0,
            max: 1000,
            allowFloat: true,
            required: true
          });
          if (!setupValidation.isValid) {
            result.errors = setupValidation.errors;
            return result;
          }
          result.value = Math.round(setupValidation.value * 100) / 100; // Round to 2 decimals
          break;

        case 'productionRates':
          const rateValidation = this.validateNumber(value, {
            min: 0.01,
            max: 100,
            allowFloat: true,
            required: true
          });
          if (!rateValidation.isValid) {
            result.errors = rateValidation.errors;
            return result;
          }
          result.value = Math.round(rateValidation.value * 100) / 100;
          break;

        case 'volumeExponents':
          const exponentValidation = this.validateNumber(value, {
            min: 0.1,
            max: 1.5,
            allowFloat: true,
            required: true
          });
          if (!exponentValidation.isValid) {
            result.errors = exponentValidation.errors;
            return result;
          }
          result.value = Math.round(exponentValidation.value * 1000) / 1000; // Round to 3 decimals
          break;

        case 'finishingCosts':
          const finishingValidation = this.validateNumber(value, {
            min: 0,
            max: 50,
            allowFloat: true,
            required: true
          });
          if (!finishingValidation.isValid) {
            result.errors = finishingValidation.errors;
            return result;
          }
          result.value = Math.round(finishingValidation.value * 100) / 100;
          break;

        case 'paperCosts':
          const paperValidation = this.validateNumber(value, {
            min: 0,
            max: 10,
            allowFloat: true,
            required: true
          });
          if (!paperValidation.isValid) {
            result.errors = paperValidation.errors;
            return result;
          }
          result.value = Math.round(paperValidation.value * 100) / 100;
          break;

        case 'clickCost':
          const clickValidation = this.validateNumber(value, {
            min: 0,
            max: 5,
            allowFloat: true,
            required: true
          });
          if (!clickValidation.isValid) {
            result.errors = clickValidation.errors;
            return result;
          }
          result.value = Math.round(clickValidation.value * 100) / 100;
          break;

        case 'minimumOrder':
          const minOrderValidation = this.validateNumber(value, {
            min: 0,
            max: 100,
            allowFloat: true,
            required: true
          });
          if (!minOrderValidation.isValid) {
            result.errors = minOrderValidation.errors;
            return result;
          }
          result.value = Math.round(minOrderValidation.value * 100) / 100;
          break;

        case 'rushOrderMultiplier':
          const rushValidation = this.validateNumber(value, {
            min: 1,
            max: 5,
            allowFloat: true,
            required: true
          });
          if (!rushValidation.isValid) {
            result.errors = rushValidation.errors;
            return result;
          }
          result.value = Math.round(rushValidation.value * 100) / 100;
          break;

        default:
          result.errors.push(`Unknown parameter: ${key}`);
          return result;
      }

      result.isValid = true;
      return result;

    } catch (error) {
      result.errors.push('Validation error occurred');
      return result;
    }
  }

  /**
   * Safe JSON parsing with error handling
   * @param {string} jsonString - JSON string to parse
   * @param {*} fallback - Fallback value if parsing fails
   * @returns {*} Parsed object or fallback
   */
  safeJsonParse(jsonString, fallback = null) {
    try {
      if (typeof jsonString !== 'string') {
        return fallback;
      }

      // Basic safety check for suspicious content
      if (jsonString.includes('function') || jsonString.includes('eval') || jsonString.includes('script')) {
        console.warn('Potentially unsafe JSON content detected');
        return fallback;
      }

      return JSON.parse(jsonString);
    } catch (error) {
      console.warn('JSON parsing failed:', error);
      return fallback;
    }
  }

  /**
   * Check rate limiting for an identifier
   * @param {string} identifier - Unique identifier for rate limiting
   * @param {number} limit - Request limit per window
   * @param {number} windowMs - Time window in milliseconds
   * @returns {boolean} True if within rate limit
   */
  checkRateLimit(identifier, limit = this.defaultRateLimit, windowMs = this.rateLimitWindow) {
    const now = Date.now();
    const windowStart = now - windowMs;

    if (!this.rateLimitMap.has(identifier)) {
      this.rateLimitMap.set(identifier, []);
    }

    const requests = this.rateLimitMap.get(identifier);

    // Remove old requests outside the window
    const validRequests = requests.filter(timestamp => timestamp > windowStart);
    this.rateLimitMap.set(identifier, validRequests);

    // Check if under limit
    if (validRequests.length >= limit) {
      return false;
    }

    // Add current request
    validRequests.push(now);
    this.rateLimitMap.set(identifier, validRequests);

    return true;
  }

  /**
   * Validate settings object structure
   * @param {Object} settings - Settings object to validate
   * @returns {Object} Validation result
   */
  validateSettingsStructure(settings) {
    const result = {
      isValid: true,
      sanitizedSettings: {},
      errors: []
    };

    if (!settings || typeof settings !== 'object') {
      result.isValid = false;
      result.errors.push('Settings must be an object');
      return result;
    }

    const requiredKeys = [
      'setupFees', 'productionRates', 'volumeExponents', 
      'finishingCosts', 'paperCosts', 'clickCost', 
      'minimumOrder', 'rushOrderMultiplier'
    ];

    for (const key of requiredKeys) {
      if (!(key in settings)) {
        result.errors.push(`Missing required setting: ${key}`);
        result.isValid = false;
      }
    }

    // Validate and sanitize each setting
    for (const [key, value] of Object.entries(settings)) {
      if (typeof value === 'object' && value !== null) {
        // Handle nested objects (setupFees, productionRates, etc.)
        result.sanitizedSettings[key] = {};
        for (const [subKey, subValue] of Object.entries(value)) {
          const validation = this.validatePricingParameter(key, subValue, subKey);
          if (validation.isValid) {
            result.sanitizedSettings[key][subKey] = validation.value;
          } else {
            result.errors.push(`${key}.${subKey}: ${validation.errors.join(', ')}`);
            result.isValid = false;
          }
        }
      } else {
        // Handle simple values
        const validation = this.validatePricingParameter(key, value);
        if (validation.isValid) {
          result.sanitizedSettings[key] = validation.value;
        } else {
          result.errors.push(`${key}: ${validation.errors.join(', ')}`);
          result.isValid = false;
        }
      }
    }

    return result;
  }

  /**
   * Clean up old rate limit entries
   */
  cleanupRateLimitMap() {
    const now = Date.now();
    for (const [identifier, requests] of this.rateLimitMap.entries()) {
      const validRequests = requests.filter(timestamp => timestamp > now - this.rateLimitWindow);
      if (validRequests.length === 0) {
        this.rateLimitMap.delete(identifier);
      } else {
        this.rateLimitMap.set(identifier, validRequests);
      }
    }
  }
}

// Export singleton instance
export const validationService = new ValidationService();

// Utility functions for common validations
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const sanitizeFilename = (filename) => {
  return filename.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 255);
};