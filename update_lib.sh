#!/bin/sh

mkdir -p tmp/
git clone https://github.com/vinisketch/VSToolkit.git tmp
rm -rf lib
mv tmp/lib .
rm -rf tmp
