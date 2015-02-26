#!/bin/bash
VERSION=$(git rev-parse --verify HEAD)
git stash save --include-untracked
rm -rf build
git clone git@github.com:KansaiScene/kansaiscene.github.io.git -b master build
npm run build
cd build
git add .
git commit -m "Automatic build of https://github.com/KansaiScene/kansaiscene.github.io/commit/$VERSION"
git push -f origin
cd ..
git stash pop