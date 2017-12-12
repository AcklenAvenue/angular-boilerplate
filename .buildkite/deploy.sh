#!/bin/bash

set -eo pipefail
echo "--- Deploy"
mkdir -p /usr/src/app/dist
ng build
gulp deploy
