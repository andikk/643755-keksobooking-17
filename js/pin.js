'use strict';
(function () {
  // НАЧАЛО БЛОКА для генерации меток с объявлениями и размещениями их на карте
  // шаблон для метки с объявлением
  // функция используется для отрисовки конкретного объявления на карте
  window.showPins = function () {

    var pinTemplate = document.querySelector('#pin').content.querySelector('button');
    // карта для метки с обхявленим
    var mapPins = document.querySelector('.map__pins');

    // объявляем переменную для массива с объявлениями и заполняем её с помощью функции
    var announcments = window.announcments;
    console.log(window.asd);

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
  // КОНЕЦ БЛОКА.
})();
