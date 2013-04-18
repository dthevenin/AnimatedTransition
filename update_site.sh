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
rm -rf lib_ext
mv tmp/lib lib_ext
#mv tmp/lib_debug lib_ext
rm -rf tmp

rsync -pvtrlL --exclude=.svn/ data/ examples
