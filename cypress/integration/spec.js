/// <reference types="cypress" />

it('works', () => {
  const windowWidth = window.top.innerWidth
  const windowHeight = window.top.innerHeight

  cy.log(`browser window is: **${windowWidth} x ${windowHeight}**`)
  cy.visit('/')
  cy.get('#searchInput').should('be.visible')
  cy.screenshot('wiki').wait(1000)
})
