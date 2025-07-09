# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Purpose**: A Progressive Web App (PWA) pricing calculator designed specifically for print shop customer service staff to quickly generate accurate quotes for common print products.

**Current Products**: Streamlined catalog with 8 products (5 in-house + 3 external suppliers):
- **Brochures**: Tri-fold and bi-fold brochures
- **Postcards**: Marketing postcards and mailers  
- **Flyers**: Single-sheet promotional materials
- **Bookmarks**: Custom printed bookmarks
- **Table Tent Cards**: Folded table display cards with mandatory finishing
- **Magnets**: Custom printed magnets (external supplier with interpolation pricing)
- **Stickers**: Custom die cut stickers (external supplier with interpolation pricing)
- **Sticker Sheets**: Custom kiss cut sticker sheets (external supplier with interpolation pricing)

**Core Functionality**: Staff click through an intuitive interface to select products, choose sizes with recommended defaults, select paper through hierarchical menus, set quantities with product-specific ranges, and instantly see calculated pricing for internal cost centers (tax-free).

**Key Benefits**:
- Speed: Instant pricing calculations with recommended defaults
- Accuracy: Eliminates calculation errors with imposition-based costing
- Ease of Use: Hierarchical paper selection and integrated quantity controls
- Professional: Clean quote generation for internal billing
- Reliable: PWA functionality with offline support

**Primary Users**: Customer service counter staff pricing jobs for internal cost centers.

## Development Commands

