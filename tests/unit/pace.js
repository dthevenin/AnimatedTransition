function testPaceNew ()
{
  var p1 = new vs.ext.fx.Pace ().init ();
  
  assertNotUndefined ('testPaceNew 1', p1);
  assertEquals ('testPaceNew 2', 0, p1._tick_in);
  assertEquals ('testPaceNew 3', 0, p1._tick_out);
}

function testLinearPaceNew ()
{
  var p1 = vs.ext.fx.Pace.getLinearPace ();
  
  assertEquals ('testLinearPaceNew 1', 0, p1.tickOut);
  p1.tickIn = 1; p1.compute ();
  assertEquals ('testLinearPaceNew 2', 1, p1.tickOut);
  p1.tickIn = 0.5; p1.compute ();
  assertEquals ('testLinearPaceNew 3', 0.5, p1.tickOut);
  p1.tickIn = 0.25; p1.compute ();
  assertEquals ('testLinearPaceNew 4', 0.25, p1.tickOut);
  p1.tickIn = 0.75; p1.compute ();
  assertEquals ('testLinearPaceNew 5', 0.75, p1.tickOut);
}

function testgetEaseInPaceNew ()
{
  var p1 = vs.ext.fx.Pace.getEaseInPace ();
  
  assertEquals ('testgetEaseInPaceNew 1', 0, p1.tickOut);
  p1.tickIn = 1; p1.compute ();
  assertEquals ('testgetEaseInPaceNew 2', 1, p1.tickOut);
  p1.tickIn = 0.5; p1.compute ();
  assertEquals ('testgetEaseInPaceNew 3', 0.3153381246997542, p1.tickOut);
  p1.tickIn = 0.25; p1.compute ();
  assertEquals ('testgetEaseInPaceNew 4', 0.0933895357028402, p1.tickOut);
  p1.tickIn = 0.75; p1.compute ();
  assertEquals ('testgetEaseInPaceNew 5', 0.6202330373070809, p1.tickOut);
}
