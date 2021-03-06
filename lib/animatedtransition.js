  /**
   * @protected
   * @function
   */
vs.ui.View.prototype.__applyTransformation = function ()
{
  if (this.__action_schedule) return;
  
  this.__action_schedule = true;
  var self = this;
  vs.scheduleAction (function () {
    self.__applyTransformation ();
  });
};

vs.ui.View.prototype.__applyTransformation = function ()
{
  var
    matrix = this.getCTM (),
    transform = matrix.getMatrix3dStr ();

  if (this._magnet === 5)
  {
    transform += " translate(-50%,-50%)";
  }

  vs.util.setElementTransform (this.view, transform);
  delete (matrix);
  
  this.__action_schedule = false;
};/*!
 * AnimatedTransition 0.1 - 
 * MIT licensed
 * 
 * Created by David Thevenin, http://www.vinisketch.fr
 */

var exports = window;

(function()
{
  // port of webkit cubic bezier handling by http://www.netzgesta.de/dev/
  /*!
   *  Copyright (c) 2006 Apple Computer, Inc. All rights reserved.
   *  
   *  Redistribution and use in source and binary forms, with or without 
   *  modification, are permitted provided that the following conditions are met:
   *  
   *  1. Redistributions of source code must retain the above copyright notice, 
   *  this list of conditions and the following disclaimer.
   *  
   *  2. Redistributions in binary form must reproduce the above copyright notice, 
   *  this list of conditions and the following disclaimer in the documentation 
   *  and/or other materials provided with the distribution.
   *  
   *  3. Neither the name of the copyright holder(s) nor the names of any 
   *  contributors may be used to endorse or promote products derived from 
   *  this software without specific prior written permission.
   *  
   *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 
   *  "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, 
   *  THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE 
   *  ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE 
   *  FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES 
   *  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; 
   *  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON 
   *  ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT 
   *  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS 
   *  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   */
  function CubicBezier (t,p1x,p1y,p2x,p2y)
  {
    var ax=0,bx=0,cx=0,ay=0,by=0,cy=0,epsilon=1.0/200.0;
    function sampleCurveX(t) {return ((ax*t+bx)*t+cx)*t;};
    function sampleCurveY(t) {return ((ay*t+by)*t+cy)*t;};
    function sampleCurveDerivativeX(t) {return (3.0*ax*t+2.0*bx)*t+cx;};
    function solve(x) {return sampleCurveY(solveCurveX(x));};
    function fabs(n) {if(n>=0) {return n;}else {return 0-n;}};
    
    function solveCurveX (x)
    {
      var t0,t1,t2,x2,d2,i;
      for (t2 = x, i = 0; i < 8; i++) {
        x2 = sampleCurveX (t2) - x;
        if (fabs (x2) < epsilon) return t2;
        d2 = sampleCurveDerivativeX (t2);
        if (fabs (d2) < 1e-6) break;
        t2 = t2 - x2 / d2;
      }
      t0=0.0; t1=1.0; t2=x;
      if (t2 < t0) return t0;
      if (t2 > t1) return t1;
      while (t0 < t1) {
        x2 = sampleCurveX(t2);
        if (fabs(x2-x)<epsilon) return t2;
        if (x > x2) {t0=t2;}
        else {t1=t2;}
        t2 = (t1 - t0) * 0.5 + t0;
      }
      return t2; // Failure.
    };
    cx = 3.0 * p1x;
    bx = 3.0 * (p2x - p1x) - cx;
    ax = 1.0 - cx - bx;
    cy = 3.0 * p1y;
    by = 3.0 * (p2y - p1y) - cy;
    ay = 1.0 - cy - by;
    
    return solve (t);
  }
  
   /**
   *  cubicBezierTransition(x1, y1, x2, y2) -> Function
   *
   *  Generates a transition easing function that is compatible
   *  with WebKit's CSS transitions `-webkit-transition-timing-function`
   *  CSS property.
   *
   *  The W3C has more information about 
   *  <a href="http://www.w3.org/TR/css3-transitions/#transition-timing-function_tag">
   *  CSS3 transition timing functions</a>.
  **/
  exports.cubicBezierTransition = function (x1, y1, x2, y2)
  {
    return (function(pos) {return CubicBezier (pos,x1,y1,x2,y2);});
  }
})();
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

