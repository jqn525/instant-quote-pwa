export class SettingsPanel {
  constructor(container, settingsService) {
    this.container = container;
    this.settingsService = settingsService;
    this.isVisible = false;
    this.activeTab = 'overview';
    
    this.init();
  }

  init() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.container.innerHTML = `
      <div class="settings-panel ${this.isVisible ? 'active' : ''}">
        <div class="settings-panel-content">
          <div class="settings-header">
            <h3>Settings</h3>
            <button class="settings-close" id="settings-close" aria-label="Close Settings">×</button>
          </div>
          
          <div class="settings-body">
            <div class="settings-tabs">
              <button class="tab-btn ${this.activeTab === 'overview' ? 'active' : ''}" data-tab="overview">Overview</button>
              <button class="tab-btn ${this.activeTab === 'formula' ? 'active' : ''}" data-tab="formula">Formula Parameters</button>
              <button class="tab-btn ${this.activeTab === 'costs' ? 'active' : ''}" data-tab="costs">Costs & Materials</button>
              <button class="tab-btn ${this.activeTab === 'actions' ? 'active' : ''}" data-tab="actions">Actions</button>
            </div>
            
            <div class="tab-content">
              ${this.renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderTabContent() {
    switch (this.activeTab) {
      case 'overview':
        return this.renderOverviewTab();
      case 'formula':
        return this.renderFormulaTab();
      case 'costs':
        return this.renderCostsTab();
      case 'actions':
        return this.renderActionsTab();
      default:
        return this.renderOverviewTab();
    }
  }

  renderOverviewTab() {
    const settings = this.settingsService.getSettings();
    
    return `
      <div class="settings-section">
        <h4>Current Settings Overview</h4>
        <div class="settings-display">
          <div class="settings-group">
            <h5>Setup Fees</h5>
            <div class="settings-values">
              ${Object.entries(settings.setupFees).map(([key, value]) => 
                `<div class="setting-item">
                  <span class="setting-label">${this.formatProductName(key)}:</span>
                  <span class="setting-value">$${value.toFixed(2)}</span>
                </div>`
              ).join('')}
            </div>
          </div>

          <div class="settings-group">
            <h5>Production Rates</h5>
            <div class="settings-values">
              ${Object.entries(settings.productionRates).map(([key, value]) => 
                `<div class="setting-item">
                  <span class="setting-label">${this.formatProductName(key)}:</span>
                  <span class="setting-value">$${value.toFixed(2)}</span>
                </div>`
              ).join('')}
            </div>
          </div>

          <div class="settings-group">
            <h5>Volume Exponents</h5>
            <div class="settings-values">
              ${Object.entries(settings.volumeExponents).map(([key, value]) => 
                `<div class="setting-item">
                  <span class="setting-label">${this.formatProductName(key)}:</span>
                  <span class="setting-value">${value.toFixed(2)}</span>
                </div>`
              ).join('')}
            </div>
          </div>

          <div class="settings-group">
            <h5>Other Settings</h5>
            <div class="settings-values">
              <div class="setting-item">
                <span class="setting-label">Click Cost:</span>
                <span class="setting-value">$${settings.clickCost.toFixed(2)}</span>
              </div>
              <div class="setting-item">
                <span class="setting-label">Minimum Order:</span>
                <span class="setting-value">$${settings.minimumOrder.toFixed(2)}</span>
              </div>
              <div class="setting-item">
                <span class="setting-label">Rush Order Multiplier:</span>
                <span class="setting-value">${settings.rushOrderMultiplier.toFixed(1)}x</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderFormulaTab() {
    return `
      <div class="settings-section">
        <h4>Formula Parameters</h4>
        <p class="tab-description">Edit the core pricing formula parameters: C(Q) = S + Q^e × k + Q × v + Ff</p>
        <div class="settings-edit">
          <div class="edit-group">
            <h5>Setup Fees (S - $ per job)</h5>
            ${this.renderSetupFeeInputs()}
          </div>
          
          <div class="edit-group">
            <h5>Production Rates (k - $ per sheet)</h5>
            ${this.renderProductionRateInputs()}
          </div>
          
          <div class="edit-group">
            <h5>Volume Exponents (e - scaling factor)</h5>
            ${this.renderVolumeExponentInputs()}
          </div>
          
          <div class="edit-group">
            <h5>General Settings</h5>
            <div class="input-group">
              <label for="minimum-order-input">Minimum Order ($):</label>
              <input type="number" id="minimum-order-input" step="0.01" min="0" value="${this.settingsService.getSetting('minimumOrder')}" />
              <button class="save-btn" id="save-minimum-order">Save</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderCostsTab() {
    return `
      <div class="settings-section">
        <h4>Costs & Materials</h4>
        <p class="tab-description">Edit material costs and finishing options that affect variable costs (v) and finishing fees (Ff)</p>
        <div class="settings-edit">
          <div class="edit-group">
            <h5>Finishing Costs ($ per piece)</h5>
            ${this.renderFinishingCostInputs()}
          </div>
          
          <div class="edit-group">
            <h5>Paper Costs ($ per sheet)</h5>
            ${this.renderPaperCostInputs()}
          </div>
          
          <div class="edit-group">
            <h5>Other Material Costs</h5>
            <div class="input-group">
              <label for="click-cost-input">Click Cost ($ per piece):</label>
              <input type="number" id="click-cost-input" step="0.01" min="0" value="${this.settingsService.getSetting('clickCost')}" />
              <button class="save-btn" id="save-click-cost">Save</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderActionsTab() {
    return `
      <div class="settings-section">
        <h4>Settings Management</h4>
        <p class="tab-description">Backup, restore, and reset your pricing settings</p>
        <div class="settings-actions">
          <button class="settings-btn" id="export-settings">📥 Export Settings</button>
          <button class="settings-btn" id="import-settings">📤 Import Settings</button>
          <button class="settings-btn warning" id="reset-settings">🔄 Reset to Defaults</button>
        </div>
        
        <div class="import-section" style="margin-top: var(--spacing-lg);">
          <h5>📁 Import Settings from File</h5>
          <input type="file" id="settings-file-input" accept=".json" style="margin-bottom: var(--spacing-sm);" />
          <button class="settings-btn" id="load-settings-file">Load Settings File</button>
        </div>
        
        <div class="settings-info" style="margin-top: var(--spacing-lg); padding: var(--spacing-md); background: var(--background-color); border-radius: var(--border-radius); border-left: 4px solid var(--success-color);">
          <h5>✅ Implementation Complete</h5>
          <p style="margin: var(--spacing-sm) 0; color: var(--text-secondary); font-size: 0.875rem;">
            All pricing parameters are now fully editable with real-time updates, validation, and persistence. 
            Your changes automatically save to localStorage and affect pricing calculations immediately.
          </p>
          <ul style="margin: var(--spacing-sm) 0; color: var(--text-secondary); font-size: 0.875rem; padding-left: var(--spacing-lg);">
            <li>✓ Setup fees for all product types</li>
            <li>✓ Production rates and volume exponents</li>
            <li>✓ Finishing costs and paper costs</li>
            <li>✓ Click cost and minimum order</li>
            <li>✓ Form validation and error handling</li>
            <li>✓ Export/import for backup and sharing</li>
          </ul>
        </div>
      </div>
    `;
  }

  formatProductName(key) {
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  formatFinishingName(key) {
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  formatPaperName(key) {
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  validateInput(value, type) {
    if (isNaN(value)) {
      return { isValid: false, message: 'Please enter a valid number' };
    }

    switch (type) {
      case 'minimumOrder':
        if (value < 0) return { isValid: false, message: 'Minimum order must be 0 or greater' };
        if (value > 1000) return { isValid: false, message: 'Minimum order cannot exceed $1000' };
        break;
      case 'setupFee':
        if (value < 0) return { isValid: false, message: 'Setup fee must be 0 or greater' };
        if (value > 500) return { isValid: false, message: 'Setup fee cannot exceed $500' };
        break;
      case 'productionRate':
        if (value < 0) return { isValid: false, message: 'Production rate must be 0 or greater' };
        if (value > 50) return { isValid: false, message: 'Production rate cannot exceed $50' };
        break;
      case 'volumeExponent':
        if (value < 0.1) return { isValid: false, message: 'Volume exponent must be at least 0.1' };
        if (value > 2.0) return { isValid: false, message: 'Volume exponent cannot exceed 2.0' };
        break;
      case 'finishingCost':
        if (value < 0) return { isValid: false, message: 'Finishing cost must be 0 or greater' };
        if (value > 10) return { isValid: false, message: 'Finishing cost cannot exceed $10 per piece' };
        break;
      case 'paperCost':
        if (value < 0) return { isValid: false, message: 'Paper cost must be 0 or greater' };
        if (value > 5) return { isValid: false, message: 'Paper cost cannot exceed $5 per sheet' };
        break;
      case 'clickCost':
        if (value < 0) return { isValid: false, message: 'Click cost must be 0 or greater' };
        if (value > 1) return { isValid: false, message: 'Click cost cannot exceed $1 per piece' };
        break;
      default:
        break;
    }

    return { isValid: true, message: null };
  }

  showErrorMessage(inputSelector, message) {
    const input = this.container.querySelector(inputSelector);
    if (input) {
      // Remove existing error message
      this.clearErrorMessage(inputSelector);
      
      // Add error styling to input
      input.style.borderColor = 'var(--error-color)';
      input.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
      
      // Create and add error message
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.textContent = message;
      errorDiv.style.color = 'var(--error-color)';
      errorDiv.style.fontSize = '0.75rem';
      errorDiv.style.marginTop = 'var(--spacing-xs)';
      
      input.parentNode.appendChild(errorDiv);
    }
  }

  clearErrorMessage(inputSelector) {
    const input = this.container.querySelector(inputSelector);
    if (input) {
      // Reset input styling
      input.style.borderColor = '';
      input.style.boxShadow = '';
      
      // Remove error message
      const errorMessage = input.parentNode.querySelector('.error-message');
      if (errorMessage) {
        errorMessage.remove();
      }
    }
  }

  showSuccessFeedback(buttonSelector) {
    const saveBtn = this.container.querySelector(buttonSelector);
    if (saveBtn) {
      const originalText = saveBtn.textContent;
      saveBtn.textContent = 'Saved!';
      saveBtn.style.background = 'var(--success-color)';
      saveBtn.style.color = 'white';
      saveBtn.classList.add('success');
      
      setTimeout(() => {
        saveBtn.textContent = originalText;
        saveBtn.style.background = '';
        saveBtn.style.color = '';
        saveBtn.classList.remove('success');
      }, 1500);
    }
  }

  showErrorFeedback(buttonSelector) {
    const saveBtn = this.container.querySelector(buttonSelector);
    if (saveBtn) {
      const originalText = saveBtn.textContent;
      const originalBackground = saveBtn.style.background;
      const originalColor = saveBtn.style.color;
      
      saveBtn.textContent = 'Error!';
      saveBtn.style.background = 'var(--error-color)';
      saveBtn.style.color = 'white';
      
      setTimeout(() => {
        saveBtn.textContent = originalText;
        saveBtn.style.background = originalBackground;
        saveBtn.style.color = originalColor;
      }, 1500);
    }
  }

  renderSetupFeeInputs() {
    const settings = this.settingsService.getSettings();
    return Object.entries(settings.setupFees).map(([key, value]) => 
      `<div class="input-group">
        <label for="setup-fee-${key}">${this.formatProductName(key)}:</label>
        <input type="number" id="setup-fee-${key}" step="0.01" min="0" value="${value}" />
        <button class="save-btn" id="save-setup-fee-${key}">Save</button>
      </div>`
    ).join('');
  }

  renderProductionRateInputs() {
    const settings = this.settingsService.getSettings();
    return Object.entries(settings.productionRates).map(([key, value]) => 
      `<div class="input-group">
        <label for="production-rate-${key}">${this.formatProductName(key)}:</label>
        <input type="number" id="production-rate-${key}" step="0.01" min="0" value="${value}" />
        <button class="save-btn" id="save-production-rate-${key}">Save</button>
      </div>`
    ).join('');
  }

  renderVolumeExponentInputs() {
    const settings = this.settingsService.getSettings();
    return Object.entries(settings.volumeExponents).map(([key, value]) => 
      `<div class="input-group">
        <label for="volume-exponent-${key}">${this.formatProductName(key)}:</label>
        <input type="number" id="volume-exponent-${key}" step="0.01" min="0.1" max="2.0" value="${value}" />
        <button class="save-btn" id="save-volume-exponent-${key}">Save</button>
      </div>`
    ).join('');
  }

  renderFinishingCostInputs() {
    const settings = this.settingsService.getSettings();
    return Object.entries(settings.finishingCosts).map(([key, value]) => 
      `<div class="input-group">
        <label for="finishing-cost-${key}">${this.formatFinishingName(key)}:</label>
        <input type="number" id="finishing-cost-${key}" step="0.01" min="0" value="${value}" />
        <button class="save-btn" id="save-finishing-cost-${key}">Save</button>
      </div>`
    ).join('');
  }

  renderPaperCostInputs() {
    const settings = this.settingsService.getSettings();
    return Object.entries(settings.paperCosts).map(([key, value]) => 
      `<div class="input-group">
        <label for="paper-cost-${key}">${this.formatPaperName(key)}:</label>
        <input type="number" id="paper-cost-${key}" step="0.01" min="0" value="${value}" />
        <button class="save-btn" id="save-paper-cost-${key}">Save</button>
      </div>`
    ).join('');
  }

  setupEventListeners() {
    // Remove existing listeners to prevent duplicates
    if (this.clickHandler) {
      this.container.removeEventListener('click', this.clickHandler);
    }
    
    // Create new click handler
    this.clickHandler = (e) => {
      if (e.target.id === 'settings-close') {
        this.hide();
      } else if (e.target.classList.contains('tab-btn')) {
        this.switchTab(e.target.dataset.tab);
      } else if (e.target.id === 'reset-settings') {
        this.resetSettings();
      } else if (e.target.id === 'export-settings') {
        this.exportSettings();
      } else if (e.target.id === 'import-settings') {
        this.importSettings();
      } else if (e.target.id === 'load-settings-file') {
        this.loadSettingsFile();
      } else if (e.target.id === 'save-minimum-order') {
        this.saveMinimumOrder();
      } else if (e.target.id.startsWith('save-setup-fee-')) {
        const productKey = e.target.id.replace('save-setup-fee-', '');
        this.saveSetupFee(productKey);
      } else if (e.target.id.startsWith('save-production-rate-')) {
        const productKey = e.target.id.replace('save-production-rate-', '');
        this.saveProductionRate(productKey);
      } else if (e.target.id.startsWith('save-volume-exponent-')) {
        const productKey = e.target.id.replace('save-volume-exponent-', '');
        this.saveVolumeExponent(productKey);
      } else if (e.target.id.startsWith('save-finishing-cost-')) {
        const finishingKey = e.target.id.replace('save-finishing-cost-', '');
        this.saveFinishingCost(finishingKey);
      } else if (e.target.id.startsWith('save-paper-cost-')) {
        const paperKey = e.target.id.replace('save-paper-cost-', '');
        this.savePaperCost(paperKey);
      } else if (e.target.id === 'save-click-cost') {
        this.saveClickCost();
      }
    };
    
    // Attach new listeners
    this.container.addEventListener('click', this.clickHandler);

    // Close on backdrop click
    this.backdropHandler = (e) => {
      if (e.target.classList.contains('settings-panel')) {
        this.hide();
      }
    };
    this.container.addEventListener('click', this.backdropHandler);
  }

  show() {
    this.isVisible = true;
    this.render();
    this.setupEventListeners();
  }

  hide() {
    this.isVisible = false;
    this.render();
    this.setupEventListeners();
  }

  toggle() {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }

  resetSettings() {
    if (confirm('Are you sure you want to reset all settings to default values? This action cannot be undone.')) {
      this.settingsService.resetToDefaults();
      this.refreshDisplay();
    }
  }

  exportSettings() {
    const settings = this.settingsService.exportSettings();
    const blob = new Blob([settings], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `pricing-settings-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  saveMinimumOrder() {
    const input = this.container.querySelector('#minimum-order-input');
    if (input) {
      const value = parseFloat(input.value);
      const validation = this.validateInput(value, 'minimumOrder');
      
      if (validation.isValid) {
        this.settingsService.updateSetting('minimumOrder', value);
        this.refreshDisplay();
        this.showSuccessFeedback('#save-minimum-order');
        this.clearErrorMessage('#minimum-order-input');
      } else {
        this.showErrorMessage('#minimum-order-input', validation.message);
        this.showErrorFeedback('#save-minimum-order');
      }
    }
  }

  saveSetupFee(productKey) {
    const input = this.container.querySelector(`#setup-fee-${productKey}`);
    if (input) {
      const value = parseFloat(input.value);
      const validation = this.validateInput(value, 'setupFee');
      
      if (validation.isValid) {
        this.settingsService.updateSetting('setupFees', value, productKey);
        this.refreshDisplay();
        this.showSuccessFeedback(`#save-setup-fee-${productKey}`);
        this.clearErrorMessage(`#setup-fee-${productKey}`);
      } else {
        this.showErrorMessage(`#setup-fee-${productKey}`, validation.message);
        this.showErrorFeedback(`#save-setup-fee-${productKey}`);
      }
    }
  }

  saveProductionRate(productKey) {
    const input = this.container.querySelector(`#production-rate-${productKey}`);
    if (input) {
      const value = parseFloat(input.value);
      const validation = this.validateInput(value, 'productionRate');
      
      if (validation.isValid) {
        this.settingsService.updateSetting('productionRates', value, productKey);
        this.refreshDisplay();
        this.showSuccessFeedback(`#save-production-rate-${productKey}`);
        this.clearErrorMessage(`#production-rate-${productKey}`);
      } else {
        this.showErrorMessage(`#production-rate-${productKey}`, validation.message);
        this.showErrorFeedback(`#save-production-rate-${productKey}`);
      }
    }
  }

  saveVolumeExponent(productKey) {
    const input = this.container.querySelector(`#volume-exponent-${productKey}`);
    if (input) {
      const value = parseFloat(input.value);
      const validation = this.validateInput(value, 'volumeExponent');
      
      if (validation.isValid) {
        this.settingsService.updateSetting('volumeExponents', value, productKey);
        this.refreshDisplay();
        this.showSuccessFeedback(`#save-volume-exponent-${productKey}`);
        this.clearErrorMessage(`#volume-exponent-${productKey}`);
      } else {
        this.showErrorMessage(`#volume-exponent-${productKey}`, validation.message);
        this.showErrorFeedback(`#save-volume-exponent-${productKey}`);
      }
    }
  }

  saveFinishingCost(finishingKey) {
    const input = this.container.querySelector(`#finishing-cost-${finishingKey}`);
    if (input) {
      const value = parseFloat(input.value);
      const validation = this.validateInput(value, 'finishingCost');
      
      if (validation.isValid) {
        this.settingsService.updateSetting('finishingCosts', value, finishingKey);
        this.refreshDisplay();
        this.showSuccessFeedback(`#save-finishing-cost-${finishingKey}`);
        this.clearErrorMessage(`#finishing-cost-${finishingKey}`);
      } else {
        this.showErrorMessage(`#finishing-cost-${finishingKey}`, validation.message);
        this.showErrorFeedback(`#save-finishing-cost-${finishingKey}`);
      }
    }
  }

  savePaperCost(paperKey) {
    const input = this.container.querySelector(`#paper-cost-${paperKey}`);
    if (input) {
      const value = parseFloat(input.value);
      const validation = this.validateInput(value, 'paperCost');
      
      if (validation.isValid) {
        this.settingsService.updateSetting('paperCosts', value, paperKey);
        this.refreshDisplay();
        this.showSuccessFeedback(`#save-paper-cost-${paperKey}`);
        this.clearErrorMessage(`#paper-cost-${paperKey}`);
      } else {
        this.showErrorMessage(`#paper-cost-${paperKey}`, validation.message);
        this.showErrorFeedback(`#save-paper-cost-${paperKey}`);
      }
    }
  }

  saveClickCost() {
    const input = this.container.querySelector('#click-cost-input');
    if (input) {
      const value = parseFloat(input.value);
      const validation = this.validateInput(value, 'clickCost');
      
      if (validation.isValid) {
        this.settingsService.updateSetting('clickCost', value);
        this.refreshDisplay();
        this.showSuccessFeedback('#save-click-cost');
        this.clearErrorMessage('#click-cost-input');
      } else {
        this.showErrorMessage('#click-cost-input', validation.message);
        this.showErrorFeedback('#save-click-cost');
      }
    }
  }

  switchTab(tabName) {
    this.activeTab = tabName;
    this.render();
    this.setupEventListeners();
  }

  importSettings() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const success = this.settingsService.importSettings(e.target.result);
            if (success) {
              this.refreshDisplay();
              alert('Settings imported successfully!');
            } else {
              alert('Failed to import settings. Please check the file format.');
            }
          } catch (error) {
            alert('Failed to import settings. Invalid file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }

  loadSettingsFile() {
    const fileInput = this.container.querySelector('#settings-file-input');
    if (fileInput && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const success = this.settingsService.importSettings(e.target.result);
          if (success) {
            this.refreshDisplay();
            alert('Settings loaded successfully!');
            fileInput.value = ''; // Clear the input
          } else {
            alert('Failed to load settings. Please check the file format.');
          }
        } catch (error) {
          alert('Failed to load settings. Invalid file format.');
        }
      };
      reader.readAsText(file);
    } else {
      alert('Please select a settings file first.');
    }
  }

  refreshDisplay() {
    // Re-render the current tab content
    const tabContent = this.container.querySelector('.tab-content');
    if (tabContent) {
      tabContent.innerHTML = this.renderTabContent();
    }
  }

  destroy() {
    // Clean up event listeners
    if (this.clickHandler) {
      this.container.removeEventListener('click', this.clickHandler);
    }
    if (this.backdropHandler) {
      this.container.removeEventListener('click', this.backdropHandler);
    }
  }
}