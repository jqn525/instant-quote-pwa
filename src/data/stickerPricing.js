/**
 * Sticker Pricing Data - Supplier Cost Matrices
 * Based on supplier pricing with 25% markup
 * All prices in Canadian Dollars (CAD)
 * NOTE: These are placeholder values - update with actual supplier costs
 */

export const stickerSupplierCosts = {
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
};

export const stickerCustomerPricing = {
  '2X2': {
    brackets: [25, 50, 100, 250, 500, 1000],
    costs: [43.75, 65.00, 107.50, 183.75, 311.25, 566.25]
  },
  '3X3': {
    brackets: [25, 50, 100, 250, 500, 1000],
    costs: [56.25, 90.00, 160.00, 313.75, 572.50, 1087.50]
  },
  '4X4': {
    brackets: [25, 50, 100, 250, 500, 1000],
    costs: [73.75, 125.00, 230.00, 488.75, 921.25, 1785.00]
  },
  '5X5': {
    brackets: [25, 50, 100, 250, 500, 1000],
    costs: [96.25, 168.75, 316.25, 707.50, 1358.75, 2660.00]
  }
};

// Size display information
export const stickerSizes = {
  '2X2': { key: '2X2', name: '2" × 2"', description: 'Small custom die cut sticker' },
  '3X3': { key: '3X3', name: '3" × 3"', description: 'Medium custom die cut sticker' },
  '4X4': { key: '4X4', name: '4" × 4"', description: 'Large custom die cut sticker' },
  '5X5': { key: '5X5', name: '5" × 5"', description: 'Extra large custom die cut sticker' }
};

// Quantity validation rules
export const stickerQuantityRules = {
  minQuantity: 25,
  quantityIncrement: 5,
  standardQuantities: [25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 
                      125, 150, 175, 200, 250, 300, 350, 400, 450, 500, 600, 700, 800, 900, 1000]
};

// Pricing calculation examples for validation
export const stickerPricingExamples = {
  '2X2': {
    '75': { supplier: 68.80, customer: 86.00, note: 'Between 50-100 bracket' },
    '25': { supplier: 35.00, customer: 43.75, note: 'Exact bracket match' },
    '1200': { supplier: 494.20, customer: 617.75, note: 'Extrapolated above 1000' }
  },
  '3X3': {
    '350': { supplier: 333.40, customer: 416.75, note: 'Between 250-500 bracket' },
    '30': { supplier: 50.40, customer: 63.00, note: 'Between 25-50 bracket' }
  }
};

// Helper function to get recommended quantities for UI
export function getRecommendedQuantities() {
  return stickerQuantityRules.standardQuantities;
}

// Helper function to validate quantity
export function validateStickerQuantity(quantity) {
  const { minQuantity, quantityIncrement } = stickerQuantityRules;
  
  // Ensure minimum quantity
  if (quantity < minQuantity) {
    return minQuantity;
  }
  
  // Round to nearest valid increment
  const remainder = quantity % quantityIncrement;
  if (remainder === 0) {
    return quantity;
  }
  
  // Round up to next valid increment
  return quantity + (quantityIncrement - remainder);
}

// Helper function to check if quantity is valid
export function isValidStickerQuantity(quantity) {
  const { minQuantity, quantityIncrement } = stickerQuantityRules;
  return quantity >= minQuantity && quantity % quantityIncrement === 0;
}