function testChronometerNew ()
{
  var c1 = new Chronometer ().init ();
  
  assertNotUndefined ('testChronometerNew 1', c1);
  assertNotUndefined ('testChronometerNew 2', c1.start);
  assertNotUndefined ('testChronometerNew 3', c1.pause);
  assertNotUndefined ('testChronometerNew 4', c1.stop);
  assertEquals ('testChronometerNew 5', 300, c1._duration);
  assertUndefined ('testChronometerNew 6', c1.duration);
  assertEquals ('testChronometerNew 7', 0, c1._steps);
  assertUndefined ('testChronometerNew 8', c1.steps);
  assertEquals ('testChronometerNew 9', 0, c1.tick);

  var c2 = new Chronometer ({
    duration: 1000,
    steps : 10
  }).init ();
  
  assertEquals ('testChronometerNew 10', 1000, c2._duration);
  assertEquals ('testChronometerNew 11', 10, c2._steps);
}
