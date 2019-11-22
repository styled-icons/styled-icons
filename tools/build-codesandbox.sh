#!/usr/bin/env bash
set -euo pipefail

packages="$(./node_modules/.bin/lerna list --toposort)"

while read -r package; do
  yarn lerna run build --scope "$package"
done <<< "$packages"
