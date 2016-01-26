/* global $, signals, Signal, Engine, Config, CardDisplay, GameStage, HumanInteractions */
'use strict';

var Signal = signals.Signal;

var e, c, s, d;

// small helper function to load and parse the JSON file we're going to load
function loadJSON(file, callback) {

  var xobj = new XMLHttpRequest();
      xobj.overrideMimeType('application/json');
  xobj.open('GET', file, true);
  xobj.onreadystatechange = function () {
        // once the file is loaded and ready...
        if (xobj.readyState === 4 && xobj.status === 200) {
          callback(xobj.responseText);
        }
  };
  xobj.send(null);
}

// Not using JQuery - so hook onto event when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // code...
  console.log('...DOM Ready');

  //  Load in the external JSON file
  loadJSON('data/data.json', function(response) {
  // Parse JSON string into object
    // console.log('JSON', JSON.parse(response) );

    e = new Engine( JSON.parse(response) );
    c = new HumanInteractions( e );
    s = new GameStage( e, c, document.querySelector('.game__stage') );
    d = new CardDisplay( e, c, document.querySelector('.game__stage') );

   });
});
