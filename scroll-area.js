/**
 * ScrollArea Web Component
 * A custom element that manages horizontal or vertical scrolling
 */
class ScrollArea extends HTMLElement {
  constructor() {
    super();
    
    // Attach shadow DOM
    this.attachShadow({ mode: 'open' });
    
    // Initialize properties
    this._orientation = null; // 'horizontal', 'vertical', or null for auto-detect
    this._resizeObserver = null;
  }
  
  static get observedAttributes() {
    return ['orientation'];
  }
  
  connectedCallback() {
    this.render();
    this.setupResizeObserver();
    this.updateOrientation();
  }
  
  disconnectedCallback() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
    }
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'orientation' && oldValue !== newValue) {
      this._orientation = newValue;
      this.updateOrientation();
    }
  }
  
  render() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        position: relative;
        overflow: hidden;
        box-sizing: border-box;
      }
      
      .scroll-container {
        width: 100%;
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
        scrollbar-width: thin;
      }
      
      .scroll-container::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      
      .scroll-container::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
      }
      
      .scroll-container::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 4px;
      }
      
      .scroll-container::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
      
      .scroll-content {
        display: flex;
        gap: 10px;
        padding: 10px;
        box-sizing: border-box;
      }
      
      :host([data-scroll-orientation="horizontal"]) .scroll-content {
        flex-direction: row;
        width: max-content;
      }
      
      :host([data-scroll-orientation="vertical"]) .scroll-content {
        flex-direction: column;
        height: max-content;
      }
    `;
    
    const container = document.createElement('div');
    container.className = 'scroll-container';
    
    const content = document.createElement('div');
    content.className = 'scroll-content';
    
    const slot = document.createElement('slot');
    content.appendChild(slot);
    container.appendChild(content);
    
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(container);
  }
  
  setupResizeObserver() {
    // Observe size changes to auto-detect orientation
    this._resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        this.updateOrientation();
      }
    });
    
    this._resizeObserver.observe(this);
  }
  
  updateOrientation() {
    if (!this.shadowRoot) return;
    
    let detectedOrientation;
    
    // Check if orientation is manually set via attribute
    if (this._orientation && (this._orientation === 'horizontal' || this._orientation === 'vertical')) {
      detectedOrientation = this._orientation;
    } else {
      // Auto-detect based on dimensions
      const rect = this.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      if (height > width) {
        detectedOrientation = 'vertical';
      } else {
        detectedOrientation = 'horizontal';
      }
    }
    
    // Update the data attribute for CSS styling
    this.setAttribute('data-scroll-orientation', detectedOrientation);
    
    // Dispatch custom event
    this.dispatchEvent(new CustomEvent('orientationchange', {
      detail: { orientation: detectedOrientation },
      bubbles: true,
      composed: true
    }));
  }
  
  // Public API
  get orientation() {
    return this.getAttribute('data-scroll-orientation');
  }
  
  set orientation(value) {
    if (value === 'horizontal' || value === 'vertical') {
      this.setAttribute('orientation', value);
    } else {
      this.removeAttribute('orientation');
    }
  }
  
  scrollToStart() {
    const container = this.shadowRoot.querySelector('.scroll-container');
    if (container) {
      if (this.orientation === 'horizontal') {
        container.scrollLeft = 0;
      } else {
        container.scrollTop = 0;
      }
    }
  }
  
  scrollToEnd() {
    const container = this.shadowRoot.querySelector('.scroll-container');
    if (container) {
      if (this.orientation === 'horizontal') {
        container.scrollLeft = container.scrollWidth;
      } else {
        container.scrollTop = container.scrollHeight;
      }
    }
  }
}

// Define the custom element
customElements.define('scroll-area', ScrollArea);
