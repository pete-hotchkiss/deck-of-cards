/* global CardDisplay, Signal, Engine, Config, GameStage, CSSClassHelpers */
'use strict';
/**
View class, to handle behaviour when in the main state of game play.

@module Views
@class GameStage
@constructor
@param {GameControl} c - pointer to the main GameControl instance this view should be bound
@param {DOM} d - stage into which the content will be injected
@param {GuessWhoGame} e - pointer to the main game engine this view is bound, and will receive events from
*/
var GameStage = function( e, c, d ) {
  /**
  Reference for the main Engine instance this view listens to for Signal updates
  @property engine
  @type {Engine}
  */
  this.engine = e;
  /**
  Reference for the control type instance this view passes interactions through
  @property engine
  @type {HumanInteractions}
  */
  this.control = c;

  this.stage = d;

  /**
  callback event triggered on receipt of a signal that the game is ready. Internally sets up all the UI labels and configures the shuffle button click handlers so the stack of cards can be muddled up.

  @method onGameReady
  */
  this.onGameReady = function() {
      var t = this;
      var shuffle_label = document.querySelector('.button--shuffle > p');
      var draw_label = document.querySelector('.button--draw > p');
      var sort_label = document.querySelector('.button--sort > p');

      if(shuffle_label !== null ) {
        shuffle_label.innerHTML = this.engine.config.getProp('ui', 'shuffle_label');
        draw_label.innerHTML = this.engine.config.getProp('ui', 'draw_label');
        sort_label.innerHTML = this.engine.config.getProp('ui', 'sort_label');

        var bt = document.querySelector('.button--shuffle');
        bt.className = 'ui-element button button--shuffle';
        // define click handlers for the element
        bt.addEventListener(
          'click',
          function(){ t.control.shufflecards( t.control ); },
          false
        );
      }
  };

  /**
  callback event triggered on receipt of a signal that the structured deck of cards has been shuffled up. Internally disables the shuffle button and sets up the other elements where needed

  @method onCardsShuffled
  */
  this.onCardsShuffled = function( ) {
    var t = this;
    var shuffle_button = document.querySelector('.button--shuffle');

    if( shuffle_button !== null ) {
      // document.querySelector('.button--shuffle').className = "ui-element button button--shuffle faded disabled";

      CSSClassHelpers.addClass(
        document.querySelector('.button--shuffle'),
        'disabled' );

      CSSClassHelpers.removeClass(
        document.querySelector('.button--draw'),
        'disabled' );


      CSSClassHelpers.removeClass(
        document.querySelector('.form-field__text--extract'),
        'disabled' );

      // event handlers
      document.querySelector('.button--draw').addEventListener(
        'click',
        function() {
          t.control.drawcards(
            t.control, document.querySelector('.form-field__text--extract').value
          );
        },
        false
      );
    }
  };

  /**
  callback event triggered on receipt of a signal that some form of message should be recieved. Good or bad

  @method onMessageReceived
  @param {string} t - Type of message; i.e. is it an error or positive feedback
  @param {string} m - The body of the message to dispplay
  */
  this.onMessageReceived = function( t ) {
    // console.log("Message of type", t, "with body", m);
    if(document.querySelector('.game__stage__block--messaging') != null) {
      CSSClassHelpers.removeClass(
        document.querySelector('.game__stage__block--messaging'),
        'faded' );
      CSSClassHelpers.removeClass(
        document.querySelector('.game__stage__block--messaging'),
        'hidden' );

      CSSClassHelpers.addClass(
        document.querySelector('.game__stage__block--messaging'),
        t + '-message' );
    }
  };

  /**
  callback event triggered on receipt of a signal that the drawn cards are ready

  @method onCardsDrawn
  @param {array} c - Array of Cards to show
  @param {string} y - Is the collection shuffled or ordered
  */
  this.onCardsDrawn = function( cd, y ) {

    // console.log("Show these cards", cd, y);

    var t = this;
    switch( y ) {
      case 'shuffled':
        // activate/deactive appropriate buttons
        if( document.querySelector('.button--sort') != null ) {
          CSSClassHelpers.removeClass(
            document.querySelector('.button--sort'),
            'disabled' );

          CSSClassHelpers.addClass(
            document.querySelector('.button--draw'),
            'disabled' );

          CSSClassHelpers.addClass(
            document.querySelector('.form-field__text--extract'),
            'disabled' );

          // define the click handler
          document.querySelector('.button--sort').addEventListener(
            'click',
            function() {
              t.control.sortcards( t.control );
            },
            false
          );
        }
        break;
    }
  };

  e.cardsessionready.add( this.onGameReady, this );
  e.cardsshuffled.add( this.onCardsShuffled, this );
  e.displaymessage.add( this.onMessageReceived, this);
  e.cardsdrawn.add( this.onCardsDrawn, this);
};
