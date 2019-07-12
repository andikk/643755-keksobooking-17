'use strict';
(function () {

  // НАЧАЛО БЛОКА для генерации меток с объявлениями и размещениями их на карте
    // блок для фильтрации пинов
    var updateAnnouncments = function () {
      window.card.closePopup();
      window.useDebounce(function () {
        //displayPins(window.data.pins.slice().filter(window.filter.typesFilter).filter(window.filter.roomsFilter).filter(window.filter.guestsFilter).filter(window.filter.priceFilter).filter(window.filter.featuresFilter));

        console.log(window.data.pins.slice().filter(window.filter.filterIt));

        //displayPins();
      });
    };

    var type = document.querySelector('#housing-type');
    type.addEventListener('change', updateAnnouncments);

    var housingRooms = document.querySelector('#housing-rooms');
    housingRooms.addEventListener('change', updateAnnouncments);

    var housingGuests = document.querySelector('#housing-guests');
    housingGuests.addEventListener('change', updateAnnouncments);

    var housingPrice = document.querySelector('#housing-price');
    housingPrice.addEventListener('change', updateAnnouncments);

    var featuresButtons = document.querySelectorAll('input[name="features"]');

    for (var i = 0; i < featuresButtons.length; i++) {
      featuresButtons[i].addEventListener('change', updateAnnouncments);
    }
    // конец блока фильтрации пинов

    var downloadPins = function () {

      // данная функция выполняется в случае неудачной загрузки даннхы
      var onError = function () {
        var errorBlock = document.querySelector('.error');
        var btn = errorBlock.querySelector('.error__button');
        errorBlock.style = 'display: block';

        var closeMessage = function () {
          errorBlock.style = 'display: none';
        };

        var onEscPress = function (evt) {
          if (evt.keyCode === window.data.ESC) {
            closeMessage();
          }
        };

        document.addEventListener('keydown', onEscPress);
        errorBlock.addEventListener('click', closeMessage);
        btn.addEventListener('click', closeMessage);
      };

      // в случае успешной загрузки вызываем функцию отрисовки пинов
      // и передаём полученные данные (даннве уже в массиве с объектами)
      var onSuccess = function (data) {
        window.data.pins = data;
        displayPins(window.data.pins);
      };

      // загружаем данные с пинами и выполняем опред.функции в случа удачной загрузки или нет
      window.load('https://js.dump.academy/keksobooking/data', onSuccess, onError, 'GET', null);
    };


    var deletePins = function () {
      // очистка пинов перед добавлением
      var addedPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      if (addedPins.length >= 0) {
        addedPins.forEach(function (pin) {
          pin.remove();
        });
      }
    };

    var deleteActivePinClass = function () {
      var addedPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      if (addedPins.length >= 0) {
        addedPins.forEach(function (pin) {
          pin.classList.remove('map__pin--active');
        });
      }
    };

    // функция для отображения пинов, на основе загруженных данных
    var displayPins = function (announcments) {

      deletePins();

      var onPinClick = function (evt) {
        deleteActivePinClass();
        evt.currentTarget.classList.add("map__pin--active");
        window.card.displayCard(announcments[evt.currentTarget.getAttribute('data-id')]);
      };

      var pinTemplate = document.querySelector('#pin').content.querySelector('button');
      // карта для метки с объявленим
      var mapPins = document.querySelector('.map__pins');

      // создаём переменную куда будем записывать разметку с объявлениями
      var fragment = document.createDocumentFragment();

      // функция, которая формирует данные пина для последующей отрисовки
      var renderAnnouncement = function (announcement, k) {
        var newPin = pinTemplate.cloneNode(true);
        var pinImg = newPin.querySelector('img');
        newPin.style.left = (announcement.location.x - window.data.SIMILAR_PIN_SIZE / 2) + 'px';
        newPin.style.top = (announcement.location.y - window.data.SIMILAR_PIN_SIZE) + 'px';
        pinImg.src = announcement.author.avatar;
        pinImg.alt = 'Заголовок объявления';
        newPin.setAttribute('data-id', k);
        newPin.addEventListener('click', onPinClick);
        return newPin;
      };

      // проходим в цикле по всем объявлениям из массива announcments
      for (var k = 0; k < announcments.length && k < window.data.MAX_PINS; k++) {
        // формируем фрагмент с разметкой
        fragment.appendChild(renderAnnouncement(announcments[k], k));
      }
      // выводим сформированный фрагмент с разметкой на карту
      mapPins.appendChild(fragment);

    };

    window.pin = {
      downloadPins: downloadPins,
      deletePins: deletePins,
      displayPins: displayPins
    };


})();
