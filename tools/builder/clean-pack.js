#!/usr/bin/env node
// @ts-check

const fg = require('fast-glob')
const fs = require('fs-extra')

const ALLOWED_FILES = ['source.js', 'package.json', 'README.md']

async function run() {
  const files = await fg('*', {onlyFiles: false})

  for (const file of files) {
    if (ALLOWED_FILES.includes(file)) {
      continue
    }

    console.log(`Removing ${file}`)
    await fs.remove(file)
  }

  console.log('Done')
}

run().catch(err => {
  console.log(err.stack)
  process.exit(1)
})
