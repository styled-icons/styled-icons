import React, {useState, useEffect, useCallback} from 'react'
import {AutoSizer, Grid, WindowScroller, GridCellProps} from 'react-virtualized'
import queryString from 'query-string'
import {StyledIcon} from 'styled-icons/types'
import Router from 'next/router'

import * as JSSearch from 'js-search'
import icons from 'styled-icons/manifest.json'

import {IconCard} from './IconCard'

interface IconType {
  importPath: string
  name: string
  originalName: string
  pack: string
  icon: StyledIcon
}

const searchIndex = new JSSearch.Search('importPath')
searchIndex.searchIndex = new JSSearch.UnorderedSearchIndex()
searchIndex.indexStrategy = new JSSearch.AllSubstringsIndexStrategy()
searchIndex.addIndex('name')
searchIndex.addIndex('originalName')
searchIndex.addIndex('pack')
searchIndex.addDocuments(icons)

const IconExporer: React.SFC = () => {
  const [search, setSearch] = useState('')

  useEffect(() => {
    const query = queryString.parse(window.location.search)
    setSearch(query.s ? decodeURIComponent(Array.isArray(query.s) ? query.s[0] : query.s) : '')
  }, [])

  const updateSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value
    setSearch(search)
    Router.replace(`/?s=${encodeURIComponent(search)}`)
  }, [])

  const filteredIcons = search ? (searchIndex.search(search) as IconType[]) : icons

  const cellRenderer = ({columnIndex, key, rowIndex, style}: GridCellProps) => {
    const idx = rowIndex * 4 + columnIndex
    if (idx >= filteredIcons.length) return null

    const {importPath, name, pack} = filteredIcons[idx]

    return (
      <div className="icon-card-wrapper" key={key} style={style}>
        <IconCard name={name} pack={pack} key={importPath} />
      </div>
    )
  }

  return (
    <div>
      <input
        className="search-box"
        type="text"
        onChange={updateSearch}
        value={search}
        placeholder="search icons"
        aria-label="search icons"
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

export default IconExporer
