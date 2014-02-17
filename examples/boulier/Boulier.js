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

  applicationStarted : function (event) {
  
    this.ball1 = new vs.ui.View ({id:'ball1'}).init ();
    this.ball2 = new vs.ui.View ({id:'ball4'}).init ();
    
    function getPace () { return new Pace ({
        timing: cubicBezierTransition (0.035, 0.715, 0.96, 0.235)
      }).init ()
    };

    this.anim1 = animateTransition (this.ball1, 'translation', {
      duration: 400,
      pace: getPace (),
      trajectory: new Circular2D ({
        center: [0,-200],
        values: [45, 55, 45]
      }).init ()
    });
    
    this.anim2 = animateTransition (this.ball2, 'translation', {
      duration: 400,
      pace: getPace (),
      trajectory: new Circular2D ({
        center: [0,-200],
        values: [45, 35, 45]
      }).init ()
    });
    
   var seq = vs.seq (this.anim1, this.anim2);
   seq.delegate = {
     taskDidEnd: function () {seq.start ()}
   }
   seq.start ();
  },
});

function loadApplication () {
  new Animations ({id:"animations", layout:vs.ui.View.ABSOLUTE_LAYOUT}).init ();
  vs.ui.Application.start ();
}
