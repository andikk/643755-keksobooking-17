'use strict';
(function () {

  window.filter = {
    pinsFilteredByType: function () {
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
  };

})();
