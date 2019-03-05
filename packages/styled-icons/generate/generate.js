const {toWords} = require('number-to-words')
const execa = require('execa')
const fastCase = require('fast-case')
const fg = require('fast-glob')
const fs = require('fs-extra')
const path = require('path')

const h2x = require('./transform/h2x')
const svgo = require('./transform/svgo')

const PACKS = [
  'boxicons-logos',
  'boxicons-regular',
  'boxicons-solid',
  'crypto',
  'fa-brands',
  'fa-regular',
  'fa-solid',
  'feather',
  'icomoon',
  'material',
  'octicons',
  'typicons',
]

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
  originalName = originalName.replace(/^\d+/, digits => `${toWords(parseInt(digits, 10))}_`)
  return originalName.length === 1 ? originalName.toUpperCase() : fastCase.pascalize(originalName)
}

const getTemplate = () =>
  new Promise((resolve, reject) =>
    fs.readFile(path.join(__dirname, 'templates', 'icon.tsx.template'), (err, data) => {
      if (err) reject(err)
      else resolve(data.toString())
    }),
  )

const baseDir = path.join(__dirname, '..', 'build')

const pkgJSON = name => `{
  "private": true,
  "main": "./${name}",
  "module": "./${name}.esm"
}
`

const pkgJSONBuilt = name => `{
  "private": true,
  "main": "./${name}.js",
  "module": "./${name}.esm.js",
  "types": "./${name}.d.ts"
}
`

