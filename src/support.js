/// <reference path="./support.d.ts" />

Cypress.Commands.add('hideScrollbars', () => {
  cy.log('hiding scrollbars')

  // inject CSS style to hide the scrollbars in all browsers
  cy.get('style#hide-scrollbars', { log: false })
    .should(Cypress._.noop)
    .then(($style) => {
      if ($style.length) {
        // there is already a style
        return
      }
      // create a new style element
      cy.document().then((doc) => {
        doc.documentElement.style.overflow = 'hidden'

        const style = doc.createElement('style')
        style.id = 'hide-scrollbars'
        style.innerHTML = `
          ::-webkit-scrollbar {
            display: none;
          }
          body {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
        `
        doc.head.appendChild(style)
      })
    })

  // hide the scrollbars in the top Cypress window?
})

Cypress.Commands.add('showScrollbars', () => {
  cy.log('showing scrollbars')
  cy.get('style#hide-scrollbars', { log: false })
    .should(Cypress._.noop)
    .then(($style) => {
      if (!$style.length) {
        // there is no style to remove
        return
      }

      // remove the style element we injected in cy.hideScrollbars()
      $style.remove()
    })
})
