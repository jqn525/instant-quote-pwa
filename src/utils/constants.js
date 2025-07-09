/**
 * Application-wide constants and configuration values
 * 
 * This file centralizes all magic numbers, configuration values, and constants
 * used throughout the application for better maintainability and consistency.
 */

// Pricing Formula Constants
export const PRICING_CONSTANTS = {
  // Default production rate per sheet (k in C(Q) = S + Q^e × k + Q × v + Ff)
  DEFAULT_PRODUCTION_RATE: 1.50,
  
  // Default volume scaling exponents (e in the formula)
  DEFAULT_VOLUME_EXPONENTS: {
    standard: 0.75,      // Most products
    tableTents: 0.85     // Table tents (reduced bulk discount due to labor)
  },
  
  // Default setup fees by product type
  DEFAULT_SETUP_FEES: {
    standard: 30.00,     // Most products
    tableTents: 75.00    // Table tents (higher due to complexity)
  },
  
  // Material cost multiplier (50% markup)
  MATERIAL_MARKUP: 1.5,
  
  // Default minimum order value
  DEFAULT_MINIMUM_ORDER: 5.00
};

// Validation Constants
export const VALIDATION_LIMITS = {
  // Pricing parameter ranges
  setupFees: { min: 0, max: 1000 },
  productionRates: { min: 0.01, max: 100 },
  volumeExponents: { min: 0.1, max: 1.5 },
  finishingCosts: { min: 0, max: 50 },
  paperCosts: { min: 0, max: 10 },
  clickCost: { min: 0, max: 5 },
  minimumOrder: { min: 0, max: 100 },
  rushOrderMultiplier: { min: 1, max: 5 },
  
  // String validation
  maxStringLength: 1000,
  maxFilenameLength: 255,
  
  // Quantity limits
  minQuantity: 1,
  maxQuantity: 50000
};

// Rate Limiting Constants
export const RATE_LIMITS = {
  // Settings updates per minute
  settingsUpdates: 50,
  
  // General API calls per minute
  apiCalls: 100,
  
  // Rate limit window in milliseconds
  windowMs: 60000, // 1 minute
  
  // Error reporting rate limit
  errorReporting: 10
};

// Cache Configuration
export const CACHE_CONFIG = {
  // Pricing calculation cache
  pricingCache: {
    maxSize: 100,
    ttl: 300000 // 5 minutes
  },
  
  // DOM element cache
  domCache: {
    maxSize: 50,
    ttl: 600000 // 10 minutes
  },
  
  // Math operation cache
  mathCache: {
    maxSize: 50,
    ttl: 3600000 // 1 hour
  },
  
  // Service worker cache
  serviceWorker: {
    staticCacheName: 'instant-quote-static-v2',
    dynamicCacheName: 'instant-quote-dynamic-v2',
    maxAge: 86400000 // 24 hours
  }
};

// UI Constants
export const UI_CONSTANTS = {
  // Animation durations (ms)
  animations: {
    fadeIn: 300,
    slideIn: 250,
    modalTransition: 200,
    notification: 5000,
    criticalNotification: 10000
  },
  
  // Debounce delays (ms)
  debounce: {
    calculation: 150,
    search: 300,
    resize: 250,
    scroll: 100
  },
  
  // Modal dimensions
  modal: {
    width: 480,
    maxWidth: '90vw',
    maxHeight: '90vh'
  },
  
  // Breakpoints for responsive design
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1200
  }
};

// Error Severity Levels
export const ERROR_SEVERITY = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  CRITICAL: 'critical'
};

// Error Types
export const ERROR_TYPES = {
  JAVASCRIPT: 'javascript',
  PROMISE: 'promise',
  NETWORK: 'network',
  VALIDATION: 'validation',
  COMPONENT: 'component',
  SERVICEWORKER: 'serviceworker',
  INITIALIZATION: 'initialization',
  CALCULATION: 'calculation',
  STORAGE: 'storage'
};

// Storage Keys
export const STORAGE_KEYS = {
  settings: 'instant-quote-settings',
  cart: 'instant-quote-cart',
  quotes: 'instant-quote-quotes',
  criticalErrors: 'instant-quote-critical-errors',
  userPreferences: 'instant-quote-preferences'
};

