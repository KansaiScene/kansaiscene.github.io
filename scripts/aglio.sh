#!/bin/bash
mkdir -p build;
node node_modules/aglio/bin/aglio.js -i api.apib -o build/index.html -t ../../../template/flatly-multi $(envif WATCH -s)