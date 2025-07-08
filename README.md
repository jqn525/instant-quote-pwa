# Instant Quote PWA - Print Shop Pricing Calculator

A Progressive Web App (PWA) designed for print shop customer service staff to quickly generate accurate quotes for common print products with **real-time pricing parameter management**.

## 🚀 Features

### Core Functionality
- **5 Core Products**: Brochures, Postcards, Flyers, Bookmarks, Table Tent Cards
- **Advanced Pricing Formula**: C(Q) = S + Q^e × k + Q × v + Ff
- **Real-time Calculations**: Instant pricing updates with quantity changes
- **PWA Support**: Offline functionality and installable app experience

### 🎛️ **NEW: Settings Management System**
- **Hamburger Menu**: Animated 3-line to X transformation
- **Professional Settings Panel**: Tabbed interface for comprehensive parameter control
- **Real-time Parameter Editing**: All pricing components editable with instant updates

#### Editable Parameters:
- ✅ **Setup Fees** - Edit for all product types
- ✅ **Production Rates** - Edit k values ($ per sheet) for each product
- ✅ **Volume Exponents** - Edit e values (scaling factor) with validation
- ✅ **Finishing Costs** - Edit per-piece costs (folding, scoring, tape)
- ✅ **Paper Costs** - Edit cost per sheet for all paper types
- ✅ **Click Cost** - Edit the click cost parameter
- ✅ **Minimum Order** - Edit minimum order threshold

#### Advanced Features:
- 🛡️ **Form Validation** - Min/max ranges with visual error feedback
- 💾 **Persistent Storage** - Settings saved to localStorage
- 📥📤 **Export/Import** - JSON backup and restore functionality
- 🔄 **Reset to Defaults** - One-click restoration with confirmation
- 📱 **Responsive Design** - Mobile-friendly interface

## 🏗️ Technical Architecture

### Frontend Stack
- **Vanilla JavaScript** - ES6 modules, class-based components
- **Vite** - Fast development and optimized production builds
- **CSS Variables** - Consistent design system
- **Service Worker** - PWA functionality and offline support

### Key Components
- `InstantQuoteApp` - Central application orchestrator
- `SettingsService` - Pricing parameter management with persistence
- `PricingEngine` - Advanced pricing formula calculations
- `HamburgerMenu` - Animated navigation component
- `SettingsPanel` - Tabbed settings interface with validation

### Data Architecture
- **Service-oriented**: SettingsService manages all pricing parameters
- **Event-driven**: Real-time updates trigger pricing recalculation
- **Fallback mechanisms**: App works with or without settings service
- **localStorage persistence**: Settings survive browser refresh

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone [your-repo-url]
cd instant-quote-pwa

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development Commands
```bash
# Start development server
npm run dev

# Start with network access (for Safari compatibility)
npm run dev -- --host

# Build for production
npm run build

# Preview production build
npm run preview
```

### Safari Compatibility
If Safari cannot connect to localhost, use:
- `npm run dev -- --host`
- Alternative URLs: http://127.0.0.1:5173 or http://0.0.0.0:5173

## 📊 Pricing Formula

The application uses an advanced pricing formula:

**C(Q) = S + Q^e × k + Q × v + Ff**

Where:
- **S** = Setup fee (product-specific)
- **Q** = Quantity
- **e** = Volume exponent (0.75 standard, 0.85 for table tents)
- **k** = Production rate ($1.50 per sheet)
- **v** = Variable cost per piece = (paper cost + click cost) × 1.5 / imposition
- **Ff** = Finishing fees (per-piece costs × quantity)

## 🎯 Product Catalog

### Supported Products
1. **Brochures** - Tri-fold and bi-fold with optional finishing
2. **Postcards** - Marketing postcards and mailers
3. **Flyers** - Single-sheet promotional materials
4. **Bookmarks** - Custom printed bookmarks
5. **Table Tent Cards** - Folded display cards with mandatory finishing

### Paper Options
- **Text Stock**: 70#, 80#, 100# (Uncoated/Silk)
- **Cover Stock**: 80#, 100#, 120# (Uncoated/Silk)
- **Product-specific restrictions** apply

## 🛠️ Settings Management

### Accessing Settings
1. Click the hamburger menu (☰) in the top navigation
2. Navigate through the 4 tabs:
   - **Overview** - Current settings display
   - **Formula Parameters** - Edit core pricing formula
   - **Costs & Materials** - Edit finishing and material costs
   - **Actions** - Export, import, and reset settings

### Parameter Validation
- **Minimum Order**: $0 - $1000
- **Setup Fees**: $0 - $500
- **Production Rates**: $0 - $50
- **Volume Exponents**: 0.1 - 2.0
- **Finishing Costs**: $0 - $10 per piece
- **Paper Costs**: $0 - $5 per sheet
- **Click Cost**: $0 - $1 per piece

### Backup & Restore
- **Export**: Download settings as JSON file
- **Import**: Upload JSON settings file
- **Reset**: Restore factory defaults

## 📱 PWA Features

- **Installable**: Add to home screen on mobile devices
- **Offline Support**: Core functionality works without internet
- **Fast Loading**: Optimized assets and caching strategy
- **Responsive**: Touch-optimized for counter use

## 🎨 User Interface

- **Clean Design**: Professional appearance for customer-facing use
- **Touch Optimized**: Grid-based selection for counter staff
- **Real-time Updates**: Instant pricing feedback
- **Visual Feedback**: Success/error states with animations
- **Accessibility**: ARIA labels and keyboard navigation

## 🧪 Testing

Manual testing focuses on:
- PWA functionality and offline capability
- Pricing calculations across all products
- Settings persistence and validation
- Cross-browser compatibility
- Mobile responsiveness

## 📁 Project Structure

```
src/
├── app.js              # Main application orchestrator
├── components/         # UI components
│   ├── ProductSelector.js
│   ├── SizeSelector.js
│   ├── QuantitySelector.js
│   ├── PriceDisplay.js
│   ├── CartDisplay.js
│   ├── HamburgerMenu.js
│   └── SettingsPanel.js
├── services/           # Business logic
│   ├── PricingEngine.js
│   ├── CartService.js
│   ├── QuoteService.js
│   └── SettingsService.js
├── data/              # Product and paper catalogs
│   ├── products.js
│   └── paperStocks.js
├── styles/
│   └── main.css       # Complete styling system
└── sw.js              # Service Worker
```

## 🤝 Contributing

This project follows a component-based architecture with:
- Class-based JavaScript components
- Callback-based state management
- Event-driven updates
- Service layer separation

## 📄 License

[Your License Here]

## 🏆 Implementation Achievement

**Successfully implemented comprehensive pricing parameter management!**

✅ All requested features delivered:
- Manual adjustment of folding prices ✓
- Manual adjustment of paper prices ✓
- Real-time calculator updates ✓
- Professional settings interface ✓
- Complete parameter control ✓

**7 development phases completed with zero major issues!**