var Chronometer = vs.core.createClass ({

  parent: vs.core.Task,

  _duration: 300,
  _begin: 0,
  _steps: 0,
  _repeat: 1,
  _tick: 0,
  __time_decl: 0,
  __pause_time: 0,
  __end_time: 0,
  
  properties: {
    duration: vs.core.Object.PROPERTY_IN,
    begin: vs.core.Object.PROPERTY_IN,
    steps: {
      set: function (v) {
        if (!v) {
          this._step = 0;
          return;
        }
        if (!vs.util.isNumber (v)) return;
        if (v < 2) return;
        this._steps = parseInt (v, 10);
      }
    },
    repeat: vs.core.Object.PROPERTY_IN,
    pace: vs.core.Object.PROPERTY_IN,
    tick: vs.core.Object.PROPERTY_OUT
  },
  
  initComponent: function (event)
  {
    this._state = vs.core.Task.STOPPED;
    this._super ();
  },
  
  /**
   *  Starts the task
   *
   * @name vs.core.Task#start
   * @function
   *
   * @param {any} param any parameter (scalar, Array, Object)
   */
  start: function (param)
  {
    if (this._state === vs.core.Task.STARTED) return;

    // schedule a clock cycle
    function _start ()
    {
      if (this._steps === 0) this._start_clock ();
      else this._start_steps ();
    }
    
    if (this._state === vs.core.Task.STOPPED)
    {
      var begin = this._begin || 0;
      this.__time_decl = 0;
      this.__pause_time = 0;
    
      // manage delayed clock
      if (begin > 0)
      {
        vs.scheduleAction (_start.bind (this), begin);
        return;
      }
    
      // manage ended clock before started
      if (-begin > this._repeat * this._duration)
      {
        this.__setTick (1);
        this.propagateChange ('tick');
        if (this.__clb) this.__clb (this._tick);

        if (this.delegate && this.delegate.taskDidEnd)
        { this.delegate.taskDidEnd (this); }
      
        return;
      }
    
      this.__time_decl = -begin % this._duration;
      var r_dec = Math.floor (-begin / this._duration);
      
      this.__repeat_dur = this._repeat - r_dec;
      this.__param = param;
    }
    
    _start.call (this);
  },
  
  __setTick : function (v) {
    if (this._pace && this._pace._timing) {
      this._tick = this._pace._timing (v);
    }
    else this._tick = v;
  },

  /**
   * @function
   * @private
   */
  _clock : function ()
  {
    if (this._state !== vs.core.Task.STARTED) return;
    
    var currTime = Date.now ();
    
    if (currTime >= this.__end_time)
    {
      this.__setTick (1);
      this.propagateChange ('tick');
      if (this.__clb) this.__clb (this._tick);
      if (this.__repeat_dur > 1)
      {
        this.__repeat_dur --;
        // schedule a new clock cycle
        vs.scheduleAction (this._start_clock.bind (this), vs.ON_NEXT_FRAME);
      }
      else
      {
        this._state = vs.core.Task.STOPPED;
        if (this.delegate && this.delegate.taskDidEnd)
        { this.delegate.taskDidEnd (this); }
      }
    }
    else {
      // schedule a new tick
      vs.scheduleAction (this._clock.bind (this), vs.ON_NEXT_FRAME);
      this.__setTick ((currTime - this.__start_time) / this._duration);
      this.propagateChange ('tick');
      if (this.__clb) this.__clb (this._tick);
    }
  },

  /**
   * @function
   * @private
   */
  _start_clock: function ()
  {
    if (this._state === vs.core.Task.PAUSED)
    {
      var pause_dur = Date.now () - this.__pause_time;
      this.__start_time += pause_dur;
      this.__end_time += pause_dur;
      this._state = vs.core.Task.STARTED;
      vs.scheduleAction (this._clock.bind (this));
      return;
    }
    
    this.__start_time = Date.now () - this.__time_decl; this.__time_decl = 0
    this.__end_time = this.__start_time + this._duration;
    
    if (vs.util.isFunction (this.__param)) this.__clb = this.__param;

    this._state = vs.core.Task.STARTED;
    this.__setTick (0);
    this.propagateChange ('tick');
    if (this.__clb) this.__clb (this._tick);
    
    vs.scheduleAction (this._clock.bind (this));
  },

  /**
   * @function
   * @private
   */
  _step : function ()
  {
    if (this._state !== vs.core.Task.STARTED) return;
    
    var step = (this._steps - this.__steps)
    this.__steps --;

    if (step === this._steps)
    {
      this.__setTick (1);
      this.propagateChange ('tick');
      if (this.__clb) this.__clb (this._tick);
      if (this.__repeat_dur > 1)
      {
        this.__repeat_dur --;
        vs.scheduleAction (this._start_steps.bind (this), vs.ON_NEXT_FRAME);
      }
      else
      {
        this._state = vs.core.Task.STOPPED;
        if (this.delegate && this.delegate.taskDidEnd)
        { this.delegate.taskDidEnd (this); }
      }
    }
    else {
      this.__setTick (step / (this._steps - 1));
      this.propagateChange ('tick');
      if (this.__clb) this.__clb (this._tick);
      var step_dur = this._duration / this._steps
      vs.scheduleAction (this._step.bind (this), step_dur);
    }
  },
  
  /**
   * @function
   * @private
   */
  _start_steps: function ()
  {
    // step clock implement a simplistic time management and pause.
    if (this._state === vs.core.Task.PAUSED)
    {
      this._state = vs.core.Task.STARTED;
      vs.scheduleAction (this._step.bind (this));
      return;
    }

    if (vs.util.isFunction (this.__param)) this.__clb = this.__param;

    this._state = vs.core.Task.STARTED;
    this.__setTick (0);
    this.propagateChange ('tick');
    if (this.__clb) this.__clb (this._tick);
    
    var step_dur = this._duration / this._steps;
    this.__steps = this._steps - 1 - Math.floor (this.__time_decl / step_dur);
    this.__time_decl = 0;
    
    vs.scheduleAction (this._step.bind (this), step_dur);
  },

  /**
   *  Stops the task.<br />
   *  When the task is stopped, it calls the TaskDelegate.taskDidStop
   *  if it declared.
   *
   * @name vs.core.Task#stop
   * @function
   */
  stop: function ()
  {
    this._state = vs.core.Task.STOPPED;
    this.__pause_time = 0;
  },

  /**
   *  Pause the task.<br />
   *  When the task is paused, it calls the TaskDelegate.taskDidPause
   *  if it declared.
   *
   * @name vs.core.Task#pause
   * @function
   */
  pause: function ()
  {
    if (!this._state === vs.core.Task.STARTED) return;
    this._state = vs.core.Task.PAUSED;
    this.__pause_time = Date.now ();
  }
});
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

