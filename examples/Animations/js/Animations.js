var Animations = vs.core.createClass ({

  /** parent class */
  parent: vs.ui.Application,
  
  initComponent : function () {
    this._super ();
    this.item1 = new vs.ui.TextLabel ({id: 'item1', text: '1'}).init ();
    this.add (this.item1); 

    this.item2 = new vs.ui.TextLabel ({id: 'item2', text: '2'}).init ();
    this.add (this.item2); 

    window.item = this.item3 = new vs.ui.TextLabel ({id: 'item3', text: 'salut'}).init ();
    this.add (this.item3); 
  },

  applicationStarted : function (event) {

    this.item1.position = [100, 50];
    this.item2.position = [100, 150];
    this.item3.position = [100, 250];

 //   this.test1 ();
    this.test2 ();
    this.test3 ();
  },

  test1 : function ()
  {
    var translation = new vs.fx.TranslateAnimation (200, 200, 0);
    translation.duration = '300ms';
    translation.timing = vs.fx.Animation.EASE_OUT_IN;
    translation.process (this.item1);
  },

  test2 : function ()
  {
     animateTransition (this.item2, 'position', {
      function : function (start, end, i) {
        var dx = (end[0]-start[0]) * i, dy = (end[1]-start[1]) * i;
        return [start[0] + dx, start[1] + dy];
      },
      duration: 1000,
      timing: EASE_OUT,
      endClb : function () { console.log ("End animation") }
    });

    this.item2.position = [300, 350];
  },

  test3 : function ()
  {
    animateTransition (this.item3, 'text', {
      function : STRING_ANIMATION_AIRPORT,
      duration: 5000,
      timing: EASE_OUT
    });

    this.item3.text = "comment vous allez";
  }
});

function loadApplication () {
  new Animations ({id:"animations"}).init ();

  vs.ui.Application.start ();
}