- `npm run dev` - Start development server on http://localhost:5173 (or next available port)
- `npm run dev -- --host` - Start with network access for Safari compatibility
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run preview` - Preview production build locally

The application uses Vite with PWA plugin for fast development and optimized production builds.

**Module System**: Project uses ES modules (`"type": "module"` in package.json) - all imports/exports use ES6 module syntax.

**Critical Dependencies**: The application requires these utility modules for full functionality:
- `utils/constants.js` - Contains CACHE_CONFIG, PRICING_CONSTANTS, validation limits
- `utils/errorHandler.js` - Global error handling and recovery mechanisms  
- `utils/helpers.js` - formatCurrency, formatNumber, and utility functions
- `ExternalPricingEngine.js` - Handles interpolation-based pricing for external products

**Safari Compatibility**: Use `npm run dev -- --host` if Safari cannot connect to localhost. Alternative URLs: http://127.0.0.1:5173 or http://0.0.0.0:5173

**Testing the PWA**: After building, serve the `dist/` folder to test PWA features like offline functionality and installability. The preview command serves the production build with proper HTTPS simulation for PWA testing.

**GitHub Pages Deployment**: Production build files are copied to repository root for GitHub Pages hosting. The built assets from `dist/` are committed to the main branch, allowing direct serving from root. Live app: https://jqn525.github.io/instant-quote-pwa/

**Testing & Code Quality**: No automated testing framework currently configured. Manual testing focuses on PWA functionality, pricing calculations, and cross-browser compatibility. No linting tools configured - code follows vanilla JavaScript patterns with consistent formatting.

## System Architecture

**Application Pattern**: Vanilla JavaScript with class-based components (`InstantQuoteApp` as central orchestrator). No external frameworks - lightweight and fast.

**Application Flow**: Single-page app with step-based UI: Product Selection → Configuration (Size/Paper/Options/Quantity) → Real-time Pricing → Cart Management → Quote Generation.

**Component Communication**: Callback-based state management through main app with real-time updates throughout the interface. Components receive callbacks like `onSelectionChange({size, options, paper})` and trigger state updates in the main app.

**State Management**: Centralized in `InstantQuoteApp` class with these key state objects:
- `currentProduct`, `currentSize`, `currentOptions`, `currentPaper`, `currentQuantity`
- Real-time pricing updates triggered on any state change
- Event-driven cart updates with local storage persistence

**Data Flow**: Unidirectional - UI interactions → callbacks → main app state → re-render affected components → pricing recalculation

**Quantity System**: 
- Grid-based quantity selection with preset buttons
- Product-specific quantity ranges (Table Tents: [10, 25, 50, 75, 100], Others: [50, 75, 100, 125, 150, 200, 250, 500, 750, 1000])
- Minimum order varies by product (50 units standard, 10 for table tents)
- Real-time pricing displayed on each quantity button
- Intelligent quantity switching when changing products

## Core Pricing System

**Pricing Formula**: `C(Q) = S + Q^e × k + Q × v + Ff` where:
- S = Fixed setup fee ($30.00 standard, $75.00 for table tents)
- k = Production rate per sheet ($1.50, fixed for all products)
- e = Volume scaling exponent (0.75 standard, 0.85 for table tents - higher reduces bulk discounts)
- v = Variable cost per piece = (paper cost + $0.10 clicks) × 1.5 / imposition
- Ff = Finishing fee (per-piece costs multiplied by quantity)

**Dynamic Paper Integration**:
- Paper costs automatically update variable cost (v) with 50% markup in real-time
- Each size has specific imposition values that affect v calculations
- Production rate (k) is now fixed at $1.50 for all products and sizes
- PricingEngine recalculates when paper selection changes

**Finishing Options System**:
- **Per-Piece Model**: Costs scale with quantity (current standard)
  - Brochures: Folding $0.20/pc, Scoring $0.10/pc
  - Table Tents: Scoring $0.10/pc, Folding $0.20/pc, Tape $0.20/pc (mandatory)
- **Auto-Selection**: Table tent finishing options automatically selected
- **Cost Calculation**: Ff = (sum of per-piece costs) × quantity

**Tax System**: All tax calculations removed for internal cost center use.

## User Interface Features

**Recommended Sizes System**:
- Each product has a recommended size that appears prominently in sequence
- Brochures: 8.5" x 11" | Postcards: 5" x 7" | Flyers: 8.5" x 11" | Bookmarks: 2" x 7" | Table Tents: 4" x 6"
- Smart positioning removes duplicates and inserts recommended cards at correct positions
- Visual distinction with "Recommended Size" labeling

**Hierarchical Paper Selection**:
- Step 1: Paper Type (Text Stock/Cover Stock) with recommended stock card
- Step 2: Weight (filtered by product compatibility rules)
- Step 3: Finish (Uncoated/Silk) with descriptive text
- Auto-selects default paper on product selection for immediate pricing
- Users can customize through step-by-step workflow with back navigation

**Product Context**: Clear product indicators throughout configuration ("Brochures - Select a Size")

**Imposition-Based Pricing**: All products use imposition values to calculate accurate per-piece costs with 50% markup on materials

## File Structure

**Core Application**:
- `src/app.js` - Main application orchestration and state management
- `src/components/` - UI components with callback-based communication
- `src/services/` - Business logic services (pricing, cart, quotes)
- `src/data/` - Product catalog and paper inventory
- `src/styles/main.css` - Touch-optimized responsive styling

**Key Components**:
- `ProductSelector.js` - Product grid with visual selection cards
- `SizeSelector.js` - Size + paper hierarchical selection with auto-selection of finishing options
- `QuantitySelector.js` - Grid-based quantity selection with product-specific ranges
- `PriceDisplay.js` - Complete pricing display with formula breakdown (unit price, setup fee, total, Ff component)
- `CartDisplay.js` - Shopping cart with integrated quantity controls
- `SvgIcons.js` - SVG icon utilities for UI elements

**Business Logic**:
- `PricingEngine.js` - C(Q) formula implementation with dual pricing system routing and SettingsService integration
- `ExternalPricingEngine.js` - Linear interpolation engine for external supplier products with cost matrices
- `CartService.js` - Cart management with paper-aware repricing and localStorage persistence
- `QuoteService.js` - Tax-free quote generation for internal billing
- `SettingsService.js` - Real-time pricing parameter management with event-driven updates

**Data Layer**:
- `products.js` - 8-product catalog with imposition-based pricing and per-piece finishing costs
- `paperStocks.js` - Paper inventory with hierarchical helper functions and product-specific rules
- `externalProducts.js` - External supplier products with interpolation-based pricing configurations
- `magnetPricing.js` - Magnet supplier cost matrices and pricing rules
- `stickerPricing.js` - Sticker supplier cost matrices and pricing rules  
- `stickerSheetPricing.js` - Sticker sheet supplier cost matrices and pricing rules

**Utilities & Configuration**:
- `utils/constants.js` - Application-wide constants, validation limits, cache config
- `utils/errorHandler.js` - Comprehensive error handling with recovery mechanisms
- `utils/helpers.js` - Utility functions for formatting, validation, and common operations
- `utils/validation.js` - Input validation and sanitization functions

## Key Features

**Pricing System**:
- Advanced C(Q) formula with volume scaling: S + Q^e × k + Q × v + Ff
- Product-specific exponents (0.75 standard, 0.85 for table tents)
- Imposition-based variable cost calculation with 50% markup
- Paper cost integration with real-time updates ($0.10 click cost)
- Per-piece finishing options that scale with quantity
- Tax-free billing for internal cost centers
- Minimum order enforcement ($5.00)

**Shopping Cart**:
- Multi-item cart with quantity management
- Paper-aware repricing for accurate totals
- Improved modal presentation (480px width)
- Integrated +/- quantity controls (25-unit increments)
- Real-time price recalculation

**User Interface**:
- Touch-optimized design for counter use
- Grid-based quantity selection with live pricing on each button
- Hierarchical paper selection (type → weight → finish)
- Complete formula breakdown display with all components (S, k, e, v, Ff)
- Recommended size positioning with smart sequencing
- Product context indicators throughout workflow
- Professional quote generation

**PWA Features**:
- Service Worker (`src/sw.js`) with cache-first strategy and network fallback
- Web App Manifest (`public/manifest.json`) with standalone display mode
- Local storage for quotes (50 quote limit) and cart persistence
- Installable app experience with app shortcuts for "New Quote"
- Offline functionality for static assets and cached quotes

## Settings Management System (2025)

**Real-time Parameter Control**: Complete settings management system allowing manual adjustment of all pricing parameters with live calculator updates.

**Architecture Components**:
- `SettingsService.js` - Centralized parameter management with localStorage persistence and event-driven updates
- `HamburgerMenu.js` - Animated 3-line to X menu component with toggle functionality 
- `SettingsPanel.js` - Tabbed modal interface with form validation and export/import capabilities
- Enhanced `PricingEngine.js` - Dynamic settings integration with fallback mechanisms

**Settings Organization**:
- **Overview Tab**: Read-only display of all current parameter values
- **Formula Parameters Tab**: Core pricing formula components (setup fees, production rates, volume exponents, minimum order)
- **Costs & Materials Tab**: Finishing costs, paper costs, click cost with per-piece calculations
- **Actions Tab**: Export/import settings, reset to defaults, backup/restore functionality

**Parameter Management**:
- All pricing formula components editable: S (setup fees), k (production rates), e (volume exponents), v components (paper/click costs), Ff (finishing costs)
- Real-time validation with min/max ranges and visual error feedback
- Automatic localStorage persistence with 'instant-quote-settings' key
- Event-driven updates trigger immediate pricing recalculation throughout the app

**Integration Pattern**: 
- `PricingEngine` constructor accepts optional `settingsService` parameter with graceful fallback
- Settings changes dispatch `settingsChanged` events that trigger `app.updateCalculation()`
- All existing functionality preserved - settings system is additive, not replacing core logic

## Dual Pricing Architecture

**Standard Products (In-House)**: Use C(Q) formula with imposition-based calculations
- Brochures, Postcards, Flyers, Bookmarks, Table Tents
- PricingEngine.js handles all calculations with SettingsService integration
- Real-time paper cost integration and finishing cost multiplication

**External Products**: Interpolation-based pricing with supplier cost matrices
- Magnets, Stickers, Sticker Sheets use ExternalPricingEngine with linear interpolation
- 25% markup on supplier costs with quantity breaks at [25, 50, 100, 250, 500, 1000]
- Minimum order: 25 units, increments of 5 pieces
- No paper selection (workflow: simplified) - products sourced with materials included
- Each design/artwork priced separately (no bundling across quantities)

## External Pricing System

**Detection & Routing**: Products with `isExternal: true` flag are automatically routed to ExternalPricingEngine
- PricingEngine.js checks for isExternal flag and routes accordingly
- Size format conversion: "2\" × 2\"" → "2X2" for supplier cost matrix lookup
- Dynamic import of external product configurations when needed

**Interpolation Formula**: `Customer_Price(Q, Size) = Supplier_Cost(Q, Size) × 1.25`
- **Step 1**: Find quantity brackets surrounding desired quantity (Q1 ≤ Q ≤ Q2)
- **Step 2**: Linear interpolation: `C(Q) = C1 + (Q - Q1) × (C2 - C1) / (Q2 - Q1)`
- **Step 3**: Apply 25% markup: `Final_Price = C(Q) × 1.25`
- **Validation**: Quantities validated to minimum 25 units, rounded up to 5-unit increments

**Supplier Cost Updates**: When supplier prices change:
1. Update supplier cost matrices in pricing files (`magnetPricing.js`, `stickerPricing.js`, `stickerSheetPricing.js`)
2. Customer pricing automatically recalculates with 25% markup
3. No code changes required - data-driven pricing updates

**Order Rules**:
- Minimum order: 25 pieces per artwork/design
- Orders must be in increments of 5 pieces
- No quantity bundling across different designs
- Custom sizes round up to next standard size bracket

## Recent System Changes

**Critical External Product Fixes (July 2025)**: Resolved application initialization and pricing calculation errors
- Fixed SettingsService to handle external products without overhead pricing structure
- Fixed character mismatch in size conversion (× vs x) for external product pricing
- Updated quantity grid to display 5 items per row for better organization
- Customized magnet quantity presets to [25, 50, 75, 100, 125, 150, 175, 200, 250, 275]
- Improved custom quantity input spacing and alignment

**External Product Integration (2025)**: Added three external supplier products with interpolation pricing
- Magnets: 2"×2" to 5"×5" custom printed magnets
- Stickers: 2"×2" to 5"×5" custom die cut stickers  
- Sticker Sheets: 4"×6" to 5.5"×8.5" custom kiss cut sticker sheets
- Full ExternalPricingEngine implementation with linear interpolation between supplier cost brackets
- Products marked with `isExternal: true` flag to route to external pricing system
- Supplier cost matrices stored in separate pricing files for easy supplier updates

**Per-Piece Finishing Model (2025)**: Complete transition from flat fee finishing to per-piece model
- Brochures: Folding $0.20/pc, Scoring $0.10/pc (was $15.00 flat)
- Table Tents: All finishing (scoring, folding, tape) $0.50/pc total (auto-selected, was $75 setup)
- PricingEngine.js updated to multiply finishing costs by quantity
- Formula breakdown now correctly displays Ff component

**Product Expansion (2025)**: Added bookmarks, table tent cards, and external products
- Bookmarks: 120# Cover Uncoated default, 2"×6", 2"×7", 2"×8" sizes, 10-up imposition
- Table Tents: 100# Cover Silk default, 4"×6", 5"×7" sizes, 2-up imposition, mandatory finishing
- External Products: Magnets, Stickers, Sticker Sheets with interpolation-based pricing
- Cover stock only restrictions for bookmarks and table tents
- External products skip paper selection and use simplified workflow

**Volume Scaling Differentiation (2025)**: Product-specific exponent values
- Table Tents: e = 0.85 (reduced bulk discount due to labor-intensive finishing)
- All Others: e = 0.75 (standard volume scaling)
- Dynamic display in formula breakdown

**Quantity Range Customization (2025)**: Product-specific quantity ranges
- Table Tents: [10, 25, 50, 75, 100] (smaller batches due to manual labor)
- Standard Products: [50, 75, 100, 125, 150, 200, 250, 500, 750, 1000]
- External Products: [25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 125, 150, 175, 200, 250, 300, 350, 400, 450, 500, 600, 700, 800, 900, 1000] (5-unit increments)
- Intelligent quantity switching preserves valid selections when changing products

**Auto-Selection Enhancements (2025)**: 
- Table tent finishing options automatically selected (mandatory operations)
- Enhanced SizeSelector with autoSelectMandatoryFinishing() for table tents
- Proper UI state management for pre-selected finishing options

## Implementation Notes

**Paper Integration**: Default paper auto-selected on product choice, paper data preserved for cart repricing with 50% markup

**Component Communication**: Callback-based state management with {size, options, paper} objects

**Imposition Logic**: Size-specific imposition values determine accurate per-piece costs with unified production rate
- Authoritative lookup table in `PricingEngine.js` matches CSV data for standard sizes
- `getImposition(size)` method provides fallback system: size.imposition → lookup table → default (2)
- Critical for variable cost calculation: v = (paper + clicks) × 1.5 / imposition

**Finishing Options**: Per-piece finishing costs that scale with quantity
- Table Tents: Mandatory finishing auto-selected, $0.50/pc total
- Brochures: Optional finishing, $0.10-$0.20/pc
- PricingEngine multiplies per-piece costs by quantity for total Ff

**Auto-Selection System**: Implemented to resolve variable cost calculation issues
- Products automatically select recommended size on product change via `autoSelectRecommendedSize()`
- Default paper automatically selected via `autoSelectDefaultPaper()` for immediate pricing
- Table tents auto-select mandatory finishing via `autoSelectMandatoryFinishing()`
- Maintains user customization options through hierarchical paper selection interface

**Debugging and Troubleshooting**: Enhanced validation and diagnostic capabilities

**Formula Debugging**:
- `PriceDisplay.js` includes comprehensive breakdown showing all formula components (S, k, e, v, Ff)
- Real-time display of imposition values, paper costs, and variable cost calculations
- Debug output shows size object details and paper selection state for testing
- Dynamic exponent display based on product type

**Common Debugging Scenarios**:
```javascript
// Debug pricing calculations
console.log('Pricing Debug:', {
    product: this.currentProduct,
    size: this.currentSize,
    paper: this.currentPaper,
    quantity: this.currentQuantity,
    imposition: this.pricingEngine.getImposition(this.currentSize),
    breakdown: this.pricingEngine.calculatePrice(this.currentQuantity, this.currentProduct, this.currentSize, this.currentPaper, this.currentOptions)
});

