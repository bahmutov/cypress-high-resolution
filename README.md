# cypress-high-resolution [![renovate-app badge][renovate-badge]][renovate-app] ![cypress version](https://img.shields.io/badge/cypress-8.7.0-brightgreen)
> A plugin to increase the video resolution for cypress run

Based on the blog post [Generate High-Resolution Videos and Screenshots](https://www.cypress.io/blog/2021/03/01/generate-high-resolution-videos-and-screenshots/)

## Install

Add this plugin to your project as a dev dependency

```
# install using NPM
$ npm i -D cypress-high-resolution
# or install using Yarn
$ yarn add -D cypress-high-resolution
```

Add this plugin to your Cypress plugin file

```js
// cypress/plugins/index.js
module.exports = (on, config) => {
  // https://github.com/bahmutov/cypress-high-resolution
  require('cypress-high-resolution')(on, config)
}
```

## Use

## Debugging

This plugin uses [debug](https://github.com/visionmedia/debug#readme) module to output verbose messages. Start Cypress with the environment variable `DEBUG=cypress-high-resolution` to see them. How to set an environment variable depends on the operating system. From a Linux terminal we can use

```shell
$ DEBUG=cypress-high-resolution npx cypress run
```

## Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2021

- [@bahmutov](https://twitter.com/bahmutov)
- [glebbahmutov.com](https://glebbahmutov.com)
- [blog](https://glebbahmutov.com/blog)
- [videos](https://www.youtube.com/glebbahmutov)
- [presentations](https://slides.com/bahmutov)
- [cypress.tips](https://cypress.tips)

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/cypress-high-resolution/issues) on Github

## MIT License

Copyright (c) 2021 Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt;

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/

