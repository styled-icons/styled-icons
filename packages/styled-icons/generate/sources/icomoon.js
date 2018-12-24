const fg = require('fast-glob')
const fs = require('fs-extra')
const path = require('path')

module.exports = async () => {
  const baseDir = path.dirname(require.resolve('@styled-icons/icomoon-source/IcoMoon-Free.json'))
  const sourceFiles = await fg(path.join(baseDir, 'SVG/*.svg'))

  return sourceFiles.map(filename => {
    const match = filename.match(/\d+-([^}]+).svg/)
    return {
      originalName: match[1] === 'pagebreak' ? 'pagebreak2' : match[1].toLowerCase(),
      source: fs.readFileSync(filename).toString(),
      pack: 'icomoon',
      width: '16',
      height: '16',
    }
  })
}
