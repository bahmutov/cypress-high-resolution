const debug = require('debug')('cypress-high-resolution')

const label = 'cypress-high-resolution'

/**
 * Registers a hook to change the browser's window size.
 * @see https://on.cypress.io/browser-launch-api
 * @see https://www.cypress.io/blog/2021/03/01/generate-high-resolution-videos-and-screenshots/
 */
function registerVideoResolution(on, config) {
  on('task', {
    async getImageSize(imagePath) {
      const { imageSizeFromFile } = require('image-size/fromFile')
      const dimensions = await imageSizeFromFile(imagePath)
      debug('image %s has dimensions %o', imagePath, dimensions)
      return dimensions
    },
  })

  const userResolution =
    config.expose.resolution || process.env.CYPRESS_resolution

  if (!userResolution) {
    debug('there is no resolution change')
    return
  }

  debug('user requested resolution %o', userResolution)

  // defaults
  let browserWindowWidth = 1280
  let browserWindowHeight = 720

  if (Array.isArray(userResolution)) {
    if (userResolution.length !== 2) {
      throw new Error('resolution must be an array of length 2')
    }
    browserWindowWidth = userResolution[0]
    browserWindowHeight = userResolution[1]
  } else {
    if (typeof userResolution !== 'string') {
      console.error(
        'resolution parameter should be a string, was passed %o',
        userResolution,
      )
      return
    }

    const wantedResolution = userResolution.toLowerCase()
    if (wantedResolution === '4k') {
      browserWindowWidth = 3840
      browserWindowHeight = 2160
    } else if (wantedResolution === 'high') {
      browserWindowWidth = 1920
      browserWindowHeight = 1080
    } else if (/^\d+x\d+$/.test(wantedResolution)) {
      // passing the custom resolution using "width x height"
      const [width, height] = userResolution.split('x')
      browserWindowWidth = parseInt(width, 10)
      browserWindowHeight = parseInt(height, 10)
    }
  }
  console.log(
    '%s: target window size %d x %d',
    label,
    browserWindowWidth,
    browserWindowHeight,
  )

  on('before:browser:launch', (browser, launchOptions) => {
    debug('before:browser:launch browser info %o', browser)

    if (browser.name === 'electron' && browser.isHeadless) {
      debug(
        'setting electron window size to %d x %d',
        browserWindowWidth,
        browserWindowHeight,
      )
      launchOptions.preferences.width = browserWindowWidth
      launchOptions.preferences.height = browserWindowHeight
    } else if (browser.name === 'chrome' && browser.isHeadless) {
      const wsArg = `--window-size=${browserWindowWidth},${browserWindowHeight}`
      const dpArg = `--force-device-scale-factor=1`
      debug('adding chrome args %o', [wsArg, dpArg])
      launchOptions.args.push(wsArg, dpArg)
    } else if (browser.name === 'firefox' && browser.isHeadless) {
      const wArg = `--width=${browserWindowWidth}`
      const hArg = `--height=${browserWindowHeight}`
      debug('adding firefox args %o', [wArg, hArg])
      launchOptions.args.push(wArg, hArg)
    }

    return launchOptions
  })

  debug('is interactive mode? %o', config.isInteractive)
  // in the headless mode, modify the viewport to take up the entire browser window
  // if (!config.isInteractive) {
  //   config.viewportWidth = browserWindowWidth
  //   config.viewportHeight = browserWindowHeight
  //   debug(
  //     'setting viewport to %d x %d',
  //     config.viewportWidth,
  //     config.viewportHeight,
  //   )
  // }

  return config
}

module.exports = registerVideoResolution
