var Animations = vs.core.createClass ({

  /** parent class */
  parent: vs.ui.Application,

  initComponent : function () {
    this._super ();
    this.item1 = new vs.ui.TextLabel ({id: 'item1', text: '1'}).init ();
    this.add (this.item1);

    this.item2 = new vs.ui.TextLabel ({id: 'item2', text: '2'}).init ();
    this.add (this.item2);

    this.item3 = new vs.ui.TextLabel ({id: 'item3', text: '3'}).init ();
    this.add (this.item3);

    this.item4 = new vs.ui.TextLabel ({id: 'item4', text: 'salut'}).init ();
    this.add (this.item4);


    this.button = new vs.ui.Button ({
      text: 'start',
      size : [60, 30]
    }).init ();
    this.add (this.button);
    
    this.button.bind ('select', this, this.startAnim);
  },

  applicationStarted : function (event) {
    this.item1.position = [20, 20];
    this.item2.position = [20, 120];
    this.item3.position = [20, 220];
    this.item4.position = [20, 320];
  },
  
  startAnim : function ()
  {
    this.test1 ();
    this.test2 ();
    this.test3 ();
//    this.test4 ();
  },

  test1 : function ()
  {
    var translation = new vs.fx.TranslateAnimation (200, 50, 0);
    translation.duration = '1000ms';
    translation.timing = vs.fx.Animation.EASE_OUT;
    translation.process (this.item1);
  },

  test2 : function ()
  {
     animateTransition (this.item2, 'rotation', {
      duration: 5000,
      pace: Pace.getLinearPace (),
 //     steps: 10,
 //     repeatDur: 2,
      trajectory: new Vector1D ({values: [0, 200, 90, 700]}).init ()
    });
  },

  test3 : function ()
  {
    animateTransition (
      this.item3, 
      'translation',
      {
        duration: 3000,
        pace: Pace.getEaseOutPace (),
 //       steps: 10,
        repeatDur: 2,
        trajectory: new Vector2D ({values: [[0,0], [220, -55], [200, 50], [0, 0]]}).init ()
      }
    );
    
  },

  test4 : function ()
  {
    animateTransition (this.item4, 'text', {
      function : STRING_ANIMATION_AIRPORT,
      duration: 5000,
      pace: Pace.getEaseOutPace ()
    },
    "comment allez-vous");
  }
});

function loadApplication () {
  new Animations ({id:"animations", layout:vs.ui.View.ABSOLUTE_LAYOUT}).init ();

  vs.ui.Application.start ();
}
