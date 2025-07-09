/**
 * Comprehensive error handling and recovery system
 * 
 * Features:
 * - Centralized error logging and reporting
 * - Graceful degradation for component failures
 * - User-friendly error messages
 * - Automatic recovery mechanisms
 * - Error boundaries for component isolation
 */

export class ErrorHandler {
  constructor() {
    this.errorLog = [];
    this.maxLogSize = 100;
    this.userNotificationThreshold = 3; // Show user notification after 3 errors
    this.errorCounts = new Map();
    
    // Set up global error handlers
    this.setupGlobalErrorHandlers();
  }

  /**
   * Set up global error handlers for unhandled errors
   */
  setupGlobalErrorHandlers() {
    // Handle JavaScript errors
    window.addEventListener('error', (event) => {
      this.handleError({
        type: 'javascript',
        message: event.message,
        filename: event.filename,
        line: event.lineno,
        column: event.colno,
        error: event.error,
        stack: event.error?.stack
      });
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError({
        type: 'promise',
        message: event.reason?.message || 'Unhandled promise rejection',
        error: event.reason,
        stack: event.reason?.stack
      });
    });

    // Handle service worker errors
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('error', (event) => {
        this.handleError({
          type: 'serviceworker',
          message: 'Service worker error',
          error: event.error
        });
      });
    }
  }

  /**
   * Handle an error with logging, user notification, and recovery
   * @param {Object} errorInfo - Error information object
   * @param {Object} options - Error handling options
   */
  handleError(errorInfo, options = {}) {
    const {
      component = 'unknown',
      severity = 'error',
      userMessage = null,
      recoveryAction = null,
      suppressNotification = false
    } = options;

    // Create standardized error entry
    const errorEntry = {
      id: this.generateErrorId(),
      timestamp: new Date().toISOString(),
      type: errorInfo.type || 'application',
      component,
      severity,
      message: errorInfo.message || 'Unknown error',
      stack: errorInfo.stack,
      userAgent: navigator.userAgent,
      url: window.location.href,
      ...errorInfo
    };

    // Log the error
    this.logError(errorEntry);

    // Track error frequency
    this.trackErrorFrequency(component, errorEntry.message);

    // Attempt recovery if specified
    if (recoveryAction && typeof recoveryAction === 'function') {
      try {
        recoveryAction(errorEntry);
      } catch (recoveryError) {
        this.logError({
          ...errorEntry,
          id: this.generateErrorId(),
          type: 'recovery',
          message: `Recovery failed: ${recoveryError.message}`,
          originalError: errorEntry
        });
      }
    }

    // Show user notification if needed
    if (!suppressNotification && this.shouldNotifyUser(component)) {
      this.showUserNotification(userMessage || this.getDefaultUserMessage(severity), severity);
    }

    // Report to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Application Error:', errorEntry);
    }
  }

  /**
   * Log error to internal error log
   * @param {Object} errorEntry - Standardized error entry
   */
  logError(errorEntry) {
    this.errorLog.unshift(errorEntry);
    
    // Maintain log size limit
    if (this.errorLog.length > this.maxLogSize) {
      this.errorLog = this.errorLog.slice(0, this.maxLogSize);
    }

    // Store critical errors in localStorage for persistence
    if (errorEntry.severity === 'critical') {
      try {
        const criticalErrors = JSON.parse(localStorage.getItem('instant-quote-critical-errors') || '[]');
        criticalErrors.unshift(errorEntry);
        localStorage.setItem('instant-quote-critical-errors', JSON.stringify(criticalErrors.slice(0, 10)));
      } catch (storageError) {
        // Storage failed, but don't throw
        console.warn('Failed to store critical error:', storageError);
      }
    }
  }

  /**
   * Track error frequency to detect patterns
   * @param {string} component - Component name
   * @param {string} message - Error message
   */
  trackErrorFrequency(component, message) {
    const key = `${component}:${message}`;
    const count = this.errorCounts.get(key) || 0;
    this.errorCounts.set(key, count + 1);

    // If error occurs frequently, escalate severity
    if (count >= 5) {
      this.handleError({
        type: 'pattern',
        message: `Recurring error detected in ${component}: ${message}`,
        frequency: count + 1
      }, { severity: 'critical', component: 'errorHandler' });
    }
  }

  /**
   * Determine if user should be notified based on error frequency
   * @param {string} component - Component name
   * @returns {boolean} Whether to show notification
   */
  shouldNotifyUser(component) {
    const recentErrors = this.errorLog.filter(
      error => error.component === component && 
      Date.now() - new Date(error.timestamp).getTime() < 60000 // Last minute
    );

    return recentErrors.length >= this.userNotificationThreshold;
  }

  /**
   * Show user-friendly error notification
   * @param {string} message - User message
   * @param {string} severity - Error severity
   */
  showUserNotification(message, severity = 'error') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `error-notification error-${severity}`;
    notification.innerHTML = `
      <div class="error-content">
        <div class="error-icon">${this.getErrorIcon(severity)}</div>
        <div class="error-message">${message}</div>
        <button class="error-dismiss" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;

    // Add styles if not already added
    this.ensureNotificationStyles();

    // Add to page
    document.body.appendChild(notification);

    // Auto-remove after delay
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, severity === 'critical' ? 10000 : 5000);
  }

  /**
   * Get appropriate icon for error severity
   * @param {string} severity - Error severity
   * @returns {string} Icon HTML
   */
  getErrorIcon(severity) {
    switch (severity) {
      case 'critical':
        return '⚠️';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      default:
        return 'ℹ️';
    }
  }

  /**
   * Get default user message for severity level
   * @param {string} severity - Error severity
   * @returns {string} User-friendly message
   */
  getDefaultUserMessage(severity) {
    switch (severity) {
      case 'critical':
        return 'A critical error occurred. Please refresh the page. If the problem persists, contact support.';
      case 'error':
        return 'An error occurred. The application may not function correctly. Please try again.';
      case 'warning':
        return 'A minor issue was detected. Functionality may be limited.';
      default:
        return 'Something unexpected happened. Please try again.';
    }
  }

  /**
   * Ensure notification styles are loaded
   */
  ensureNotificationStyles() {
    if (document.getElementById('error-notification-styles')) {
      return;
    }

    const styles = document.createElement('style');
    styles.id = 'error-notification-styles';
    styles.textContent = `
      .error-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        max-width: 400px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
      }
      
      .error-notification.error-critical {
        border-left: 4px solid #dc2626;
      }
      
      .error-notification.error-error {
        border-left: 4px solid #f59e0b;
      }
      
      .error-notification.error-warning {
        border-left: 4px solid #10b981;
      }
      
      .error-content {
        display: flex;
        align-items: center;
        padding: 16px;
        gap: 12px;
      }
      
      .error-icon {
        font-size: 20px;
        flex-shrink: 0;
      }
      
      .error-message {
        flex: 1;
        font-size: 14px;
        line-height: 1.4;
        color: #374151;
      }
      
      .error-dismiss {
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: #6b7280;
        padding: 0;
        flex-shrink: 0;
      }
      
      .error-dismiss:hover {
        color: #374151;
      }
      
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    
    document.head.appendChild(styles);
  }

  /**
   * Generate unique error ID
   * @returns {string} Unique error identifier
   */
  generateErrorId() {
    return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Create safe wrapper for component methods to catch errors
   * @param {Function} method - Method to wrap
   * @param {Object} context - Method context (this)
   * @param {string} componentName - Component name for error tracking
   * @returns {Function} Wrapped method
   */
  wrapMethod(method, context, componentName) {
    return function(...args) {
      try {
        return method.apply(context, args);
      } catch (error) {
        errorHandler.handleError({
          type: 'component',
          message: error.message,
          stack: error.stack,
          method: method.name
        }, {
          component: componentName,
          severity: 'error',
          recoveryAction: () => {
            // Attempt to recover by re-initializing component
            if (context.init && typeof context.init === 'function') {
              context.init();
            }
          }
        });
        return null;
      }
    };
  }

  /**
   * Get error statistics for debugging
   * @returns {Object} Error statistics
   */
  getErrorStats() {
    const now = Date.now();
    const last24Hours = this.errorLog.filter(
      error => now - new Date(error.timestamp).getTime() < 24 * 60 * 60 * 1000
    );

    return {
      totalErrors: this.errorLog.length,
      last24Hours: last24Hours.length,
      byComponent: this.groupErrorsByComponent(),
      bySeverity: this.groupErrorsBySeverity(),
      topErrors: this.getTopErrors()
    };
  }

  /**
   * Group errors by component
   * @returns {Object} Errors grouped by component
   */
  groupErrorsByComponent() {
    const groups = {};
    for (const error of this.errorLog) {
      groups[error.component] = (groups[error.component] || 0) + 1;
    }
    return groups;
  }

  /**
   * Group errors by severity
   * @returns {Object} Errors grouped by severity
   */
  groupErrorsBySeverity() {
    const groups = {};
    for (const error of this.errorLog) {
      groups[error.severity] = (groups[error.severity] || 0) + 1;
    }
    return groups;
  }

  /**
   * Get most frequent errors
   * @returns {Array} Top errors by frequency
   */
  getTopErrors() {
    const errorFreq = {};
    for (const error of this.errorLog) {
      const key = `${error.component}: ${error.message}`;
      errorFreq[key] = (errorFreq[key] || 0) + 1;
    }

    return Object.entries(errorFreq)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([error, count]) => ({ error, count }));
  }

  /**
   * Clear error log
   */
  clearErrorLog() {
    this.errorLog = [];
    this.errorCounts.clear();
    localStorage.removeItem('instant-quote-critical-errors');
  }
}

// Export singleton instance
export const errorHandler = new ErrorHandler();

// Utility function to wrap async functions
export const safeAsync = (asyncFn, component = 'unknown') => {
  return async (...args) => {
    try {
      return await asyncFn(...args);
    } catch (error) {
      errorHandler.handleError({
        type: 'async',
        message: error.message,
        stack: error.stack
      }, { component, severity: 'error' });
      return null;
    }
  };
};

// Utility function to wrap component classes
export const withErrorBoundary = (ComponentClass) => {
  return class extends ComponentClass {
    constructor(...args) {
      super(...args);
      
      // Wrap all methods with error handling
      const proto = Object.getPrototypeOf(this);
      const methodNames = Object.getOwnPropertyNames(proto);
      
      methodNames.forEach(name => {
        if (typeof this[name] === 'function' && name !== 'constructor') {
          this[name] = errorHandler.wrapMethod(this[name], this, ComponentClass.name);
        }
      });
    }
  };
};