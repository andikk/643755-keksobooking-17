'use strict';
(function () {
  // НАЧАЛО БЛОКА для генерации меток с объявлениями и размещениями их на карте
  // шаблон для метки с объявлением
  // функция используется для отрисовки конкретного объявления на карте


  window.showPins = function () {

    var pins = [];
    var type = document.querySelector('#housing-type');

    var updateAnnouncments = function () {

      var pinsToShow = [];

      if (type.value !== 'any') {
        pinsToShow = pins.slice().filter(function (announcment) {
          return announcment.offer.type === type.value;
        });
      } else {
        pinsToShow = pins;
      }

      displayPins(pinsToShow);
    };

    type.addEventListener('change', updateAnnouncments);

    var onError = function () {
      // отображаем информацию об ошибке
      var mainBlock = document.querySelector('main');
      var errorBlock = document.querySelector('#error').content.querySelector('.error');
      mainBlock.appendChild(errorBlock);
    };

    var onSuccess = function (data) {
      // в случае успешной загрузки вызываем функцию отрисовки пинов
      // и передаём полученные данные (даннве уже в массиве с объектами)
      pins = data;
      updateAnnouncments();
    };

    // загружаем данные с пинами и выполняем опред.функции в случа удачной загрузки или нет
    window.load('https://js.dump.academy/keksobooking/data', onSuccess, onError);

    var addedPins = [];

    // функция для отображения пинов, на основе загруженных данных
    var displayPins = function (announcments) {
      var pinsCount;

      if (announcments.length <= window.data.MAX_PINS) {
        pinsCount = announcments.length;
      } else {
        pinsCount = window.data.MAX_PINS;
      }

      if (pinsCount >= 0) {
        addedPins.forEach(function (pin) {
          pin.remove();
        });
      }

      var pinTemplate = document.querySelector('#pin').content.querySelector('button');
      // карта для метки с объявленим
      var mapPins = document.querySelector('.map__pins');

      // создаём переменную куда будем записывать разметку с объявлениями
      var fragment = document.createDocumentFragment();

      // функция, которая формирует данные пина для последующей отрисовки
      var renderAnnouncement = function (announcement) {

        var newPin = pinTemplate.cloneNode(true);
        var pinImg = newPin.querySelector('img');
        newPin.style.left = announcement.location.x + 'px';
        newPin.style.top = announcement.location.y + 'px';
        pinImg.src = announcement.author.avatar;
        pinImg.alt = 'Заголовок объявления';
        return newPin;
      };

      // проходим в цикле по всем объявлениям из массива announcments

      for (var k = 0; k <= pinsCount - 1; k++) {
        // формируем фрагмент с разметкой
        fragment.appendChild(renderAnnouncement(announcments[k]));
      }
      // выводим сформированный фрагмент с разметкой на карту
      mapPins.appendChild(fragment);

      addedPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    };

  };
  // КОНЕЦ БЛОКА.
})();
