#!/bin/bash
set -e

yarn clean
node ./support/generate-icons.js
yarn tsc --project ./tsconfig.icons.json --pretty
mv build/icons/* .
