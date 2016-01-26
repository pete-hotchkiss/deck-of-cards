/* global, CardDisplay */
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
var CardDisplay = function( e, c, d ) {
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

  this.renderCards = function( crds ) {
    var t = this;
    var client = new XMLHttpRequest();
      client.open('GET', '/data/card.html');
      client.onreadystatechange = function() {
        if (client.readyState === 4 && client.status === 200) {
          // render the cards drawn to the screen
          var wrapper = document.querySelector('.card__element--drawn');
          if( wrapper != null ) {
            for(var a = 0; a < crds.length; a++) {
              var blk = client.responseText.replace('#cn#',
              'c' + t.engine.config.getMap( crds[a] ).column);
              blk = blk.replace('#rn#',
              'r' + t.engine.config.getMap( crds[a] ).row);
              wrapper.innerHTML += blk;
            }

          }
        }
      };
    client.send();
  };

  this.cleanCards = function() {
    var wrapper = document.querySelector('.card__element--drawn');
    wrapper.innerHTML = '';
  };

  /**
  callback event triggered on receipt of a signal that the drawn cards are ready

  @method onCardsDrawn
  @param {array} cds - Array of Cards to show
  @param {string} y - Is the collection shuffled or ordered
  */
  this.onCardsDrawn = function( cds, y ) {
    switch( y ) {
      case 'shuffled':
        // load in the HTML template to base the card on
        this.renderCards(cds);
        break;
      case 'sorted':
        this.cleanCards();
        this.renderCards(cds);
        break;
    }
  };

  // e.cardsshuffled.add( this.onCardsShuffled, this );
  // e.displaymessage.add( this.onMessageReceived, this);
  e.cardsdrawn.add( this.onCardsDrawn, this);
};