// Debug auto-selection issues
console.log('Auto-selection State:', {
    sizeSelected: !!this.currentSize,
    paperSelected: !!this.currentPaper,
    finishingSelected: this.currentOptions
});

// Debug settings integration
console.log('Settings Debug:', {
    settingsService: !!this.settingsService,
    currentSettings: this.settingsService?.getSettings(),
    fallbackSettings: this.pricingEngine.settings
});
```

**Troubleshooting Guide**:
- **No pricing displayed**: Check if size, paper, and quantity are all selected
- **Incorrect pricing**: Verify imposition values in `PricingEngine.js` lookup table
- **Event handlers not working**: Ensure `setupEventListeners()` called after `render()`
- **Auto-selection failing**: Check DOM readiness - use `setTimeout(100ms)` for auto-selection
- **Settings not persisting**: Verify localStorage permissions and 'instant-quote-settings' key
- **External product pricing fails**: Check size conversion regex handles both × and x characters
- **Application won't initialize**: Verify SettingsService skips external products in extractDefaults()

**Common Pitfalls and Error Patterns**:

**Event Handler Issues**:
- ❌ **Mistake**: Calling `setupEventListeners()` only in `init()` method
- ✅ **Fix**: Always call `setupEventListeners()` at the end of `render()` method
- ❌ **Mistake**: Not binding event handlers as instance properties
- ✅ **Fix**: Store bound handlers as `this.handleClick = this.handleClick.bind(this)`

**Auto-Selection Timing**:
- ❌ **Mistake**: Auto-selection immediately after DOM update
- ✅ **Fix**: Use `setTimeout(() => { ... }, 100)` for DOM readiness
- ❌ **Mistake**: Auto-selection without checking if elements exist
- ✅ **Fix**: Always check element existence before auto-selection

**State Management**:
- ❌ **Mistake**: Direct state mutation in components
- ✅ **Fix**: Use callbacks to update state through main app
- ❌ **Mistake**: Missing paper data in cart items
- ✅ **Fix**: Always preserve `{size, options, paper}` object structure

**Pricing Calculations**:
- ❌ **Mistake**: Hardcoded pricing values in components
- ✅ **Fix**: Use `PricingEngine` with settings service integration
- ❌ **Mistake**: Mental math for non-integer exponents
- ✅ **Fix**: Use Python for accurate calculations: `python3 -c "print(100**(0.75))"`

**Settings Integration**:
- ❌ **Mistake**: Assuming settings service is always available
- ✅ **Fix**: Check `this.settingsService` existence and provide fallbacks
- ❌ **Mistake**: Not triggering recalculation after settings changes
- ✅ **Fix**: Listen for `settingsChanged` events and call `app.updateCalculation()`

**Error Handling**: Comprehensive validation and minimum order enforcement

## Performance Optimization Patterns (2025)

**Render Optimization**: Components now implement state-based rendering to prevent unnecessary DOM operations:

```javascript
// State tracking for render optimization
generateStateKey() {
  const productKey = this.currentProduct?.name || 'none';
  const sizeKey = this.currentSize?.name || 'none';
  const paperKey = this.currentPaper?.id || 'none';
  const optionsKey = this.currentOptions?.map(opt => opt.name).sort().join(',') || 'none';
  return `${productKey}:${sizeKey}:${paperKey}:${optionsKey}`;
}

