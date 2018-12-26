const fg = require('fast-glob')
const fs = require('fs-extra')
const path = require('path')

module.exports = async () => {
  const baseDir = path.dirname(require.resolve('cryptocurrency-icons/package.json'))
  const sourceFiles = await fg(path.join(baseDir, 'svg/black/*.svg'))

  return sourceFiles.map(filename => {
    const match = filename.match(/([^\/]+)\.svg/)
    return {
      originalName: match[1],
      source: fs.readFileSync(filename).toString(),
      pack: 'crypto',
      width: '32',
      height: '32',
    }
  })
}