var Pace = vs.core.createClass ({

  parent: vs.core.Object,

  _timing : function (i) {return i;},
  _tick_in : 0,
  _tick_out : 0,
  
  properties : {
    timing: vs.core.Object.PROPERTY_IN,
    tickIn: vs.core.Object.PROPERTY_IN,
    tickOut: vs.core.Object.PROPERTY_OUT
  },
  
  initComponent : function ()
  {
    this._super ();
    
    this.propertiesDidChange ();
  },
  
  propertiesDidChange : function ()
  {
    if (this._timing)
    {
      this._tick_out = this._timing (this._tick_in);
      this.propagateChange ('tickOut');
    }
  }
});

/******************************************************************************
          Default timing functions
******************************************************************************/

Pace.getEaseInPace = function () {
  return new Pace ({
    timing: cubicBezierTransition (0.42, 0.0, 1.0, 1.0)
  }).init ();
}
Pace.getEaseOutPace = function () {
  return new Pace ({
    timing: cubicBezierTransition (0.0, 0.0, 0.58, 1.0)
  }).init ();
}

Pace.getEaseInOutPace = function () {
  return new Pace ({
    timing: cubicBezierTransition (0.42, 0.0, 0.58, 1.0)
  }).init ();
}

Pace.getEaseOutInPace = function () {
  return new Pace ({
    timing: cubicBezierTransition (0.0, 0.42, 1.0, 0.58)
  }).init ();
}

Pace.getLinearPace = function () { return new Pace ().init (); }

