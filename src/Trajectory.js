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
  
  compute: function ()
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
  
  compute: function ()
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
