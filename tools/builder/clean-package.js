#!/usr/bin/env node
// @ts-check

const fg = require('fast-glob')
const fs = require('fs-extra')

const ALLOWED_FILES = ['node_modules', 'package.json', 'CHANGELOG.md', 'README.md']
if (process.env.ALLOWED_FILES) {
  ALLOWED_FILES.push(...process.env.ALLOWED_FILES.split(','))
}

async function run() {
  const files = await fg('*', {onlyFiles: false})

  for (const file of files) {
    if (ALLOWED_FILES.includes(file)) {
      continue
    }

    // console.log(`Removing ${file}`)
    await fs.remove(file)
  }
}

run().catch((err) => {
  console.log(err.stack)
  process.exit(1)
})
