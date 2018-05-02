# 💅 styled-icons

[![Build Status](https://img.shields.io/travis/jacobwgillespie/styled-icons/master.svg)](https://travis-ci.org/jacobwgillespie/styled-icons)
[![npm](https://img.shields.io/npm/dm/styled-icons.svg)](https://www.npmjs.com/package/styled-icons)
[![npm](https://img.shields.io/npm/v/styled-icons.svg)](https://www.npmjs.com/package/styled-icons)
[![Built with Styled Components](https://img.shields.io/badge/built%20with-styled%20components-db7093.svg)](https://www.styled-components.com/)
![Powered by TypeScript](https://img.shields.io/badge/powered%20by-typescript-blue.svg)

[![View Icons](https://gui.apex.sh/component?name=ShadowButton&config=%7B%22text%22%3A%22ICON%20EXPLORER%22%2C%22color%22%3A%22db7093%22%7D)](https://styled-icons.js.org)

`styled-icons` provides the [Font Awesome](https://fontawesome.com/), [Material Design](https://material.io/icons/) and [Octicons](https://octicons.github.com/) icon packs as [Styled Components](https://www.styled-components.com/), with full support for TypeScript types and tree-shaking / ES modules.

---

### Table of Contents

* [Installation](#installation)
* [Usage](#usage)
  * [Props](#props)
  * [Icon Dimensions](#icon-dimensions)
  * [Styled Components](#styled-components)
  * [Accessibility](#accessibility)
  * [Tree Shaking](#tree-shaking)
  * [TypeScript](#typescript)
* [Contributing](#contributing)
* [License](#license)

## Installation

```
yarn add styled-icons
```

or

```
npm install styled-icons --save
```

Additionally, you will need to have installed a version of `styled-components`, as `styled-icons` depends on `styled-components` as a peer dependency.

## Usage

All Font Awesome (free), Material, and Octicon icons are available for preview at the [Icon Explorer](https://styled-icons.js.org).

The entire icon packs are available via the main import and sub-imports:

```javascript
import {material, octicons} from 'styled-icons'

import * as faBrands from 'styled-icons/fa-brands'
import * as faRegular from 'styled-icons/fa-regular'
import * as faSolid from 'styled-icons/fa-solid'
import * as material from 'styled-icons/material'
import * as octicons from 'styled-icons/octicons'
```

The icons are also available as individual imports - it is recommended that you import icons individually using ES modules along with a module bundler like Webpack or Rollup in order to enable tree-shaking. This means that the module bundler will remove unused icons from the final JavaScript bundle, saving bandwidth and speeding up loading:

```javascript
import React, {Fragment} from 'react'
import {Account, Lock} from 'styled-icons/material'

const App = () => (
  <Fragment>
    <Account />
    <Lock />
  </Fragment>
)
```

### Props

Styled Icons accept all the valid props of an `<svg />` element, in addition to the following custom props:

| Prop    | Required | Type                                                                                            | Description                                                                                                                                   |
| ------- | -------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `size`  | optional | string, number                                                                                  | This is a convenience for setting both `width` and `height` to the same value                                                                 |
| `title` | optional | string                                                                                          | This sets the icon title and enables the standalone icon accessability mode. See [accessibility](#accessibility) below for additional details |
| `css`   | optional | string, function, [css tagged template literal](https://www.styled-components.com/docs/api#css) | This prop accepts additional CSS to attach to the icon. It accepts the CSS as a string or as any valid Style Components interpolation         |

**Example**

```javascript
import React from 'react'
import {Lock} from 'styled-icons/material'

const App = () => <Lock size="48" title="Unlock account" css="color: red;" />
```

### Icon Dimensions

Some icons natively have non-square dimensions - original dimensions are exported from the individual icon exports:

```javascript
import {LogoGithub, LogoGithubDimensions} from 'styled-icons/octicons/LogoGithub'

const App = () => <LogoGithub />

console.log(LogoGithubDimension) // {height: 16, width: 45}
```

Dimension exports are not available on the icon pack or index exports:

```javascript
import * as octicons from 'styled-icons/octicons'
import {octicons} from 'styled-icons'

// octicons contains only icon exports
```

### Styled Components

All icons are exported as [Styled Components](https://www.styled-components.com/), which means it is possible to extend their styles or otherwise utilize the Styled Components API:

```javascript
import {Lock} from 'styled-icons/material'

export const RedLock = Lock.extend`
  color: red;

  font-weight: ${props => (props.important ? 'bold' : 'normal')};
`
```

### Accessibility

Styled Icons have two different built-in "modes" for accessibility purposes. By default, icons are considered decorative, meaning the icon is just visual sugar and the surrounding content is sufficient for conveying meaning. This will set the `aria-hidden` attribute on the resulting HTML to hide the icon from screen readers.

```javascript
// this icon
<Lock />

// will result in
<svg aria-hidden="true">...</svg>
```

Alternatively the icon could be used in standalone mode, meaning the icon itself should convey meaning. This mode is enabled by setting a `title` prop - this is the text that will be read by a screen reader. This results in `role` being set to `img` and the addition of a `<title>` element.

```javascript
// this icon
<Lock title="Lock account" />

// will result in
<svg role="img"><title>Lock account</title> ...</svg>
```

Since Style Icons accept all `<svg>` element attributes as props, you are free to override these `aria-*` attributes if you have a more complex use-case.

As this library provides direct access to the `<svg>` element, you may wish to further wrap the icon for additional semantic meaning. For example, for a loading spinner:

```javascript
import styled from 'styled-components'
import {Spinner} from 'styled-icons/fa-solid/Spinner'

const VisuallyHidden = styled.span`
  border: 0 !important;
  clip: rect(1px, 1px, 1px, 1px) !important;
  height: 1px !important;
  overflow: hidden !important;
  padding-top: 0 !important;
  padding-right: 0 !important;
  padding-bottom: 0 !important;
  padding-left: 0 !important;
  position: absolute !important;
  white-space: nowrap !important;
  width: 1px !important;
`

<span title="Loading posts..." role="alert" aria-live="assertive">
  <Spinner />
  <VisuallyHidden>Loading posts...</VisuallyHidden>
</span>
```

### Tree Shaking

**NOTE:** tree shaking should work without modification using [Create React App](https://github.com/facebook/create-react-app).

Tree shaking has been tested with Create React App, Rollup, and Webpack. If your bundler is unable to import the icons, additional CommonJS/ES5 bundles are available:

```javascript
import React, {Fragment} from 'react'

// This will result in all Material icons being bundled
import {Account} from 'styled-icons/material.es5'

// This will only include the Lock icon
import {Lock} from 'styled-icons/material/Lock.es5'

const App = () => (
  <Fragment>
    <Account />
    <Lock />
  </Fragment>
)
```

Be aware though that importing from the plain ES5 icon pack bundles will likely result in significantly larger bundle sizes, because unused icons will be included in the final bundle. If you are unable to configure your bundler to process the ES module bundles, you should import icons individually to avoid large bundles.

### TypeScript

The icons of `styled-icons` are built using TypeScript and export type definitions. By default, the `theme` prop is typed as `any`, but if you would like to override the theme interface, this is possible via the `StyledIcon` type:

```typescript
import {StyledIcon} from 'styled-icons/material'
import {Lock} from 'styled-icons/material'

interface ThemeInterface {
  lockColor: string
}

export const ThemedLock: StyledIcon<ThemeInterface> = Lock.extend`
  color: ${props => props.theme.lockColor};
`
```

If you have any ideas for improvements to the TypeScript typing, please open an issue or PR!

## Contributing

Contributions are welcome! Feel free to open an issue or a pull request and participate at whatever level you would like.

## License

The MIT License - see `LICENSE`.

The Font Awesome icons are licensed under the [CC BY 4.0 License](https://github.com/FortAwesome/Font-Awesome/blob/master/LICENSE.txt).

The Material Design icons are licensed under the [Apache License Version 2.0](https://github.com/google/material-design-icons/blob/master/LICENSE).

The Octicons are licensed under the [MIT License](https://github.com/primer/octicons/blob/master/LICENSE).
