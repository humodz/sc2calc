#!/usr/bin/env bash

set -e
npm run build

cd dist

if [ "$(git rev-parse --abbrev-ref HEAD)" != gh-pages ]; then
    echo >&2 'ERROR dist/ must be a worktree on the gh-pages branch'
    exit 1
fi

git add .

GIT_BRANCH="$(cd .. && git rev-parse --abbrev-ref HEAD)"
GIT_COMMIT="$(cd .. && git rev-parse --short HEAD)"

git commit --amend -m "deploy: $GIT_BRANCH $GIT_COMMIT"
git push --force-with-lease