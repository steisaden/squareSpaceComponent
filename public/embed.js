(function() {
  'use strict';
  
  // Configuration
  const BASE_URL = 'https://steisaden.github.io/squareSpaceComponent';
  
  // Detect mobile and connection speed
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
  const isSlowConnection = navigator.connection && (navigator.connection.effectiveType === 'slow-2g' || navigator.connection.effectiveType === '2g' || navigator.connection.saveData);
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  function init() {
    const container = document.getElementById('venue-square-container');
    
    if (!container) {
      console.error('Venue Square: Container element not found. Make sure you have <div id="venue-square-container"></div>');
      return;
    }
    
    // Get configuration from data attributes
    const config = {
      width: container.getAttribute('data-width') || '800',
      height: container.getAttribute('data-height') || '600',
      position: container.getAttribute('data-position') || 'center',
      responsive: container.getAttribute('data-responsive') === 'true'
    };
    
    // Apply styling to container
    applyContainerStyles(container, config);
    
    // Create iframe
    const iframe = createIframe(config);
    
    // Add iframe to container
    container.appendChild(iframe);
    
    // Handle responsive resizing
    if (config.responsive) {
      window.addEventListener('resize', () => {
        adjustIframeSize(iframe, container, config);
      });
    }
  }
  
  function applyContainerStyles(container, config) {
    container.style.width = config.width.includes('%') ? config.width : config.width + 'px';
    container.style.height = config.height + 'px';
    container.style.margin = '0 auto';
    container.style.position = 'relative';
    
    // Apply position
    if (config.position === 'left') {
      container.style.marginLeft = '0';
      container.style.marginRight = 'auto';
    } else if (config.position === 'right') {
      container.style.marginLeft = 'auto';
      container.style.marginRight = '0';
    } else {
      container.style.marginLeft = 'auto';
      container.style.marginRight = 'auto';
    }
  }
  
  function createIframe(config) {
    const iframe = document.createElement('iframe');
    iframe.src = BASE_URL + '/';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '8px';
    iframe.style.overflow = 'hidden';
    iframe.setAttribute('allowfullscreen', 'true');
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('title', 'Interactive Venue Square');
    iframe.setAttribute('importance', 'high');
    
    // Optimize for mobile
    if (isMobile) {
      iframe.setAttribute('scrolling', 'no');
      iframe.style.touchAction = 'none';
    }
    
    // Show loading indicator
    showLoading(iframe.parentElement || document.body);
    
    // Remove loading when iframe loads
    iframe.onload = function() {
      const loader = document.getElementById('venue-square-loader');
      if (loader) loader.remove();
    };
    
    return iframe;
  }
  
  function adjustIframeSize(iframe, container, config) {
    // Mobile-first responsive sizing
    const width = window.innerWidth;
    
    if (width < 480) {
      // Small mobile
      container.style.width = '100%';
      container.style.height = '350px';
    } else if (width < 768) {
      // Mobile
      container.style.width = '100%';
      container.style.height = '400px';
    } else if (width < 1024) {
      // Tablet
      container.style.width = config.width.includes('%') ? config.width : Math.min(600, parseInt(config.width)) + 'px';
      container.style.height = '500px';
    } else {
      // Desktop
      container.style.width = config.width.includes('%') ? config.width : config.width + 'px';
      container.style.height = config.height + 'px';
    }
    
    // Optimize for slow connections
    if (isSlowConnection) {
      container.style.height = parseInt(container.style.height) * 0.8 + 'px';
    }
  }
  
  // Add loading indicator
  function showLoading(container) {
    const loader = document.createElement('div');
    loader.id = 'venue-square-loader';
    loader.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: #666;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    `;
    loader.innerHTML = `
      <div style="
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #333;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 10px;
      "></div>
      <p>Loading Venue Square...</p>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `;
    container.appendChild(loader);
    
    // Remove loader after 3 seconds
    setTimeout(() => {
      if (loader.parentNode) {
        loader.remove();
      }
    }, 3000);
  }
  
})();
