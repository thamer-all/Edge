module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000',
        'http://localhost:3000/dashboard',
        'http://localhost:3000/analytics',
        'http://localhost:3000/lesson/ai-fundamentals'
      ],
      startServerCommand: 'npm run preview',
      startServerReadyPattern: 'Local:.*http://localhost:3000',
      startServerReadyTimeout: 30000,
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--no-sandbox --headless'
      }
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'categories:pwa': ['error', { minScore: 0.8 }],
        
        // Core Web Vitals
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'speed-index': ['error', { maxNumericValue: 3000 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        
        // Additional performance metrics
        'interactive': ['warn', { maxNumericValue: 3500 }],
        'max-potential-fid': ['warn', { maxNumericValue: 130 }],
        
        // Best practices
        'uses-https': 'error',
        'uses-http2': 'warn',
        'uses-passive-event-listeners': 'warn',
        'no-document-write': 'error',
        'uses-rel-preconnect': 'warn',
        'efficient-animated-content': 'warn',
        
        // Accessibility
        'color-contrast': 'error',
        'heading-order': 'error',
        'link-name': 'error',
        'button-name': 'error',
        'image-alt': 'error',
        'form-field-multiple-labels': 'error',
        'focus-traps': 'error',
        'focusable-controls': 'error',
        'tabindex': 'error',
        
        // SEO
        'document-title': 'error',
        'meta-description': 'error',
        'http-status-code': 'error',
        'link-text': 'error',
        'crawlable-anchors': 'error',
        'robots-txt': 'warn',
        
        // PWA
        'service-worker': 'warn',
        'installable-manifest': 'warn',
        'themed-omnibox': 'warn',
        'content-width': 'error',
        'viewport': 'error',
        
        // Security
        'is-on-https': 'error',
        'redirects-http': 'warn',
        
        // Bundle size budgets
        'resource-summary:script:size': ['error', { maxNumericValue: 500000 }], // 500KB JS
        'resource-summary:stylesheet:size': ['error', { maxNumericValue: 100000 }], // 100KB CSS
        'resource-summary:image:size': ['warn', { maxNumericValue: 1000000 }], // 1MB images
        'resource-summary:total:size': ['warn', { maxNumericValue: 2000000 }], // 2MB total
        
        // Network requests
        'resource-summary:total:count': ['warn', { maxNumericValue: 50 }],
        'resource-summary:third-party:count': ['warn', { maxNumericValue: 10 }],
        
        // Modern web features
        'modern-image-formats': 'warn',
        'uses-optimized-images': 'warn',
        'uses-webp-images': 'warn',
        'uses-responsive-images': 'warn',
        'unused-css-rules': 'warn',
        'unused-javascript': 'warn',
        'unminified-css': 'error',
        'unminified-javascript': 'error',
        'render-blocking-resources': 'warn',
        'uses-text-compression': 'error',
        'uses-rel-preload': 'warn'
      }
    },
    upload: {
      target: 'temporary-public-storage'
    },
    server: {
      port: 9222,
      host: '0.0.0.0'
    }
  }
}; 