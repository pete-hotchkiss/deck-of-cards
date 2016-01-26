'use strict';
/**
* Static UI class. This class does not need instantiating

@module Helpers
@class CSSClassHelpers
*/
var CSSClassHelpers = {

  /**
  Checks to see if a given DOM element already has a class
  @method hasClass
  @param {DOM} el - DOM element to add the class to
  @param {String} c - class name to add
  */
  hasClass: function(el, className) {
    if (el.classList) {
      return el.classList.contains(className);
    } else {
      return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    }
  },

  /**
  Adds a class to a given DOM element

  @method addClass
  @param {DOM} el - DOM element to add the class to
  @param {String} c - class name to add
  */
  addClass: function(el, className) {
    if (el.classList) {
      el.classList.add(className);
    } else if
      (!hasClass(el, className)) {
        el.className += ' ' + className;
    }
  },

  /**
  Removes a class from a given DOM element

  @method removeClass
  @param {DOM} el - DOM element to remove the class from
  @param {String} c - class name to remove
  */
  removeClass: function(el, className) {
    if (el.classList) {
      el.classList.remove(className);
    }
    else if (hasClass(el, className)) {
      var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
      el.className = el.className.replace(reg, ' ');
    }
  }
};
