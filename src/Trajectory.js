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
  
  compute: function ()
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
