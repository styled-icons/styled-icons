import * as React from 'react'
import {navigate} from 'gatsby'
import {AutoSizer, Grid, WindowScroller} from 'react-virtualized'
import queryString from 'query-string'

import {IconCard} from './IconCard'

export class IconExplorer extends React.Component {
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
    navigate(`/?s=${encodeURIComponent(search)}`, {replace: true})
  }

  render() {
    const filteredIcons = this.state.search
      ? this.props.search.search(this.state.search)
      : this.props.icons

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
