# 💅 styled-icons

[![Build Status](https://travis-ci.org/jacobwgillespie/styled-icons.svg?branch=master)](https://travis-ci.org/jacobwgillespie/styled-icons)
[![npm](https://img.shields.io/npm/dm/styled-icons.svg)](https://www.npmjs.com/package/styled-icons)
[![npm](https://img.shields.io/npm/v/styled-icons.svg)](https://www.npmjs.com/package/styled-icons)

`styled-icons` provides the [Material Design][2] and [Octicons][2] icon packs as [Styled Components][3], with full TypeScript and ES6 / tree-shaking support.

[![View Icons](https://gui.apex.sh/component?name=ShadowButton&config=%7B%22text%22%3A%22ICON%20EXPLORER%22%2C%22color%22%3A%22db7093%22%7D)][0]

## Installation

```
yarn add styled-icons
```

or

```
npm install styled-icons --save
```

Additionally, you will need to have installed a version of `styled-components`, as `styled-icons` depends on it as a peer dependency.

## Usage

All Material and Octicon icons are available for preview at the [Icon Explorer][0].

The entire icon packs are available via the main import and sub-imports:

```javascript
import {material, octicons} from 'styled-icons'

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

### Styled Components

All icons are exported as [Styled Components][3], which means it is possible to extend their styles or otherwise utilize the Styled Components API:

```javascript
import {Lock} from 'styled-icons/material'

export const RedLock = Lock.extend`
  color: red;

  font-weight: ${props => (props.important ? 'bold' : 'normal')};
`
```

### TypeScript

The icons of `styled-icons` are built using TypeScript and export type definitions.

## Contributing

Contributions are welcome! Feel free to open an issue or a pull request and participate at whatever level you would like.

## License

The MIT License - see `LICENSE`.

The Material Design icons are licensed under the [Apache License Version 2.0](https://github.com/google/material-design-icons/blob/master/LICENSE).

The Octicons are licensed under the [MIT License](https://github.com/primer/octicons/blob/master/LICENSE).

[0]: https://styled-icons.js.org
[1]: https://material.io/icons/
[2]: https://octicons.github.com/
[3]: https://www.styled-components.com/
