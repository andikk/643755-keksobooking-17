'use strict';
(function () {

  // проверим есть ли карточка в разметке
  // если есть, то удалим перед добавлением
  var closePopup = function () {
    var addedCard = document.querySelector('.map__card');
    if (addedCard !== null) {
      addedCard.parentNode.removeChild(addedCard);
    }
  };

  var displayCard = function (card) {

    closePopup();

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

    var popupClose = newCard.querySelector('.popup__close');

    popupTitle.textContent = card.offer.title;
    popupTextAddress.textContent = card.offer.address;
    popupTextPrice.innerHTML = card.offer.price + ' &#x20bd;<span>/ночь</span>';

    switch (card.offer.type) {
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

    popupTextCapacity.textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';

    popupTextTime.textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

    var features = card.offer.features;
    // удалим все элементы списка popupFeatures
    while (popupFeatures.firstChild) {
      popupFeatures.removeChild(popupFeatures.firstChild);
    }

    for (var i = 0; i < features.length; i++) {
      var li = document.createElement('li');
      li.className = 'popup__feature popup__feature--' + features[i];
      popupFeatures.appendChild(li);
    }

    popupDescription.textContent = card.offer.description;

    var photos = card.offer.photos;
    // удалим все узлы, которые содержаться в блоке popupPhotos
    while (popupPhotos.firstChild) {
      popupPhotos.removeChild(popupPhotos.firstChild);
    }

    for (var k = 0; k < photos.length; k++) {
      var newPhoto = popupPhotoTemplate.cloneNode(true);
      newPhoto.src = photos[k];
      popupPhotos.appendChild(newPhoto);
    }

    popupAvatar.src = card.author.avatar;

    // повесим событие закрытия карточки
    popupClose.addEventListener('click', closePopup);
    // обработаем событие keydown - если нажатая клавиша ESC, то тоже закроем окно
    var onPopupEscPress = function (evt) {
      if (evt.keyCode === window.data.ESC) {
        closePopup();
      }
    };

    document.addEventListener('keydown', onPopupEscPress);

    // вставляем сформированную карточку newCard в блок map перед блоком mapFiltersContainer
    map.insertBefore(newCard, mapFiltersContainer);
  };


  window.card = {
    displayCard: displayCard,
    closePopup: closePopup
  };

})();
