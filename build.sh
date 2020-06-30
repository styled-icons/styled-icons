#!/bin/bash
set -euo pipefail

echo "Generating icon sources"
yarn lerna run build --stream --ignore @styled-icons/website

echo "Building ESM JavaScript"
yarn ttsc -b tsconfig.esm.json

echo "Renaming ESM JavaScript"
find packages -name '*.js' -not -name '*.esm.js' -not -path '*/node_modules/*' \
  -exec bash -c 'mv "$1" "${1%.js}".esm.js' - '{}' \;

echo "Building CJS JavaScript"
yarn ttsc -b tsconfig.json

echo "Creating package.json files"
find packages -name 'package.built.json' -not -path '*/node_modules/*' \
  -exec bash -c 'mv "$1" "${1%.built.json}".json' - '{}' \;

echo "Done!"
