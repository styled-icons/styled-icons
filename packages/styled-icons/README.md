<h1 align="center">💅 styled-icons</h1>

<p align="center"><a href="https://travis-ci.org/jacobwgillespie/styled-icons"><img src="https://img.shields.io/travis/jacobwgillespie/styled-icons/master.svg" alt="Build Status" /></a>
<a href="https://www.npmjs.com/package/styled-icons"><img src="https://img.shields.io/npm/dm/styled-icons.svg" alt="npm" /></a>
<a href="https://www.npmjs.com/package/styled-icons"><img src="https://img.shields.io/npm/v/styled-icons.svg" alt="npm" /></a>
<a href="https://www.styled-components.com/"><img src="https://img.shields.io/badge/built%20with-styled%20components-db7093.svg" alt="Built with Styled Components" /></a>
<img src="https://img.shields.io/badge/powered%20by-typescript-blue.svg" alt="Powered by TypeScript" /> <a href="#contributors" alt="sponsors on Open Collective"><img src="https://opencollective.com/styled-icons/backers/badge.svg" /></a> <a href="#contributors" alt="Sponsors on Open Collective"><img src="https://opencollective.com/styled-icons/sponsors/badge.svg" /></a></p>

[![View Icons](https://gui.apex.sh/component?name=ShadowButton&config=%7B%22text%22%3A%22ICON%20EXPLORER%22%2C%22color%22%3A%22db7093%22%7D)](https://styled-icons.js.org)

`styled-icons` provides the [Font Awesome](https://fontawesome.com/), [Feather](https://feathericons.com/), [Icomoon](https://icomoon.io), [Material Design](https://material.io/icons/), [Octicons](https://octicons.github.com/), [Typicons](https://www.s-ings.com/typicons/), [Crypto Icons](http://cryptoicons.co), [Evil Icons](https://evil-icons.io), and [Boxicons](https://boxicons.com/) icon packs as [Styled Components](https://www.styled-components.com/), with full support for TypeScript types and tree-shaking / ES modules.

---

### Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Props](#props)
  - [Icon Dimensions](#icon-dimensions)
  - [Styled Components](#styled-components)
  - [Accessibility](#accessibility)
  - [Tree Shaking](#tree-shaking)
  - [TypeScript](#typescript)
- [Contributing](#contributing)
- [License](#license)
- [Contributors](#contributors)

## Installation

```
yarn add styled-icons
```

or

```
npm install styled-icons --save
```

Additionally, you will need to have installed a version of `styled-components` at least version 4.1.0 or newer, as `styled-icons` depends on `styled-components` as a peer dependency.

## Usage

All Font Awesome (free), Feather, Material, and Octicon icons are available for preview at the [Icon Explorer](https://styled-icons.js.org).

The entire icon packs are available via the main import and sub-imports:

```javascript
import {material, octicons} from 'styled-icons'

import * as boxiconsLogos from 'styled-icons/boxicons-logos'
import * as boxiconsRegular from 'styled-icons/boxicons-regular'
import * as boxiconsSolid from 'styled-icons/boxicons-solid'
import * as crypto from 'styled-icons/crypto'
import * as evil from 'styled-icons/evil'
import * as faBrands from 'styled-icons/fa-brands'
import * as faRegular from 'styled-icons/fa-regular'
import * as faSolid from 'styled-icons/fa-solid'
import * as feather from 'styled-icons/feather'
import * as icomoon from 'styled-icons/icomoon'
import * as material from 'styled-icons/material'
import * as octicons from 'styled-icons/octicons'
import * as typicons from 'styled-icons/typicons'
```

The icons are also available as individual imports - it is recommended that you import icons individually using ES modules along with a module bundler like Webpack or Rollup in order to enable tree-shaking. This means that the module bundler will remove unused icons from the final JavaScript bundle, saving bandwidth and speeding up loading:

```javascript
import React, {Fragment} from 'react'
import {AccountCircle, Lock} from 'styled-icons/material'

const App = () => (
  <Fragment>
    <AccountCircle />
    <Lock />
  </Fragment>
)
```

### Props

Styled Icons accept all the valid props of an `<svg />` element, in addition to the following custom props:

| Prop    | Required | Type           | Description                                                                                                                                   |
| ------- | -------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `size`  | optional | string, number | This is a convenience for setting both `width` and `height` to the same value                                                                 |
| `title` | optional | string         | This sets the icon title and enables the standalone icon accessability mode. See [accessibility](#accessibility) below for additional details |

**Example**

```javascript
import React from 'react'
import {Lock} from 'styled-icons/material'

const App = () => <Lock size="48" title="Unlock account" />
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

All icons are exported as [Styled Components](https://www.styled-components.com/), which means it is possible to utilize the Styled Components API:

```javascript
import styled from 'styled-components'
import {Lock} from 'styled-icons/material'

export const RedLock = styled(Lock)`
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

Styled Icons supports automatic tree-shaking via the `package.json` `module` property from any of the import paths (icon pack, individual icon, etc.). Tree shaking has been tested with Create React App v2, Next.js, Rollup, and Webpack v4.

### TypeScript

The icons of `styled-icons` are built using TypeScript and export type definitions. If you need a type to reference any styled icon, there is a `StyledIcon` type exported from the `styled-icons/types` import:

```typescript
import styled from 'styled-components'
import {StyledIcon} from 'styled-icons/types'

interface Props {
  icon: StyledIcon
}
```

If you have any ideas for improvements to the TypeScript typing, please open an issue or PR!

## Contributing

Contributions are welcome! Feel free to open an issue or a pull request and participate at whatever level you would like.

## License

The MIT License - see `LICENSE`.

The Boxicons are licensed under the [CC BY 4.0 License](https://boxicons.com/get-started#license).

The Cryptocurrency icons are licensed under the [CC0 1.0 Universal License](https://github.com/atomiclabs/cryptocurrency-icons/blob/master/LICENSE.md).

The Evil Icons are licensed under the [MIT License](https://github.com/evil-icons/evil-icons/blob/master/LICENSE.txt).

The Font Awesome icons are licensed under the [CC BY 4.0 License](https://github.com/FortAwesome/Font-Awesome/blob/master/LICENSE.txt).

The Feather icons are licensed under the [MIT License](https://github.com/feathericons/feather/blob/master/LICENSE).

The Icomoon icons are dual licensed under [GPL](http://www.gnu.org/licenses/gpl.html) / [CC BY 4.0 License](http://creativecommons.org/licenses/by/4.0/).

The Material Design icons are licensed under the [Apache License Version 2.0](https://github.com/google/material-design-icons/blob/master/LICENSE).

The Octicons are licensed under the [MIT License](https://github.com/primer/octicons/blob/master/LICENSE).

The Typicons are licensed under the [CC BY SA 3.0 License](http://creativecommons.org/licenses/by-sa/3.0/).

## Contributors

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/styled-icons#backer)]

<a href="https://opencollective.com/styled-icons#backers" target="_blank"><img src="https://opencollective.com/styled-icons/backers.svg?width=890"></a>

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/styled-icons#sponsor)]

<a href="https://opencollective.com/styled-icons/sponsor/0/website" target="_blank"><img src="https://opencollective.com/styled-icons/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/styled-icons/sponsor/1/website" target="_blank"><img src="https://opencollective.com/styled-icons/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/styled-icons/sponsor/2/website" target="_blank"><img src="https://opencollective.com/styled-icons/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/styled-icons/sponsor/3/website" target="_blank"><img src="https://opencollective.com/styled-icons/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/styled-icons/sponsor/4/website" target="_blank"><img src="https://opencollective.com/styled-icons/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/styled-icons/sponsor/5/website" target="_blank"><img src="https://opencollective.com/styled-icons/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/styled-icons/sponsor/6/website" target="_blank"><img src="https://opencollective.com/styled-icons/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/styled-icons/sponsor/7/website" target="_blank"><img src="https://opencollective.com/styled-icons/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/styled-icons/sponsor/8/website" target="_blank"><img src="https://opencollective.com/styled-icons/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/styled-icons/sponsor/9/website" target="_blank"><img src="https://opencollective.com/styled-icons/sponsor/9/avatar.svg"></a>
