/// <reference types="cypress" />

import '../../src/support'

it('captures an element', { baseUrl: null }, () => {
  cy.visit('cypress/pages/index.html')

  let screenshotImagePath
  cy.get('[aria-label="Application menu"]')
    .screenshot('menu', {
      overwrite: true,
      onAfterScreenshot($el, { path }) {
        console.log(`screenshot saved to ${path}`)
        screenshotImagePath = path
      },
    })
    .then(() => {
      // check if the image resolution is correct
      // Note: some OS use device pixel ratio, so the image may be larger than the window size
      const dpr = window.devicePixelRatio || 1
      console.log(`device pixel ratio is ${dpr}`)

      cy.task('getImageSize', screenshotImagePath).then(({ width, height }) => {
        cy.log(`screenshot image is: **${width} x ${height}**`)
      })
    })
})
