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

  _timing : function (i) {return i;},
  _tick_in : 0,
  _tick_out : 0,

  properties : {
    timing: vs.core.Object.PROPERTY_IN,
    tickIn: vs.core.Object.PROPERTY_IN,
    tickOut: vs.core.Object.PROPERTY_OUT
  },

  constructor: function (config) {
    this._super (config);

    this.init ();

    if (this._timing) {
      this._tick_out = this._timing (this._tick_in);
    }
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
  });
}
Pace.getEaseOutPace = function () {
  return new Pace ({
    timing: cubicBezierTransition (0.0, 0.0, 0.58, 1.0)
  });
}

Pace.getEaseInOutPace = function () {
  return new Pace ({
    timing: cubicBezierTransition (0.42, 0.0, 0.58, 1.0)
  });
}

Pace.getEaseOutInPace = function () {
  return new Pace ({
    timing: cubicBezierTransition (0.0, 0.42, 1.0, 0.58)
  });
}

Pace.getLinearPace = function () { return new Pace (); }

Pace.getInvertLinearPace = function () {
  return new Pace ({
    timing: function (t) { return 1 - t; }
  });
}