#!/bin/bash

set -eo pipefail
echo "--- Deploy"
ng build
gulp deploy
