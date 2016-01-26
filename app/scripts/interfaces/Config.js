/* global jslinq */
'use strict';

/**
Provides a simple interface to retrieve configuration settings
@module Interfaces
@class Config
@param {object}  - JSON structured data
*/
var Config = function( c ) {
  /**
	@private
	@property config {JSON} - JSON structured configutation object
	*/
	this.config = c.config;

  /**
	Return the value of a the required property in a given scope. values returns a kept in their native type. So for example in a a JSON object

	@example
		// JSON format object
		"config": [
			"settings": {
					"difficulty": false,
					"click_url": "http://amazon.co.uk"
			},
			"google": {
				"active": true,
				"UA_code": "UAE-1234567-1"
			}
		]

		ConfigInstance.getProp( 'settings', 'difficulty' );	// Returns false
		ConfigInstance.getProp( 'google', 'UA_code' ); 		// Returns UAE-1234567-1

	@method getProp
	@param {string} t - the type grouping for the property
	@param {string} p - the label for the required property
	@return {object} - value of property requested in it's native type
	*/
	this.getProp = function( t, p ) {
		return jslinq( this.config )
		.where( function(e) { return e.type === t; })
		.select( function(e) { return e.props[p]; })
		.firstOrDefault();
	};

	/**
	Takes a passed card id and returns and row/colum coordinate object
	@method getMap
	@param {String} s - card identifier like c6 for 6 of clubs
	*/
	this.getMap = function( s ) {
		var suits = this.getProp('settings', 'suit_order');
		var cards = this.getProp('settings', 'card_order');
		return {
			'row': suits.indexOf( s.charAt(0) ),
			'column': cards.indexOf( s.charAt(1) )
		};
	};
};
