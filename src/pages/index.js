import React from 'react'
import Link from 'gatsby-link'

import * as JSSearch from 'js-search'

import {faBrands, faRegular, faSolid, material, octicons} from '../..'
import icons from '../../manifest.json'
import {IconExplorer} from '../components/IconExplorer'

icons.forEach(icon => {
  switch (icon.pack) {
    case 'fa-brands':
      icon.icon = faBrands[icon.name]
      break

    case 'fa-regular':
      icon.icon = faRegular[icon.name]
      break

    case 'fa-solid':
      icon.icon = faSolid[icon.name]
      break

    case 'material':
      icon.icon = material[icon.name]
      break

    case 'octicons':
      icon.icon = octicons[icon.name]
      break
  }
})

const search = new JSSearch.Search('importPath')
search.searchIndex = new JSSearch.UnorderedSearchIndex()
search.indexStrategy = new JSSearch.AllSubstringsIndexStrategy()
search.addIndex('name')
search.addIndex('originalName')
search.addDocuments(icons)

const IndexPage = () => (
  <div>
    <h1>Styled Icons 💅</h1>
    <div className="badges">
      <a href="https://travis-ci.org/jacobwgillespie/styled-icons">
        <img
          alt="Build Status"
          src="https://travis-ci.org/jacobwgillespie/styled-icons.svg?branch=master"
        />
      </a>
      <a href="https://www.npmjs.com/package/styled-icons">
        <img alt="npm" src="https://img.shields.io/npm/dm/styled-icons.svg" />
      </a>
      <a href="https://www.npmjs.com/package/styled-icons">
        <img alt="npm" src="https://img.shields.io/npm/v/styled-icons.svg" />
      </a>
      <img
        alt="Built with TypeScript"
        src="https://img.shields.io/badge/built%20with-typescript-blue.svg"
      />
    </div>

    <p>
      Import icons from the <a href="https://fontawesome.com/">Font Awesome (free)</a>,{' '}
      <a href="https://material.io/icons/">Material</a>, or{' '}
      <a href="https://octicons.github.com/">Octicons</a> icon packs as{' '}
      <a href="https://www.styled-components.com/">Styled Components</a>
    </p>

    <code className="demo">$ yarn install styled-icons</code>
    <code className="demo">
      {`
import {Alarm} from 'styled-icons/material/Alarm'

const App = () => <Alarm />
    `.trim()}
    </code>

    <p>
      <a href="https://github.com/jacobwgillespie/styled-icons">Usage Information</a>
    </p>

    <h2>Icon Explorer</h2>

    <IconExplorer icons={icons} search={search} />
  </div>
)

export default IndexPage
