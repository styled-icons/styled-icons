#!/usr/bin/env node
// @ts-check

const {toWords} = require('number-to-words')
const execa = require('execa')
const fastCase = require('fast-case')
const fg = require('fast-glob')
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

const getComponentName = originalName => {
  originalName = originalName.replace(/^\d+/, digits => `${toWords(parseInt(digits, 10)).replace(/[^\w\s]/, '')}_`).replace(/_$/, '')
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
const buildDir = path.join(baseDir, '__build')

const pkgJSON = name => `{
  "private": true,
  "sideEffects": false,
  "main": "./${name}",
  "module": "./${name}.esm"
}
`

const pkgJSONBuilt = name => `{
  "private": true,
  "sideEffects": false,
  "main": "./${name}.js",
  "module": "./${name}.esm.js",
  "types": "./${name}.d.ts"
}
`

const generate = async () => {
  console.log('Reading icon packs...')

  const packModuleName = process.argv[2]
  const icons = require(path.join(packModuleName, '__manifest.json'))

  if (icons.length === 0) {
    console.log('Error reading icons from pack')
    process.exit(1)
  }

  console.log('Reading template...')
  const template = await getTemplate()

  console.log('Building icons...')
  const totalIcons = icons.length

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
  }

  console.log('Writing index files...')

  const writeIndexFiles = async () => {
    const seenNames = new Set()

    await fs.outputFile(
      path.join(buildDir, 'index.ts'),

      icons
        .map(({name}) => {
          // The Material icon pack has one icon incorrectly in the pack twice
          const seen = seenNames.has(name)
          seenNames.add(name)
          return seen ? null : `export {${name}} from './${name}'`
        })
        .filter(lines => lines)
        .join('\n'),
    )
  }

  await writeIndexFiles()

  console.log('Generating ESM JavaScript and TypeScript types...')

  await fs.writeJSON('tsconfig.json', {
    extends: '@styled-icons/tsconfig/tsconfig.icons.json',
    compilerOptions: {
      outDir: './__build',
      rootDir: './__build',
    },
  })
  await execa('yarn', ['ttsc', '--project', './tsconfig.json'], {stdio: 'inherit'})
  await fs.remove('tsconfig.json')

  console.log('Moving ESM JavaScript files...')
  const esmFiles = await fg(path.join(buildDir, '**/*.js'))
  for (const filepath of esmFiles) {
    await fs.move(filepath, path.join(path.dirname(filepath), path.basename(filepath).replace('.js', '.esm.js')), {
      overwrite: true,
    })
  }

  console.log('Building CJS JavaScript...')

  await fs.writeJSON('tsconfig.json', {
    extends: '@styled-icons/tsconfig/tsconfig.icons-cjs.json',
    compilerOptions: {
      outDir: './__build',
      rootDir: './__build',
    },
  })
  await execa('yarn', ['ttsc', '--project', './tsconfig.json'], {stdio: 'inherit'})
  await fs.remove('tsconfig.json')

  console.log('Moving CJS JavaScript files...')
  const cjsFiles = await fg('__build/**/*.js')
  for (const builtFile of cjsFiles) {
    const destination = path.join(baseDir, builtFile.replace('__build/', ''))
    await fs.move(path.join(baseDir, builtFile), destination, {overwrite: true})
  }

  console.log('Rewriting package.json files...')
  for (const icon of icons) {
    await fs.outputFile(path.join(buildDir, icon.name, 'package.json'), pkgJSONBuilt(icon.name))
  }

  console.log('Copying files to destination...')
  const builtFiles = await fg('__build/**/*')
  for (const builtFile of builtFiles) {
    if (builtFile.match(/\.tsx?$/) && !builtFile.match(/\.d\.ts$/)) {
      continue
    }

    const destination = path.join(baseDir, builtFile.replace('__build/', ''))
    await fs.move(path.join(baseDir, builtFile), destination, {overwrite: true})
  }

  console.log('Writing icon manifest for website...')
  const seenImports = new Set()
  await fs.writeJSON(
    path.join(baseDir, 'manifest.json'),
    icons
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
      .filter(icon => icon),
  )

  console.log(`${totalIcons} icons successfully built!`)
}

generate().catch(err => {
  console.log(err.stack)
  process.exit(1)
})
