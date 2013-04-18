var Chronometer = vs.core.createClass ({

  parent: vs.core.Task,

  _duration: 300,
  _begin: 0,
  _steps: 0,
  _repeat: 1,
  _tick: 0,
  __time_decl: 0,
  
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
    
      // manage delayed clock
      if (begin > 0)
      {
        vs.scheduleAction (_start.bind (this), begin);
        return;
      }
    
      // manage ended clock before started
      if (-begin > this._repeat * this._duration)
      {
        this._tick = 1;
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
      this._tick = 1;
      this.propagateChange ('tick');
      if (this.__clb) this.__clb (this._tick);
      if (this.__repeat_dur > 1)
      {
        this.__repeat_dur --;
        // schedule a new clock cycle
        vs.scheduleAction (this._start_clock.bind (this));
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
      if (this._steps === 0) vs.scheduleAction (this._clock.bind (this));
      this._tick = (currTime - this.__start_time) / this._duration;
      this.propagateChange ('tick');
      if (this.__clb) this.__clb (this._tick);
    }
  },

  /**
   * @function
   * @private
   */
  _start_clock: function (begin)
  {
    if (this._state === vs.core.Task.PAUSED)
    {
      this._state = vs.core.Task.STARTED;
      vs.scheduleAction (this._clock.bind (this));
      return;
    }
    
    this.__start_time = Date.now () - this.__time_decl; this.__time_decl = 0
    this.__end_time = this.__start_time + this._duration;
    
    if (vs.util.isFunction (this.__param)) this.__clb = this.__param;

    this._state = vs.core.Task.STARTED;
    this._tick = 0;
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
      this._tick = 1;
      this.propagateChange ('tick');
      if (this.__clb) this.__clb (this._tick);
      if (this.__repeat_dur > 1)
      {
        this.__repeat_dur --;
        vs.scheduleAction (this._start_steps.bind (this));
      }
      else
      {
        this._state = vs.core.Task.STOPPED;
        if (this.delegate && this.delegate.taskDidEnd)
        { this.delegate.taskDidEnd (this); }
      }
    }
    else {
      this._tick = step / (this._steps - 1);
      this.propagateChange ('tick');
      if (this.__clb) this.__clb (this._tick);
    }
  },
  
  /**
   * @function
   * @private
   */
  _start_steps: function ()
  {
    // @TODO finir la gestion du pause / stop pour animation par step
    
//     if (this._state === vs.core.Task.STARTED) return;
//     if (this._state === vs.core.Task.PAUSED)
//     {
//       
//       this._state = vs.core.Task.STARTED;
// //       vs.scheduleAction (this._clock.bind (this));
// //       return;
//     }

    if (vs.util.isFunction (this.__param)) this.__clb = this.__param;

    this._state = vs.core.Task.STARTED;
    this._tick = 0;
    this.propagateChange ('tick');
    if (this.__clb) this.__clb (this._tick);
    
    var step_dur = this._duration / this._steps;
    this.__steps = this._steps - 1 - Math.floor (this.__time_decl / step_dur);
    this.__time_decl = 0;
    
    for (var i = 0; i <= this.__steps; i++)
    {
      vs.scheduleAction (this._step.bind (this), (i + 1) * step_dur);
    }
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
    this._state = vs.core.Task.PAUSED;
  }
});
