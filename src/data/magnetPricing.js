/**
 * Magnet Pricing Data - Supplier Cost Matrices
 * Based on supplier pricing with 25% markup
 * All prices in Canadian Dollars (CAD)
 */

export const magnetSupplierCosts = {
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
};

export const magnetCustomerPricing = {
  '2X2': {
    brackets: [25, 50, 100, 250, 500, 1000],
    costs: [51.25, 76.25, 126.25, 216.25, 366.25, 666.25]
  },
  '3X3': {
    brackets: [25, 50, 100, 250, 500, 1000],
    costs: [66.25, 106.25, 187.50, 368.75, 672.50, 1278.75]
  },
  '4X4': {
    brackets: [25, 50, 100, 250, 500, 1000],
    costs: [86.25, 147.50, 270.00, 575.00, 1083.75, 2100.00]
  },
  '5X5': {
    brackets: [25, 50, 100, 250, 500, 1000],
    costs: [112.50, 198.75, 372.50, 832.50, 1598.75, 3130.00]
  }
};

// Size display information
export const magnetSizes = {
  '2X2': { key: '2X2', name: '2" × 2"', description: 'Small square magnet' },
  '3X3': { key: '3X3', name: '3" × 3"', description: 'Medium square magnet' },
  '4X4': { key: '4X4', name: '4" × 4"', description: 'Large square magnet' },
  '5X5': { key: '5X5', name: '5" × 5"', description: 'Extra large square magnet' }
};

// Quantity validation rules
export const magnetQuantityRules = {
  minQuantity: 25,
  quantityIncrement: 5,
  standardQuantities: [25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 
                      125, 150, 175, 200, 250, 300, 350, 400, 450, 500, 600, 700, 800, 900, 1000]
};

// Pricing calculation examples for validation
export const magnetPricingExamples = {
  '2X2': {
    '75': { supplier: 81.00, customer: 101.25, note: 'Between 50-100 bracket' },
    '25': { supplier: 41.00, customer: 51.25, note: 'Exact bracket match' },
    '1200': { supplier: 581.00, customer: 726.25, note: 'Extrapolated above 1000' }
  },
  '3X3': {
    '350': { supplier: 392.20, customer: 490.25, note: 'Between 250-500 bracket' },
    '30': { supplier: 59.40, customer: 74.25, note: 'Between 25-50 bracket' }
  }
};

// Helper function to get recommended quantities for UI
export function getRecommendedQuantities() {
  return magnetQuantityRules.standardQuantities;
}

// Helper function to validate quantity
export function validateMagnetQuantity(quantity) {
  const { minQuantity, quantityIncrement } = magnetQuantityRules;
  
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
export function isValidMagnetQuantity(quantity) {
  const { minQuantity, quantityIncrement } = magnetQuantityRules;
  return quantity >= minQuantity && quantity % quantityIncrement === 0;
}