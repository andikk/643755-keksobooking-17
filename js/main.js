'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var LOCATION_X_NUMBER_START = 1;
var PIN_HALF_WIDTH = 25;
var PIN_HEIGHT = 70;
var LOCATION_Y_NUMBER_START = 130;
var LOCATION_Y_NUMBER_END = 630;
var ANNOUNCMENTS_COUNT = 8;

var pinTemplate = document.querySelector('#pin').content.querySelector('button');
var mapPins = document.querySelector('.map__pins');
var mapWidth = mapPins.clientWidth;

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


var fillAnnouncements = function () {
  var announcements = [];

  for (var i = 1; i <= ANNOUNCMENTS_COUNT; i++) {
    var objectToAdd = {
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png',
      },

      'offer': {
        'type': TYPES[getRandomInt(0, TYPES.length)],
      },

      'location': {
        'x': getRandomInt(LOCATION_X_NUMBER_START, mapWidth - PIN_HALF_WIDTH),
        'y': getRandomInt(LOCATION_Y_NUMBER_START, LOCATION_Y_NUMBER_END - PIN_HEIGHT),
      }
    };

    announcements.push(objectToAdd);
  }

  return announcements;
};

var renderAnnouncement = function (announcement) {
  var newPin = pinTemplate.cloneNode(true);
  var pinImg = newPin.querySelector('img');
  newPin.style.left = announcement.location.x + 'px';
  newPin.style.top = announcement.location.y + 'px';
  pinImg.src = announcement.author.avatar;
  pinImg.alt = 'Заголовок объявления';
  return newPin;
};

// var map = document.querySelector('.map');
// map.classList.remove('map--faded');

var announcments = fillAnnouncements();
// var fragment = document.createDocumentFragment();

// for (var i = 0; i < announcments.length; i++) {
//   fragment.appendChild(renderAnnouncement(announcments[i]));
// }

// mapPins.appendChild(fragment);

var changeAttribute = function (collection, status) {
  for (var i = 0; i < collection.length; i++) {
    if (status === false) {
      collection[i].disabled = true;
    } else {
      collection[i].disabled = false;
    }

  }
};

var activatePage = function (status) {
  var map = document.querySelector('.map');
  var mapFilter = document.querySelector('.map__filter');
  var adForm = document.querySelector('.ad-form');
  var inputes = document.querySelectorAll('input');
  var selectes = document.querySelectorAll('select');
  var textarea = adForm.querySelector('textarea');

  if (status === false) {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapFilter.classList.add('map__filter--disabled');
    changeAttribute(inputes, false);
    changeAttribute(selectes, false);
    textarea.disabled = true;
  } else {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapFilter.classList.remove('map__filter--disabled');
    changeAttribute(inputes, true);
    changeAttribute(selectes, true);
    textarea.disabled = false;
  }
};

activatePage(false);

var mapPinMain = document.querySelector('.map__pin--main');

mapPinMain.addEventListener('click', function () {
  activatePage(true);
});

mapPinMain.addEventListener('mouseup', function () {
  // var PIN_SIZE = 65;
  // var PIN_POINTER_LENGTH = 10;

  var address = document.querySelector('#address');

  // var coordX = mapPinMain.style.left;
  // console.log(mapPinMain.offsetLeft - PIN_SIZE);
  // coordX = Number(coordX.substr(0, coordX.length - 2)) + PIN_SIZE;

  // var coordY = mapPinMain.style.top;
  // coordY = Number(coordY.substr(0, coordY.length - 2)) + PIN_POINTER_LENGTH;

   var coordX = mapPinMain.offsetLeft + Math.ceil(mapPinMain.offsetWidth / 2);
   var coordY = mapPinMain.offsetTop + Math.ceil(mapPinMain.offsetHeight / 2);

  address.value = coordX + ',' + coordY;
});
