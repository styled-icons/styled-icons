#!/usr/bin/env node
// @ts-check

const {toWords} = require('number-to-words')
const fastCase = require('fast-case')
const fs = require('fs-extra')
const path = require('path')

const h2x = require('./transform/h2x')

const SVG_ATTRS = [
  'fill',
  'fill-opacity',
  'fill-rule',
  'stroke',
  'stroke-dasharray',
  'stroke-dashoffset',
  'stroke-linecap',
  'stroke-linejoin',
  'stroke-miterlimit',
  'stroke-opacity',
]

const getComponentName = (originalName) => {
  originalName = originalName
    .replace(/^\d+/, (digits) => {
      const words = toWords(parseInt(digits, 10)).replace(/[^-a-zA-Z\s]/g, '')
      return `${words}_`
    })
    .replace(/_-/g, '-')
    .replace(/_$/, '')

  return originalName.length === 1 ? originalName.toUpperCase() : fastCase.pascalize(originalName)
}

const getTemplate = () =>
  new Promise((resolve, reject) =>
    fs.readFile(path.join(__dirname, 'templates', 'icon.tsx.template'), (err, data) => {
      if (err) reject(err)
      else resolve(data.toString())
    }),
  )

const baseDir = process.cwd()
const buildDir = path.join(baseDir)

const pkgJSON = (name) => `{
  "private": true,
  "sideEffects": false,
  "main": "./${name}",
  "module": "./${name}.esm"
}
`

const pkgJSONBuilt = (name) => `{
  "private": true,
  "sideEffects": false,
  "main": "./${name}.js",
  "module": "./${name}.esm.js",
  "types": "./${name}.d.ts"
}
`

const generate = async () => {
  const packModuleName = process.argv[2]
  let icons = require(path.join(packModuleName, '__manifest.json'))

  if (icons.length === 0) {
    console.error('Error reading icons from pack')
    process.exit(1)
  }

  if (process.env.SMALL === '1') {
    icons = icons.slice(0, 10)
  }

  const template = await getTemplate()

  const totalIcons = icons.length
  const allIcons = []

  for (const icon of icons) {
    const state = {}

    let result = fs
      .readFileSync(
        path.join(path.dirname(require.resolve(path.join(packModuleName, '__manifest.json'))), `${icon.name}.svg`),
      )
      .toString('utf8')
    result = await h2x(result, state).join('\n      ')

    icon.name = getComponentName(icon.name)
    icon.pack = path.basename(baseDir)
    icon.viewBox = icon.viewBox || `0 0 ${icon.width} ${icon.height}`

    const attrs = {fill: 'currentColor', xmlns: 'http://www.w3.org/2000/svg'}

    for (const attr of SVG_ATTRS) {
      if (attr in icon.attrs) {
        attrs[fastCase.camelize(attr)] = state.attrs[attr]
      }
    }

    // Special-case the `React` icon
    if (icon.name === 'React') icon.name = 'ReactLogo'

    // Special-case the `Package` icon (conflicts with the package.json file)
    if (icon.name === 'Package') icon.name = 'PackageIcon'

    // Special-case the `BookMark` icon (conflicts with the `Bookmark` icon)
    if (icon.name === 'BookMark') icon.name = 'BookWithMark'

    // Skip duplicate icons
    if (icon.pack === 'fa-regular' && icon.name === 'Eyedropper') continue
    if (icon.pack === 'fa-regular' && icon.name === 'PaintBrush') continue
    if (icon.pack === 'fa-regular' && icon.name === 'ThumbTack') continue
    if (icon.pack === 'fa-regular' && icon.name === 'Tshirt') continue
    if (icon.pack === 'fa-solid' && icon.name === 'Eyedropper') continue
    if (icon.pack === 'fa-solid' && icon.name === 'PaintBrush') continue
    if (icon.pack === 'fa-solid' && icon.name === 'ThumbTack') continue
    if (icon.pack === 'fa-solid' && icon.name === 'Tshirt') continue
    if (icon.pack === 'fluentui-system-filled' && icon.name === 'ReOrder') continue
    if (icon.pack === 'fluentui-system-regular' && icon.name === 'ReOrder') continue

    allIcons.push(icon)

    const component = () =>
      template
        .replace(/{{attrs}}/g, JSON.stringify(attrs, null, 2).slice(2, -2))
        .replace(/{{height}}/g, icon.height)
        .replace(/{{name}}/g, icon.name)
        .replace(/{{svg}}/g, result)
        .replace(/{{verticalAlign}}/g, icon.verticalAlign || 'middle')
        .replace(/{{viewBox}}/g, icon.viewBox)
        .replace(/{{width}}/g, icon.width)

    const destinationPath = path.join(buildDir, icon.name)
    await fs.mkdirp(destinationPath)
    await fs.outputFile(path.join(destinationPath, `${icon.name}.tsx`), component())
    await fs.outputFile(path.join(destinationPath, 'package.json'), pkgJSON(icon.name))
    await fs.outputFile(path.join(destinationPath, 'package.built.json'), pkgJSONBuilt(icon.name))
  }

  const writeIndexFiles = async () => {
    const seenNames = new Set()

    await fs.outputFile(
      path.join(buildDir, 'index.ts'),

      allIcons
        .map(({name}) => {
          // The Material icon pack has one icon incorrectly in the pack twice
          const seen = seenNames.has(name)
          seenNames.add(name)
          return seen ? null : `export {${name}} from './${name}'`
        })
        .filter((lines) => lines)
        .join('\n'),
    )
  }

  await writeIndexFiles()

  const seenImports = new Set()
  await fs.writeJSON(
    path.join(baseDir, 'manifest.json'),
    allIcons
      .map(({name, originalName, pack}) => {
        const importPath = `@styled-icons/${pack}/${name}`

        if (seenImports.has(importPath)) return null
        seenImports.add(importPath)

        return {
          importPath,
          name,
          originalName,
          pack,
        }
      })
      .filter((icon) => icon),
  )

  console.log(`${totalIcons} icons generated!`)
}

generate().catch((err) => {
  console.error(err.stack)
  process.exit(1)
})
