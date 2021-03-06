/**
 * Copyright (C) 2009-2013. David Thevenin, ViniSketch (c), and 
 * contributors. All rights reserved
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

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


    this.anim2 = vs.ext.fx.animateTransition (this.item2, 'rotation', {
      duration: 5000,
      pace: Pace.getLinearPace (),
 //     steps: 10,
 //     repeat: 2,
      trajectory: new Vector1D ({values: [0, 200, 90, 700]}).init ()
    });

    this.anim3 = vs.ext.fx.animateTransition (
      this.item3, 
      'translation',
      {
        duration: 3000,
        begin: -1000,
        pace: Pace.getEaseOutPace (),
        steps: 50,
        repeat: 2,
        trajectory: new Vector2D ({values: [[0,0], [220, -55], [200, 50], [0, 0]]}).init ()
      }
    );

    this.anim4 = vs.ext.fx.animateTransition (this.item4, 'text', {
      duration: 5000,
      pace: Pace.getLinearPace (),
 //     steps: 10,
 //     repeat: 2,
      trajectory: new StringTrajectory ({values: ["salut", "comment allez-vous"]}).init ()
    });

    
    this.seq = vs.seq (this.anim3, this.anim2);
  },

  startAnim : function ()
  {
//    this.test1 ();
//    this.anim2.start ();
    this.anim3.start ();
//    this.anim4.start ();
  },
  
  pauseAnim : function ()
  {
//    this.anim2.pause ();
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