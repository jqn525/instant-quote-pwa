/**
 * External Products Data Structure
 * Products sourced from external suppliers with interpolation-based pricing
 */

import { magnetSupplierCosts, magnetQuantityRules, magnetSizes } from './magnetPricing.js';
import { stickerSupplierCosts, stickerQuantityRules, stickerSizes } from './stickerPricing.js';
import { stickerSheetSupplierCosts, stickerSheetQuantityRules, stickerSheetSizes } from './stickerSheetPricing.js';

export const externalProducts = {
  magnets: {
    key: 'magnets',
    name: 'Magnets',
    description: 'Custom printed magnets (external supplier)',
    category: 'external',
    icon: null, // Will be set by ProductSelector when rendering
    pricing: {
      type: 'interpolation',
      markup: 1.25, // 25% markup on supplier cost
      minQuantity: magnetQuantityRules.minQuantity,
      quantityIncrement: magnetQuantityRules.quantityIncrement,
      supplierCosts: magnetSupplierCosts
    },
    sizes: magnetSizes,
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
    // Recommended size for auto-selection
    recommendedSize: '3X3',
    // Standard quantity options for UI
    standardQuantities: magnetQuantityRules.standardQuantities
  },
  
  stickers: {
    key: 'stickers',
    name: 'Stickers',
    description: 'Custom die cut stickers (external supplier)',
    category: 'external',
    icon: null, // Will be set by ProductSelector when rendering
    pricing: {
      type: 'interpolation',
      markup: 1.25, // 25% markup on supplier cost
      minQuantity: stickerQuantityRules.minQuantity,
      quantityIncrement: stickerQuantityRules.quantityIncrement,
      supplierCosts: stickerSupplierCosts
    },
    sizes: stickerSizes,
    workflow: 'simplified', // Skip paper/finishing selection
    orderRules: {
      minQuantity: 25,
      quantityIncrement: 5,
      orderNotes: [
        'Minimum order: 25 pieces per design',
        'Orders must be in increments of 5 pieces',
        'Each design is priced separately (no bundling)',
        'Custom die cut included in price'
      ]
    },
    // Recommended size for auto-selection
    recommendedSize: '3X3',
    // Standard quantity options for UI
    standardQuantities: stickerQuantityRules.standardQuantities
  },
  
  sticker_sheets: {
    key: 'sticker_sheets',
    name: 'Sticker Sheets',
    description: 'Custom kiss cut sticker sheets (external supplier)',
    category: 'external',
    icon: null, // Will be set by ProductSelector when rendering
    pricing: {
      type: 'interpolation',
      markup: 1.25, // 25% markup on supplier cost
      minQuantity: stickerSheetQuantityRules.minQuantity,
      quantityIncrement: stickerSheetQuantityRules.quantityIncrement,
      supplierCosts: stickerSheetSupplierCosts
    },
    sizes: stickerSheetSizes,
    workflow: 'simplified', // Skip paper/finishing selection
    orderRules: {
      minQuantity: 25,
      quantityIncrement: 5,
      orderNotes: [
        'Minimum order: 25 sheets per design',
        'Orders must be in increments of 5 sheets',
        'Each design is priced separately (no bundling)',
        'Custom kiss cut included in price'
      ]
    },
    // Recommended size for auto-selection
    recommendedSize: '5X7',
    // Standard quantity options for UI
    standardQuantities: stickerSheetQuantityRules.standardQuantities
  }
};

// Product categories for UI organization
export const productCategories = {
  inhouse: {
    key: 'inhouse',
    name: 'Print Shop Products',
    description: 'Products printed in-house with custom sizing and finishing options',
    order: 1
  },
  external: {
    key: 'external', 
    name: 'Specialty Items',
    description: 'Products sourced from external suppliers',
    order: 2
  }
};

// Helper function to get all external products
export function getAllExternalProducts() {
  return externalProducts;
}

// Helper function to get product by key
export function getExternalProduct(key) {
  return externalProducts[key] || null;
}

// Helper function to check if product is external
export function isExternalProduct(productKey) {
  return externalProducts.hasOwnProperty(productKey);
}

// Helper function to get category information
export function getProductCategory(categoryKey) {
  return productCategories[categoryKey] || null;
}

// Helper function to get all categories
export function getAllCategories() {
  return Object.values(productCategories).sort((a, b) => a.order - b.order);
}