const debug = require('debug')('cypress-high-resolution')

/**
 * Registers a hook to change the browser's window size.
 * @see https://on.cypress.io/browser-launch-api
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

  if (Array.isArray(config.env.resolution)) {
    if (config.env.resolution.length !== 2) {
      throw new Error('resolution must be an array of length 2')
    }
    browserWindowWidth = config.env.resolution[0]
    browserWindowHeight = config.env.resolution[1]
  } else {
    if (typeof config.env.resolution !== 'string') {
      console.error(
        'resolution parameter should be a string, was passed %o',
        config.env.resolution,
      )
      return
    }

    const wantedResolution = config.env.resolution.toLowerCase()
    if (wantedResolution === '4k') {
      browserWindowWidth = 3840
      browserWindowHeight = 2160
    } else if (wantedResolution === 'high') {
      browserWindowWidth = 1920
      browserWindowHeight = 1080
    } else if (/^\d+x\d+$/.test(wantedResolution)) {
      // passing the custom resolution using "widthxheight"
      const [width, height] = config.env.resolution.split('x')
      browserWindowWidth = parseInt(width, 10)
      browserWindowHeight = parseInt(height, 10)
    }
  }
  debug('target window size %d x %d', browserWindowWidth, browserWindowHeight)

  on('before:browser:launch', (browser, launchOptions) => {
    if (browser.name === 'electron' && browser.isHeadless) {
      launchOptions.preferences.width = browserWindowWidth
      launchOptions.preferences.height = browserWindowHeight
    } else if (browser.name === 'chrome' && browser.isHeadless) {
      launchOptions.args.push(
        `--window-size=${browserWindowWidth},${browserWindowHeight}`,
      )
      launchOptions.args.push('--force-device-scale-factor=1')
    } else if (browser.name === 'firefox' && browser.isHeadless) {
      launchOptions.args.push(`--width=${browserWindowWidth}`)
      launchOptions.args.push(`--height=${browserWindowHeight}`)
    }

    return launchOptions
  })
}

module.exports = registerVideoResolution
