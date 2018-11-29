const fg = require('fast-glob')
const fs = require('fs-extra')

module.exports = async () => {
  const sourceFiles = await fg('node_modules/material-design-icons/*/svg/production/*24px.svg')

  return sourceFiles.map(filename => {
    const match = filename.match(/ic_(.*)_(((\d+)x)?24px)\.svg$/)
    return {
      originalName: match[1],
      source: fs.readFileSync(filename).toString(),
      pack: 'material',
      width: match[4] || '24',
      height: '24',
    }
  })
}
