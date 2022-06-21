const { defineConfig } = require('cypress')

module.exports = defineConfig({
  fixturesFolder: false,
  viewportWidth: 1440,
  viewportHeight: 1200,
  projectId: 'e44x4z',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    supportFile: false,
    baseUrl: 'https://www.wikipedia.org/',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
})
