'use strict';

(function () {
  // НАЧАЛО БЛОКА для активации и деактивации страницы

  // функция, которая меняет аттрибут доступности для переданной в неё HTML коллекцию
  // используется для активации и деактивации страницы
  var changeAttribute = function (collection, status) {
    for (var i = 0; i < collection.length; i++) {
      if (status === false) {
        collection[i].disabled = true;
      } else {
        collection[i].disabled = false;
      }
    }
  };

  // запишем в переменные поле с адресом и главный пин
  var address = document.querySelector('#address');
  var mapPinMain = document.querySelector('.map__pin--main');
  // сохраним изначальные координаты пина, чтобы можно было его возвращать в центр
  var pinMainLeft = mapPinMain.style.left;
  var pinMainRight = mapPinMain.style.right;
  // функция возврата пина в центр
  var pinMainToCenter = function () {
    mapPinMain.style.left = pinMainLeft;
    mapPinMain.style.right = pinMainRight;
    var coordX = mapPinMain.offsetLeft + Math.ceil(window.data.PIN_SIZE / 2);
    var coordY = mapPinMain.offsetTop + Math.ceil(window.data.PIN_SIZE / 2);
    address.value = coordX + ',' + coordY;
  };



  // функция, в зависимости от переданного аттрибута деактивирут или активирует страницу
  var activatePage = function (status) {
    var map = document.querySelector('.map');
    var mapFilter = document.querySelector('.map__filter');
    var adForm = document.querySelector('.ad-form');
    var inputes = document.querySelectorAll('input');
    var selectes = document.querySelectorAll('select');
    var textarea = adForm.querySelector('textarea');
    var btnSubmit = document.querySelector('.ad-form__submit');
    var btnReset = document.querySelector('.ad-form__reset');

    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapFilter.classList.remove('map__filter--disabled');
    changeAttribute(inputes, true);
    changeAttribute(selectes, true);
    textarea.disabled = false;
    btnSubmit.disabled = false;
    btnReset.disabled = false;
    window.form.updateCapacity();

    if (status === false) {
      map.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');
      mapFilter.classList.add('map__filter--disabled');
      changeAttribute(inputes, false);
      changeAttribute(selectes, false);
      textarea.disabled = true;
      btnSubmit.disabled = true;
      btnReset.disabled = true;
      window.form.updateCapacity();
      pinMainToCenter();
    }

  };

  // при загрузке деактивируем страницу
  activatePage(window.data.pageIsActive);
  // КОНЕЦ БЛОКА

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ENTER) {
      activatePage(true);
      if (window.data.pins.length == 0) {
        window.pin.downloadPins();
      }
    }
  });


  // НАЧАЛО БЛОКА кода, отвечающего за перемещения пина на карте

  // функция для записи координатов пина в поле с адресом
  var saveLocation = function (coordX, coordY) {
    coordX = mapPinMain.offsetLeft + Math.ceil(window.data.PIN_SIZE / 2);
    coordY = mapPinMain.offsetTop + window.data.PIN_SIZE + window.data.CONST_FOR_POINTER;
    address.value = coordX + ',' + coordY;
  };


  mapPinMain.addEventListener('mousedown', function (evt) {

    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // флаг нужен для того, чтобы понимать перетаскивают пин
    // или просто кликнули на него и не двигали
    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newX = mapPinMain.offsetLeft - shift.x;
      var newY = mapPinMain.offsetTop - shift.y;

      var curX = newX + Math.ceil(window.data.PIN_SIZE / 2);
      var curY = newY + window.data.PIN_SIZE + window.data.CONST_FOR_POINTER;

      var map = document.querySelector('.map');

      // здесь мы проверям не вынесли ли пин за границы карты
      if ((curY >= window.data.LOCATION_Y_NUMBER_START) && (curY <= window.data.LOCATION_Y_NUMBER_END)) {
        mapPinMain.style.top = mapPinMain.offsetTop - shift.y + 'px';
      }

      if ((curX >= 0) && (curX <= map.clientWidth)) {
        mapPinMain.style.left = mapPinMain.offsetLeft - shift.x + 'px';
      }

      // записываем значения пина в поле адрес
      saveLocation(mapPinMain.style.top, mapPinMain.style.left);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      // записываем значения пина в поле адрес
      saveLocation(mapPinMain.style.top, mapPinMain.style.left);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      // если пин двигали, тогда
      if (dragged) {
        // если страница неактивна
        if (window.data.pageIsActive === false) {
          // активируем её и показываем пины
          activatePage(true);
          // если массив с пинам пустой, то нужно загрузить данные с сервера
          // иначе отображаем ранее загруженные данные
          if (window.data.pins.length == 0) {
            window.pin.downloadPins();
          } else {
            window.pin.displayPins(window.data.pins);
          }

        }

        var onClickPreventDefault = function (onClickEvt) {
          onClickEvt.preventDefault();
          mapPinMain.removeEventListener('click', onClickPreventDefault);
        };

        mapPinMain.addEventListener('click', onClickPreventDefault);

      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.map = {
    pinMainToCenter: pinMainToCenter,
    activatePage: activatePage
  };

})();
