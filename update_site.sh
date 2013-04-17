#!/bin/sh

mkdir -p tmp/
git clone https://github.com/dthevenin/AnimatedTransition.git tmp
rm -rf lib
rm -rf examples
cd tmp
./update_lib.sh
cd ..
mv tmp/lib .
mv tmp/examples .
mv tmp/lib_ext .
rm -rf tmp
