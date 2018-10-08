import React from 'react'
import Link from 'gatsby-link'

import * as JSSearch from 'js-search'

import {faBrands, faRegular, faSolid, feather, material, octicons} from '../..'
import icons from '../../manifest.json'
import {Badges} from '../components/Badges'
import {IconExplorer} from '../components/IconExplorer'
import Layout from '../components/Layout'

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

    case 'feather':
      icon.icon = feather[icon.name]
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
  <Layout>
    <div>
      <h1>Styled Icons 💅</h1>
      <Badges />

      <p>
        Import icons from the <a href="https://feathericons.com/">Feather</a>,{' '}
        <a href="https://fontawesome.com/">Font Awesome (free)</a>,{' '}
        <a href="https://material.io/icons/">Material</a>, or{' '}
        <a href="https://octicons.github.com/">Octicons</a> icon packs as{' '}
        <a href="https://www.styled-components.com/">Styled Components</a>
      </p>

      <code className="demo">
        {`
import styled from 'styled-components'
import {Zap} from 'styled-icons/octicons/Zap'

const RedZap = styled(Zap)\`
  color: red;
\`

const App = () => <RedZap />
    `.trim()}
      </code>

      <p>
        <a href="https://github.com/jacobwgillespie/styled-icons">View documentation on GitHub</a>
      </p>

      <h2>Icon Explorer</h2>

      <IconExplorer icons={icons} search={search} />
    </div>
  </Layout>
)

export default IndexPage
