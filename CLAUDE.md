# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Purpose**: A Progressive Web App (PWA) pricing calculator designed specifically for print shop customer service staff to quickly generate accurate quotes for common print products.

**Current Products**: Streamlined catalog with 5 core products:
- **Brochures**: Tri-fold and bi-fold brochures
- **Postcards**: Marketing postcards and mailers  
- **Flyers**: Single-sheet promotional materials
- **Bookmarks**: Custom printed bookmarks
- **Table Tent Cards**: Folded table display cards with mandatory finishing

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

**Safari Compatibility**: Use `npm run dev -- --host` if Safari cannot connect to localhost. Alternative URLs: http://127.0.0.1:5173 or http://0.0.0.0:5173

**Testing the PWA**: After building, serve the `dist/` folder to test PWA features like offline functionality and installability. The preview command serves the production build with proper HTTPS simulation for PWA testing.

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
- `PricingEngine.js` - C(Q) formula implementation with per-piece finishing cost multiplication
- `CartService.js` - Cart management with paper-aware repricing
- `QuoteService.js` - Tax-free quote generation for internal billing

**Data Layer**:
- `products.js` - 5-product catalog with imposition-based pricing and per-piece finishing costs
- `paperStocks.js` - Paper inventory with hierarchical helper functions and product-specific rules

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

## Recent System Changes

**Per-Piece Finishing Model (2025)**: Complete transition from flat fee finishing to per-piece model
- Brochures: Folding $0.20/pc, Scoring $0.10/pc (was $15.00 flat)
- Table Tents: All finishing (scoring, folding, tape) $0.50/pc total (auto-selected, was $75 setup)
- PricingEngine.js updated to multiply finishing costs by quantity
- Formula breakdown now correctly displays Ff component

**Product Expansion (2025)**: Added bookmarks and table tent cards
- Bookmarks: 120# Cover Uncoated default, 2"x6", 2"x7", 2"x8" sizes, 10-up imposition
- Table Tents: 100# Cover Silk default, 4"x6", 5"x7" sizes, 2-up imposition, mandatory finishing
- Cover stock only restrictions for both new products

**Volume Scaling Differentiation (2025)**: Product-specific exponent values
- Table Tents: e = 0.85 (reduced bulk discount due to labor-intensive finishing)
- All Others: e = 0.75 (standard volume scaling)
- Dynamic display in formula breakdown

**Quantity Range Customization (2025)**: Product-specific quantity ranges
- Table Tents: [10, 25, 50, 75, 100] (smaller batches due to manual labor)
- Standard Products: [50, 75, 100, 125, 150, 200, 250, 500, 750, 1000]
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

**Debugging Capabilities**: Enhanced formula validation and troubleshooting
- `PriceDisplay.js` includes comprehensive breakdown showing all formula components
- Real-time display of imposition values, paper costs, and variable cost calculations
- Debug output shows size object details and paper selection state for testing
- Dynamic exponent display based on product type

**Error Handling**: Comprehensive validation and minimum order enforcement

## Development Workflow

**Component Development**: When adding new UI components, follow the existing callback pattern:
1. Create component class with `render()` method returning HTML string
2. Call `setupEventListeners()` at the END of `render()` method (not just in `init()`)
3. Implement proper event handler cleanup to prevent memory leaks
4. Store event handlers as instance properties for proper removal
5. Pass callbacks from main app for state updates
6. Use `{size, options, paper}` object structure for data passing
7. For selection components, implement auto-selection for immediate pricing

**Critical Event Handling**: Always call `setupEventListeners()` after DOM updates in `render()`. Components that use `innerHTML` destroy existing event listeners, requiring re-attachment.

**Auto-Selection Requirements**: Components managing product configuration must implement auto-selection:
- `autoSelectRecommendedSize()` should trigger on product updates to ensure immediate pricing
- `autoSelectDefaultPaper()` must provide paper data for variable cost calculations
- `autoSelectMandatoryFinishing()` for products with required finishing (table tents)
- Auto-selection should use setTimeout(100ms) to ensure DOM readiness
- Maintain user customization capabilities alongside automatic defaults

**Pricing Modifications**: All pricing changes should be made in `PricingEngine.js`. The C(Q) = S + Q^e × k + Q × v + Ff formula is used throughout the system:
- Modify `products.js` for setup fees, production rate (k=1.50), exponent values, and imposition values
- Update `paperStocks.js` for paper costs and click cost ($0.10) that affect variable cost (v)
- Variable cost includes 50% markup: v = (paper + clicks) × 1.5 / imposition
- Finishing options use per-piece costs multiplied by quantity: Ff = (sum of per-piece costs) × Q
- Pricing automatically recalculates when any component triggers state change

**Cart Operations**: Cart uses event-driven updates with `CartService.dispatchCartUpdate()`. Always preserve paper data in cart items for accurate repricing.

**Local Storage**: Quote data persists in `localStorage` with 50-quote limit. Cart data also persists for session recovery.

**PWA Updates**: When modifying cached resources, increment version in `src/sw.js` to trigger cache updates on deployment.

**Mathematical Calculations**: For any pricing calculations or non-trivial mathematical operations (especially with non-integer exponents), always use the Bash tool with Python to ensure precision:
```bash
python3 -c "print(100**(0.75))"
```
Never rely on mental approximations for financial calculations - accuracy is critical for real pricing scenarios.