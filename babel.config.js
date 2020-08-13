module.exports = {
  plugins: ['@babel/plugin-transform-runtime', ['babel-plugin-styled-components', {fileName: false, pure: true}]],
  env: {
    legacy: {
      presets: [
        '@babel/preset-react',
        '@babel/preset-typescript',
        [
          '@babel/preset-env',
          {
            bugfixes: true,
            targets: {ie: '11'},
          },
        ],
      ],
    },
    modern: {
      presets: [
        '@babel/preset-react',
        '@babel/preset-typescript',
        [
          '@babel/preset-env',
          {
            bugfixes: true,
            modules: false,
            targets: {ie: '11'},
          },
        ],
      ],
    },
  },
}
