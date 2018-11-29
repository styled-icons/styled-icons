const octicons = require('octicons')

module.exports = async () =>
  Object.keys(octicons).map(originalName => {
    const icon = octicons[originalName]
    return {
      originalName,
      source: icon.toSVG(),
      pack: 'octicons',
      width: icon.width,
      height: icon.height,
    }
  })
