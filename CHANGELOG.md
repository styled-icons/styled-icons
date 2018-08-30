# Changelog

## Unreleased

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
