var Animations = vs.core.createClass ({

  /** parent class */
  parent: vs.ui.Application,

  initComponent : function () {
    this._super ();
    this.item1 = new vs.ui.TextLabel ({id: 'item1', text: '1'}).init ();
    this.add (this.item1);

    window.item = this.item2 = new vs.ui.TextLabel ({id: 'item2', text: '2'}).init ();
    this.add (this.item2);

    this.item3 = new vs.ui.TextLabel ({id: 'item3', text: '3'}).init ();
    this.add (this.item3);

    this.item4 = new vs.ui.TextLabel ({id: 'item4', text: 'salut'}).init ();
    this.add (this.item4);


    this.buttonStart = new vs.ui.Button ({
      text: 'start', size : [60, 30]
    }).init ();
    this.add (this.buttonStart);    
    this.buttonStart.bind ('select', this, this.startAnim);

    this.buttonPause = new vs.ui.Button ({
      text: 'pause', size : [70, 30], position: [80, 0]
    }).init ();
    this.add (this.buttonPause);    
    this.buttonPause.bind ('select', this, this.pauseAnim);

    this.buttonSeq = new vs.ui.Button ({
      text: 'seq', size : [60, 30], position: [170, 0]
    }).init ();
    this.add (this.buttonSeq);    
    this.buttonSeq.bind ('select', this, this.seqAnim);
  },

  applicationStarted : function (event) {
    this.item1.position = [20, 20];
    this.item2.position = [20, 120];
    this.item3.position = [20, 220];
    this.item4.position = [20, 320];


    this.anim2 = animateTransition (this.item2, 'rotation', {
      duration: 5000,
      pace: Pace.getLinearPace (),
 //     steps: 10,
 //     repeatDur: 2,
      trajectory: new Vector1D ({values: [0, 200, 90, 700]}).init ()
    });

    this.anim3 = animateTransition (
      this.item3, 
      'translation',
      {
        duration: 3000,
        pace: Pace.getEaseOutPace (),
        steps: 10,
        repeatDur: 2,
        trajectory: new Vector2D ({values: [[0,0], [220, -55], [200, 50], [0, 0]]}).init ()
      }
    );

    this.anim4 = animateTransition (this.item4, 'text', {
      duration: 5000,
      pace: Pace.getLinearPace (),
 //     steps: 10,
 //     repeatDur: 2,
      trajectory: new StringTrajectory ({values: ["salut", "comment allez-vous"]}).init ()
    });

    
    this.seq = vs.seq (this.anim2, this.anim3, this.anim2);
  },

  startAnim : function ()
  {
    this.test1 ();
    this.anim2.start ();
    this.anim3.start ();
    this.anim4.start ();
  },
  
  pauseAnim : function ()
  {
    this.anim2.pause ();
    this.anim3.pause ();
//    this.anim4.pause ();
  },

  seqAnim : function ()
  {
    this.seq.start ();
  },

  test1 : function ()
  {
    // API based on CSS transition/animation
     
    var translation = new vs.fx.TranslateAnimation (200, 50, 0);
    translation.duration = '1000ms';
    translation.timing = vs.fx.Animation.EASE_OUT;
    translation.process (this.item1);
  }
});

function loadApplication () {
  new Animations ({id:"animations", layout:vs.ui.View.ABSOLUTE_LAYOUT}).init ();

  vs.ui.Application.start ();
}


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
