const fg = require('fast-glob')
const fs = require('fs-extra')
const path = require('path')

module.exports = async () => {
  const baseDir = path.dirname(require.resolve('ionicons/package.json'))
  const sourceFiles = await fg(path.join(baseDir, 'dist/svg/*-sharp.svg'))

  return sourceFiles.map(filename => {
    const match = filename.match(/([^\/]+)-sharp\.svg$/)
    return {
      originalName: match[1],
      source: fs.readFileSync(filename).toString(),
      pack: 'ionicons-sharp',
      width: '20',
      height: '20',
    }
  })
}
