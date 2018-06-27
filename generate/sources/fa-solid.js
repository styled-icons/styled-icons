const fontawesome = require('@fortawesome/fontawesome').default
const solid = require('@fortawesome/fontawesome-free-solid').default

module.exports = async () =>
  Object.keys(solid).map(iconKey => {
    const icon = fontawesome.icon(solid[iconKey])
    return {
      originalName: icon.iconName,
      source: icon.html,
      pack: 'fa-solid',
      verticalAlign: '-.125em',
    }
  })
