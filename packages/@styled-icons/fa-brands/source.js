const fontawesome = require('@fortawesome/fontawesome-svg-core')
const brands = require('@fortawesome/free-brands-svg-icons').fab

module.exports = async () =>
  Object.keys(brands).map(iconKey => {
    const icon = fontawesome.icon(brands[iconKey])
    return {
      originalName: icon.iconName,
      source: icon.html,
      pack: 'fa-brands',
      verticalAlign: '-.125em',
    }
  })
