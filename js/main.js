'use strict';

var pinTemplate = document.querySelector('#pin').content.querySelector('button');
var mapPins = document.querySelector('.map__pins');
var mapWidth = mapPins.clientWidth;

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var fillAnnouncments = function () {
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var announcments = [];

  for (var i = 1; i <= 8; i++) {
    var objectToAdd = {
      'author': {
        'avatar': 'img/avatars/user0' + getRandomInt(1, 8) + '.png',
      },

      'offer': {
        'type': types[getRandomInt(1, 4)],
      },

      'location': {
        'x': getRandomInt(1, mapWidth),
        'y': getRandomInt(130, 630),
      }
    };

    announcments.push(objectToAdd);
  }

  return announcments;
};

var renderAnnouncment = function (announcment) {
  var newPin = pinTemplate.cloneNode(true);
  newPin.style = 'left:' + announcment.location.x + 'px; top: ' + announcment.location.y + 'px;';
  newPin.src = announcment.author.avatar;
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
