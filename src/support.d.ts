// add cy.showScrollbars() and cy.hideScrollbars() commands to Cypress

declare namespace Cypress {
  interface Chainable {
    /**
     * Hide scrollbars in the browser window.
     * Useful before taking a screenshot.
     * @example cy.hideScrollbars()
     */
    hideScrollbars(): Chainable<void>

    /**
     * Restore scrollbars in the browser window
     * that were hidden by cy.hideScrollbars().
     *
     * @example
     *  cy.hideScrollbars()
     *  cy.screenshot()
     *  cy.showScrollbars()
     */
    showScrollbars(): Chainable<void>
  }
}
