/* global HumanInteractions */
'use strict';
/**

@module Controls
@class HumanInteractions
@constructor
@param {object} e - Instance of the game engine into which this is bound
*/
var HumanInteractions = function( e ) {

  /**
  Reference for the main Engine instance this view listens to for Signal updates
  @property engine
  @type {Engine}
  */
  this.engine = e;

  this.newGame = function() {
    // empty for now
	};

  /**
  Event handler which passes the event fired when clicking the draw button onto the Engine. Sanitises the passed number to make sure it's valid and if now triggers the display of an error message

  @method drawcards
  @param {Object} s - Scope in which the method will be called
  @param {Number} n - The number of cards to draw
  */
  this.drawcards = function( s, n ) {
    // console.log(n === NaN);
    // Check passed value is a number and less than 53
    if( isNaN(n) || ( n < 1 || n > 52 ) ) {
      // Something bad has been passed
      s.engine.showmessage(
        'error',
        s.engine.config.getProp('messaging', 'draw_error')
      );
      return false;
    } else {
      s.engine.drawCards( n );
      return true;
    }
  };

  this.sortcards = function( s ) {
    s.engine.sortcards();
  };

  /**
  Event handler which passes the event fired when clicking the shuffle button onto the Engine

  @method shufflecards
  @param {Object} s - Scope in which the method will be called
  */
  this.shufflecards = function( s ) {
    // console.log("shuffle cards", s );
    // TODO: Add a check to see if state of game permits a shuffle
    s.engine.deck = s.engine.shuffledeck( s.engine.deck );
  };
};
