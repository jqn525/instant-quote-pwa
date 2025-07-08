export class QuoteService {
  constructor(pricingEngine) {
    this.pricingEngine = pricingEngine;
  }

  /**
   * Generate a formatted quote
   * @param {Object} quoteData - Quote information
   * @returns {Object} Formatted quote
   */
  generateQuote(quoteData) {
    const {
      product,
      size,
      options,
      quantity,
      pricing,
      customerInfo = {},
      rushOrder = false
    } = quoteData;

    const quoteNumber = this.generateQuoteNumber();
    const date = new Date().toLocaleDateString();
    
    const quote = {
      quoteNumber,
      date,
      customer: {
        name: customerInfo.name || 'Walk-in Customer',
        phone: customerInfo.phone || '',
        email: customerInfo.email || ''
      },
      items: [{
        description: this.buildItemDescription(product, size, options),
        quantity: quantity,
        unitPrice: pricing.unitPrice,
        total: pricing.subtotal
      }],
      subtotal: pricing.subtotal,
      tax: pricing.tax,
      total: pricing.total,
      rushOrder: rushOrder,
      notes: this.buildNotes(product, size, options, rushOrder)
    };

    return quote;
  }

  /**
   * Build item description string
   * @param {Object} product - Product type
   * @param {Object} size - Selected size
   * @param {Array} options - Selected options
   * @returns {string} Item description
   */
  buildItemDescription(product, size, options) {
    let description = product.name;
    
    if (size) {
      description += ` - ${size.name}`;
    }
    
    if (options && options.length > 0) {
      const optionNames = options.map(opt => opt.name).join(', ');
      description += ` (${optionNames})`;
    }
    
    return description;
  }

  /**
   * Build notes for the quote
   * @param {Object} product - Product type
   * @param {Object} size - Selected size
   * @param {Array} options - Selected options
   * @param {boolean} rushOrder - Rush order flag
   * @returns {Array} Array of note strings
   */
  buildNotes(product, size, options, rushOrder) {
    const notes = [];
    
    if (product.description) {
      notes.push(`Product: ${product.description}`);
    }
    
    if (rushOrder) {
      notes.push('RUSH ORDER - Expedited processing requested');
    }
    
    notes.push('Quote valid for 30 days');
    notes.push('Payment required at time of order');
    
    return notes;
  }

  /**
   * Generate unique quote number
   * @returns {string} Quote number
   */
  generateQuoteNumber() {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const time = date.getTime().toString().slice(-4);
    
    return `Q${year}${month}${day}-${time}`;
  }

  /**
   * Format quote for display/printing
   * @param {Object} quote - Quote object
   * @returns {string} HTML formatted quote
   */
  formatQuoteHTML(quote) {
    return `
      <div class="quote-header">
        <h2>Print Shop Quote</h2>
        <div class="quote-meta">
          <p><strong>Quote #:</strong> ${quote.quoteNumber}</p>
          <p><strong>Date:</strong> ${quote.date}</p>
          ${quote.rushOrder ? '<p class="rush-order"><strong>RUSH ORDER</strong></p>' : ''}
        </div>
      </div>
      
      <div class="customer-info">
        <h3>Customer Information</h3>
        <p><strong>Name:</strong> ${quote.customer.name}</p>
        ${quote.customer.phone ? `<p><strong>Phone:</strong> ${quote.customer.phone}</p>` : ''}
        ${quote.customer.email ? `<p><strong>Email:</strong> ${quote.customer.email}</p>` : ''}
      </div>
      
      <div class="quote-items">
        <h3>Items</h3>
        <table class="quote-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${quote.items.map(item => `
              <tr>
                <td>${item.description}</td>
                <td>${item.quantity}</td>
                <td>${this.pricingEngine.formatPrice(item.unitPrice)}</td>
                <td>${this.pricingEngine.formatPrice(item.total)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      
      <div class="quote-totals">
        <div class="totals-row total">
          <span><strong>Total:</strong></span>
          <span><strong>${this.pricingEngine.formatPrice(quote.total)}</strong></span>
        </div>
      </div>
      
      ${quote.notes.length > 0 ? `
        <div class="quote-notes">
          <h3>Notes</h3>
          <ul>
            ${quote.notes.map(note => `<li>${note}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
    `;
  }

  /**
   * Save quote to local storage
   * @param {Object} quote - Quote object
   */
  saveQuote(quote) {
    const quotes = this.getSavedQuotes();
    quotes.unshift(quote);
    
    // Keep only last 50 quotes
    if (quotes.length > 50) {
      quotes.splice(50);
    }
    
    localStorage.setItem('instant-quote-history', JSON.stringify(quotes));
  }

  /**
   * Get saved quotes from local storage
   * @returns {Array} Array of saved quotes
   */
  getSavedQuotes() {
    try {
      const quotes = localStorage.getItem('instant-quote-history');
      return quotes ? JSON.parse(quotes) : [];
    } catch (error) {
      console.error('Error loading saved quotes:', error);
      return [];
    }
  }

  /**
   * Print quote
   * @param {string} quoteHTML - HTML formatted quote
   */
  printQuote(quoteHTML) {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Print Quote</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .quote-header { border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
          .quote-meta { display: flex; gap: 20px; margin-top: 10px; }
          .rush-order { color: red; font-weight: bold; }
          .quote-table { width: 100%; border-collapse: collapse; margin: 10px 0; }
          .quote-table th, .quote-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          .quote-table th { background-color: #f5f5f5; }
          .quote-totals { margin-top: 20px; }
          .totals-row { display: flex; justify-content: space-between; padding: 5px 0; }
          .totals-row.total { border-top: 2px solid #333; font-weight: bold; }
          .quote-notes ul { margin: 0; padding-left: 20px; }
          @media print {
            body { margin: 0; }
          }
        </style>
      </head>
      <body>
        ${quoteHTML}
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  }
}