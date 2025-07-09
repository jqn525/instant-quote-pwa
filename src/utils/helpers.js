/**
 * Utility functions and helper methods
 * 
 * This module provides common utility functions used throughout the application,
 * promoting code reuse and consistency.
 */

import { UI_CONSTANTS, VALIDATION_LIMITS, REGEX_PATTERNS } from './constants.js';

// =============================================================================
// FORMATTING UTILITIES
// =============================================================================

/**
 * Format currency values consistently
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD') => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '$0.00';
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Format numbers with proper rounding
 * @param {number} value - Number to format
 * @param {number} decimals - Number of decimal places
 * @returns {number} Formatted number
 */
export const formatNumber = (value, decimals = 2) => {
  if (typeof value !== 'number' || isNaN(value)) {
    return 0;
  }
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

/**
 * Format product names for display
 * @param {string} productKey - Product key (e.g., 'table_tents')
 * @returns {string} Formatted product name
 */
export const formatProductName = (productKey) => {
  if (!productKey || typeof productKey !== 'string') {
    return 'Unknown Product';
  }
  
  return productKey
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Format file sizes for display
 * @param {number} bytes - Size in bytes
 * @returns {string} Formatted size string
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// =============================================================================
// DOM UTILITIES
// =============================================================================

/**
 * Safely query DOM elements with error handling
 * @param {string} selector - CSS selector
 * @param {Element} parent - Parent element (default: document)
 * @returns {Element|null} Found element or null
 */
export const safeQuerySelector = (selector, parent = document) => {
  try {
    if (!selector || typeof selector !== 'string') {
      return null;
    }
    return parent.querySelector(selector);
  } catch (error) {
    console.warn('Invalid selector:', selector, error);
    return null;
  }
};

/**
 * Safely query multiple DOM elements
 * @param {string} selector - CSS selector
 * @param {Element} parent - Parent element (default: document)
 * @returns {Array} Array of found elements
 */
export const safeQuerySelectorAll = (selector, parent = document) => {
  try {
    if (!selector || typeof selector !== 'string') {
      return [];
    }
    return Array.from(parent.querySelectorAll(selector));
  } catch (error) {
    console.warn('Invalid selector:', selector, error);
    return [];
  }
};

/**
 * Add CSS class with error handling
 * @param {Element} element - Target element
 * @param {string} className - Class name to add
 */
export const safeAddClass = (element, className) => {
  if (element && element.classList && className) {
    element.classList.add(className);
  }
};

/**
 * Remove CSS class with error handling
 * @param {Element} element - Target element
 * @param {string} className - Class name to remove
 */
export const safeRemoveClass = (element, className) => {
  if (element && element.classList && className) {
    element.classList.remove(className);
  }
};

/**
 * Toggle CSS class with error handling
 * @param {Element} element - Target element
 * @param {string} className - Class name to toggle
 * @returns {boolean} Whether class is now present
 */
export const safeToggleClass = (element, className) => {
  if (element && element.classList && className) {
    return element.classList.toggle(className);
  }
  return false;
};

/**
 * Set element text content safely
 * @param {Element} element - Target element
 * @param {string} text - Text content to set
 */
export const safeSetTextContent = (element, text) => {
  if (element && typeof text === 'string') {
    element.textContent = text;
  }
};

// =============================================================================
// EVENT UTILITIES
// =============================================================================

/**
 * Debounce function calls
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay = UI_CONSTANTS.debounce.calculation) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

/**
 * Throttle function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, limit = 100) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Create a safe event listener that automatically removes itself on error
 * @param {Element} element - Target element
 * @param {string} event - Event name
 * @param {Function} handler - Event handler
 * @param {Object} options - Event listener options
 * @returns {Function} Cleanup function
 */
export const createSafeEventListener = (element, event, handler, options = {}) => {
  if (!element || !event || typeof handler !== 'function') {
    return () => {};
  }
  
  const safeHandler = (e) => {
    try {
      handler(e);
    } catch (error) {
      console.error('Event handler error:', error);
      // Optionally remove the problematic listener
      if (options.removeOnError) {
        element.removeEventListener(event, safeHandler);
      }
    }
  };
  
  element.addEventListener(event, safeHandler, options);
  
  // Return cleanup function
  return () => {
    element.removeEventListener(event, safeHandler);
  };
};

// =============================================================================
// DATA UTILITIES
// =============================================================================

/**
 * Deep clone an object safely
 * @param {any} obj - Object to clone
 * @returns {any} Cloned object
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item));
  }
  
  if (typeof obj === 'object') {
    const cloned = {};
    Object.keys(obj).forEach(key => {
      cloned[key] = deepClone(obj[key]);
    });
    return cloned;
  }
  
  return obj;
};

/**
 * Safely merge objects
 * @param {Object} target - Target object
 * @param {...Object} sources - Source objects
 * @returns {Object} Merged object
 */
export const safeMerge = (target = {}, ...sources) => {
  const result = deepClone(target);
  
  sources.forEach(source => {
    if (source && typeof source === 'object') {
      Object.keys(source).forEach(key => {
        if (source[key] !== undefined) {
          result[key] = deepClone(source[key]);
        }
      });
    }
  });
  
  return result;
};

/**
 * Check if object is empty
 * @param {any} obj - Object to check
 * @returns {boolean} Whether object is empty
 */
export const isEmpty = (obj) => {
  if (obj == null) return true;
  if (Array.isArray(obj) || typeof obj === 'string') return obj.length === 0;
  if (typeof obj === 'object') return Object.keys(obj).length === 0;
  return false;
};

/**
 * Get nested object property safely
 * @param {Object} obj - Object to query
 * @param {string} path - Property path (e.g., 'user.profile.name')
 * @param {any} defaultValue - Default value if not found
 * @returns {any} Property value or default
 */
export const getNestedProperty = (obj, path, defaultValue = null) => {
  if (!obj || !path) return defaultValue;
  
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current == null || typeof current !== 'object' || !(key in current)) {
      return defaultValue;
    }
    current = current[key];
  }
  
  return current;
};

