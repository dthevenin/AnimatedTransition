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

STRING_ANIMATION = function (start, end, i) {
  var size = Math.floor (end.length * i);
  return end.substr (0, size);
};

var chars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','-',' '];

var StringTrajectory = vs.core.createClass ({

  parent: Trajectory,
  
  _out: 0,
  _values: null,
  _context: null,
  
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
    this._context = {};
    this._values = [];
  },
  
  compute: function ()
  {
    if (!vs.util.isNumber (this._tick)) return;
    
    var ctx = this._context, start = this._values [0], end = this._values [1];

    if (!ctx.data)
    {
      var data = start.split (''), l = end.length - start.length;
      if (l > 0) while (l--) data.push (' ');
      ctx.data = data;
      ctx.l = data.length;
      ctx.i = 0;
      ctx.c = chars.indexOf (data [0]);
      ctx.t = chars.indexOf (end.charAt (0));
    }
    if (ctx.i !== ctx.l)
    {
      if (ctx.c === ctx.t)
      {
        ctx.i ++;
        ctx.c = chars.indexOf (ctx.data [ctx.i]);
        if (ctx.i < end.length) ctx.t = chars.indexOf (end.charAt (ctx.i));
        else ctx.t = chars.indexOf (' ');
      }
      else
      {
        ctx.c ++;
        if (ctx.c > chars.length) ctx.c = 0;
        ctx.data [ctx.i] = chars [ctx.c];
      }
    }
    this._out = ctx.data.join ('');
    
    this.propagateChange ('out');
  }
});
