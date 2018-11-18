const fg = require('fast-glob')
const fs = require('fs-extra')

module.exports = async () => {
  const sourceFiles = await fg('node_modules/boxicons/svg/solid/*.svg')

  return sourceFiles.map(filename => {
    const match = filename.match(/bxs-([^}]+).svg/)
    return {
      originalName: match[1],
      source: fs.readFileSync(filename).toString(),
      pack: 'boxicons-solid',
      width: '24',
      height: '24',
    }
  })
}
