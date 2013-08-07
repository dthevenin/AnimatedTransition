#!/bin/sh

mkdir -p tmp/
git clone https://github.com/dthevenin/AnimatedTransition.git tmp
rm -rf lib
rm -rf examples
mv tmp/lib .
mv tmp/examples .
rm -rf tmp

mkdir -p tmp/
git clone https://github.com/vinisketch/VSToolkit.git tmp
rm -rf ext/VSToolkit
mkdir -p ext/VSToolkit
mv tmp/lib ext/VSToolkit/lib_debug
rm -rf tmp

rsync -pvtrlL --exclude=.svn/ data/ examples