render() {
  // Check if render is necessary to avoid unnecessary DOM operations
  const currentState = this.generateStateKey();
  if (this.lastRenderedState === currentState) {
    // Only update selection state if needed
    this.updateSelectionOnly();
    return;
  }
  // Full render only when state actually changes
  // Cache current state to avoid unnecessary re-renders
  this.lastRenderedState = currentState;
}
```

**Event Delegation Patterns**: Use single delegated listeners for better performance:

```javascript
// Use event delegation for better performance with dynamic content
this.clickHandler = (e) => {
  const quantityBtn = e.target.closest('.quantity-btn');
  if (quantityBtn && this.container.contains(quantityBtn)) {
    // Handle click
  }
};
this.container.addEventListener('click', this.clickHandler);
```

**Pricing Calculation Caching**: PricingEngine implements LRU cache with settings-aware invalidation:

```javascript
// Generate cache key including settings hash
generateCacheKey(product, size, options, quantity, paper) {
  const settingsHash = this.getSettingsHash();
  return `${productKey}:${sizeKey}:${optionsKey}:${quantity}:${paperKey}:${settingsHash}`;
}

// LRU-like cache management
setCachedPrice(cacheKey, result) {
  if (this.pricingCache.size >= this.cacheMaxSize) {
    const firstKey = this.pricingCache.keys().next().value;
    this.pricingCache.delete(firstKey);
  }
  this.pricingCache.set(cacheKey, result);
}
```

**Mathematical Operation Memoization**: Expensive Math.pow operations are cached:

```javascript
// Memoized Math.pow for performance optimization
memoizedPow(base, exponent) {
  const key = `${base}^${exponent}`;
  if (this.mathPowCache.has(key)) {
    return this.mathPowCache.get(key);
  }
  const result = Math.pow(base, exponent);
  // LRU cache management
  this.mathPowCache.set(key, result);
  return result;
}
```

**Service Worker Optimization**: Stale-while-revalidate strategy for better perceived performance:

```javascript
// Stale-while-revalidate implementation
if (cachedResponse && isCacheableResource) {
  const responseToReturn = cachedResponse.clone();
  
  // Return cached response immediately, fetch fresh in background
  fetch(event.request)
    .then((freshResponse) => {
      if (freshResponse && freshResponse.status === 200) {
        dynamicCache.put(event.request, freshResponse.clone());
      }
    })
    .catch(() => {});
    
  return responseToReturn;
}
```

## Security & Validation Patterns (2025)

**Input Validation**: Comprehensive validation system with XSS protection:

```javascript
// XSS prevention and input sanitization
sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // Remove potential script tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
}

