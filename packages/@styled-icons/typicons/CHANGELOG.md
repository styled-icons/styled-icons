# @styled-icons/typicons

## 10.46.0

### Minor Changes

- [#2083](https://github.com/styled-icons/styled-icons/pull/2083): Upgrade all dependencies and icons ([`20a053c`](https://github.com/styled-icons/styled-icons/commit/20a053c8d15a844732ef49359dc4679f0f4c8d89), [@jacobwgillespie](https://github.com/jacobwgillespie))

### Patch Changes

- Updated dependencies [[`20a053c`](https://github.com/styled-icons/styled-icons/commit/20a053c8d15a844732ef49359dc4679f0f4c8d89)]:
  - @styled-icons/styled-icon@10.7.0

## 10.18.0

### Patch Changes

- [#1415](https://github.com/styled-icons/styled-icons/pull/1415): Fix issue where @styled-icons/styled-icon package.json incorrectly referenced its built files, breaking some builds ([`bddd470`](https://github.com/styled-icons/styled-icons/commit/bddd47013d035410e9e603207e0d203a5e584ef5), [@jacobwgillespie](https://github.com/jacobwgillespie))

## 10.15.1

### Patch Changes

- [#1377](https://github.com/styled-icons/styled-icons/pull/1377): Fix IE11 compatibility issue ([`08883e2`](https://github.com/styled-icons/styled-icons/commit/08883e2dc7b3799c0bcca790ac85b6aa5f1d8af3), [@jacobwgillespie](https://github.com/jacobwgillespie))

## 10.14.1

### Patch Changes

- [#1358](https://github.com/styled-icons/styled-icons/pull/1358): Fix issue where `.tsx` files were accidentally included in the NPM package (breaking some builds) ([`fad866b`](https://github.com/styled-icons/styled-icons/commit/fad866bd6c6dc31226c7011dca564393c2d6469a), [@jacobwgillespie](https://github.com/jacobwgillespie))

## 10.6.0

### Minor Changes

- [#1286](https://github.com/styled-icons/styled-icons/pull/1286): Revamp all build tooling, build icon source files with Babel (TypeScript still type-checks and builds `.d.ts` files) ([`57170c8`](https://github.com/styled-icons/styled-icons/commit/57170c86283d1ddbe541c6124f06b6a7f227b45b), [@jacobwgillespie](https://github.com/jacobwgillespie))

### Patch Changes

- Updated dependencies [[`57170c8`](https://github.com/styled-icons/styled-icons/commit/57170c86283d1ddbe541c6124f06b6a7f227b45b)]:
  - @styled-icons/styled-icon@10.6.0

## 10.5.0

- Upgrade Ionicons to v5.1.2
- Fix issue where the `@styled-icons/styled-icon` accidentally built as ES6 instead of ES5, breaking IE11

## 10.4.2

- Fix issue where `@styled-icons/simple-icons` was missing from the `styled-icons` dependencies

## 10.4.1

- Fix issue where some new icon packs were mistakenly omitted from the `styled-icons` mono-package

## 10.4.0

- Add [Simple Icons](https://github.com/simple-icons/simple-icons), a large collection of icons for popular brands
- Upgrade Feather Icons to v4.28.0
- Upgrade Font Awesome icons to v5.13.1
- Upgrade Heroicons to v0.3.6
- Upgrade Octicons to v10.0.0
- Upgrade Remixicon icons to v2.5.0

## 10.3.0

- Add Ionicons variants (`ionicons-sharp`, `ionicons-solid`, `ionicons-outline`) ([@Jensderond](https://github.com/jensderond))

## 10.2.1

- Fix issue where the new Eva Icons packs weren't listed in `styled-icon`'s dependencies

## 10.2.0

- Add Eva Icons variants (`evaicons-solid`, `evaicons-outline`) ([@Jensderond](https://github.com/jensderond))

## 10.1.0

- Upgrade Octicons to v9.5.0

## 10.0.0

Styled Icons v10 introduces individual NPM modules for icon packs, originally introduced in v9, as the preferred way to install Styled Icons. It also deprecates single icon imports (`styled-icons/PACK/ICON`) on the main `styled-icons` package in favor of the new individual icon packages (`@styled-icons/PACK/ICON`).

To upgrade, you only need to update your code if you import icons individually (`styled-icons/PACK/ICON`) - you will need to change the following:

```typescript
import {Icon} from 'styled-icons/pack/icon'
```

To the following (also install the `@styled-icons/pack` module):

```typescript
import {Icon} from '@styled-icons/pack/icon'
```

All other imports from `styled-icons` still function as before (for instance `import {Icon} from 'styled-icons/pack'`), though you are welcome to migrate to the new `@styled-icons/PACK` modules. See the README for a list of icon packs.

- **(breaking)** Remove individual icon imports from the `styled-icons` package (`styled-icons/PACK/ICON`)
- Update documentation to introduce new `@styled-icons/PACK` NPM modules as the first-class install method

## 9.6.0

- Add Material icon variants (`material-outlined`, `material-rounded`, `material-sharp`, `material-twotone`)

## 9.5.0

- Add [Entypo](http://www.entypo.com/) icons
- Add [Foundation](https://zurb.com/playground/foundation-icon-fonts-3) icons
- Add [Heroicons](https://github.com/refactoringui/heroicons)
- Add [Open Iconic](https://www.npmjs.com/package/open-iconic) icons
- Add [Zondicons](https://www.zondicons.com/)

## 9.4.1

- Fix issue with `peerDependencies` that prevented Styled Icons from being used with Yarn 2 (berry).

## 9.4.0

- Upgrade Boxicons to v2.0.5
- Upgrade Feather Icons to v4.26.0
- Upgrade Font Awesome to v5.12.1
- Upgrade Remix icons to v2.3.0
- Fix issue where TypeScript incorrectly expanded a type and required specifying `crossOrigin` as a prop

## 9.3.0

- Upgrade Octicons to v9.4.0

## 9.2.0

- Upgrade Remix Icons to v2.2.0
- Enable support for Styled Components v5

## 9.1.0

- Upgrade Feather Icons to v4.25.0
- Upgrade Font Awesome to v5.12.0
- Upgrade Octicons to v9.3.1

## 9.0.1

- Fix publish issue where built files were missing from `@styled-icons/styled-icon`

## 9.0.0

Styled Icons v9 adds individual icon pack NPM modules (`@styled-icons/pack-name`) for each icon pack - you now have the option of only installing specific packs. For instance:

```typescript
// this still works:
import {Alert} from 'styled-icons/material'

// NEW - this pack can be installed individually:
import {Alert} from '@styled-icons/material'
```

These new individual icon pack modules are _optional_, you can continue to utilize the `styled-icons` package as before.

- **(breaking)** removed `styled-icons/StyledIconBase` export - this is an internal export, this shouldn't affect your applications
- Create individual `@styled-icons/pack` NPM packages
- Upgrade Boxicons to v2.0.4
- Upgrade Feather Icons to v4.24.1
- Upgrade Octicons to v9.3.0
- Upgrade Remix Icons to v2.1.0
- Infrastructure: switch CI providers to Azure Pipelines
- Infrastructure: convert `styled-icons` package to re-export individual icon packages
- Infrastructure: deploy website with Zeit Now

## 8.6.0

- Upgrade Octicons to v9.2.0

## 8.5.1

- Fix issue with README that prevented publishing v8.5.0

## 8.5.0

- Add Remix icon pack v2.0.0
- Upgrade Font Awesome icons to v5.11.2

## 8.4.2

- Fix issue where Feather icons were too solid (thank you [@stramel](https://github.com/stramel)!)

## 8.4.1

- Fix issue where Feather icons were transparent (`fill="none"`)

## 8.4.0

- Upgrade Cryptocurrency Icons to v0.16.1
- Switch Material Icons source to `material-design-icons-updated`, upgrade to v4.8.2 (thank you [@stramel](https://github.com/stramel)!)

## 8.3.0

- Upgrade Octicons to v9.1.1

## 8.2.0

- Upgrade Cryptocurrency Icons to v0.14.0
- Upgrade Feather Icons to v4.22.1

## 8.1.0

- Upgrade Font Awesome to v5.9.0

## 8.0.0

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

## 7.15.1

- Fix issue with tree shaking caused by missing `package.json` files, mark everything with `"sideEffects": false`

## 7.15.0

- Upgrade Boxicons to v2.0.2

## 7.14.0

- Add Evil Icons v1.10.1

## 7.13.0

- Upgrade Font Awesome to v5.8.2

## 7.12.0

- Upgrade Boxicons v2.0.1

## 7.11.0

- Upgrade Boxicons to v1.9.4
- Fix TypeScript types for `aria-hidden` prop

## 7.10.0

- Upgrade Cryptocurrency Icons to v0.13.0

## 7.9.0

- Upgrade Feather icons to v4.21.0

## 7.8.0

- Upgrade Feather icons to v4.20.0
- Upgrade Boxicons to v1.9.3

## 7.7.0

- Upgrade Font Awesome to v5.8.1

## 7.6.0

- Upgrade Font Awesome to v5.8.0

## 7.5.0

- Upgrade Boxicons to v1.9.2
- Upgrade Cryptocurrency Icons to v0.11.0

## 7.4.2

- Add file extensions to icon `package.json` files to fix issues with certain bundlers not resolving icon files

## 7.4.1

- Fix TypeScript type issue where `StyledIconProps` incorrectly allowed a string value as a `ref` which prevented that type from actually being used.

## 7.4.0

- Upgrade Octicons to v8.5.0

## 7.3.0

- Upgrade Feather icons to v4.19.0

## 7.2.0

- Upgrade Octicons to v8.4.2

## 7.1.1

- Fix issue that omitted certain files from the NPM bundle

## 7.1.0

- Centralize Styled Components code into internal `StyledIconBase` component for significantly faster type-checking
- Optimize Styled Icon render method performance, don't create new functions on each render

## 7.0.1

- Remove TypeScript source files from the NPM package
- Fix TypeScript strict build ([@caseylucas](https://github.com/caseylucas))

## 7.0.0

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

## 6.12.0

- Upgrade Octicons to v8.4.0

## 6.11.0

- Upgrade Feather icons to v4.17.0

## 6.10.0

- Upgrade Feather icons to v4.16.0

## 6.9.0

- Upgrade Font Awesome to v5.7.1

## 6.8.0

- Upgrade Feather icons to v4.15.0

## 6.7.0

- Upgrade Font Awesome to v5.7.0
- Upgrade Feather icons to v4.14.0

## 6.6.0

- Upgrade Feather icons to v4.12.0

## 6.5.1

- Upgrade Boxicons to v1.9.1 (fixes issue with missing icons)

## 6.5.0

- Upgrade Boxicons to v1.9.0

## 6.4.0

- Upgrade Octicons to v8.3.0
- Upgrade Cryptocurrency Icons to v0.10.0

## 6.3.0

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

## 6.2.1

- Fix issue where custom props that were not valid DOM attributes were passed through to the `<svg>` element

## 6.2.0

- Add Cryptocurrency icon pack

## 6.1.0

- Add Typicons icon pack

## 6.0.1

- No code changes, fix issue with broken CI deployment

## 6.0.0

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

## 5.8.0

- Add Icomoon free icons

## 5.7.0

- Upgrade Feather icons to v4.10.0
- Wrap SVGs with `React.forwardRef` to fix Styled Components `as` prop, `attrs`, and the `ref` prop
- Use Next.js to build the website

## 5.6.0

- Upgrade FontAwesome to v5.6.3

## 5.5.0

- Upgrade FontAwesome to v5.6.1

## 5.4.0

- Upgrade FontAwesome to v5.6.0

## 5.3.0

- Upgrade Octicons to v8.2.0

## 5.2.2

- Fix issue where Boxicon and Material icons were missing from published package

## 5.2.1

- Fix npm publish to include README

## 5.2.0

- Release [next-plugin-styled-icons](https://github.com/styled-icons/styled-icons/tree/master/packages/next-plugin-styled-icons) to enable tree shaking with [Next.js](https://nextjs.org) applications

## 5.1.1

- No functional changes
- Updated repository to monorepo structure

## 5.1.0

- Add back an exported `StyledIcon` TypeScript type automatically generated from type of an icon

## 5.0.0

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

## 4.3.0

- Upgrade Boxicons to v1.8.1

## 4.2.0

- Upgrade Octicons to v8.1.3

## 4.1.0

- Add [Boxicons](https://boxicons.com/) v1.8.0 ([#408](https://github.com/styled-icons/styled-icons/pull/418), [@jgierer12](https://github.com/jgierer12))
- Fix React import in TypeScript type definitions

## 4.0.0

- **(breaking)** require Styled Components >= v4.1.0
- Fix Styled Components deprecation warning
- Update Styled Components TypeScript types
- Upgrade build-the-scenes build dependencies

## 3.7.0

- Upgrade Octicons to v8.1.2

## 3.6.0

- Upgrade FontAwesome to v5.5.0
- Upgrade Feather to v4.9.0

## 3.5.0

- Upgrade Feather icons to v4.8.1

## 3.4.0

- Upgrade FontAwesome to v5.4.2

## 3.3.0

- Add Styled Components v4 compatibility

## 3.2.0

- Upgrade FontAwesome to v5.4.1

## 3.1.0

- Upgrade FontAwesome to v5.4.0

## 3.0.0

- **Breaking:** remove `css` prop for adding additional styles. This shortcuts the built-in inheritance capabilities of Styled Components and generally led to hard-to-debug edge cases
- Upgrade FontAwesome to v5.3.1

## 2.4.0

- Upgrade Octicons to v8.1.0 (new `arrow-both` icon)

## 2.3.2

- Disable `convertShapeToPath` transformation that simplified icon SVGs as it was breaking certain icons

## 2.3.1

- Fix issue where `.cjs` entrypoints required non-CommonJS files

## 2.3.0

- Set `vertical-align` of FontAwesome icons to `-.125em` to match FontAwesome styles

## 2.2.0

- Upgrade FontAwesome to v5.0.13 - 68 new icons ([changes](https://github.com/FortAwesome/Font-Awesome/blob/master/CHANGELOG.md#5013----2018-05-10))

## 2.1.0

- Upgrade Octicons to v7.3.0 ([changes](https://github.com/primer/octicons/blob/master/CHANGELOG.md#730))

## 2.0.0

- Add [Feather](https://feathericons.com/) icon pack
- **(breaking)** Switch all bundles to ES5, rename `.es5` bundles to `.cjs`

## 1.7.0

- Update FontAwesome to v5.0.12 ([changes](https://github.com/FortAwesome/Font-Awesome/blob/b60cbbecb438831419bbe83d838e33e6b7327b38/CHANGELOG.md#5012----2018-05-03))

## 1.6.0

- Add `focusable="false"` for accessibility, adjust default display CSS
- Default the `fill` prop to `currentColor` (allows setting the color of the icon by the CSS `color`)

## 1.5.0

- Upgrade FontAwesome to v5.0.11
  - New user icons
  - Creative Commons symbols
  - Top new brand icons: R, Ebay, Mastodon, Researchgate, Keybase, Teamspeak

## 1.4.0

- Improve accessibility with `title` prop

## 1.3.0

- Add `css` prop for passing additional CSS
- Fix `module` and `jsnext:main` file extensions in `package.json`

## 1.2.0

- Support automatic tree shaking ([#8](https://github.com/styled-icons/styled-icons/pull/8))

## 1.1.1

- Fix npm bundle (missing Font Awesome icons)

## 1.1.0

- Add Font Awesome (free) icon packs

## 1.0.0

- First "real" release
- Reworked TypeScript types
- Generated files target ES5 for browser support
- Updated website
- Publish to NPM from Travis CI

## 0.2.0

- Test deployment from Travis CI to NPM

## 0.1.0

- Initial release with Material and Octocon icons
