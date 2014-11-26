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


var $timer       = $("#timer"),
    $sandwich    = $(".sandwich"),
    $saveScore   = $(".submit-dialog"),
    clickCount   = 0,
    audioPlayers = [];


// Initialize stopwatch
$(function() {
  "use strict";
  $timer.runner();
});


/**
 * Test for HTML5 audio compatibility, preferring MP3 audio
 * Taken from http://diveintohtml5.info/everything.html#audio-mp3
 */
var _a = document.createElement("audio");
var audioFile = (!!(_a.canPlayType && _a.canPlayType("audio/mpeg;").replace(/no/, ""))) ?
    "audio/landslide.mp3" : "audio/landslide.ogg";


// Start the timer only once
$sandwich.one("click", function() {
  "use strict";
  $timer.runner("start");
});


// Trigger new landslides with each click of the sandwich
$sandwich.on("click", function() {
  "use strict";
  // Keep track of times the user has clicked the sandwich
  clickCount += 1;

  // On each click of the sandwich, trigger a landslide
  var aLandslide  = new Audio(audioFile);
  aLandslide.loop = true;
  aLandslide.load();
  aLandslide.play();
  audioPlayers.push(aLandslide);
});
