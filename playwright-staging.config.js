import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config.js';

/**
 * Playwright configuration for staging environment
 */
export default defineConfig({
  ...baseConfig,
  
  /* Test against staging environment */
  use: {
    ...baseConfig.use,
    baseURL: process.env.BASE_URL || 'https://staging.agi-platform.com',
    
    /* More conservative timeouts for staging */
    actionTimeout: 45000,
    navigationTimeout: 45000,
    
    /* Always record for staging */
    trace: 'on',
    screenshot: 'on',
    video: 'on'
  },

  /* Staging-specific test configuration */
  projects: [
    {
      name: 'staging-chrome',
      use: { 
        ...baseConfig.projects[0].use,
        /* Additional staging-specific settings */
        ignoreHTTPSErrors: false,
        acceptDownloads: true
      },
    },
    {
      name: 'staging-mobile',
      use: { 
        ...baseConfig.projects[3].use,
        /* Mobile-specific staging settings */
        ignoreHTTPSErrors: false
      },
    }
  ],

  /* Don't start local server for staging */
  webServer: undefined,

  /* Staging-specific test patterns */
  testDir: './src/tests/e2e/staging',
  
  /* More retries for staging due to network variability */
  retries: 3,
  
  /* Sequential execution for staging stability */
  workers: 1,
  
  /* Staging-specific reporters */
  reporter: [
    ['html', { outputFolder: 'staging-test-results' }],
    ['json', { outputFile: 'staging-test-results/results.json' }],
    ['junit', { outputFile: 'staging-test-results/results.xml' }]
  ],

  /* Longer timeout for staging */
  timeout: 60000,
  
  /* Output directory for staging */
  outputDir: 'staging-test-results/'
}); 