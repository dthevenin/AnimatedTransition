var util = vs.util;

/**
 *  Structure used for managing events
 *  @private
 */
function Handler (_obj, _func)
{
  this.obj = _obj;
  if (util.isFunction (_func))
  {
    this.func_ptr = _func;
  }
  else if (util.isString (_func))
  {
    this.func_name = _func;
  }
}

/**
 * @private
 */
Handler.prototype.destructor = function ()
{
  delete (this.obj);
  delete (this.func_ptr);
  delete (this.func_name);
};

/**
 * @private
 */
var _events_queue  = [], _actions_queue  = [],
  _is_events_propagating = false, 
  _is_actions_runing = false;

/**
 * @private
 */
function queueProcAsyncEvent (event, handler_list)
{
  if (!event || !handler_list) return;

  var burst = {
    handler_list : handler_list,
    event : event
  }

  // push the event to dispatch into the queue
  _events_queue.push (burst);

  // request for the mainloop
  serviceLoop ();
}

/**
 * @private
 * doOneAsyncEvent will dispache One event to all observers.
 */
function doOneAsyncEvent ()
{
  if (_is_events_propagating) return;

  var burst = _events_queue.shift (),
    handler_list = burst.handler_list,
    n = handler_list.length,
    i = n,
    event = burst.event;

  _is_events_propagating = true;

  function end_propagation ()
  {
    n--;
    if (n <= 0) _is_events_propagating = false;
  }

  /**
   * @private
   * doOneHandler will dispache One event to an observer.
   *
   * @param {Handler} handler
   */
  function doOneHandler (handler)
  {
    if (handler) try
    {
      if (util.isFunction (handler.func_ptr))
      {
        // call function
        handler.func_ptr.call (handler.obj, event);
      }
      else if (util.isString (handler.func_name) &&
               util.isFunction (handler.obj[handler.func_name]))
      {
        // specific notify method
        handler.obj[handler.func_name] (event);
      }
      else if (util.isFunction (handler.obj.notify))
      {
        // default notify method
        handler.obj.notify (event);
      }
    }
    catch (e)
    {
      if (e.stack) console.error (e.stack);
      else console.error (e);
    }
    end_propagation ();
  };

  if (!i) end_propagation (); // should not occures
  else while (i > 0)
  {
    (function (handler) {
      setTimeout (function () { doOneHandler(handler) }, 0);
    }) (handler_list [--i])
  }
}

function doActions ()
{
  function end_burst ()
  {
    if (_actions_queue.length) doActions ();
    else _is_actions_runing = false
  }

  function doBurst ()
  {
    _is_actions_runing = true;
    
    var i = 0, l = this.length, func;
    for (; i < l; i++)
    {
      func = this [i];
      if (func) try
      {
        func.call ();
      }
      catch (e)
      {
        if (e.stack) console.error (e.stack);
        else console.error (e);
      }
    }
    end_burst ();
  }
  
  vs.requestAnimationFrame (doBurst.bind (_actions_queue));
  _actions_queue = []
}

var _is_waiting = false;

/**
 * @private
 * Mainloop core
 */
function serviceLoop ()
{
  if ((_events_queue.length === 0 && _actions_queue.length === 0) ||
      _is_waiting) return;
  
  function loop ()
  {
    _is_waiting = false;
    serviceLoop ();
  }

  if (_is_events_propagating)
  {
    // do the loop
    _actions_queue.push (loop);
    if (!_is_actions_runing) doActions ();
    return;
  }

  // dispache an event to observers
  if (_events_queue.length) doOneAsyncEvent ();
  if (!_is_actions_runing && _actions_queue.length) doActions ();
}


vs.scheduleAction = function (func, delay)
{
  if (!vs.util.isFunction (func)) return;
  if (vs.util.isNumber (delay))
  {
    setTimeout (func, delay);
    return;
  }
  
  // push the action to execute into the queue
  _actions_queue.push (func);

  // request for the mainloop
  serviceLoop ();
}









vs.core.EventSource.prototype.bind = function (spec, obj, func)
{
  if (!spec || !obj) { return; }

  /** @private */
  var handler = new Handler (obj, func),
    handler_list = this.__bindings__ [spec];
  if (!handler_list)
  {
    handler_list = [];
    this.__bindings__ [spec] = handler_list;
  }
  handler_list.push (handler);

  return handler;
};

vs.core.EventSource.prototype.propagate = function (type, data, srcTarget)
{
  var handler_list = this.__bindings__ [type], event;
  if (!handler_list || handler_list.length === 0)
  {
    if (this.__parent)
    {
      if (!srcTarget) { srcTarget = this; }
      this.__parent.propagate (type, data, srcTarget);
    }
    return;
  }

  event = new Event (this, type, data);
  if (srcTarget) { event.srcTarget = srcTarget; }

  queueProcAsyncEvent (event, handler_list);
};




vs.ui.View.prototype._applyTransformation = function ()
{
  var
    matrix = this.getCTM (),
    transform = matrix.myToString ();

  if (this._magnet === 5)
  {
    transform += " translate(-50%,-50%)";
  }
  
  vs.util.setElementTransform (this.view, transform);
  delete (matrix);
}

vs.CSSMatrix.prototype.myToString = function () {
  var points = [this.m11, this.m12, this.m13, this.m14,
        this.m21, this.m22, this.m23, this.m24,
        this.m31, this.m32, this.m33, this.m34,
        this.m41, this.m42, this.m43, this.m44];
  return "matrix3d(" + points.join(", ") + ")";
}
