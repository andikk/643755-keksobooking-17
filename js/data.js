'use strict';
(function () {
  var LOCATION_X_NUMBER_START = 1;
  var PIN_HALF_WIDTH = 25;
  var PIN_HEIGHT = 70;
  var LOCATION_Y_NUMBER_START = 130;
  var LOCATION_Y_NUMBER_END = 630;
  var ANNOUNCMENTS_COUNT = 8;
  var CONST_FOR_POINTER = 20;
  var PIN_SIZE = 65;
  var MAX_PINS = 5;
  var pageIsActive = false;
  var pins = [];


  window.data = {
    LOCATION_X_NUMBER_START: LOCATION_X_NUMBER_START,
    PIN_HALF_WIDTH: PIN_HALF_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    LOCATION_Y_NUMBER_START: LOCATION_Y_NUMBER_START,
    LOCATION_Y_NUMBER_END: LOCATION_Y_NUMBER_END,
    ANNOUNCMENTS_COUNT: ANNOUNCMENTS_COUNT,
    CONST_FOR_POINTER: CONST_FOR_POINTER,
    PIN_SIZE: PIN_SIZE,
    MAX_PINS: MAX_PINS,
    pageIsActive: pageIsActive,
    pins: pins,

  };

})();
