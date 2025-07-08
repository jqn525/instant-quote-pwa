// Product catalog with C(Q) = S + Q^e × k + Q × v pricing formula
import { createSvgIcon } from '../components/SvgIcons.js';

export const productTypes = {
  brochures: {
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
    icon: createSvgIcon('brochure'),
    sizes: {
      small: { name: '8.5" x 11"', imposition: 2 }, // 2-up imposition
      medium: { name: '11" x 17"', imposition: 1 }, // 1-up imposition
      large: { name: '12" x 18"', imposition: 1 } // 1-up imposition
    },
    finishingOptions: [
      { name: 'Folding', description: 'Machine folding service (per piece)', cost: 0.20 },
      { name: 'Scoring', description: 'Crease lines for clean folding (per piece)', cost: 0.10 }
    ]
  },
  postcards: {
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
    icon: createSvgIcon('postcard'),
    sizes: {
      small: { name: '4" x 6"', imposition: 8 }, // 8-up imposition
      medium: { name: '5" x 7"', imposition: 4 }, // 4-up imposition
      large: { name: '6" x 9"', imposition: 2 } // 2-up imposition
    },
    finishingOptions: []
  },
  flyers: {
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
    icon: createSvgIcon('flyer'),
    sizes: {
      small: { name: '5.5" x 8.5"', imposition: 4 }, // 4-up imposition
      medium: { name: '8.5" x 11"', imposition: 2 }, // 2-up imposition
      large: { name: '8.5" x 14"', imposition: 1 }, // 1-up imposition
      xlarge: { name: '11" x 17"', imposition: 1 } // 1-up imposition
    },
    finishingOptions: [
      { name: 'Scoring', description: 'Crease lines for clean folding', cost: 15.00 }
    ]
  },
  bookmarks: {
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
    icon: createSvgIcon('bookmark'),
    sizes: {
      standard: { name: '2" x 6"', imposition: 10 }, // 10-up imposition
      tall: { name: '2" x 7"', imposition: 10 }, // 10-up imposition
      extra_tall: { name: '2" x 8"', imposition: 10 } // 10-up imposition
    },
    finishingOptions: []
  },
  table_tents: {
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
    icon: createSvgIcon('table_tent'),
    sizes: {
      small: { name: '4" x 6"', imposition: 2 }, // 2-up imposition for folding
      medium: { name: '5" x 7"', imposition: 2 } // 2-up imposition for folding
    },
    finishingOptions: [
      { name: 'Scoring', description: 'Crease lines for folding (per piece)', cost: 0.10 },
      { name: 'Folding', description: 'Machine folding service (per piece)', cost: 0.20 },
      { name: 'Double-Sided Tape', description: 'Assembly tape application (per piece)', cost: 0.20 }
    ]
  }
};

export const defaultSettings = {
  minimumOrder: 5.00,
  rushOrderMultiplier: 1.5
};