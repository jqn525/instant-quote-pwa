/**
 * Sticker Sheet Pricing Data - Supplier Cost Matrices
 * Based on supplier pricing with 25% markup
 * All prices in Canadian Dollars (CAD)
 * NOTE: These are placeholder values - update with actual supplier costs
 */

export const stickerSheetSupplierCosts = {
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
};

export const stickerSheetCustomerPricing = {
  '4X6': {
    brackets: [25, 50, 100, 250, 500, 1000],
    costs: [60.00, 98.75, 175.00, 343.75, 627.50, 1192.50]
  },
  '5X7': {
    brackets: [25, 50, 100, 250, 500, 1000],
    costs: [77.50, 131.25, 240.00, 510.00, 961.25, 1862.50]
  },
  '5.5X8.5': {
    brackets: [25, 50, 100, 250, 500, 1000],
    costs: [93.75, 165.00, 308.75, 690.00, 1326.25, 2596.25]
  }
};

// Size display information
export const stickerSheetSizes = {
  '4X6': { key: '4X6', name: '4" × 6"', description: 'Small kiss cut sticker sheet' },
  '5X7': { key: '5X7', name: '5" × 7"', description: 'Medium kiss cut sticker sheet' },
  '5.5X8.5': { key: '5.5X8.5', name: '5.5" × 8.5"', description: 'Large kiss cut sticker sheet' }
};

// Quantity validation rules
export const stickerSheetQuantityRules = {
  minQuantity: 25,
  quantityIncrement: 5,
  standardQuantities: [25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 
                      125, 150, 175, 200, 250, 300, 350, 400, 450, 500, 600, 700, 800, 900, 1000]
};

// Pricing calculation examples for validation
export const stickerSheetPricingExamples = {
  '4X6': {
    '75': { supplier: 109.00, customer: 136.25, note: 'Between 50-100 bracket' },
    '25': { supplier: 48.00, customer: 60.00, note: 'Exact bracket match' },
    '1200': { supplier: 1050.40, customer: 1313.00, note: 'Extrapolated above 1000' }
  },
  '5X7': {
    '350': { supplier: 548.80, customer: 686.00, note: 'Between 250-500 bracket' },
    '30': { supplier: 68.80, customer: 86.00, note: 'Between 25-50 bracket' }
  }
};

// Helper function to get recommended quantities for UI
export function getRecommendedQuantities() {
  return stickerSheetQuantityRules.standardQuantities;
}

// Helper function to validate quantity
export function validateStickerSheetQuantity(quantity) {
  const { minQuantity, quantityIncrement } = stickerSheetQuantityRules;
  
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
export function isValidStickerSheetQuantity(quantity) {
  const { minQuantity, quantityIncrement } = stickerSheetQuantityRules;
  return quantity >= minQuantity && quantity % quantityIncrement === 0;
}