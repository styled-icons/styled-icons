const fontawesome = require('@fortawesome/fontawesome-svg-core')
const regular = require('@fortawesome/free-regular-svg-icons').far

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
