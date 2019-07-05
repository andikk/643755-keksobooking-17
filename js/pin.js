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
      displayCard(0);
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
      for (var k = 0; k < announcments.length && k <= window.data.MAX_PINS; k++)  {
        // формируем фрагмент с разметкой
        fragment.appendChild(renderAnnouncement(announcments[k]));
      }
      // выводим сформированный фрагмент с разметкой на карту
      mapPins.appendChild(fragment);

    };

  };

  var displayCard = function(cardNumber) {
    console.log(window.data.pins[cardNumber]);
    var map = document.querySelector('.map');
    var mapFiltersContainer = document.querySelector('.map__filters-container');
    var cardTemplate = document.querySelector('#card').content;
    var newCard = cardTemplate.cloneNode(true);

    var popupTitle = newCard.querySelector('.popup__title');
    var popupTextAddress = newCard.querySelector('.popup__text--address');
    var popupTextPrice = newCard.querySelector('.popup__text--price');
    var popupType = newCard.querySelector('.popup__type');
    var popupTextCapacity = newCard.querySelector('.popup__text--capacity');
    var popupTextTime = newCard.querySelector('.popup__text--time');
    var popupFeatures = newCard.querySelector('.popup__features');
    var popupDescription = newCard.querySelector('.popup__description');
    var popupPhotos = newCard.querySelector('.popup__photos');
    var popupPhotoTemplate = newCard.querySelector('.popup__photo');
    var popupAvatar = newCard.querySelector('.popup__avatar');
    var newPhoto = popupPhotoTemplate.cloneNode(true);

    popupTitle.textContent = window.data.pins[cardNumber].offer.title;
    popupTextAddress.textContent = window.data.pins[cardNumber].offer.address;
    popupTextPrice.textContent = window.data.pins[cardNumber].offer.price + ' Р/ночь';

    switch (window.data.pins[cardNumber].offer.type) {
      case 'bungalo':
        popupType.textContent = 'Бунгало';
        break;
      case 'flat':
        popupType.textContent = 'Квартира';
        break;
      case 'house':
        popupType.textContent = 'Дом';
        break;
      case 'palace':
        popupType.textContent = 'Дворец';
        break;
    }

    popupTextCapacity.textContent = window.data.pins[cardNumber].offer.rooms + ' комнаты для ' + window.data.pins[cardNumber].offer.guests + ' гостей';

    popupTextTime.textContent = 'Заезд после ' +  window.data.pins[cardNumber].offer.checkin + ', выезд до ' + window.data.pins[cardNumber].offer.checkout;

    var features = window.data.pins[cardNumber].offer.features;

    while (popupFeatures.firstChild) {
      popupFeatures.removeChild(popupFeatures.firstChild);
    }

    for (var i = 0; i < features.length; i++) {
      var li = document.createElement('li');
       console.log(features[i]);
       li.className = 'popup__feature popup__feature--' + features[i];
       popupFeatures.appendChild(li);
    }

    popupDescription.textContent =  window.data.pins[cardNumber].offer.description;

    var photos = window.data.pins[cardNumber].offer.photos;

    while (popupPhotos.firstChild) {
      popupPhotos.removeChild(popupPhotos.firstChild);
    }

    for (var k = 0; k < photos.length; k++) {
      newPhoto.src = photos[k];
      popupPhotos.appendChild(newPhoto);
    }

    popupAvatar.src = window.data.pins[cardNumber].author.avatar;


    map.insertBefore(newCard, mapFiltersContainer);

  };



})();
