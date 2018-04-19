import * as React from 'react'
import {AutoSizer, Grid, WindowScroller, defaultCellRangeRenderer} from 'react-virtualized'

import {IconCard} from './IconCard'

export class IconExplorer extends React.Component {
  state = {
    search: '',
  }

  updateSearch = event => {
    const search = event.target.value
    this.setState({search})
  }

  render() {
    const filteredIcons = this.state.search
      ? this.props.search.search(this.state.search)
      : this.props.icons

    const cellRenderer = ({columnIndex, rowIndex, style}) => {
      const idx = rowIndex * 4 + columnIndex
      if (idx >= filteredIcons.length) return null

      const {importPath, icon, name, pack} = filteredIcons[idx]

      return (
        <div class="icon-card-wrapper" style={style}>
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
