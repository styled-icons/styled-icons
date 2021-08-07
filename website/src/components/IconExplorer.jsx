import React, {useState, useEffect, useCallback} from 'react'
import {AutoSizer, Grid, WindowScroller} from 'react-virtualized'
import queryString from 'query-string'
import Router from 'next/router'

import * as JSSearch from 'js-search'
import icons from 'styled-icons/manifest.json'

import {IconCard} from './IconCard'

const searchIndex = new JSSearch.Search('importPath')
searchIndex.searchIndex = new JSSearch.UnorderedSearchIndex()
searchIndex.indexStrategy = new JSSearch.AllSubstringsIndexStrategy()
searchIndex.addIndex('name')
searchIndex.addIndex('originalName')
searchIndex.addIndex('pack')
searchIndex.addDocuments(icons)

const IconExporer = () => {
  const [search, setSearch] = useState('')

  useEffect(() => {
    const query = queryString.parse(window.location.search)
    setSearch(query.s ? decodeURIComponent(Array.isArray(query.s) ? query.s[0] : query.s) : '')
  }, [])

  const updateSearch = useCallback((event) => {
    const search = event.target.value
    setSearch(search)
    Router.replace(`/?s=${encodeURIComponent(search)}`)
  }, [])

  const filteredIcons = search ? searchIndex.search(search) : icons

  const cellRenderer = ({columnIndex, key, rowIndex, style}) => {
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
