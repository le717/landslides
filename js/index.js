/*
 * Created 2014 Triangle717
 * <http://Triangle717.WordPress.com/>
 *
 * Source code licensed under The MIT License
 * <http://opensource.org/licenses/MIT/>
 *
 * Dedicated to the good folks at Rock Raiders United
 * <http://www.rockraidersunited.org/>
 */


// Initialize stopwatch
$("#timer").runner();
var $sandwich = $(".sandwich");

/**
 * Test for HTML5 audio compatibility, preferring MP3 audio
 * Taken from http://diveintohtml5.info/everything.html#audio-mp3
 */
var _a = document.createElement("audio");
var audioFile = (!!(_a.canPlayType && _a.canPlayType("audio/mpeg;").replace(/no/, ""))) ?
                 "audio/landslide.mp3" : "audio/landslide.ogg";


/**
 * First time the sandwich is clicked
 */
$sandwich.one("click", function() {
  "use strict";

  // Start the timer
  $("#timer").runner("start");

  // Play initial audio clip
  var aLandslide  = new Audio(audioFile);
  aLandslide.loop = true;
  aLandslide.play();
});


/**
 * Trigger new landslides with each click of the sandwich
 */
$sandwich.on("click", function() {
  "use strict";

  // On click, fire an event to load a new player.
  // Not firing the event ends up triggering two landslides on the first click,
  // which is not desired.
  $sandwich.trigger("a-landslide-has-occurred");

  // On each subsequent click of the sandwich, trigger a new landslide
  $sandwich.bind("a-landslide-has-occurred", function() {
    var newLandslide  = new Audio(audioFile);
    newLandslide.loop = true;
    newLandslide.play();
  });
});
