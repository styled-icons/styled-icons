const fontawesome = require('@fortawesome/fontawesome-svg-core')
const solid = require('@fortawesome/free-solid-svg-icons').fas

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
