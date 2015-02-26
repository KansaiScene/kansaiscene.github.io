#!/bin/bash
mkdir -p build;
aglio -i api.apib -o build/index.html -t ../../../template/flatly-multi $(envif WATCH -s)