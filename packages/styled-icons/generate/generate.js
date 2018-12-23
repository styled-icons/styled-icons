const {toWords} = require('number-to-words')
const execa = require('execa')
const fastCase = require('fast-case')
const fg = require('fast-glob')
const fs = require('fs-extra')
const path = require('path')

const h2x = require('./transform/h2x')
const svgo = require('./transform/svgo')

const PACKS = [
  'fa-regular',
  'fa-solid',
  'fa-brands',
  'feather',
  'material',
  'octicons',
  'boxicons-regular',
  'boxicons-solid',
  'boxicons-logos',
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
    'index.cjs.d.ts',
    'index.cjs.js',
    'index.js',
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
    result = result.join(',\n')

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

    const component = (cjs = false) =>
      template
        .replace(/{{attrs}}/g, JSON.stringify(icon.attrs, null, 2).slice(2, -2))
        .replace(/{{height}}/g, icon.height)
        .replace(/{{cjs}}/g, cjs ? '/index.cjs' : '')
        .replace(/{{name}}/g, icon.name)
        .replace(/{{svg}}/g, result)
        .replace(/{{verticalAlign}}/g, icon.verticalAlign || 'middle')
        .replace(/{{viewBox}}/g, icon.viewBox)
        .replace(/{{width}}/g, icon.width)

    const destinationPath = path.join(baseDir, 'typescript', icon.pack)
    await fs.outputFile(path.join(destinationPath, `${icon.name}.tsx`), component())
    await fs.outputFile(path.join(destinationPath, `${icon.name}.cjs.tsx`), component(true))
  }

  console.log('Writing index files...')

  const writeIndexFiles = async (cjs = false) => {
    for (const iconPack of PACKS) {
      const seenNames = new Set()

      const packIcons = icons.filter(({pack}) => pack === iconPack)
      await fs.outputFile(
        path.join(baseDir, 'typescript', iconPack, cjs ? 'index.cjs.ts' : 'index.ts'),

        packIcons
          .map(({name}) => {
            // The Material icon pack has one icon incorrectly in the pack twice
            const seen = seenNames.has(name)
            seenNames.add(name)
            return seen ? null : `export {${name}} from './${name}${cjs ? '.cjs' : ''}'`
          })
          .filter(lines => lines)
          .join('\n') +
          `

export {StyledIconProps} from '..${cjs ? '/index.cjs' : ''}'
`,
      )
    }

    await fs.writeFileSync(
      path.join(baseDir, 'typescript', cjs ? 'index.cjs.ts' : 'index.ts'),
      `import * as React from 'react'

${PACKS.map(
        (pack, idx) =>
          `import * as ${fastCase.camelize(pack)} from './${pack}${cjs ? '/index.cjs' : ''}'`,
      ).join('\n')}

export interface StyledIconProps extends React.SVGProps<SVGSVGElement> {
  'aria-hidden'?: string
  size?: number | string
  title?: string | null
}

export type StyledIcon = typeof import('./octicons/Alert').Alert

export {${PACKS.map(fastCase.camelize).join(', ')}}
`,
    )
  }

  await writeIndexFiles()
  await writeIndexFiles(true)

  console.log('Building ESM JavaScript...')

  let compiler = execa('./node_modules/.bin/tsc', [
    '--project',
    './tsconfig.icons.json',
    '--pretty',
  ])
  compiler.stdout.pipe(process.stdout)
  compiler.stderr.pipe(process.stderr)
  await compiler

  console.log('Building CJS bundles...')

  compiler = execa('./node_modules/.bin/tsc', [
    '--project',
    './tsconfig.icons.cjs.json',
    '--pretty',
  ])
  compiler.stdout.pipe(process.stdout)
  compiler.stderr.pipe(process.stderr)
  await compiler

  console.log('Copying files to destination...')
  const builtFiles = [...PACKS, 'index.d.ts', 'index.js']
  for (const builtFile of builtFiles) {
    await fs.remove(path.join(__dirname, '..', builtFile))
    await fs.move(path.join(baseDir, 'icons', builtFile), path.join(__dirname, '..', builtFile))
  }

  const cjsFiles = await fg('build/icons-cjs/**/*.cjs.js')
  for (const cjsFile of cjsFiles) {
    const destination = path.join(__dirname, '..', cjsFile.replace('build/icons-cjs/', ''))
    await fs.move(path.join(__dirname, '..', cjsFile), destination, {overwrite: true})
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
