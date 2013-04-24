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
};