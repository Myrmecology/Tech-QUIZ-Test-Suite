import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://127.0.0.1:3001',  // Updated to match your client URL
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
    },
  },
  retries: {
    runMode: 2,
    openMode: 0
  }
});