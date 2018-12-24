import * as React from 'react'
import {AutoSizer, Grid, WindowScroller, GridCellProps} from 'react-virtualized'
import queryString from 'query-string'
import {StyledIcon} from 'styled-icons'
import Router from 'next/router'

import * as JSSearch from 'js-search'

import {
  faBrands,
  faRegular,
  faSolid,
  feather,
  icomoon,
  material,
  octicons,
  boxiconsRegular,
  boxiconsSolid,
  boxiconsLogos,
} from 'styled-icons'
import iconManifest from 'styled-icons/manifest.json'

import {IconCard} from './IconCard'

interface IconType {
  importPath: string
  name: string
  originalName: string
  pack: string
  icon: StyledIcon
}

const icons = iconManifest.map(
  (icon: any): IconType => {
    switch (icon.pack) {
      case 'fa-brands':
        return {...icon, icon: faBrands[icon.name as keyof typeof faBrands]}

      case 'fa-regular':
        return {...icon, icon: faRegular[icon.name as keyof typeof faRegular]}

      case 'fa-solid':
        return {...icon, icon: faSolid[icon.name as keyof typeof faSolid]}

      case 'feather':
        return {...icon, icon: feather[icon.name as keyof typeof feather]}

      case 'icomoon':
        return {...icon, icon: icomoon[icon.name as keyof typeof icomoon]}

      case 'material':
        return {...icon, icon: material[icon.name as keyof typeof material]}

      case 'octicons':
        return {...icon, icon: octicons[icon.name as keyof typeof octicons]}

      case 'boxicons-regular':
        return {...icon, icon: boxiconsRegular[icon.name as keyof typeof boxiconsRegular]}

      case 'boxicons-solid':
        return {...icon, icon: boxiconsSolid[icon.name as keyof typeof boxiconsSolid]}

      case 'boxicons-logos':
        return {...icon, icon: boxiconsLogos[icon.name as keyof typeof boxiconsLogos]}

      default:
        return {...icon, icon: null}
    }
  },
)

const searchIndex = new JSSearch.Search('importPath')
searchIndex.searchIndex = new JSSearch.UnorderedSearchIndex()
searchIndex.indexStrategy = new JSSearch.AllSubstringsIndexStrategy()
searchIndex.addIndex('name')
searchIndex.addIndex('originalName')
searchIndex.addIndex('pack')
searchIndex.addDocuments(icons)

interface Props {}

interface State {
  search: string
}

export default class IconExplorer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    if (typeof window === 'undefined') {
      this.state = {
        search: '',
      }

      return
    }

    const query = queryString.parse(window.location.search)

    this.state = {
      search: query.s ? decodeURIComponent(Array.isArray(query.s) ? query.s[0] : query.s) : '',
    }
  }

  updateSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value
    this.setState({search})
    Router.replace(`/?s=${encodeURIComponent(search)}`)
  }

  render() {
    const filteredIcons = this.state.search
      ? (searchIndex.search(this.state.search) as IconType[])
      : icons

    const cellRenderer = ({columnIndex, key, rowIndex, style}: GridCellProps) => {
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
          {({height, isScrolling, scrollTop}) => (
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
