/* global CardDisplay, Signal, Engine, Config */
'use strict';
/**
@module Models
* @class Engine
* @constructor
* @param {object} d - JSON object that holds all the text needed in the app
*/
var Engine = function( d ) {

  this.config = new Config( d );

  this.drawncards = [];

  /**
  Draws a given number of cards from the deck

  @method drawCards
  @param {Number} n - Number of cards to be drawn
  */
  this.drawCards = function( n ) {
    // console.log("Draw: ", n, "cards");
    // keep getting the first items of the original deck untill the required number of drawn cards have been selected
    for(var i = 0; i < n; i++) {
      this.drawncards.push( this.deck.shift() );
    }

    this.cardsdrawn.dispatch( this.drawncards, 'shuffled' );
  };

  /**
  Generates a new deck of cards in defined order - like opening a brand new packers

  @method generatedeck
  @return array collection of cards
  */
  this.generatedeck = function() {

    if (this.deck !== undefined) { this.deck = null; }

    var ta = [];
    // first up - whats the suit order
    var so = this.config.getProp('settings', 'suit_order');
    var co = this.config.getProp('settings', 'card_order');
    for(var suit in so) {
      for(var card in co) {
        ta.push( so[suit] + '' + co[card]);
      }
    }
    return ta;
  };

  /**
	Class init method

	@method init
	*/
  this.init = function() {

    // console.log( "Label for button is", this.config.getProp('ui', 'shuffle_label') );

    this.cardsessionready = new Signal();
    this.cardsshuffled = new Signal();
    this.displaymessage = new Signal();
    this.cardsdrawn = new Signal();

    this.deck = this.generatedeck();

    //timeout before signalling to the appropriate views that they can set up the interactions
    var t = this;
    var timer = setTimeout((function() {
      t.test();
    }), 300);
  };

  /**
  Triggers the display of an appropriate message to the user via the UI, based on a given type

  @method showmessage
  @param {string} t - the type of message, error or feedback
  @param {string} m - the message body to be shown
  */
  this.showmessage = function( t, m ) {
    this.displaymessage.dispatch( t, m );
  };

  /**
  Generates a new deck of cards in defined order - like opening a brand new packers

  @method shuffledeck
  @param d {Array} - The base array which should be shuffled
  @return shuffled array
  */
  this.shuffledeck = function( de ) {
      // console.log("Shuffling....");
      var currentIndex = de.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (currentIndex !== 0 ) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = de[currentIndex];
        de[currentIndex] = de[randomIndex];
        de[randomIndex] = temporaryValue;
      }
    // deck is shuffled so let the views know
    this.cardsshuffled.dispatch( 'foo' );

    return de;
  };

  /**
  Sorts the extracted cards according to a given set of rules defined in the spec
  @method sortcards
  */
  this.sortcards = function() {

    var suit_order = this.config.getProp('settings', 'suit_order');
    var card_order = this.config.getProp('settings', 'card_order');

    console.log("Sort order is", suit_order);
    this.drawncards.sort(
      function(a, b) {
        var ina = suit_order.indexOf( a.charAt(0) );
        var inb = suit_order.indexOf( b.charAt(0) );

        var cina = card_order.indexOf( a.charAt(1) );
        var cinb = card_order.indexOf( b.charAt(1) );
        return ( ina < inb ) ? -1 : ( ina > inb ) ? 1 : (cina < cinb) ? -1 : ( cina > cinb ) ? 1 : 0;
      }
    );

    this.cardsdrawn.dispatch( this.drawncards, 'sorted' );
  };

  this.test = function() {
    console.log('adsfaf');
    //everything is ready
    this.cardsessionready.dispatch( 'foo' );
  };

  this.init();

};
