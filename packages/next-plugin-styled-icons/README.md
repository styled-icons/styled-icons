# next-plugin-styled-icons

A [Next.js](https://nextjs.org/) plugin to enable tree shaking for [Styled Icons](https://github.com/jacobwgillespie/styled-icons).

## Installation

You should already have `styled-icons` installed as per [the Styled Icons README](https://github.com/jacobwgillespie/styled-icons#installation).

```bash
$ yarn add --dev next-plugin-styled-icons
```

## Usage

Create or modify the `next.config.js` configuration file ([more information](https://nextjs.org/docs/#custom-configuration)) and wrap it with the `withStyledIcons` function:

```javascript
const withStyledIcons = require('next-plugin-styled-icons')

module.exports = withStyledIcons()
```

If you're already using another plugin like `@zeit/next-typescript`, you can nest them like:

```javascript
const withStyledIcons = require('next-plugin-styled-icons')
const withTypeScript = require('@zeit/next-typescript')

module.exports = withTypeScript(withStyledIcons())
```
