'use strict';
(function () {
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var LOCATION_X_NUMBER_START = 1;
  var PIN_HALF_WIDTH = 25;
  var PIN_HEIGHT = 70;
  var LOCATION_Y_NUMBER_START = 130;
  var LOCATION_Y_NUMBER_END = 630;
  var ANNOUNCMENTS_COUNT = 8;
  var CONST_FOR_POINTER = 20;
  var PIN_SIZE = 65;
  var pageIsActive = false;


  // // функция для генерации случайных чисел в заданном интервале
  // var getRandomInt = function (min, max) {
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // };

  // // функция для создания объекта с объявлениями
  // var fillAnnouncements = function () {
  //   var mapPins = document.querySelector('.map__pins');
  //   var mapWidth = mapPins.clientWidth;

  //   // объявили массив с объявлениями
  //   var announcements = [];

  //   // в цикле генерируем 5 объектов
  //   for (var i = 1; i <= ANNOUNCMENTS_COUNT; i++) {
  //     // сгенерировали объект для добавления
  //     var objectToAdd = {
  //       'author': {
  //         'avatar': 'img/avatars/user0' + i + '.png',
  //       },

  //       'offer': {
  //         'type': TYPES[getRandomInt(0, TYPES.length)],
  //       },

  //       'location': {
  //         'x': getRandomInt(LOCATION_X_NUMBER_START, mapWidth - PIN_HALF_WIDTH),
  //         'y': getRandomInt(LOCATION_Y_NUMBER_START, LOCATION_Y_NUMBER_END - PIN_HEIGHT),
  //       }
  //     };
  //     // добавляем сформированный объект к массиву
  //     announcements.push(objectToAdd);
  //   }
  //   // в ответ на вызов функции возвращаем массив с формированными объектами
  //   return announcements;
  // };
  window.asd = '123';

  var onError = function (message) {
    console.error(message);
  };

  var onSuccess = function (data) {
    window.announcements = data;
  //  console.log(window.announcements);
  };

  window.load('https://js.dump.academy/keksobooking/data', onSuccess, onError);


  window.data = {
    LOCATION_X_NUMBER_START: LOCATION_X_NUMBER_START,
    PIN_HALF_WIDTH: PIN_HALF_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    LOCATION_Y_NUMBER_START: LOCATION_Y_NUMBER_START,
    LOCATION_Y_NUMBER_END: LOCATION_Y_NUMBER_END,
    ANNOUNCMENTS_COUNT: ANNOUNCMENTS_COUNT,
    CONST_FOR_POINTER: CONST_FOR_POINTER,
    PIN_SIZE: PIN_SIZE,
    pageIsActive: pageIsActive,
  };

})();