// Rate limiting for API protection
checkRateLimit(key, maxAttempts, windowMs) {
  const now = Date.now();
  const attempts = this.rateLimitStore.get(key) || [];
  const validAttempts = attempts.filter(time => now - time < windowMs);
  return validAttempts.length < maxAttempts;
}
```

**Error Boundaries**: Graceful error handling with user notifications and recovery:

```javascript
// Global error handling with recovery mechanisms
handleError(errorInfo, options = {}) {
  const errorEntry = {
    id: this.generateErrorId(),
    timestamp: new Date().toISOString(),
    type: errorInfo.type || 'application',
    component: options.component,
    severity: options.severity || 'error',
    message: errorInfo.message || 'Unknown error'
  };
  
  // Show user notification if not suppressed
  if (!options.suppressNotification) {
    this.showUserNotification(errorEntry, options.userMessage);
  }
  
  // Execute recovery action if provided
  if (options.recoveryAction && typeof options.recoveryAction === 'function') {
    try {
      options.recoveryAction();
    } catch (recoveryError) {
      // Log recovery failure but don't cascade errors
    }
  }
}
```

## Code Organization Patterns (2025)

**Centralized Constants**: All configuration values moved to constants.js:

```javascript
// Example from constants.js - eliminates magic numbers
export const PRICING_CONSTANTS = {
  DEFAULT_PRODUCTION_RATE: 1.50,
  DEFAULT_VOLUME_EXPONENTS: {
    standard: 0.75,
    tableTents: 0.85
  },
  MATERIAL_MARKUP: 1.5,
  DEFAULT_MINIMUM_ORDER: 5.00
};

