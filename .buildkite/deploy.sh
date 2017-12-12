#!/bin/bash

set -eo pipefail
echo "--- Deploy"
sudo ng build
gulp deploy
