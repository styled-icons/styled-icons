#!/usr/bin/env node
// @ts-check

const execa = require('execa')
const fastCase = require('fast-case')
const fg = require('fast-glob')
const fs = require('fs-extra')
const path = require('path')

const baseDir = path.resolve(__dirname, '..', '..')

function pkgJSON(name) {
  return `{
  "private": true,
  "main": "./${name}"
}`
}

function pkgJSONBuilt(name) {
  return `{
  "private": true,
  "sideEffects": false,
  "main": "./${name}.js",
  "module": "./${name}.esm.js",
  "types": "./${name}.d.ts"
}`
}

async function run() {
  const sources = await fg('packages/@styled-icons/*/manifest.json', {cwd: baseDir})
  const packs = sources.map(source => require(path.join(baseDir, source)))

  // Prepare for build
  console.log('Generating source files')
  for (const pack of packs) {
    const packName = pack[0].pack
    await fs.mkdirp(packName)

    await fs.writeFile(path.join(packName, 'package.json'), pkgJSON('index'))
    await fs.writeFile(path.join(packName, 'index.ts'), `export * from '@styled-icons/${packName}'`)
  }
  await fs.mkdirp('types')
  await fs.writeFile(
    path.join('types', 'types.ts'),
    `import {StyledIcon, StyledIconProps} from '@styled-icons/styled-icon'
export {StyledIcon, StyledIconProps}`,
  )
  await fs.writeFile(path.join('types', 'package.json'), pkgJSON('types'))
  await fs.writeFile(
    'index.ts',
    `${packs.map(pack => `import * as ${fastCase.camelize(pack[0].pack)} from './${pack[0].pack}'`).join('\n')}

export {${packs.map(pack => fastCase.camelize(pack[0].pack)).join(', ')}}
`,
  )

  // Compile ESM
  console.log('Compiling ESM')
  await fs.writeJSON('tsconfig.json', {
    extends: '@styled-icons/tsconfig/tsconfig.json',
    compilerOptions: {
      declaration: true,
      importHelpers: true,
      module: 'es2015',
    },
  })
  await execa('yarn', ['ttsc', '--project', './tsconfig.json'], {stdio: 'inherit'})
  const esmFiles = await fg('./**/*.js', {ignore: ['node_modules']})
  for (const file of esmFiles) {
    await fs.move(file, file.replace(/\.js/, '.esm.js'))
  }
  await fs.remove('tsconfig.json')

  // Compile CJS
  console.log('Compiling CJS')
  await fs.writeJSON('tsconfig.json', {
    extends: '@styled-icons/tsconfig/tsconfig.json',
    compilerOptions: {
      importHelpers: true,
    },
  })
  await execa('yarn', ['ttsc', '--project', './tsconfig.json'], {stdio: 'inherit'})
  await fs.remove('tsconfig.json')

  // Generate package.json files
  console.log('Generating package.json files')
  for (const pack of packs) {
    await fs.writeFile(path.join(pack[0].pack, 'package.json'), pkgJSONBuilt('index'))
  }
  await fs.writeFile(path.join('types', 'package.json'), pkgJSONBuilt('types'))

  // Write icon manifest
  console.log('Writing icon manifest')
  const icons = packs.reduce((arr, pack) => [...arr, ...pack], [])
  for (const icon of icons) {
    icon.importPath = icon.importPath.replace('@styled-icons', 'styled-icons')
  }
  await fs.writeJSON('manifest.json', icons)
}

run().catch(err => {
  console.log(err.stack)
  process.exit(1)
})
