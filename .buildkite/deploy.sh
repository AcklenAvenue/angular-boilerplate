#!/bin/bash

set -eo pipefail
echo "--- Deploy"
whoami
ng build
gulp deploy
