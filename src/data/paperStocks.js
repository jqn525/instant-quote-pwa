// Paper stocks and configuration data
export const paperStocks = {
  "LYNODI312FSC": {
    "brand": "Lynx",
    "type": "text_stock",
    "finish": "Uncoated",
    "size": "13x19",
    "weight": "60#",
    "costPerSheet": 0.08548,
    "displayName": "60# Text Uncoated"
  },
  "LYNO416FSC": {
    "brand": "Lynx",
    "type": "text_stock",
    "finish": "Uncoated",
    "size": "13x19",
    "weight": "80#",
    "costPerSheet": 0.11397,
    "displayName": "80# Text Uncoated"
  },
  "LYNOC76FSC": {
    "brand": "Lynx",
    "type": "cover_stock",
    "finish": "Uncoated",
    "size": "13x19",
    "weight": "80#",
    "costPerSheet": 0.22408,
    "displayName": "80# Cover Uncoated"
  },
  "LYNOC95FSC": {
    "brand": "Lynx",
    "type": "cover_stock",
    "finish": "Uncoated",
    "size": "13x19",
    "weight": "100#",
    "costPerSheet": 0.28010,
    "displayName": "100# Cover Uncoated"
  },
  "LYNODIC11413FSC": {
    "brand": "Lynx",
    "type": "cover_stock",
    "finish": "Uncoated",
    "size": "13x19",
    "weight": "120#",
    "costPerSheet": 0.38147,
    "displayName": "120# Cover Uncoated"
  },
  "COUDCCDIC123513FSC": {
    "brand": "Cougar",
    "type": "cover_stock",
    "finish": "Uncoated",
    "size": "13x19",
    "weight": "130#",
    "costPerSheet": 0.53800,
    "displayName": "130# Cover Uncoated"
  },
  "PACDIS42FSC": {
    "brand": "Pacesetter",
    "type": "text_stock",
    "finish": "Silk",
    "size": "13x19",
    "weight": "80#",
    "costPerSheet": 0.07702,
    "displayName": "80# Text Silk"
  },
  "PACDIS52FSC": {
    "brand": "Pacesetter",
    "type": "text_stock",
    "finish": "Silk",
    "size": "13x19",
    "weight": "100#",
    "costPerSheet": 0.09536,
    "displayName": "100# Text Silk"
  },
  "PACDISC7613FSC": {
    "brand": "Pacesetter",
    "type": "cover_stock",
    "finish": "Silk",
    "size": "13x19",
    "weight": "80#",
    "costPerSheet": 0.14204,
    "displayName": "80# Cover Silk"
  },
  "PACDISC9513FSC": {
    "brand": "Pacesetter",
    "type": "cover_stock",
    "finish": "Silk",
    "size": "13x19",
    "weight": "100#",
    "costPerSheet": 0.17756,
    "displayName": "100# Cover Silk"
  },
  "PACDISC12413FSC": {
    "brand": "Pacesetter",
    "type": "cover_stock",
    "finish": "Silk",
    "size": "13x19",
    "weight": "130#",
    "costPerSheet": 0.23176,
    "displayName": "130# Cover Silk"
  }
};

export const productPaperRules = {
  "brochures": {
    "displayName": "Brochures",
    "allowedTypes": ["text_stock", "cover_stock"],
    "allowedWeights": null,
    "defaultPaper": "PACDIS42FSC"
  },
  "postcards": {
    "displayName": "Postcards",
    "allowedTypes": ["cover_stock"],
    "allowedWeights": null,
    "defaultPaper": "LYNOC95FSC"
  },
  "flyers": {
    "displayName": "Flyers",
    "allowedTypes": ["text_stock", "cover_stock"],
    "allowedWeights": null,
    "defaultPaper": "PACDIS42FSC"
  },
  "bookmarks": {
    "displayName": "Bookmarks",
    "allowedTypes": ["cover_stock"],
    "allowedWeights": ["80#", "100#", "120#", "130#"],
    "defaultPaper": "LYNODIC11413FSC"
  },
  "table_tents": {
    "displayName": "Table Tent Cards",
    "allowedTypes": ["cover_stock"],
    "allowedWeights": ["80#", "100#", "120#", "130#"],
    "defaultPaper": "PACDISC9513FSC"
  }
};

// Helper function to get allowed papers for a product
export function getAllowedPapers(productKey) {
  const rules = productPaperRules[productKey];
  if (!rules) return [];

  return Object.entries(paperStocks).filter(([paperId, paper]) => {
    // Check if paper type is allowed
    if (!rules.allowedTypes.includes(paper.type)) {
      return false;
    }

    // Check if paper weight is allowed (if weight restrictions exist)
    if (rules.allowedWeights && !rules.allowedWeights.includes(paper.weight)) {
      return false;
    }

    return true;
  }).map(([paperId, paper]) => ({
    id: paperId,
    ...paper
  }));
}

// Helper function to get default paper for a product
export function getDefaultPaper(productKey) {
  const rules = productPaperRules[productKey];
  if (!rules || !rules.defaultPaper) return null;

  return {
    id: rules.defaultPaper,
    ...paperStocks[rules.defaultPaper]
  };
}

// Click cost constant (assumes double-sided printing)
export const CLICK_COST = 0.10;

// Helper functions for hierarchical paper selection

// Get available paper types for a product
export function getAvailablePaperTypes(productKey) {
  const rules = productPaperRules[productKey];
  if (!rules) return [];

  return rules.allowedTypes.map(type => ({
    key: type,
    name: type === 'text_stock' ? 'Text Stock' : 'Cover Stock',
    description: type === 'text_stock' 
      ? 'Lighter weight, flexible paper for flyers and brochures'
      : 'Heavier weight, durable paper for postcards and premium materials'
  }));
}

// Get available weights for a product and paper type
export function getAvailableWeights(productKey, paperType) {
  const allowedPapers = getAllowedPapers(productKey);
  const weightsSet = new Set();

  allowedPapers
    .filter(paper => paper.type === paperType)
    .forEach(paper => weightsSet.add(paper.weight));

  return Array.from(weightsSet).sort((a, b) => {
    // Sort by numeric value (60# < 80# < 100# etc.)
    const numA = parseInt(a.replace('#', ''));
    const numB = parseInt(b.replace('#', ''));
    return numA - numB;
  });
}

// Get available finishes for a product, paper type, and weight
export function getAvailableFinishes(productKey, paperType, weight) {
  const allowedPapers = getAllowedPapers(productKey);
  const finishesSet = new Set();

  allowedPapers
    .filter(paper => paper.type === paperType && paper.weight === weight)
    .forEach(paper => finishesSet.add(paper.finish));

  return Array.from(finishesSet).sort();
}

// Get specific paper by type, weight, and finish
export function getPaperBySpecification(productKey, paperType, weight, finish) {
  const allowedPapers = getAllowedPapers(productKey);
  
  return allowedPapers.find(paper => 
    paper.type === paperType && 
    paper.weight === weight && 
    paper.finish === finish
  );
}

// Get paper type from paper ID
export function getPaperTypeFromId(paperId) {
  const paper = paperStocks[paperId];
  return paper ? paper.type : null;
}

// Get weight from paper ID  
export function getWeightFromId(paperId) {
  const paper = paperStocks[paperId];
  return paper ? paper.weight : null;
}

// Get finish from paper ID
export function getFinishFromId(paperId) {
  const paper = paperStocks[paperId];
  return paper ? paper.finish : null;
}