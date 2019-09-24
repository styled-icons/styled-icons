module.exports = {
  launch: {
    headless: true,
  },
  server: {
    command: 'npx serve -s ../website/build/',
    port: 5000,
    launchTimeout: 30000
  },
}
