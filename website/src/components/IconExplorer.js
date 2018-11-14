import * as React from 'react'
import {AutoSizer, Grid, WindowScroller} from 'react-virtualized'
import queryString from 'query-string'

import * as JSSearch from 'js-search'

import {faBrands, faRegular, faSolid, feather, material, octicons} from 'styled-icons'
import icons from 'styled-icons/manifest.json'

import {history} from '../history'
import {IconCard} from './IconCard'

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

    default:
      icon.icon = null
  }
})

const searchIndex = new JSSearch.Search('importPath')
searchIndex.searchIndex = new JSSearch.UnorderedSearchIndex()
searchIndex.indexStrategy = new JSSearch.AllSubstringsIndexStrategy()
searchIndex.addIndex('name')
searchIndex.addIndex('originalName')
searchIndex.addIndex('pack')
searchIndex.addDocuments(icons)

export default class IconExplorer extends React.Component {
  constructor(props) {
    super(props)

    const query = typeof window !== 'undefined' ? queryString.parse(window.location.search) : {}

    const search = query.s ? decodeURIComponent(query.s) : ''

    this.state = {
      search,
    }
  }

  updateSearch = event => {
    const search = event.target.value
    this.setState({search})
    history.replace(`/?s=${encodeURIComponent(search)}`)
  }

  render() {
    const filteredIcons = this.state.search ? searchIndex.search(this.state.search) : icons

    const cellRenderer = ({columnIndex, key, rowIndex, style}) => {
      const idx = rowIndex * 4 + columnIndex
      if (idx >= filteredIcons.length) return null

      const {importPath, icon, name, pack} = filteredIcons[idx]

      return (
        <div className="icon-card-wrapper" key={key} style={style}>
          <IconCard Icon={icon} name={name} pack={pack} key={importPath} />
        </div>
      )
    }

    return (
      <div>
        <input
          className="search-box"
          type="text"
          onChange={this.updateSearch}
          value={this.state.search}
          placeholder="search icons"
        />

        <WindowScroller>
          {({height, isScrolling, onChildScroll, scrollTop}) => (
            <AutoSizer disableHeight>
              {({width}) => {
                const columnCount = width > 755 ? 4 : width < 600 ? 2 : 3
                const rowCount = Math.ceil(filteredIcons.length / columnCount)
                const size = Math.floor(width / columnCount)

                return (
                  <Grid
                    autoHeight
                    cellRenderer={cellRenderer}
                    columnCount={columnCount}
                    columnWidth={size}
                    height={height}
                    isScrolling={isScrolling}
                    rowCount={rowCount}
                    rowHeight={size}
                    scrollTop={scrollTop}
                    width={width}
                  />
                )
              }}
            </AutoSizer>
          )}
        </WindowScroller>
      </div>
    )
  }
}