Pace.getInvertLinearPace = function () {
  return new Pace ({
    timing: function (t) { return 1 - t; }
  }).init ();
}/**
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

var Trajectory = vs.core.createClass ({

  parent: vs.core.Task,

  _calcule_mode : 0,
  
  properties : {
    calculeMode: vs.core.Object.PROPERTY_IN,
    tick: vs.core.Object.PROPERTY_IN
  }
});

var Vector1D = vs.core.createClass ({

  parent: Trajectory,
  
  _values: null,
  _out: 0,
  
  properties : {
    values: {
      set: function (v)
      {
        if (!vs.util.isArray (v)) return;
        if (v.length < 1) return;
        
        this._values = v.slice ();
      }
    },
    
    out: vs.core.Object.PROPERTY_OUT
  },
  
  constructor : function (config)
  {
    this._super (config);
    this._values = [];
  },
  
  propertiesDidChange: function ()
  {
    if (!vs.util.isNumber (this._tick)) return;

    var
      nb_values = this._values.length - 1, // int [0, n]
      ti = this._tick * nb_values, // float [0, n]
      index = Math.floor (ti), // int [0, n]
      d = ti - index; // float [0, 1]
      
    if (this._tick === 0) this._out = this._values [0];
    else if (this._tick === 1) this._out = this._values [nb_values];
    else
    {
      var v1 = this._values [index];
      var v2 = this._values [index + 1];
      this._out = v1 + (v2 - v1) * d;
    }
    
    this.propagateChange ('out');
  }
});

var Vector2D = vs.core.createClass ({

  parent: Trajectory,
  
  _values: null,
  _out: 0,
  
  properties : {
    values: {
      set: function (v)
      {
        if (!vs.util.isArray (v)) return;
        if (v.length < 1) return;
        
        this._values = v.slice ();
      }
    },
    
    out: vs.core.Object.PROPERTY_OUT
  },
  
  constructor : function (config)
  {
    this._super (config);
    this._values = [];
  },
  
  propertiesDidChange: function ()
  {
    if (!vs.util.isNumber (this._tick)) return;
    
    var
      nb_values = this._values.length - 1, // int [0, n]
      ti = this._tick * nb_values, // float [0, n]
      index = Math.floor (ti), // int [0, n]
      d = ti - index; // float [0, 1]
      
    if (this._tick === 0) this._out = this._values [0];
    else if (this._tick === 1) this._out = this._values [nb_values];
    else
    {
      var v1 = this._values [index];
      var v2 = this._values [index + 1];
      this._out = [
        v1[0] + (v2[0] - v1[0]) * d,
        v1[1] + (v2[1] - v1[1]) * d
      ]
    }
    
    this.propagateChange ('out');
  }
});

var Circular2D = vs.core.createClass ({

  parent: Trajectory,
  
  _center: null,
  _values: null,
  _out: 0,
  
  properties : {
    center: {
      set: function (v)
      {
        if (!vs.util.isArray (v)) return;
        if (v.length !== 2) return;
        
        this._center = v.slice ();
      }
    },
    
    values: {
      set: function (v)
      {
        if (!vs.util.isArray (v)) return;
        if (v.length < 1) return;
        
        this._values = v.slice ();
      }
    },
    
    out: vs.core.Object.PROPERTY_OUT
  },
  
  constructor : function (config)
  {
    this._super (config);
    this._values = [0, 0];
    this._center = [0, 0];
  },
  
  propertiesDidChange: function ()
  {
    if (!vs.util.isNumber (this._tick)) return;
    
    var
      angle, values = this._values, 
      nb_values = values.length - 1, // int [0, n]
      ti = this._tick * nb_values, // float [0, n]
      index = Math.floor (ti), // int [0, n]
      d = ti - index; // float [0, 1]
      
    if (this._tick === 0) angle = values [0];
    else if (this._tick === 1) angle = values [nb_values];
    else
    {
      var v1 = values [index];
      var v2 = values [index + 1];
      angle = v1 + (v2 - v1) * d;
    }

    var 
      cx = this._center [0],
      cy = this._center [1],
      radius = Math.sqrt (cx * cx + cy * cy);
    
    // Deg => Grad
    angle = 2 * Math.PI * angle / 180;
    var x = radius * Math.cos (angle) + cx,
      x = Math.round(x * 1000) / 1000;
    var y = radius * Math.sin (angle) + cy,
      y = Math.round(y * 1000) / 1000;
        
    this._out = [x, y];
    
    this.propagateChange ('out');
  }
});
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
    pace.propertiesDidChange ();
    
    traj.tick = pace.tickOut;
    traj.propertiesDidChange ();
    
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
    pace.propertiesDidChange ();
    
    traj.tick = pace.tickOut;
    traj.propertiesDidChange ();
    
    for (var i = 0; i < srcs.length; i++) { obj [targets[i]] = traj [srcs[i]]; }
    obj.propertyChange ();
  }
  
  return chrono;
}
