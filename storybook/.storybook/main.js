module.exports = {
  addons: [
    {
      name: 'storybook-addon-turbo-build',
      options: {
        optimizationLevel: 3,
      },
    },
  ],
  stories: ['../stories/**/*.stories.js'],
  core: {
    builder: 'webpack5',
  },
}
