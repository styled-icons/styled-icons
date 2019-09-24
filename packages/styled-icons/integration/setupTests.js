const {toMatchImageSnapshot} = require('jest-image-snapshot')

expect.extend({toMatchImageSnapshot})

// Useful for Debugging
// jest.setTimeout(120000)
