const esbuild = require('esbuild')
const fsp = require('fs').promises
const fastGlob = require('fast-glob')

async function build(input, output, format = 'cjs') {
  const source = await fsp.readFile(input, {encoding: 'utf8'})

  try {
    const res = await esbuild.transform(source, {
      format,
      target: 'node12',
      loader: 'tsx',
    })
    await fsp.writeFile(output, res.code)
  } catch (err) {
    console.log({input, output})
    throw err
  }
}

async function run() {
  const tsFiles = await fastGlob(['packages/**/*.ts', 'packages/**/*.tsx'], {
    ignore: ['packages/@styled-icons/styled-icon/**/*'],
  })
  const sources = tsFiles.filter((file) => !file.endsWith('.d.ts'))

  const promises = []

  promises.push(
    ...sources.map(async (file) => {
      const output = file.replace('.tsx', '.js').replace('.ts', '.js')
      await build(file, output)
    }),
  )

  promises.push(
    ...sources.map(async (file) => {
      const output = file.replace('.tsx', '.esm.js').replace('.ts', '.esm.js')
      await build(file, output, 'esm')
    }),
  )

  await Promise.all(promises)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