export const CACHE_CONFIG = {
  pricingCache: { maxSize: 100, ttl: 300000 },
  domCache: { maxSize: 50, ttl: 600000 },
  mathCache: { maxSize: 50, ttl: 3600000 }
};
```

**Utility Function Library**: Common operations consolidated in helpers.js:

```javascript
// Reusable utilities with error handling
export const formatCurrency = (amount, currency = 'USD') => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '$0.00';
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

export const createSafeEventListener = (element, event, handler, options = {}) => {
  const safeHandler = (e) => {
    try {
      handler(e);
    } catch (error) {
      console.error('Event handler error:', error);
      if (options.removeOnError) {
        element.removeEventListener(event, safeHandler);
      }
    }
  };
  element.addEventListener(event, safeHandler, options);
  return () => element.removeEventListener(event, safeHandler);
};
```

**Comprehensive JSDoc Documentation**: All major functions documented with examples:

```javascript
/**
 * Calculate pricing using C(Q) = S + Q^e × k + Q × v + Ff formula
 * @param {Object} product - Product type object
 * @param {Object} size - Selected size with imposition data
 * @param {Array} options - Selected options (includes finishing)
 * @param {number} quantity - Quantity for calculation
 * @param {Object} paper - Selected paper (optional)
 * @returns {Object} Complete pricing breakdown with validation
 * 
 * @example
 * const pricing = pricingEngine.calculatePrice(
 *   { name: 'Brochures', pricing: {...} },
 *   { name: '8.5" x 11"', imposition: 2 },
 *   [{ name: 'Folding', cost: 0.20 }],
 *   100,
 *   { id: 'text_80_uncoated', costPerSheet: 0.15 }
 * );
 */