// =============================================================================
// VALIDATION UTILITIES
// =============================================================================

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} Whether email is valid
 */
export const isValidEmail = (email) => {
  return typeof email === 'string' && REGEX_PATTERNS.email.test(email);
};

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean} Whether URL is valid
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Sanitize filename
 * @param {string} filename - Filename to sanitize
 * @returns {string} Sanitized filename
 */
export const sanitizeFilename = (filename) => {
  if (typeof filename !== 'string') return 'file';
  
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .slice(0, VALIDATION_LIMITS.maxFilenameLength);
};

/**
 * Check if value is within numeric range
 * @param {number} value - Value to check
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {boolean} Whether value is in range
 */
export const isInRange = (value, min, max) => {
  const num = Number(value);
  return !isNaN(num) && num >= min && num <= max;
};

// =============================================================================
// STORAGE UTILITIES
// =============================================================================

/**
 * Safely get item from localStorage
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default value if not found
 * @returns {any} Stored value or default
 */
export const getFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn('Failed to get from storage:', key, error);
    return defaultValue;
  }
};

/**
 * Safely set item in localStorage
 * @param {string} key - Storage key
 * @param {any} value - Value to store
 * @returns {boolean} Whether storage was successful
 */
export const setToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn('Failed to set to storage:', key, error);
    return false;
  }
};

/**
 * Safely remove item from localStorage
 * @param {string} key - Storage key
 * @returns {boolean} Whether removal was successful
 */
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn('Failed to remove from storage:', key, error);
    return false;
  }
};

/**
 * Clear all application storage
 * @param {Array<string>} keys - Keys to clear (optional, clears all if not provided)
 */
export const clearStorage = (keys = null) => {
  try {
    if (keys && Array.isArray(keys)) {
      keys.forEach(key => localStorage.removeItem(key));
    } else {
      // Clear all application-specific keys
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('instant-quote-')) {
          localStorage.removeItem(key);
        }
      });
    }
  } catch (error) {
    console.warn('Failed to clear storage:', error);
  }
};

// =============================================================================
// PERFORMANCE UTILITIES
// =============================================================================

/**
 * Measure function execution time
 * @param {Function} func - Function to measure
 * @param {string} label - Label for measurement
 * @returns {any} Function result
 */
export const measurePerformance = (func, label = 'operation') => {
  const start = performance.now();
  const result = func();
  const end = performance.now();
  
  console.log(`${label} took ${(end - start).toFixed(2)} milliseconds`);
  return result;
};

/**
 * Create a memoized version of a function
 * @param {Function} func - Function to memoize
 * @param {number} maxCacheSize - Maximum cache size
 * @returns {Function} Memoized function
 */
export const memoize = (func, maxCacheSize = 100) => {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = func.apply(this, args);
    
    // Implement LRU-like behavior
    if (cache.size >= maxCacheSize) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    
    cache.set(key, result);
    return result;
  };
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Generate unique ID
 * @param {string} prefix - ID prefix
 * @returns {string} Unique ID
 */
export const generateId = (prefix = 'id') => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Wait for specified time
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} Promise that resolves after delay
 */
export const wait = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Retry a function with exponential backoff
 * @param {Function} func - Function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} baseDelay - Base delay in milliseconds
 * @returns {Promise} Promise that resolves with function result
 */
export const retryWithBackoff = async (func, maxRetries = 3, baseDelay = 1000) => {
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await func();
    } catch (error) {
      if (i === maxRetries) throw error;
      
      const delay = baseDelay * Math.pow(2, i);
      await wait(delay);
    }
  }
};

/**
 * Check if code is running in development mode
 * @returns {boolean} Whether in development mode
 */
export const isDevelopment = () => {
  return import.meta.env?.DEV || process.env?.NODE_ENV === 'development';
};

/**
 * Log message only in development
 * @param {...any} args - Arguments to log
 */
export const devLog = (...args) => {
  if (isDevelopment()) {
    console.log(...args);
  }
};

/**
 * Create a cancelable promise
 * @param {Promise} promise - Promise to make cancelable
 * @returns {Object} Object with promise and cancel function
 */
export const makeCancelable = (promise) => {
  let isCanceled = false;
  
  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      value => isCanceled ? reject(new Error('Canceled')) : resolve(value),
      error => isCanceled ? reject(new Error('Canceled')) : reject(error)
    );
  });
  
  return {
    promise: wrappedPromise,
    cancel: () => { isCanceled = true; }
  };
};