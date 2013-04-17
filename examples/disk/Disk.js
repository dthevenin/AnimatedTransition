var Animations = vs.core.createClass ({

  /** parent class */
  parent: vs.ui.Application,

  applicationStarted : function (event) {

    function createAnime (id) {
    
      var item = new vs.ui.View ({id: id}).init ();
      var dur = 3000 + Math.ceil (Math.random () * 3000);
      
      var anim = animateTransition (item, 'rotation', {
        duration: dur,
        pace: Pace.getEaseInOutPace (),
        repeatDur: 5,
        trajectory: new Vector1D ({values: [0, 190, 70, -45, -125, -60, 0, 45, 0]}).init ()
      });

      return anim;
    }
    
//    vs.seq (
    var anim = vs.par (
      createAnime ("disk0"),
      createAnime ("disk1"),
      createAnime ("disk2")
    );
    anim.start ();
    
    // click or tap to restart the animation
    this.bind (vs.core.POINTER_START, this, function () {
      anim.start ();
    });
  },
});

function loadApplication () {
  new Animations ({id:"animations", layout:vs.ui.View.ABSOLUTE_LAYOUT}).init ();

  vs.ui.Application.start ();
}
