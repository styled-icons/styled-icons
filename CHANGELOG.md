# Changelog

## v8.5.1

- Fix issue with README that prevented publishing v8.5.0

## v8.5.0

- Add Remix icon pack v2.0.0
- Upgrade Font Awesome icons to v5.11.2

## v8.4.2

- Fix issue where Feather icons were too solid (thank you [@stramel](https://github.com/stramel)!)

## v8.4.1

- Fix issue where Feather icons were transparent (`fill="none"`)

## v8.4.0

- Upgrade Cryptocurrency Icons to v0.16.1
- Switch Material Icons source to `material-design-icons-updated`, upgrade to v4.8.2 (thank you [@stramel](https://github.com/stramel)!)

## v8.3.0

- Upgrade Octicons to v9.1.1

## v8.2.0

- Upgrade Cryptocurrency Icons to v0.14.0
- Upgrade Feather Icons to v4.22.1

## v8.1.0

- Upgrade Font Awesome to v5.9.0

## v8.0.0

- **(breaking)** renamed the `Package` icon in all icon packs to `PackageIcon`. If you previously had the following:

  ```typescript
  import {Package} from 'styled-icons/pack-name'
  // or
  import {Package} from 'styled-icons/pack-name/Package'
  ```

  You will want to replace with:

  ```typescript
  import {PackageIcon} from 'styled-icons/pack-name'
  // or
  import {PackageIcon} from 'styled-icons/pack-name/PackageIcon'
  ```

  This fixes an issue experienced where certain bundlers would, on case-insensitive file systems, try to load a `package.json` file instead of the icon source.

## v7.15.1

- Fix issue with tree shaking caused by missing `package.json` files, mark everything with `"sideEffects": false`

## v7.15.0

- Upgrade Boxicons to v2.0.2

## v7.14.0

- Add Evil Icons v1.10.1

## v7.13.0

- Upgrade Font Awesome to v5.8.2

## v7.12.0

- Upgrade Boxicons v2.0.1

## v7.11.0

- Upgrade Boxicons to v1.9.4
- Fix TypeScript types for `aria-hidden` prop

## v7.10.0

- Upgrade Cryptocurrency Icons to v0.13.0

## v7.9.0

- Upgrade Feather icons to v4.21.0

## v7.8.0

- Upgrade Feather icons to v4.20.0
- Upgrade Boxicons to v1.9.3

## v7.7.0

- Upgrade Font Awesome to v5.8.1

## v7.6.0

- Upgrade Font Awesome to v5.8.0

## v7.5.0

- Upgrade Boxicons to v1.9.2
- Upgrade Cryptocurrency Icons to v0.11.0

## v7.4.2

- Add file extensions to icon `package.json` files to fix issues with certain bundlers not resolving icon files

## v7.4.1

- Fix TypeScript type issue where `StyledIconProps` incorrectly allowed a string value as a `ref` which prevented that type from actually being used.

## v7.4.0

- Upgrade Octicons to v8.5.0

## v7.3.0

- Upgrade Feather icons to v4.19.0

## v7.2.0

- Upgrade Octicons to v8.4.2

## v7.1.1

- Fix issue that omitted certain files from the NPM bundle

## v7.1.0

- Centralize Styled Components code into internal `StyledIconBase` component for significantly faster type-checking
- Optimize Styled Icon render method performance, don't create new functions on each render

## v7.0.1

- Remove TypeScript source files from the NPM package
- Fix TypeScript strict build ([@caseylucas](https://github.com/caseylucas))

## v7.0.0

#### Features

- Support automatic management of CommonJS and ES Modules code.

  Styled Icons will now correctly be imported as either CommonJS or ES Modules based on whichever the JavaScript bundler supports. This allows you to directly import an icon or an icon pack, and the bundler will automatically select the version it can process. This causes `styled-icons` to work out-of-the-box with Webpack, Rollup, Create React App, Next.js, Jest, Node, and many more!

  **(breaking)** if you previously imported icons with a `.cjs` suffix, you can remove the suffix as it is no longer required. For example, if you had any of this code:

  ```typescript
  import * as octicons from 'styled-icons/octicons.cjs'
  import {Alert} from 'styled-icons/octicons/Alert.cjs'
  ```

  You should remove the `.cjs` suffix:

  ```typescript
  import * as octicons from 'styled-icons/octicons'
  import {Alert} from 'styled-icons/octicons/Alert'
  ```

  The `.cjs` imports no longer exist in version 7.0.0.

#### Changes

- Removed the type imports from the root module entrypoint - these were deprecated in v6.0.0. If you need to import the type of a styled icon or its props, you should import those from `style-icons/types`:

  ```typescript
  import {StyledIcon, StyledIconProps} from 'styled-icons/types'
  ```

- Upgraded all dependencies, including upgrading the website to Next.js 8

#### Fixes

- Fixed an issue that prevented the `typicons` icons from being included in the bundle

## v6.12.0

- Upgrade Octicons to v8.4.0

## v6.11.0

- Upgrade Feather icons to v4.17.0

## v6.10.0

- Upgrade Feather icons to v4.16.0

## v6.9.0

- Upgrade Font Awesome to v5.7.1

## v6.8.0

- Upgrade Feather icons to v4.15.0

## v6.7.0

- Upgrade Font Awesome to v5.7.0
- Upgrade Feather icons to v4.14.0

## v6.6.0

- Upgrade Feather icons to v4.12.0

## v6.5.1

- Upgrade Boxicons to v1.9.1 (fixes issue with missing icons)

## v6.5.0

- Upgrade Boxicons to v1.9.0

## v6.4.0

- Upgrade Octicons to v8.3.0
- Upgrade Cryptocurrency Icons to v0.10.0

## v6.3.0

- Fix issue where TypeScript compiler would evaluate all icon files, regardless of what icons were imported, significantly increasing compile time. This was due to the `StyledIcon` TypeScript type. To resolve, there is now a `styled-icons/types` import for that type. If you previously imported it from `styled-icons`, you should update to speed up your builds.

  If you previously had this code:

  ```typescript
  import {StyledIcon} from 'styled-icons'

  // or
  import {StyledIconProps} from 'styled-icons'
  ```

  You should replace it with:

  ```typescript
  import {StyledIcon} from 'styled-icons/types'

  import {StyledIconProps} from 'styled-icons/types'
  ```

## v6.2.1

- Fix issue where custom props that were not valid DOM attributes were passed through to the `<svg>` element

## v6.2.0

- Add Cryptocurrency icon pack

## v6.1.0

- Add Typicons icon pack

## v6.0.1

- No code changes, fix issue with broken CI deployment

## v6.0.0

- **(breaking)** remove an export of the `StyledIconProps` TypeScript type from each of the icon pack exports. This export was previously accidental. Each of the exports from the icon packs was assumed to be an icon, so unless you are depending on the extra export, you do not need to change anything.

  As an example, if you have this code:

  ```typescript
  import {StyledIconProps} from 'styled-icons/material' // or any other pack
  ```

  You should replace it with:

  ```typescript
  import {StyledIconProps} from 'styled-icons'
  ```

- Use Babel to build the library files
  - Reduces bundle size by avoiding duplication of helper functions
  - Pre-processes Styled Icons with the Styled Components Babel plugin to fix issues with server-side rendering

## v5.8.0

- Add Icomoon free icons

## v5.7.0

- Upgrade Feather icons to v4.10.0
- Wrap SVGs with `React.forwardRef` to fix Styled Components `as` prop, `attrs`, and the `ref` prop
- Use Next.js to build the website

## v5.6.0

- Upgrade FontAwesome to v5.6.3

## v5.5.0

- Upgrade FontAwesome to v5.6.1

## v5.4.0

- Upgrade FontAwesome to v5.6.0

## v5.3.0

- Upgrade Octicons to v8.2.0

## v5.2.2

- Fix issue where Boxicon and Material icons were missing from published package

## v5.2.1

- Fix npm publish to include README

## v5.2.0

- Release [next-plugin-styled-icons](https://github.com/jacobwgillespie/styled-icons/tree/master/packages/next-plugin-styled-icons) to enable tree shaking with [Next.js](https://nextjs.org) applications

## v5.1.1

- No functional changes
- Updated repository to monorepo structure

## v5.1.0

- Add back an exported `StyledIcon` TypeScript type automatically generated from type of an icon

## v5.0.0

- **(breaking)** the TypeScript interface `StyledIcon` no longer exists and is not exported anymore.

  TypeScript types are now auto-generated from the `@types/styled-components` definitions rather than explicitly named as the `StyledIcon` interface. This allows `styled-icons` to pick up any changes introduced in `@types/styled-components` automatically, rather than needing to redefine the type to match any updates.

  If you need access to the `StyledIcon` type, you can define it yourself based on an icon import:

  ```typescript
  import {Alert} from 'styled-icons/octicons'
  export type StyledIcon = typeof Alert
  ```

  **Update:** there is now an exported `StyledIcon` type, defined using the above approach, exported from the root package available in v5.1.0:

  ```typescript
  import {StyledIcon} from 'styled-icons'
  ```

## v4.3.0

- Upgrade Boxicons to v1.8.1

## v4.2.0

- Upgrade Octicons to v8.1.3

## v4.1.0

- Add [Boxicons](https://boxicons.com/) v1.8.0 ([#408](https://github.com/jacobwgillespie/styled-icons/pull/418), [@jgierer12](https://github.com/jgierer12))
- Fix React import in TypeScript type definitions

## v4.0.0

- **(breaking)** require Styled Components >= v4.1.0
- Fix Styled Components deprecation warning
- Update Styled Components TypeScript types
- Upgrade build-the-scenes build dependencies

## v3.7.0

- Upgrade Octicons to v8.1.2

## v3.6.0

- Upgrade FontAwesome to v5.5.0
- Upgrade Feather to v4.9.0

## v3.5.0

- Upgrade Feather icons to v4.8.1

## v3.4.0

- Upgrade FontAwesome to v5.4.2

## v3.3.0

- Add Styled Components v4 compatibility

## v3.2.0

- Upgrade FontAwesome to v5.4.1

## v3.1.0

- Upgrade FontAwesome to v5.4.0

## v3.0.0

- **Breaking:** remove `css` prop for adding additional styles. This shortcuts the built-in inheritance capabilities of Styled Components and generally led to hard-to-debug edge cases
- Upgrade FontAwesome to v5.3.1

## v2.4.0

- Upgrade Octicons to v8.1.0 (new `arrow-both` icon)

## v2.3.2

- Disable `convertShapeToPath` transformation that simplified icon SVGs as it was breaking certain icons

## v2.3.1

- Fix issue where `.cjs` entrypoints required non-CommonJS files

## v2.3.0

- Set `vertical-align` of FontAwesome icons to `-.125em` to match FontAwesome styles

## v2.2.0

- Upgrade FontAwesome to v5.0.13 - 68 new icons ([changes](https://github.com/FortAwesome/Font-Awesome/blob/master/CHANGELOG.md#5013----2018-05-10))

## v2.1.0

- Upgrade Octicons to v7.3.0 ([changes](https://github.com/primer/octicons/blob/master/CHANGELOG.md#730))

## v2.0.0

- Add [Feather](https://feathericons.com/) icon pack
- **(breaking)** Switch all bundles to ES5, rename `.es5` bundles to `.cjs`

## v1.7.0

- Update FontAwesome to v5.0.12 ([changes](https://github.com/FortAwesome/Font-Awesome/blob/b60cbbecb438831419bbe83d838e33e6b7327b38/CHANGELOG.md#5012----2018-05-03))

## v1.6.0

- Add `focusable="false"` for accessibility, adjust default display CSS
- Default the `fill` prop to `currentColor` (allows setting the color of the icon by the CSS `color`)

## v1.5.0

- Upgrade FontAwesome to v5.0.11
  - New user icons
  - Creative Commons symbols
  - Top new brand icons: R, Ebay, Mastodon, Researchgate, Keybase, Teamspeak

## v1.4.0

- Improve accessibility with `title` prop

## v1.3.0

- Add `css` prop for passing additional CSS
- Fix `module` and `jsnext:main` file extensions in `package.json`

## v1.2.0

- Support automatic tree shaking ([#8](https://github.com/jacobwgillespie/styled-icons/pull/8))

## v1.1.1

- Fix npm bundle (missing Font Awesome icons)

## v1.1.0

- Add Font Awesome (free) icon packs

## v1.0.0

- First "real" release
- Reworked TypeScript types
- Generated files target ES5 for browser support
- Updated website
- Publish to NPM from Travis CI

## v0.2.0

- Test deployment from Travis CI to NPM

## v0.1.0

- Initial release with Material and Octocon icons
