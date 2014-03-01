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

    var LANDSLIDEfile,
        a = document.createElement("audio");

    // Initialize stopwatch
    $("#timer").runner();

    // Test HTML5 audio compatibility, preferring MP3 audio
    // Taken from http://diveintohtml5.info/everything.html#audio-mp3
    if (!!(a.canPlayType && a.canPlayType("audio/mpeg;").replace(/no/, ""))) {
        LANDSLIDEfile = "audio/landslide.mp3";
    } else {
        LANDSLIDEfile = "audio/landslide.ogg";
    }

    // Export `LANDSLIDEfile` for use in other functions
    window.LANDSLIDEfile = LANDSLIDEfile;
})();

$("#sandwich").on("click", function() {
    "use strict";
    /* Trigger a landslide */

    var time = 0,
        // Create a new audio event
        LANDSLIDE = new Audio(LANDSLIDEfile);

    // Chief announces a landslide has occured
    LANDSLIDE.play();

    // Once Chief finishes the announcement...
    LANDSLIDE.addEventListener("ended", function() {
        // ...he announces a landslide has occured... yet again...
        LANDSLIDE.play();
    }, false);
});

$("#sandwich").one("click", function() {
    "use strict";
    /* Do not reset stopwatch with multiple occuring landslides */
    $("#timer").runner("start");
});
