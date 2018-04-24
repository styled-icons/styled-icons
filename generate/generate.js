const {toWords} = require('number-to-words')
const execa = require('execa')
const fastCase = require('fast-case')
const fg = require('fast-glob')
const fs = require('fs-extra')
const ora = require('ora')
const path = require('path')

const h2x = require('./transform/h2x')
const svgo = require('./transform/svgo')

const PACKS = ['fa-regular', 'fa-solid', 'fa-brands', 'material', 'octicons']

let spinner

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
  spinner = ora('Reading icon packs...').start()

  const icons = (await Promise.all(PACKS.map(pack => require(`./sources/${pack}`)()))).reduce(
    (all, icons) => all.concat(...icons),
    [],
  )

  spinner.text = 'Reading template...'
  const template = await getTemplate()

  spinner.text = 'Clearing desination files...'
  const destinationFiles = ['build', ...PACKS, 'index.d.ts', 'index.es5.js', 'index.js']
  for (const destinationFile of destinationFiles) {
    await fs.remove(path.join(__dirname, '..', destinationFile))
  }

  spinner.text = 'Building icons...'
  const totalIcons = icons.length
  let builtIcons = 0

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

    // Special-case the `React` icon
    if (icon.name === 'React') icon.name = 'ReactLogo'

    const component = template
      .replace(/{{height}}/g, icon.height)
      .replace(/{{name}}/g, icon.name)
      .replace(/{{svg}}/g, result)
      .replace(/{{viewBox}}/g, icon.viewBox)
      .replace(/{{width}}/g, icon.width)

    const destinationFilename = path.join(baseDir, 'typescript', icon.pack, `${icon.name}.tsx`)
    await fs.outputFile(destinationFilename, component)

    spinner.text = `[${++builtIcons} / ${totalIcons}] Built ${icon.pack}/${icon.name}...`
  }

  spinner.text = 'Writing index files...'

  for (const iconPack of PACKS) {
    const seenNames = new Set()

    const packIcons = icons.filter(({pack}) => pack === iconPack)
    await fs.outputFile(
      path.join(baseDir, 'typescript', iconPack, 'index.ts'),

      packIcons
        .map(({name}) => {
          // The Material icon pack has one icon incorrectly in the pack twice
          const seen = seenNames.has(name)
          seenNames.add(name)
          return seen ? null : `export {${name}} from './${name}'`
        })
        .filter(lines => lines)
        .join('\n') +
        `

export {StyledIcon, StyledIconProps} from '..'
`,
    )
  }

  await fs.writeFileSync(
    path.join(baseDir, 'typescript', 'index.ts'),
    `import {StyledComponentClass, Interpolation, ThemedStyledProps} from 'styled-components'

${PACKS.map((pack, idx) => `import * as ${fastCase.camelize(pack)} from './${pack}'`).join('\n')}

export interface StyledIconProps<T> extends React.SVGProps<SVGSVGElement> {
  size?: number | string
  css?: Interpolation<ThemedStyledProps<StyledIconProps<T>, T>>
}

export interface StyledIcon<T = any> extends StyledComponentClass<StyledIconProps<T>, T> {}

export {${PACKS.map(fastCase.camelize).join(', ')}}
`,
  )

  spinner.text = 'Building modern JavaScript...'

  let compiler = execa('./node_modules/.bin/tsc', [
    '--project',
    './tsconfig.icons.json',
    '--pretty',
  ])
  compiler.stdout.pipe(process.stdout)
  compiler.stderr.pipe(process.stderr)
  await compiler

  spinner.text = 'Building ES5 bundles...'

  compiler = execa('./node_modules/.bin/tsc', [
    '--project',
    './tsconfig.icons.es5.json',
    '--pretty',
  ])
  compiler.stdout.pipe(process.stdout)
  compiler.stderr.pipe(process.stderr)
  await compiler

  spinner.text = 'Copying files to destination...'
  const builtFiles = [...PACKS, 'index.d.ts', 'index.js']
  for (const builtFile of builtFiles) {
    await fs.remove(path.join(__dirname, '..', builtFile))
    await fs.move(path.join(baseDir, 'icons', builtFile), path.join(__dirname, '..', builtFile))
  }

  const es5Files = await fg('build/icons-es5/**/*.js')
  for (const es5File of es5Files) {
    const destination = path.join(
      __dirname,
      '..',
      es5File.replace('build/icons-es5/', '').replace(/\.js$/, '.es5.js'),
    )
    await fs.move(path.join(__dirname, '..', es5File), destination)
  }

  spinner.text = 'Writing icon manifest for website...'
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

  spinner.succeed(`${totalIcons} icons successfully built!`)
}

generate().catch(err => {
  if (spinner) {
    spinner.fail(err.stack)
  } else {
    console.error(err.stack)
  }
  process.exit(1)
})
