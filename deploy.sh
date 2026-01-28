#!/usr/bin/env bash

set -e
npm run build

cd dist
git add .

GIT_BRANCH="$(cd .. && git rev-parse --abbrev-ref HEAD)"
GIT_COMMIT="$(cd .. && git rev-parse --short HEAD)"

git commit --amend -m "deploy: $GIT_BRANCH $GIT_COMMIT"
git push --force-with-lease