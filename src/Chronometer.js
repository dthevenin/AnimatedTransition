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
      this._tick = this._pace._timing._timing ();
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
      this__setTick(currTime - this.__start_time) / this._duration;
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
