##############################################################
##                    COPYRIGHT NOTICE
##
##  Copyright (C) 2009-2012. David Thevenin, ViniSketch SARL (c), and
##  contributors. All rights reserved
##
##  This program is free software: you can redistribute it and/or modify
##  it under the terms of the GNU Lesser General Public License as published
##  by the Free Software Foundation, either version 3 of the License, or
##  (at your option) any later version.
##
##  This program is distributed in the hope that it will be useful,
##  but WITHOUT ANY WARRANTY; without even the implied warranty of
##  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
##  GNU Lesser General Public License for more details.
##
##  You should have received a copy of the GNU Lesser General Public License
##  along with this program. If not, see <http://www.gnu.org/licenses/>.
##############################################################

###                     Declaration
##############################################################

SHELL = /bin/sh
CHMOD = chmod
CP = cp
XTEMP = ../tools/manage_template.sh
MV = mv
NOOP = $(SHELL) -c true
RM_F = rm -f
RM_RF = rm -rf
TEST_F = test -f
TOUCH = touch
UMASK_NULL = umask 0
DEV_NULL = > /dev/null 2>&1
MKPATH = mkdir -p
CAT = cat
MAKE = make
OPEN = open
ECHO = echo
ECHO_N = echo -n
JAVA = java
COMPILE = $(JAVA) -jar ../tools/ext/closurecompiler/compiler.jar --language_in=ECMASCRIPT5
COMPILE_ADV = $(JAVA) -jar ../tools/ext/closurecompiler/compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS
COMPILE_YUI = $(JAVA) -cp ../../../lib/yuicompressor/jargs-1.0.jar:../tools/ext/yuicompressor/rhino-1.6R7.jar -jar ../tools/ext/yuicompressor/yuicompressor-2.4.2.jar
GENDOC = $(JAVA) -jar ../tools/ext/jsdoc-toolkit/jsrun.jar ../tools/ext/jsdoc-toolkit/app/run.js
COMPILE_LESS = lessc

###                         RELEASE
##############################################################

all :: clean AnimatedTransition


clean:
	$(RM) lib/animatedtransition.js
	
AnimatedTransition: lib/animatedtransition.js

lib/animatedtransition.js: 
	$(CAT) src/vst_extension.js >> $@
	$(CAT) src/CubicBezier.js >> $@
	$(CAT) src/Chronometer.js >> $@
	$(CAT) src/Pace.js >> $@
	$(CAT) src/Trajectory.js >> $@
	$(CAT) src/AnimatedTransition.js >> $@
