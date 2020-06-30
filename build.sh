#!/bin/bash
set -euo pipefail

echo "Generating icon sources"
yarn wsrun -t -x @styled-icons/website -m -c build

echo "Generating TypeScript declaration files"
yarn tsc --emitDeclarationOnly

echo "Building ESM JavaScript"
BABEL_ENV=modern yarn babel packages --extensions '.ts,.tsx' --out-dir packages --source-maps --out-file-extension .esm.js

echo "Building CJS JavaScript"
BABEL_ENV=legacy yarn babel packages --extensions '.ts,.tsx' --out-dir packages --source-maps

echo "Creating package.json files"
find packages -name 'package.built.json' -not -path '*/node_modules/*' \
  -exec bash -c 'mv "$1" "${1%.built.json}".json' - '{}' \;

echo "Done!"
