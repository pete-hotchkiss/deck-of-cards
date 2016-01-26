QUnit.test( "Check Deck Size", function( assert ) {
  assert.ok( e.deck.length == 52, "Correct size Deck" );
});

QUnit.test( "Check Shuffle Size", function( assert ) {
  e.deck = e.shuffledeck( e.deck );
  assert.ok( e.deck.length == 52, "Deck correct size after shuffle" );
});

QUnit.test( "Check Request To Draw Cards", function( assert ) {
  // console.log( "Engine is: ");
  // assert.ok( 1 == "1", "Passed!" );
  assert.equal( c.drawcards(c, 5), true, "number passed so cards will be drawn" );
  assert.equal( c.drawcards(c, 55), false, "number over 52 passed so now cards will be drawn" );
  assert.equal( c.drawcards(c, -5), false, "number less than 1 passed so now cards will be drawn" );
  assert.equal( c.drawcards(c, 'string'), false, "string passed so messaging will be displayed" );
  // assert.ok( e.deck.length == 52, "Deck correct size after shuffle" );
});

QUnit.test( "Check Map positions", function( a ) {
  a.equal( e.config.getMap('c2').row, 0, "Correct Row found for 2 of Clubs");
  a.equal( e.config.getMap('dA').row, 3, "Correct Row found for Ace of Diamons");
  a.equal( e.config.getMap('h6').column, 4, "Correct Column found for 6 of Hearts");
})
