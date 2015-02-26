#!/bin/bash
mkdir -p build
rm -rf ./build/images
cp KS-logo-2014.png build
cp favicon.ico build
cp CNAME build/CNAME
cp -R images build/images