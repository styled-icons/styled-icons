module.exports = {
  siteMetadata: {
    title: 'Styled Icons - a Styled Components icon library',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: 'src/images/styled-icons.png',
        injectHTML: true,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          twitter: false,
          yandex: false,
          windows: false,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Styled Icons',
        short_name: 'Styled Icons',
        start_url: '/',
        background_color: '#db7093',
        theme_color: '#db7093',
        display: 'minimal-ui',
        icon: 'src/images/styled-icons.png',
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify',
  ],
}
