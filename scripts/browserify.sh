#!/bin/bash
mkdir -p build
echo $(envif WATCH "watchify -v" browserify)
$(envif WATCH "watchify -v" browserify) -e ./client/main.js -o build/index.js -t envify -t brfs