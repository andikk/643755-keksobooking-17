'use strict';
(function () {

  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;

  var pinsFilteredByType = function () {
    var pinsToShow = [];

    var type = document.querySelector('#housing-type');

    pinsToShow = window.data.pins;

    if (type.value !== 'any') {
      pinsToShow = window.data.pins.slice().filter(function (announcment) {
        return announcment.offer.type === type.value;
      });
    }

    return pinsToShow;
  }

  var roomsFilter = function (elem) {
    var housingRooms = document.querySelector('#housing-rooms');
    if (housingRooms.value === 'any') {
      return elem;
    }
    return elem.offer.rooms === Number(housingRooms.value);
  }

  var guestsFilter = function (elem) {
    var housingGuests = document.querySelector('#housing-guests');
    if (housingGuests.value === 'any') {
      return elem;
    }
    return elem.offer.guests === Number(housingGuests.value);
  }

  var priceFilter = function (elem) {
    var housingPrice = document.querySelector('#housing-price');

    switch (housingPrice.value) {
      case 'any':
        return elem;
        break;
      case 'middle':
        return elem.offer.price >= MIN_PRICE && elem.offer.price < MAX_PRICE ;
        break;
      case 'low':
        return elem.offer.price < MIN_PRICE
        break;
      case 'high':
        return elem.offer.price > MIN_PRICE
        break;
    }
  }

  var featuresFilter = function (elem) {
    var selectedFeatures = document.querySelectorAll('input[name="features"]:checked');
    var features = Array.from(selectedFeatures);
    var selectedFeaturesValues = features.map(function (it) {
      return it.value;
    });

    var featuresInElem = elem.offer.features;

    for (var i = 0; i < selectedFeaturesValues.length; i++) {
      if (featuresInElem.includes(selectedFeaturesValues[i])) {
        return elem;
      }
    }

  }




  window.filter = {
    pinsFilteredByType: pinsFilteredByType,
    roomsFilter: roomsFilter,
    guestsFilter: guestsFilter,
    priceFilter: priceFilter,
    featuresFilter: featuresFilter
  }

})();
