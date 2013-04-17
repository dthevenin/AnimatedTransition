

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
