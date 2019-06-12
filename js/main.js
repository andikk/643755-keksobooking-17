'use strict';

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
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var announcements = [];


  for (var i = 1; i <= ANNOUNCMENTS_COUNT; i++) {
    var objectToAdd = {
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png',
      },

      'offer': {
        'type': types[getRandomInt(0, types.length)],
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
  newPin.style = 'left:' + announcement.location.x + 'px; top: ' + announcement.location.y + 'px;';
  pinImg.src = announcement.author.avatar;
  newPin.alt = 'Заголовок объявления';
  return newPin;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var announcments = fillAnnouncements();
var fragment = document.createDocumentFragment();

for (var i = 0; i < announcments.length; i++) {
  fragment.appendChild(renderAnnouncement(announcments[i]));
}

mapPins.appendChild(fragment);