// Product Configuration
export const PRODUCT_CONFIG = {
  // Recommended sizes by product type
  recommendedSizes: {
    brochures: 'small',      // 8.5" x 11"
    postcards: 'medium',     // 5" x 7"
    flyers: 'medium',        // 8.5" x 11"
    bookmarks: 'tall',       // 2" x 7"
    tableTents: 'small'      // 4" x 6"
  },
  
  // Quantity ranges by product type
  quantityRanges: {
    tableTents: [10, 25, 50, 75, 100],
    default: [50, 75, 100, 125, 150, 200, 250, 500, 750, 1000]
  },
  
  // Minimum quantities by product type
  minimumQuantities: {
    tableTents: 10,
    default: 50
  },
  
  // Step sizes for quantity adjustments
  quantitySteps: {
    default: 25
  }
};

// Paper Stock Configuration
export const PAPER_CONFIG = {
  // Default click cost per sheet
  defaultClickCost: 0.10,
  
  // Paper type restrictions by product
  restrictions: {
    bookmarks: ['cover'], // Cover stock only
    tableTents: ['cover'] // Cover stock only
  },
  
  // Default paper selections by product
  defaults: {
    brochures: { type: 'text', weight: '80', finish: 'uncoated' },
    postcards: { type: 'cover', weight: '100', finish: 'uncoated' },
    flyers: { type: 'text', weight: '80', finish: 'uncoated' },
    bookmarks: { type: 'cover', weight: '120', finish: 'uncoated' },
    tableTents: { type: 'cover', weight: '100', finish: 'silk' }
  }
};

// Finishing Options Configuration
export const FINISHING_CONFIG = {
  // Per-piece finishing costs
  costs: {
    folding: 0.20,
    scoring: 0.10,
    tape: 0.20
  },
  
  // Mandatory finishing by product
  mandatory: {
    tableTents: ['scoring', 'folding', 'tape'],
    brochures: ['scoring']  // Scoring is default for brochures
  }
};

// Application Metadata
export const APP_METADATA = {
  name: 'Instant Quote PWA',
  version: '2.0.0',
  description: 'Professional print shop pricing calculator',
  author: 'Claude Code',
  buildDate: new Date().toISOString(),
  
  // Feature flags
  features: {
    offlineMode: true,
    settingsPanel: true,
    cartPersistence: true,
    errorReporting: true,
    performanceOptimizations: true,
    securityValidation: true
  }
};

// Development Configuration
export const DEV_CONFIG = {
  // Debug flags
  debug: {
    pricing: false,
    validation: false,
    caching: false,
    errors: true
  },
  
  // Performance monitoring
  performance: {
    logSlowOperations: true,
    slowOperationThreshold: 100, // ms
    profileMemoryUsage: false
  }
};

// Regular Expressions for Validation
export const REGEX_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s\-\(\)]{10,}$/,
  filename: /^[a-zA-Z0-9._-]+$/,
  productKey: /^[a-z_]+$/,
  paperCode: /^[A-Z0-9_]+$/,
  safeString: /^[\w\s\-.,!?]+$/
};

// CSS Class Names (for consistency)
export const CSS_CLASSES = {
  // Component states
  active: 'active',
  selected: 'selected',
  disabled: 'disabled',
  loading: 'loading',
  error: 'error',
  success: 'success',
  
  // UI components
  modal: 'modal-overlay',
  notification: 'error-notification',
  button: 'btn',
  card: 'card',
  grid: 'grid',
  
  // Severity classes
  critical: 'error-critical',
  warning: 'error-warning',
  info: 'error-info'
};

// Event Names (for consistency)
export const EVENT_NAMES = {
  settingsChanged: 'settingsChanged',
  cartUpdated: 'cartUpdated',
  priceCalculated: 'priceCalculated',
  productSelected: 'productSelected',
  sizeSelected: 'sizeSelected',
  quantityChanged: 'quantityChanged',
  errorOccurred: 'errorOccurred'
};