'use strict';
(function () {

  var DEBOUNCE_TIMEOUT = 500;
  var lastTimeout = null;

  window.useDebounce = function (cb) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(cb, DEBOUNCE_TIMEOUT);
  };

})();
