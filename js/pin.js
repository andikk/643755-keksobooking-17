'use strict';
(function () {
  // НАЧАЛО БЛОКА для генерации меток с объявлениями и размещениями их на карте
  window.showPins = function () {

    // блок для фильтрации пинов по выбранному типу жилья
    var type = document.querySelector('#housing-type');

    var updateAnnouncments = function () {
      displayPins(window.filter.pinsFilteredByType());
    };

    type.addEventListener('change', updateAnnouncments);
    // конец блока фильтрации пинов по выбранному типу жилья

    // данная функция выполняется в случае неудачной загрузки даннхы
    var onError = function () {
      // отображаем информацию об ошибке
      var mainBlock = document.querySelector('main');
      var errorBlock = document.querySelector('#error').content.querySelector('.error');
      mainBlock.appendChild(errorBlock);
    };

    // в случае успешной загрузки вызываем функцию отрисовки пинов
    // и передаём полученные данные (даннве уже в массиве с объектами)
    var onSuccess = function (data) {
      window.data.pins = data;
      updateAnnouncments();
    };

    // загружаем данные с пинами и выполняем опред.функции в случа удачной загрузки или нет
    window.load('https://js.dump.academy/keksobooking/data', onSuccess, onError);


    // функция для отображения пинов, на основе загруженных данных
    var displayPins = function (announcments) {
      // очистка пинов перед добавлением
      var addedPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

      if (addedPins.length >= 0) {
        addedPins.forEach(function (pin) {
          pin.remove();
        });
      }
      // конец очистки

      var pinTemplate = document.querySelector('#pin').content.querySelector('button');
      // карта для метки с объявленим
      var mapPins = document.querySelector('.map__pins');

      // создаём переменную куда будем записывать разметку с объявлениями
      var fragment = document.createDocumentFragment();

      // функция, которая формирует данные пина для последующей отрисовки
      var renderAnnouncement = function (announcement, k) {
        var newPin = pinTemplate.cloneNode(true);
        var pinImg = newPin.querySelector('img');
        newPin.style.left = announcement.location.x + 'px';
        newPin.style.top = announcement.location.y + 'px';
        pinImg.src = announcement.author.avatar;
        pinImg.alt = 'Заголовок объявления';
        newPin.setAttribute('data-id', k)
        return newPin;
      };

      // проходим в цикле по всем объявлениям из массива announcments
      for (var k = 0; k < announcments.length && k <= window.data.MAX_PINS; k++)  {
        // формируем фрагмент с разметкой
        fragment.appendChild(renderAnnouncement(announcments[k], k));
      }
      // выводим сформированный фрагмент с разметкой на карту
      mapPins.appendChild(fragment);

      // повесим на все пины обработчик события клик, который будет
      // вызывать функцию, которая отображает карточку с информацией
      var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var p = 0; p < allPins.length; p++ ) {
        allPins[p].addEventListener('click', function () {
          displayCard(this.getAttribute('data-id'), announcments)
        });
      }

    };

  };




})();
