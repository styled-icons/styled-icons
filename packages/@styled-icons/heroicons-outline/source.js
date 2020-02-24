const fg = require('fast-glob')
const fs = require('fs-extra')
const path = require('path')

module.exports = async () => {
  const baseDir = path.dirname(require.resolve('heroicons/package.json'))
  const sourceFiles = await fg(path.join(baseDir, 'dist/outline-md/*.svg'))

  return sourceFiles.map(filename => {
    const match = filename.match(/md-([^}]+)\.svg$/)
    return {
      originalName: match[1],
      source: fs.readFileSync(filename).toString(),
      pack: 'heroicons-outline',
      width: '24',
      height: '24',
    }
  })
}
