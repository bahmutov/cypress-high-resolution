const debug = require('debug')('cypress-high-resolution')

/**
 * Registers a hook to change the browser's window size.
 * @see https://www.cypress.io/blog/2021/03/01/generate-high-resolution-videos-and-screenshots/
 */
function registerVideoResolution(on, config) {
  debug('Cypress config.env %o', config.env)

  if (!config.env.resolution) {
    debug('there is no resolution change')
    return
  }

  // defaults
  let browserWindowWidth = 1280
  let browserWindowHeight = 720

  if (config.env.resolution === 'high') {
    browserWindowWidth = 1920
    browserWindowHeight = 1080
  }
  debug('target window size %d x %d', browserWindowWidth, browserWindowHeight)

  on('before:browser:launch', (browser, launchOptions) => {
    if (browser.name === 'electron' && browser.isHeadless) {
      launchOptions.preferences.width = browserWindowWidth
      launchOptions.preferences.height = browserWindowHeight
    }

    return launchOptions
  })
}

module.exports = registerVideoResolution
