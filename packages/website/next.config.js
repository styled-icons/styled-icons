const withStyledIcons = require('next-plugin-styled-icons')
const withTypescript = require('@zeit/next-typescript')

module.exports = withTypescript(withStyledIcons())
