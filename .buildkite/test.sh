#!/bin/bash

set -eo pipefail
echo "--- Test"
alias ng="/usr/src/app/node_modules/@angular/cli/bin/ng"
ng test 
#echo "--- E2E Test"
#ng e2e

if [[ $BUILDKITE_PULL_REQUEST = false ]]; then
    echo "--- Sonar Scanner: Scanning "$BUILDKITE_BRANCH" branch"
    sonar-scanner
else
    echo "--- Sonar Scanner: Scanning pull request on "$BUILDKITE_BRANCH" branch"
    sonar-scanner -Dsonar.analysis.mode=preview   -Dsonar.github.pullRequest=$BUILDKITE_PULL_REQUEST  -Dsonar.github.oauth=$GITHUB_ACCESS_TOKEN | tee bk-pipeline.log
fi