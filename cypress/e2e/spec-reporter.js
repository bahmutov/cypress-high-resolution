/// <reference types="cypress" />

import '../../src/support'

it('captures the entire runner (browser)', () => {
  const windowWidth = window.top.innerWidth
  const windowHeight = window.top.innerHeight

  cy.log(`browser window is: **${windowWidth} x ${windowHeight}**`)
  cy.visit('/')
  cy.get('#searchInput').should('be.visible')

  cy.hideScrollbars()

  let screenshotImagePath
  cy.screenshot('wiki', {
    capture: 'runner',
    overwrite: true,
    onAfterScreenshot($el, { path }) {
      console.log(`screenshot saved to ${path}`)
      screenshotImagePath = path
    },
  })
    .wait(2000)
    .then(() => {
      // check if the image resolution is correct
      // Note: some OS use device pixel ratio, so the image may be larger than the window size
      const dpr = window.devicePixelRatio || 1
      console.log(`device pixel ratio is ${dpr}`)

      cy.task('getImageSize', screenshotImagePath).then(({ width, height }) => {
        cy.log(`screenshot image is: **${width} x ${height}**`)

        const isInteractive = Cypress.config('isInteractive')
        if (isInteractive) {
          expect(width, 'screenshot width').to.equal(windowWidth * dpr)
          expect(height, 'screenshot height').to.equal(windowHeight * dpr)
        }
      })
    })

  cy.showScrollbars()
})
