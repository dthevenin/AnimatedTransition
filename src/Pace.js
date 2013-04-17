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
    
    this.compute ();
  },
  
  compute : function ()
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