```

## Development Workflow

**Component Development**: When adding new UI components, follow the existing callback pattern:
1. Create component class with `render()` method returning HTML string
2. Call `setupEventListeners()` at the END of `render()` method (not just in `init()`)
3. Implement proper event handler cleanup to prevent memory leaks
4. Store event handlers as instance properties for proper removal
5. Pass callbacks from main app for state updates
6. Use `{size, options, paper}` object structure for data passing
7. For selection components, implement auto-selection for immediate pricing

**Critical Event Handling Patterns**: Components must follow these patterns to prevent memory leaks and ensure proper functionality:

```javascript
// REQUIRED: Always call setupEventListeners() after render()
render() {
    this.container.innerHTML = '...';
    this.setupEventListeners(); // CRITICAL: Must be called here, not just in init()
    return this.container.innerHTML;
}

// REQUIRED: Store event handlers as instance properties for cleanup
setupEventListeners() {
    // Store handlers as instance properties
    this.handleSizeClick = this.handleSizeClick.bind(this);
    this.handlePaperChange = this.handlePaperChange.bind(this);
    
    // Add event listeners
    this.container.addEventListener('click', this.handleSizeClick);
    this.container.addEventListener('change', this.handlePaperChange);
}

// REQUIRED: Clean up event listeners to prevent memory leaks
cleanup() {
    if (this.container) {
        this.container.removeEventListener('click', this.handleSizeClick);
        this.container.removeEventListener('change', this.handlePaperChange);
    }
}
```

**Why This Matters**: Components using `innerHTML` destroy existing event listeners, requiring re-attachment after every render. Failing to follow this pattern results in broken interactivity and memory leaks.

**Auto-Selection Requirements**: Components managing product configuration must implement auto-selection:
- `autoSelectRecommendedSize()` should trigger on product updates to ensure immediate pricing
- `autoSelectDefaultPaper()` must provide paper data for variable cost calculations
- `autoSelectMandatoryFinishing()` for products with required finishing (table tents)
- Auto-selection should use setTimeout(100ms) to ensure DOM readiness
- Maintain user customization capabilities alongside automatic defaults

**Pricing Modifications**: The system now supports both static (code-based) and dynamic (settings-based) pricing modifications:

**Static Changes** (requires code modification):
- Modify `products.js` for default setup fees, production rate (k=1.50), exponent values, and imposition values
- Update `paperStocks.js` for default paper costs and click cost ($0.10) that affect variable cost (v)
- These become the fallback values when SettingsService is not available

**Dynamic Changes** (runtime via SettingsService):
- All pricing parameters are now user-editable through the hamburger menu → settings panel
- Changes persist in localStorage and override static defaults automatically
- `SettingsService.updateSetting(key, value, subKey)` for programmatic updates
- Real-time updates: parameter changes → `settingsChanged` event → `app.updateCalculation()`
- Formula: C(Q) = S + Q^e × k + Q × v + Ff where all components are now dynamic

**Cart Operations**: Cart uses event-driven updates with `CartService.dispatchCartUpdate()`. Always preserve paper data in cart items for accurate repricing.

**Local Storage**: Quote data persists in `localStorage` with 50-quote limit. Cart data also persists for session recovery.

**PWA Updates**: When modifying cached resources, increment version in `src/sw.js` to trigger cache updates on deployment.

**Mathematical Calculations**: For any pricing calculations or non-trivial mathematical operations (especially with non-integer exponents), always use the Bash tool with Python to ensure precision:

**Common Calculations**:
```bash
# Volume scaling calculations (critical for pricing accuracy)
python3 -c "print(100**(0.75))"  # Standard products
python3 -c "print(100**(0.85))"  # Table tents (higher exponent)

