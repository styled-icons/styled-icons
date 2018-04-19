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
              {({width}) => (
                <Grid
                  autoHeight
                  cellRenderer={cellRenderer}
                  columnCount={4}
                  columnWidth={Math.floor(width / 4)}
                  height={height}
                  isScrolling={isScrolling}
                  rowCount={Math.ceil(filteredIcons.length / 4)}
                  rowHeight={Math.floor(width / 4)}
                  scrollTop={scrollTop}
                  width={width}
                />
              )}
            </AutoSizer>
          )}
        </WindowScroller>
      </div>
    )
  }
}
