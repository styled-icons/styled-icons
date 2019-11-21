const fg = require('fast-glob')
const fs = require('fs-extra')
const path = require('path')

module.exports = async () => {
  const baseDir = path.dirname(require.resolve('remixicon/package.json'))
  const sourceFiles = await fg(path.join(baseDir, 'icons/*/*-line.svg'))

  return sourceFiles.map(filename => {
    const match = filename.match(/([\w-]*)\-line\.svg$/)
    return {
      originalName: match[1],
      source: fs.readFileSync(filename).toString(),
      pack: 'remix-line',
      width: '24',
      height: '24',
    }
  })
}