# Variable cost calculations with imposition
python3 -c "print((0.15 + 0.10) * 1.5 / 2)"  # (paper + clicks) * markup / imposition

# Finishing cost calculations
python3 -c "print(0.20 * 100)"  # Per-piece finishing * quantity

# Complete formula verification
python3 -c "
S = 30.00
k = 1.50
e = 0.75
v = 0.1875
Ff = 20.00
Q = 100
total = S + (Q**e) * k + Q * v + Ff
print(f'Total: ${total:.2f}')
"
```

**Why This Matters**: Financial calculations require precision - mental approximations can lead to significant pricing errors. Always verify complex calculations with Python, especially for:
- Non-integer exponents (0.75, 0.85)
- Multi-step formula calculations
- Variable cost computations with division
- Bulk pricing scenarios with large quantities

## Known Issues & Debugging

**Magnets Visibility Issue**: Magnets product is fully integrated in data layer but may not appear in UI due to subtle rendering pipeline issue. If magnets don't appear:

1. **Check Console**: Look for debug messages `🔍 Products.js loaded with products:` and `🔍 Magnets exists:`
2. **Hard Refresh**: Use Ctrl+Shift+R (Cmd+Shift+R on Mac) to clear browser cache
3. **Manual DOM Inspection**: 
   ```javascript
   console.log('Product cards:', document.querySelectorAll('.product-card'));
   console.log('Magnets card:', document.querySelector('[data-product-key="magnets"]'));
   ```
4. **Test Files Available**: `debug_magnets_issue.html`, `cache_bust_test.html`, and `test_simplified_magnets.html` for systematic debugging

**Reference**: See `MAGNETS_DEBUGGING_REPORT.md` for comprehensive analysis of all debugging attempts and potential solutions.

**Formula Validation**: When debugging pricing issues, calculate each component separately:
```bash
python3 -c "
Q = 100
S = 30.00
k_component = (Q**0.75) * 1.50
v_component = Q * 0.1875
Ff = 20.00
print(f'S: ${S:.2f}')
print(f'k component: ${k_component:.2f}')
print(f'v component: ${v_component:.2f}')
print(f'Ff: ${Ff:.2f}')
print(f'Total: ${S + k_component + v_component + Ff:.2f}')
"
```