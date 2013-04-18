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

    function createAnime (id) {
    
      var item = new vs.ui.View ({id: id}).init ();
      var dur = 3000 + Math.ceil (Math.random () * 3000);
      
      var anim = animateTransition (item, 'rotation', {
        duration: dur,
        pace: Pace.getEaseInOutPace (),
        repeat: 5,
        trajectory: new Vector1D ({values: [0, 190, 70, -45, -125, -60, 0, 45, 0]}).init ()
      });

      return anim;
    }
    
//    var anim = vs.seq (
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
