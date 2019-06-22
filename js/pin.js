'use strict';
(function () {
  // НАЧАЛО БЛОКА для генерации меток с объявлениями и размещениями их на карте
  // шаблон для метки с объявлением
  // функция используется для отрисовки конкретного объявления на карте
  window.showPins = function () {

    var onError = function () {
      var mainBlock = document.querySelector('main');
      var errorBlock = document.querySelector('#error').content.querySelector('.error');
      mainBlock.appendChild(errorBlock);
    };

    var onSuccess = function (data) {
      displayPins(data);
    };

    window.load('https://js.dump.academy/keksobooking/data', onSuccess, onError);

    var displayPins = function (announcments) {
      var pinTemplate = document.querySelector('#pin').content.querySelector('button');
      // карта для метки с обхявленим
      var mapPins = document.querySelector('.map__pins');

      // создаём переменную куда будем записывать разметку с объявлениями
      var fragment = document.createDocumentFragment();

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
      for (var k = 0; k < announcments.length; k++) {
        // формируем фрагмент с разметкой
        fragment.appendChild(renderAnnouncement(announcments[k]));
      }
      // выводим сформированный фрагмент с разметкой на карту
      mapPins.appendChild(fragment);
    };

  };
  // КОНЕЦ БЛОКА.
})();
