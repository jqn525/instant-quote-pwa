// Product catalog with C(Q) = S + Q^e × k + Q × v pricing formula

export const productTypes = {
  brochures: {
    key: 'brochures',
    name: 'Brochures',
    description: 'Tri-fold and bi-fold brochures',
    pricing: {
      setupFee: 30.00,        // S: Fixed setup fee
      overhead: {             // Production rate and volume scaling
        k: 1.50,             // Fixed production rate per sheet
        e: 0.75              // Volume scaling exponent
      },
      variableCost: null      // v: Calculated dynamically with 50% markup
    },
    icon: null, // Set by ProductSelector
    sizes: {
      small: { name: '8.5" x 11"', imposition: 2 }, // 2-up imposition
      medium: { name: '11" x 17"', imposition: 1 }, // 1-up imposition
      large: { name: '12" x 18"', imposition: 1 } // 1-up imposition
    },
    finishingOptions: [
      { name: 'Scoring', description: 'Creased, shipped flat', cost: 0.10 },
      { name: 'Folding', description: 'Fold to final size', cost: 0.20 }
    ]
  },
  postcards: {
    key: 'postcards',
    name: 'Postcards',
    description: 'Marketing postcards and mailers',
    pricing: {
      setupFee: 30.00,        // S: Fixed setup fee
      overhead: {
        k: 1.50,             // Fixed production rate per sheet
        e: 0.75              // Volume scaling exponent
      },
      variableCost: null      // v: Calculated dynamically with 50% markup
    },
    icon: null, // Set by ProductSelector
    sizes: {
      small: { name: '4" x 6"', imposition: 8 }, // 8-up imposition
      medium: { name: '5" x 7"', imposition: 4 }, // 4-up imposition
      large: { name: '6" x 9"', imposition: 2 } // 2-up imposition
    },
    finishingOptions: []
  },
  flyers: {
    key: 'flyers',
    name: 'Flyers',
    description: 'Single-sheet promotional flyers',
    pricing: {
      setupFee: 30.00,        // S: Fixed setup fee
      overhead: {
        k: 1.50,             // Fixed production rate per sheet
        e: 0.75              // Volume scaling exponent
      },
      variableCost: null      // v: Calculated dynamically with 50% markup
    },
    icon: null, // Set by ProductSelector
    sizes: {
      small: { name: '5.5" x 8.5"', imposition: 4 }, // 4-up imposition
      medium: { name: '8.5" x 11"', imposition: 2 }, // 2-up imposition
      large: { name: '8.5" x 14"', imposition: 1 }, // 1-up imposition
      xlarge: { name: '11" x 17"', imposition: 1 } // 1-up imposition
    },
    finishingOptions: []
  },
  bookmarks: {
    key: 'bookmarks',
    name: 'Bookmarks',
    description: 'Custom printed bookmarks',
    pricing: {
      setupFee: 30.00,        // S: Fixed setup fee
      overhead: {
        k: 1.50,             // Fixed production rate per sheet
        e: 0.75              // Volume scaling exponent
      },
      variableCost: null      // v: Calculated dynamically with 50% markup
    },
    icon: null, // Set by ProductSelector
    sizes: {
      standard: { name: '2" x 6"', imposition: 10 }, // 10-up imposition
      tall: { name: '2" x 7"', imposition: 10 }, // 10-up imposition
      extra_tall: { name: '2" x 8"', imposition: 10 } // 10-up imposition
    },
    finishingOptions: []
  },
  table_tents: {
    key: 'table_tents',
    name: 'Table Tent Cards',
    description: 'Folded table display cards with scoring, folding & tape',
    pricing: {
      setupFee: 75.00,        // S: $30 base + $45 finishing (3×$15)
      overhead: {
        k: 1.50,             // Fixed production rate per sheet
        e: 0.85              // Higher volume scaling exponent (less bulk discount)
      },
      variableCost: null      // v: Calculated dynamically with 50% markup
    },
    icon: null, // Set by ProductSelector
    sizes: {
      small: { name: '4" x 6"', imposition: 2 }, // 2-up imposition for folding
      medium: { name: '5" x 7"', imposition: 2 } // 2-up imposition for folding
    },
    finishingOptions: [
      { name: 'Scoring', description: 'Creased, shipped flat', cost: 0.10 },
      { name: 'Folding', description: 'Fold to final size', cost: 0.20 },
      { name: 'Double-Sided Tape', description: 'Assembly tape application', cost: 0.20 }
    ]
  },
  magnets: {
    key: 'magnets',
    name: 'Magnets',
    description: 'Custom printed magnets',
    isExternal: true,
    pricing: {
      type: 'interpolation',
      markup: 1.25, // 25% markup on supplier cost
      minQuantity: 25,
      quantityIncrement: 5,
      supplierCosts: {
        '2X2': {
          brackets: [25, 50, 100, 250, 500, 1000],
          costs: [41.00, 61.00, 101.00, 173.00, 293.00, 533.00]
        },
        '3X3': {
          brackets: [25, 50, 100, 250, 500, 1000],
          costs: [53.00, 85.00, 150.00, 295.00, 538.00, 1023.00]
        },
        '4X4': {
          brackets: [25, 50, 100, 250, 500, 1000],
          costs: [69.00, 118.00, 216.00, 460.00, 867.00, 1680.00]
        },
        '5X5': {
          brackets: [25, 50, 100, 250, 500, 1000],
          costs: [90.00, 159.00, 298.00, 666.00, 1279.00, 2504.00]
        }
      }
    },
    icon: null, // Will be set by ProductSelector
    sizes: {
      '2X2': { key: '2X2', name: '2" × 2"', description: 'Small square magnet' },
      '3X3': { key: '3X3', name: '3" × 3"', description: 'Medium square magnet' },
      '4X4': { key: '4X4', name: '4" × 4"', description: 'Large square magnet' },
      '5X5': { key: '5X5', name: '5" × 5"', description: 'Extra large square magnet' }
    },
    finishingOptions: [],
    workflow: 'simplified', // Skip paper/finishing selection
    orderRules: {
      minQuantity: 25,
      quantityIncrement: 5,
      orderNotes: [
        'Minimum order: 25 pieces per artwork',
        'Orders must be in increments of 5 pieces',
        'Each artwork is priced separately (no bundling)',
        'Custom sizes round up to next standard size'
      ]
    },
    recommendedSize: '3X3',
    standardQuantities: [25, 50, 75, 100, 125, 150, 175, 200, 250, 275]
  },
  stickers: {
    key: 'stickers',
    name: 'Stickers',
    description: 'Custom die cut stickers (external supplier)',
    isExternal: true,
    pricing: {
      type: 'interpolation',
      markup: 1.25, // 25% markup on supplier cost
      minQuantity: 25,
      quantityIncrement: 5,
      supplierCosts: {
        '2X2': {
          brackets: [25, 50, 100, 250, 500, 1000],
          costs: [35.00, 52.00, 86.00, 147.00, 249.00, 453.00]
        },
        '3X3': {
          brackets: [25, 50, 100, 250, 500, 1000],
          costs: [45.00, 72.00, 128.00, 251.00, 458.00, 870.00]
        },
        '4X4': {
          brackets: [25, 50, 100, 250, 500, 1000],
          costs: [59.00, 100.00, 184.00, 391.00, 737.00, 1428.00]
        },
        '5X5': {
          brackets: [25, 50, 100, 250, 500, 1000],
          costs: [77.00, 135.00, 253.00, 566.00, 1087.00, 2128.00]
        }
      }
    },
    icon: null, // Will be set by ProductSelector
    sizes: {
      '2X2': { key: '2X2', name: '2" × 2"', description: 'Small custom die cut sticker' },
      '3X3': { key: '3X3', name: '3" × 3"', description: 'Medium custom die cut sticker' },
      '4X4': { key: '4X4', name: '4" × 4"', description: 'Large custom die cut sticker' },
      '5X5': { key: '5X5', name: '5" × 5"', description: 'Extra large custom die cut sticker' }
    },
    finishingOptions: [],
    workflow: 'simplified', // Skip paper/finishing selection
    orderRules: {
      minQuantity: 25,
      quantityIncrement: 5,
      orderNotes: [
        'Minimum order: 25 pieces per artwork',
        'Orders must be in increments of 5 pieces',
        'Each artwork is priced separately (no bundling)',
        'Custom sizes round up to next standard size'
      ]
    },
    recommendedSize: '3X3',
    standardQuantities: [25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 
                        125, 150, 175, 200, 250, 300, 350, 400, 450, 500, 600, 700, 800, 900, 1000]
  },
  sticker_sheets: {
    key: 'sticker_sheets',
    name: 'Sticker Sheets',
    description: 'Custom kiss cut sticker sheets (external supplier)',
    isExternal: true,
    pricing: {
      type: 'interpolation',
      markup: 1.25, // 25% markup on supplier cost
      minQuantity: 25,
      quantityIncrement: 5,
      supplierCosts: {
        '4X6': {
          brackets: [25, 50, 100, 250, 500, 1000],
          costs: [48.00, 79.00, 140.00, 275.00, 502.00, 954.00]
        },
        '5X7': {
          brackets: [25, 50, 100, 250, 500, 1000],
          costs: [62.00, 105.00, 192.00, 408.00, 769.00, 1490.00]
        },
        '5.5X8.5': {
          brackets: [25, 50, 100, 250, 500, 1000],
          costs: [75.00, 132.00, 247.00, 552.00, 1061.00, 2077.00]
        }
      }
    },
    icon: null, // Will be set by ProductSelector
    sizes: {
      '4X6': { key: '4X6', name: '4" × 6"', description: 'Small kiss cut sticker sheet' },
      '5X7': { key: '5X7', name: '5" × 7"', description: 'Medium kiss cut sticker sheet' },
      '5.5X8.5': { key: '5.5X8.5', name: '5.5" × 8.5"', description: 'Large kiss cut sticker sheet' }
    },
    finishingOptions: [],
    workflow: 'simplified', // Skip paper/finishing selection
    orderRules: {
      minQuantity: 25,
      quantityIncrement: 5,
      orderNotes: [
        'Minimum order: 25 pieces per artwork',
        'Orders must be in increments of 5 pieces',
        'Each artwork is priced separately (no bundling)',
        'Custom sizes round up to next standard size'
      ]
    },
    recommendedSize: '5X7',
    standardQuantities: [25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 
                        125, 150, 175, 200, 250, 300, 350, 400, 450, 500, 600, 700, 800, 900, 1000]
  }
};

export const defaultSettings = {
  minimumOrder: 5.00,
  rushOrderMultiplier: 1.5
};

// Debug logging to verify products are loading correctly
console.log('🔍 Products.js loaded with products:', Object.keys(productTypes));
console.log('🔍 Magnets exists:', productTypes.magnets ? 'YES' : 'NO');
if (productTypes.magnets) {
  console.log('🔍 Magnets pricing type:', productTypes.magnets.pricing.type);
}