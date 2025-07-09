/**
 * VersionTag Component
 * 
 * Displays app version and last update timestamp in a small, unobtrusive footer.
 * Uses build-time variables injected by Vite to show current version and build date.
 * 
 * @class VersionTag
 * @memberof Components
 */
export class VersionTag {
  /**
   * Create a VersionTag instance
   * @param {HTMLElement} container - Container element for the version tag
   */
  constructor(container) {
    this.container = container;
    
    // Get build-time variables injected by Vite
    this.version = __APP_VERSION__;
    this.buildTime = __BUILD_TIME__;
    
    this.init();
  }

  /**
   * Initialize the component
   */
  init() {
    this.render();
  }

  /**
   * Format the build timestamp into a human-readable date
   * @returns {string} Formatted date string
   */
  formatBuildDate() {
    try {
      const date = new Date(this.buildTime);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Unknown';
    }
  }

  /**
   * Render the version tag
   */
  render() {
    const formattedDate = this.formatBuildDate();
    
    this.container.innerHTML = `
      <div class="version-tag">
        <span class="version-text">v${this.version}</span>
        <span class="version-separator">•</span>
        <span class="build-time">Last updated: ${formattedDate}</span>
      </div>
    `;
  }

  /**
   * Get current version information
   * @returns {Object} Version and build information
   */
  getVersionInfo() {
    return {
      version: this.version,
      buildTime: this.buildTime,
      formattedBuildTime: this.formatBuildDate()
    };
  }

  /**
   * Clean up the component
   */
  destroy() {
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}