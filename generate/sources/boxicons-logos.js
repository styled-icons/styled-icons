const fg = require('fast-glob')
const fs = require('fs-extra')

module.exports = async () => {
  const sourceFiles = await fg('node_modules/boxicons/svg/logos/*.svg')

  return sourceFiles.map(filename => {
    const match = filename.match(/bxl-([^}]+).svg/)
    return {
      originalName: match[1],
      source: fs.readFileSync(filename).toString(),
      pack: 'boxicons-logos',
      width: '24',
      height: '24',
    }
  })
}
