const path = require('path')
const fg = require('fast-glob')

const {ICON_PACK} = process.env

function getFiles() {
  const packs = [ICON_PACK]
  if (packs) {
    return packs.map(pack => `tests/${pack}.test.js`)
  }

  const allFiles = fg.sync('tests/**/*.test.js', {cwd: __dirname})
  return allFiles
}

const files = getFiles()

module.exports = files.map(file => path.join('**', file))
