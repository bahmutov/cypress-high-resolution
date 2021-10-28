/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  // https://github.com/bahmutov/cypress-high-resolution
  require('../..')(on, config)
}
