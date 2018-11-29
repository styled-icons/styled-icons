const fg = require('fast-glob')
const fs = require('fs-extra')
const path = require('path')

module.exports = async () => {
  const baseDir = path.dirname(require.resolve('boxicons'))
  const sourceFiles = await fg(path.join(baseDir, '../svg/regular/*.svg'))

  return sourceFiles.map(filename => {
    const match = filename.match(/bx-([^}]+).svg/)
    return {
      originalName: match[1],
      source: fs.readFileSync(filename).toString(),
      pack: 'boxicons-regular',
      width: '24',
      height: '24',
    }
  })
}
