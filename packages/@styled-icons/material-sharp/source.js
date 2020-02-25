const fg = require('fast-glob')
const fs = require('fs-extra')
const path = require('path')

module.exports = async () => {
  const baseDir = path.dirname(require.resolve('material-design-icons-updated'))
  const sourceFiles = await fg(path.join(baseDir, 'icons/sharp/*/*24px.svg'))

  return sourceFiles.map(filename => {
    const match = filename.match(/ic_(.*)_(((\d+)x)?[\d]+px)\.svg$/)
    return {
      originalName: match[1],
      source: fs.readFileSync(filename).toString(),
      pack: 'material-sharp',
      width: match[4] || '24',
      height: '24',
    }
  })
}
