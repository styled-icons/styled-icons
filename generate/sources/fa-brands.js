const fontawesome = require('@fortawesome/fontawesome').default
const brands = require('@fortawesome/fontawesome-free-brands').default

module.exports = async () =>
  Object.keys(brands).map(iconKey => {
    const icon = fontawesome.icon(brands[iconKey])
    return {
      originalName: icon.iconName,
      source: icon.html,
      pack: 'fa-brands',
    }
  })
