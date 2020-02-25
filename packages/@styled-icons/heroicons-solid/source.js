const fg = require('fast-glob')
const fs = require('fs-extra')
const path = require('path')

module.exports = async () => {
  const baseDir = path.dirname(require.resolve('heroicons/package.json'))
  const sourceFiles = await fg(path.join(baseDir, 'dist/solid-sm/*.svg'))

  return sourceFiles.map(filename => {
    const match = filename.match(/sm-([^}]+)\.svg$/)
    return {
      originalName: match[1],
      source: fs.readFileSync(filename).toString(),
      pack: 'heroicons-solid',
      width: '20',
      height: '20',
    }
  })
}
