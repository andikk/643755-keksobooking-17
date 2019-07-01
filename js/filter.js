'use strict';
(function () {

  window.filter = {
    pinsFilteredByType: function () {
      var pinsToShow = [];

      var type = document.querySelector('#housing-type');

      if (type.value !== 'any') {
        pinsToShow = window.data.pins.slice().filter(function (announcment) {
          return announcment.offer.type === type.value;
        });
      } else {
        pinsToShow = window.data.pins;
      }

      return pinsToShow;
    }
  };

})();
