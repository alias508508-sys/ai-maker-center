#!/bin/sh
cd "$(dirname "$0")"
export PATH="/Users/des/.nvm/versions/node/v24.14.0/bin:/opt/homebrew/bin:/usr/bin:/bin:$PATH"
./scripts/maker-start.sh
open http://localhost:3000
