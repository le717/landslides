/*
    Created 2014 Triangle717
    <http://Triangle717.WordPress.com/>

    Source code licensed under The MIT License
    <http://opensource.org/licenses/MIT/>

    Dedicated to the good folks at Rock Raiders United
    <http://www.rockraidersunited.org/>
*/

(function(){
  "use strict";
  /* One-time page load processes */

  var IamChief,
      a = document.createElement("audio");

  // Initialize stopwatch
  $("#timer").runner();

  // Test HTML5 audio compatibility, preferring MP3 audio
  // Taken from http://diveintohtml5.info/everything.html#audio-mp3
  if (!!(a.canPlayType && a.canPlayType("audio/mpeg;").replace(/no/, ""))) {
    IamChief = "audio/landslide.mp3";
  } else {
    IamChief = "audio/landslide.ogg";
  }

  // Export any variables for use in other functions
  window.IamChief = IamChief;
})();

$("#sandwich").on("click", function() {
  "use strict";
  /* Trigger new landslides with each click of the sandwich */

  // On click, fire an event to load a new player.
  // Not firing the event ends up triggering two landslides on the first click,
  // which is not what needs to happen.
  $("#sandwich").trigger("a-new-landslide-has-occurred");

  // Now that the initial landslide has occurred, make that one
  // trigger new landslides (DOMINO EFFECT! :D)
  $("#sandwich").bind("a-landslide-has-occurred", function() {
    var dominoLandslide = new Audio(IamChief);
    dominoLandslide.loop = true;
    dominoLandslide.play();
  });

  // On each subsequent click of the sandwich, trigger a new landslide
  $("#sandwich").bind("a-new-landslide-has-occurred", function() {
    var newLandslide = new Audio(IamChief);
    newLandslide.loop = true;
    newLandslide.play();
  });
});

$("#sandwich").one("click", function() {
  "use strict";

  // Do not reset stopwatch with multiple occuring landslides
  $("#timer").runner("start");

  // Play inital audio clip
  var firstLandslide = new Audio(IamChief);
  firstLandslide.load();
  firstLandslide.play();

  // Fire event when finished to trigger loop
  $(firstLandslide).bind("ended", function() {
    $("#sandwich").trigger("a-landslide-has-occurred");
  });
});
