function readPackage(pkg) {
  if (pkg.name === '@monorepolint/cli') {
    pkg.dependencies = {...pkg.dependencies, tslib: '*'}
  }
  if (pkg.name === '@monorepolint/core') {
    pkg.dependencies = {...pkg.dependencies, '@monorepolint/rules': '^0.5.0-alpha.0'}
  }
  if (pkg.name === '@monorepolint/rules') {
    pkg.dependencies = {...pkg.dependencies, tslib: '*'}
  }
  if (pkg.name === '@monorepolint/utils') {
    pkg.dependencies = {...pkg.dependencies, tslib: '*'}
  }
  if (pkg.name === '@storybook/components') {
    pkg.peerDependencies = {...pkg.peerDependencies, 'regenerator-runtime': '*'}
  }

  return pkg
}

module.exports = {
  hooks: {
    readPackage,
  },
}
