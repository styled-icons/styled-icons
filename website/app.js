// @ts-check

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as JSSearch from 'js-search'

import {faBrands, faRegular, faSolid, material, octicons} from '..'

// @ts-ignore
import manifest from '../manifest.json'

import {GitHubCorner} from './GitHubCorner'
import {IconsScroller} from './components/IconsScroller'
import {Header, Badges, CodeExample, A} from './styled'

manifest.forEach(icon => {
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
search.addDocuments(manifest)

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <GitHubCorner />
        <Header>Styled Icons 💅</Header>

        <Badges>
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
        </Badges>

        <p>
          Import icons from the <A href="https://fontawesome.com/">Font Awesome (free)</A>,{' '}
          <A href="https://material.io/icons/">Material</A>, or{' '}
          <A href="https://octicons.github.com/">Octicons</A> icon packs as{' '}
          <A href="https://www.styled-components.com/">Styled Components</A>
        </p>

        <CodeExample>$ yarn install styled-icons</CodeExample>
        <CodeExample>
          {`
import {Alarm} from 'styled-icons/material/Alarm'

const App = () => <Alarm />
    `.trim()}
        </CodeExample>

        <p>
          <A href="https://github.com/jacobwgillespie/styled-icons">Usage Information</A>
        </p>

        <Header>Icon Explorer</Header>

        <IconsScroller search={search} icons={manifest} />
      </React.Fragment>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
