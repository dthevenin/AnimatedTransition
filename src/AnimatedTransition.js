/**
 * Copyright (C) 2009-2013. David Thevenin, ViniSketch (c), and 
 * contributors. All rights reserved
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

/******************************************************************************
          
******************************************************************************/

exports.AnimationDefaultOption = {
  duration: 300,
  begin: 0,
  timing: Pace.getEaseInOutPace (),
  steps: 0,
  repeat: 1,
  startClb: null,
  endClb: null
}

/******************************************************************************
          
******************************************************************************/

/**
 *  animateTransition (obj, property, options)
 *
 *  Instruments a object property with an animation
 *  When the property is change, instead of XXX
 *
 *  @param obj {Object} 
 *  @param property {String} the property name to instrument
 *  @param options {Object} Animation options [optional]
**/
exports.animateTransition = function (obj, property, options)
{
  var animOptions = vs.util.clone (AnimationDefaultOption);
  if (options)
  {
    for (var key in options) animOptions [key] = options [key];
  }
  
  var chrono = new Chronometer (animOptions).init ();
  var pace = animOptions.pace;
  var traj = animOptions.trajectory;

  chrono.__clb = function (i) {
    pace.tickIn = i;
    pace.compute ();
    
    traj.tick = pace.tickOut;
    traj.compute ();
    
    obj [property] = traj.out;
    obj.propertyChange ();
  }
  
  return chrono;
}

exports.animateTransitionBis = function (obj, srcs, targets, options)
{
  if (!vs.util.isArray (srcs) || !vs.util.isArray (targets)) return;
  if (srcs.length !== targets.length) return;
  
  var animOptions = vs.util.clone (AnimationDefaultOption);
  if (options)
  {
    for (var key in options) animOptions [key] = options [key];
  }
  
  var chrono = new Chronometer (animOptions).init ();
  var pace = animOptions.pace;
  var traj = animOptions.trajectory;

  chrono.__clb = function (i) {
    pace.tickIn = i;
    pace.compute ();
    
    traj.tick = pace.tickOut;
    traj.compute ();
    
    for (var i = 0; i < srcs.length; i++) { obj [targets[i]] = traj [srcs[i]]; }
    obj.propertyChange ();
  }
  
  return chrono;
}
