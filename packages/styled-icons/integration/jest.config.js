module.exports = {
  preset: 'jest-puppeteer',
  testRegex: './*\\.test\\.js$',
  setupFilesAfterEnv: ['./setupTests.js'],
  transform: {
    '^.+\\.js$': './jest.transform.js',
  },
}
