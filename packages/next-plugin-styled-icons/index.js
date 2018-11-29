const styledIcons = new RegExp(`styled-icons(?!.*node_modules)`)

module.exports = (nextConfig = {}) =>
  Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (options.isServer) {
        config.externals = config.externals.map(external => {
          if (typeof external !== 'function') {
            return external
          }

          return (ctx, req, cb) => (styledIcons.test(req) ? cb() : external(ctx, req, cb))
        })
      }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    },
  })