const generate = async () => {
  console.log('Reading icon packs...')

  const packIcons = await Promise.all(PACKS.map(pack => require(`./sources/${pack}`)()))

  for (const [idx, pack] of packIcons.entries()) {
    if (pack.length === 0) {
      console.log(`Error reading icons from pack ${PACKS[idx]}`)
      process.exit(1)
    }
  }

  const icons = packIcons.reduce((all, icons) => all.concat(...icons), [])

  console.log('Reading template...')
  const template = await getTemplate()

  console.log('Clearing desination files...')
  const destinationFiles = [
    'build',
    ...PACKS,
    'index.d.ts',
    'index.esm.js',
    'index.js',
    'index.ts',
    'StyledIconBase',
    'types',
  ]
  for (const destinationFile of destinationFiles) {
    await fs.remove(path.join(__dirname, '..', destinationFile))
  }

  console.log('Building icons...')
  const totalIcons = icons.length

  for (const icon of icons) {
    const state = {}

    let result = icon.source
    result = await svgo(result)
    result = await h2x(result, state)
    result = result.join('\n      ')

    icon.name = getComponentName(icon.originalName)
    icon.height = state.height || icon.height
    icon.width = state.width || icon.width
    icon.viewBox = state.viewBox || `0 0 ${icon.width} ${icon.height}`
    icon.attrs = {fill: 'currentColor'}

    for (const attr of SVG_ATTRS) {
      if (attr in state.attrs) {
        icon.attrs[fastCase.camelize(attr)] = state.attrs[attr]
      }
    }

    // Special-case the `React` icon
    if (icon.name === 'React') icon.name = 'ReactLogo'

    const component = () =>
      template
        .replace(/{{attrs}}/g, JSON.stringify(icon.attrs, null, 2).slice(2, -2))
        .replace(/{{height}}/g, icon.height)
        .replace(/{{name}}/g, icon.name)
        .replace(/{{svg}}/g, result)
        .replace(/{{verticalAlign}}/g, icon.verticalAlign || 'middle')
        .replace(/{{viewBox}}/g, icon.viewBox)
        .replace(/{{width}}/g, icon.width)

    const destinationPath = path.join(baseDir, icon.pack, icon.name)
    await fs.mkdirp(destinationPath)
    await fs.outputFile(path.join(destinationPath, `${icon.name}.tsx`), component())
    await fs.outputFile(path.join(destinationPath, 'package.json'), pkgJSON(icon.name))
  }

  await fs.mkdirp(path.join(baseDir, 'StyledIconBase'))
  await fs.copy(
    path.join(__dirname, 'templates', 'StyledIconBase.tsx'),
    path.join(baseDir, 'StyledIconBase', 'StyledIconBase.tsx'),
  )
  await fs.writeFile(
    path.join(baseDir, 'StyledIconBase', 'package.json'),
    pkgJSON('StyledIconBase'),
  )

  console.log('Writing index files...')

  const writeIndexFiles = async () => {
    for (const iconPack of PACKS) {
      const seenNames = new Set()

      const packIcons = icons.filter(({pack}) => pack === iconPack)
      await fs.outputFile(
        path.join(baseDir, iconPack, 'index.ts'),

        packIcons
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

    await fs.outputFile(
      path.join(baseDir, 'index.ts'),
      `${PACKS.map(pack => `import * as ${fastCase.camelize(pack)} from './${pack}'`).join('\n')}

export {${PACKS.map(fastCase.camelize).join(', ')}}
`,
    )
  }

  await writeIndexFiles()

  console.log('Writing shared types file...')

  const typesFile = () => `import * as React from 'react'
import {StyledIconProps} from '../StyledIconBase'
export type StyledIcon = React.ForwardRefExoticComponent<React.PropsWithoutRef<StyledIconProps> & React.RefAttributes<SVGSVGElement>>;
export {StyledIconProps}
`

  await fs.mkdirp(path.join(baseDir, 'types'))
  await fs.outputFile(path.join(baseDir, 'types', 'types.ts'), typesFile())
  await fs.outputFile(path.join(baseDir, 'types', 'package.json'), pkgJSON('types'))

  console.log('Generating ESM JavaScript and TypeScript types...')

  let compiler = execa('./node_modules/.bin/ttsc', [
    '--project',
    './tsconfig.icons.json',
    '--pretty',
  ])
  compiler.stdout.pipe(process.stdout)
  compiler.stderr.pipe(process.stderr)
  await compiler

  console.log('Moving ESM JavaScript files...')
  const esmFiles = await fg(path.join(baseDir, '**/*.js'))
  for (const esmFile of esmFiles) {
    const filepath = typeof esmFile === 'string' ? esmFile : esmFile.path
    await fs.move(
      filepath,
      path.join(path.dirname(filepath), path.basename(filepath).replace('.js', '.esm.js')),
    )
  }

  console.log('Building CJS JavaScript...')

  compiler = execa('./node_modules/.bin/ttsc', [
    '--project',
    './tsconfig.icons-cjs.json',
    '--pretty',
  ])
  compiler.stdout.pipe(process.stdout)
  compiler.stderr.pipe(process.stderr)
  await compiler

  console.log('Moving ESM JavaScript files...')
  const cjsFiles = await fg('build/**/*.js')
  for (const builtFile of cjsFiles) {
    const destination = path.join(__dirname, '..', builtFile.replace('build/', ''))
    await fs.move(path.join(__dirname, '..', builtFile), destination)
  }

  console.log('Rewriting package.json files...')
  await fs.writeFile(
    path.join(baseDir, 'StyledIconBase', 'package.json'),
    pkgJSONBuilt('StyledIconBase', '.js'),
  )
  await fs.outputFile(path.join(baseDir, 'types', 'package.json'), pkgJSONBuilt('types', '.js'))
  for (const icon of icons) {
    await fs.outputFile(
      path.join(baseDir, icon.pack, icon.name, 'package.json'),
      pkgJSONBuilt(icon.name, '.js'),
    )
  }

  console.log('Copying files to destination...')
  const builtFiles = await fg('build/**/*')
  for (const builtFile of builtFiles) {
    if (builtFile.match(/\.tsx?$/) && !builtFile.match(/\.d\.ts$/)) {
      continue
    }

    const destination = path.join(__dirname, '..', builtFile.replace('build/', ''))
    await fs.move(path.join(__dirname, '..', builtFile), destination)
  }

  console.log('Writing icon manifest for website...')
  const seenImports = new Set()
  await fs.writeJSON(
    path.join(__dirname, '..', 'manifest.json'),
    icons
      .map(({name, originalName, pack}) => {
        const importPath = `styled-icons/${pack}/${name}`

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
