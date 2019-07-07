'use strict';
(function () {


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



  window.filter = {
    pinsFilteredByType: pinsFilteredByType,
    roomsFilter: roomsFilter,
    guestsFilter: guestsFilter
  }

})();
