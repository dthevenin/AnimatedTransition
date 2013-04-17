#!/bin/sh

mkdir -p tmp/
git clone https://github.com/vinisketch/VSToolkit.git tmp
rm -rf lib_ext
mv tmp/lib_debug lib_ext
rm -rf tmp
