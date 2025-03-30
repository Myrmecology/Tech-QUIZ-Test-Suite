import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
    // Remove the experimentalSkipDomainInjection property
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
    },
  },
  // Add this to bypass server check
  retries: {
    runMode: 2,
    openMode: 0
  }
});