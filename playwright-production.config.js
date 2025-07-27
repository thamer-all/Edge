import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config.js';

/**
 * Playwright configuration for production smoke tests
 * Only critical user journeys and health checks
 */
export default defineConfig({
  ...baseConfig,
  
  /* Test against production environment */
  use: {
    ...baseConfig.use,
    baseURL: process.env.BASE_URL || 'https://agi-platform.com',
    
    /* Conservative timeouts for production */
    actionTimeout: 60000,
    navigationTimeout: 60000,
    
    /* Always record production tests */
    trace: 'on',
    screenshot: 'on',
    video: 'on',
    
    /* Production-specific settings */
    ignoreHTTPSErrors: false,
    acceptDownloads: false
  },

  /* Production smoke tests - only critical paths */
  projects: [
    {
      name: 'production-critical',
      use: { 
        ...baseConfig.projects[0].use,
        /* Production Chrome settings */
        channel: 'chrome'
      },
      testMatch: '**/*smoke*.spec.js'
    }
  ],

  /* Don't start local server for production */
  webServer: undefined,

  /* Production test directory */
  testDir: './src/tests/e2e/production',
  
  /* Higher retries for production due to traffic */
  retries: 5,
  
  /* Single worker for production safety */
  workers: 1,
  
  /* Production-specific reporters */
  reporter: [
    ['html', { outputFolder: 'production-test-results', open: 'never' }],
    ['json', { outputFile: 'production-test-results/results.json' }],
    ['junit', { outputFile: 'production-test-results/results.xml' }],
    ['github']
  ],

  /* Longer timeout for production */
  timeout: 90000,
  
  /* Output directory for production */
  outputDir: 'production-test-results/',
  
  /* Global teardown for production - cleanup any test data */
  globalTeardown: './src/tests/e2e/production-teardown.js'
}); 