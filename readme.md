# To the Magician's amongst you...

## Set up
Once you've pulled the files down a simple

```npm update```

followed by

```bower install```

will pull down the appropriate dependancies

Then to run the projects

```gulp serve```

This will kick off a local server and start the app.

## Interacting
Hit the __Shuffle Deck__ button to scramble the initial deck of cards. This will activate the number stepper which can be used to select the number of cards you wish to withdraw.

Hitting __Draw Cards__ will then extract the cards and display them in their unsorted order. To correctly order these according to required suits hit the __Sort Cards__ buttons

## Other Considerations
1 - All JS is documented inline. To generate a web version of this documentation run ```gulp dog-generation``` which will create a microsite in _/app/docs/_

2 - JS code is passing eslint tests bar a few warnings

3 - Code is being tested using QUnit with a test runner wrapper set up in /app/test-runner.html. Which can be browsed to when ```gulp serve``` is running

4 - Easter egg feature, allows for easy configuration of the suit ordering. in the _app/data/data.json__ file simply edit the order of the characters in the  ```suit_order``` node and the app will match this ruling at runtime. *note* Dont confuse this with the ```suite_graphic_order``` node which should not be edited as this is a permanent map to the order in which the grpaihcs for each suit are ordered in the card graphic sprite sheet

### Revision History
Love git I do. But sometimes it just goes south. I'm not great at wrestling with exporting repos from one server to the other. So bummer - lost my revision history

Basic process followed:
1 - Inital project scaffolding
2 - Structured MVC framework to create model, control and view type classes
3 - Rolled in configuration and other vanity elements
4 - Worked up deck shuffle and retival logic
5 - Worked in resorting mechanism
6 - Connected app to UI and added pretty card graphics
7 - tidied up some eslint errors
8 - Documentation 




### Deck of Cards Artwork
Artwork credit - http://sourceforge.net/projects/vector-cards/
