// TODO: port this to gulp
// TODO: actually parse the SVG
// TODO: run the SVG source through an optimizer

const {toWords} = require('number-to-words')
const fastCase = require('fast-case')
const fg = require('fast-glob')
const fs = require('fs-extra')
const octicons = require('octicons')
const path = require('path')
const prettier = require('prettier')

const pkg = require('../package.json')

const formatIconName = name => {
  name = name.replace(/^\d+/, digits => `${toWords(parseInt(digits, 10))}_`)
  return name.length === 1 ? name.toUpperCase() : fastCase.pascalize(name)
}

const iconTemplate = (name, source) => {
  const processedSource = source
    .replace(/fill-opacity/g, 'fillOpacity')
    .replace(/fill-rule/, 'fillRule')

  return `
import * as React from 'react'
import styled, {StyledComponentClass} from 'styled-components'

export const ${name} = styled((props: React.SVGProps<SVGSVGElement>) => (
  ${processedSource}
))\`\`

export {StyledComponentClass}
`.trim()
}

const materialIconTemplate = (name, source) =>
  iconTemplate(
    name,
    source.replace(
      /^<svg([^>]+)>/,
      (_match, attrs) => `<svg${attrs} aria-hidden="true" {...props}>`,
    ),
  )

const octoconIconTemplate = (name, path, attrs) =>
  iconTemplate(name, `<svg {...${JSON.stringify(attrs)}} {...props}>${path}</svg>`)

const formatSourceCode = source => prettier.format(source, {...pkg.prettier, parser: 'typescript'})

const build = async () => {
  const generatedIcons = []

  const iconBase = path.join(__dirname, '..', 'build', 'typescript')
  fs.mkdirpSync(path.join(iconBase))
  fs.mkdirpSync(path.join(iconBase, 'material'))
  fs.mkdirpSync(path.join(iconBase, 'octicons'))

  // Material Icons
  const iconFiles = fg.sync('node_modules/material-design-icons/*/svg/production/*24px.svg')
  const materialSources = []
  for (const sourceFilename of iconFiles) {
    const materialName = sourceFilename.match(/ic_(.*)_((\d+x)?24px)\.svg$/)[1]
    const name = formatIconName(materialName)
    const destinationFilename = path.join(iconBase, 'material', `${name}.tsx`)

    const iconSource = fs
      .readFileSync(sourceFilename)
      .toString()
      .trim()
    const source = formatSourceCode(materialIconTemplate(name, iconSource))
    fs.writeFileSync(destinationFilename, source)

    generatedIcons.push({
      name,
      originalName: materialName.replace('_', ' '),
      pack: 'material',
    })
  }

  // Octicons
  const octoconNames = Object.keys(octicons)
  for (const octoconName of octoconNames) {
    const name = formatIconName(octoconName)
    const destinationFilename = path.join(iconBase, 'octicons', `${name}.tsx`)
    const iconData = octicons[octoconName]
    const attrs = {...iconData.options}
    delete attrs.class

    const source = formatSourceCode(octoconIconTemplate(name, iconData.path, attrs))
    fs.writeFileSync(destinationFilename, source)

    generatedIcons.push({
      name,
      originalName: octoconName,
      pack: 'octicons',
    })
  }

  const generatedMaterialIcons = generatedIcons.filter(({pack}) => pack === 'material')
  fs.writeFileSync(
    path.join(iconBase, 'material', 'index.ts'),
    formatSourceCode(
      generatedMaterialIcons
        .map(({name, originalName}) => `export * from './${name}' // ${originalName}`)
        .join('\n'),
    ),
  )

  const generatedOctoconIcons = generatedIcons.filter(({pack}) => pack === 'octicons')
  fs.writeFileSync(
    path.join(iconBase, 'octicons', 'index.ts'),
    formatSourceCode(
      generatedOctoconIcons
        .map(({name, originalName}) => `export * from './${name}' // ${originalName}`)
        .join('\n'),
    ),
  )

  fs.writeFileSync(
    path.join(iconBase, 'index.ts'),
    formatSourceCode(`
import * as material from './material'
import * as octicons from './octicons'

export {material, octicons}
    `),
  )
}

build().catch(err => {
  console.log(err.stack)
  process.exit(1)
})
