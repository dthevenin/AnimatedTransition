var Animations = vs.core.createClass ({

  /** parent class */
  parent: vs.ui.Application,

  initComponent : function () {
    this._super ();

    this.ball1 = new vs.ui.View ({id:'ball1'}).init ();
    this.ball2 = new vs.ui.View ({id:'ball2'}).init ();
    this.ball3 = new vs.ui.View ({id:'ball3'}).init ();
    this.ball4 = new vs.ui.View ({id:'ball4'}).init ();
  },

  applicationStarted : function (event) {
  
    this.anim1 = animateTransition (this.ball1, 'translation', {
      duration: 300,
      pace: Pace.getEaseInPace (),
      trajectory: new Circular2D ({
        center: [0,-200],
        values: [45, 60, 45]
      }).init ()
    });
    
    this.anim2 = animateTransition (this.ball4, 'translation', {
      duration: 300,
      pace: Pace.getEaseInPace (),
      trajectory: new Circular2D ({
        center: [0,-200],
        values: [45, 30, 45]
      }).init ()
    });
    
   var seq = vs.seq (
    this.anim1, this.anim2, this.anim1, this.anim2, this.anim1, this.anim2, this.anim1);
   seq.start ();
  },
});

function loadApplication () {
  new Animations ({id:"animations", layout:vs.ui.View.ABSOLUTE_LAYOUT}).init ();

  vs.ui.Application.start ();
}
