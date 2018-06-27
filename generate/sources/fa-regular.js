const fontawesome = require('@fortawesome/fontawesome').default
const regular = require('@fortawesome/fontawesome-free-regular').default

module.exports = async () =>
  Object.keys(regular).map(iconKey => {
    const icon = fontawesome.icon(regular[iconKey])
    return {
      originalName: icon.iconName,
      source: icon.html,
      pack: 'fa-regular',
      verticalAlign: '-.125em',
    }
  })
