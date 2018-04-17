#!/bin/bash
set -e

export NODE_ENV=production
yarn parcel build --out-dir build/website support/website/index.html
echo 'styled-icons.js.org' > build/website/CNAME
