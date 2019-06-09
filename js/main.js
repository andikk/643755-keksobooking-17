'use strict';

var pinTemplate = document.querySelector('#pin').content.querySelector('button');
var mapPins = document.querySelector('.map__pins');
var mapWidth = mapPins.clientWidth;

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateArrayRandomNumber = function (min, max) {
  var totalNumbers = max - min + 1;
  var arrayTotalNumbers = [];
  var arrayRandomNumbers = [];
  var tempRandomNumber;

  while (totalNumbers--) {
    arrayTotalNumbers.push(totalNumbers + min);
  }

  while (arrayTotalNumbers.length) {
    tempRandomNumber = Math.round(Math.random() * (arrayTotalNumbers.length - 1));
    arrayRandomNumbers.push(arrayTotalNumbers[tempRandomNumber]);
    arrayTotalNumbers.splice(tempRandomNumber, 1);
  }

  return arrayRandomNumbers;
};

var fillAnnouncments = function () {
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var announcments = [];
  var USER_NUMBER_START = 1;
  var USER_NUMBER_END = 8;
  var OFFER_TYPE_NUMBER_START = 1;
  var OFFER_TYPE_NUMBER_END = 4;
  var LOCATION_X_NUMBER_START = 1;
  var PIN_HALF_WIDTH = 25;
  var PIN_HEIGHT = 70;
  var LOCATION_Y_NUMBER_START = 130;
  var LOCATION_Y_NUMBER_END = 630;

  var userNumbers = generateArrayRandomNumber(USER_NUMBER_START, USER_NUMBER_END);

  for (var i = 0; i <= 7; i++) {
    var objectToAdd = {
      'author': {
        'avatar': 'img/avatars/user0' + userNumbers[i] + '.png',
      },

      'offer': {
        'type': types[getRandomInt(OFFER_TYPE_NUMBER_START, OFFER_TYPE_NUMBER_END)],
      },

      'location': {
        'x': getRandomInt(LOCATION_X_NUMBER_START, mapWidth - PIN_HALF_WIDTH),
        'y': getRandomInt(LOCATION_Y_NUMBER_START, LOCATION_Y_NUMBER_END - PIN_HEIGHT),
      }
    };

    announcments.push(objectToAdd);
  }

  return announcments;
};

var renderAnnouncment = function (announcment) {
  var newPin = pinTemplate.cloneNode(true);
  var pinImg = newPin.querySelector('img');
  newPin.style = 'left:' + announcment.location.x + 'px; top: ' + announcment.location.y + 'px;';
  pinImg.src = announcment.author.avatar;
  newPin.alt = 'Заголовок объявления';
  return newPin;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var announcments = fillAnnouncments();
var fragment = document.createDocumentFragment();

for (var i = 0; i < announcments.length; i++) {
  fragment.appendChild(renderAnnouncment(announcments[i]));
}

mapPins.appendChild(fragment);
