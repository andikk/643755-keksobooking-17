'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var LOCATION_X_NUMBER_START = 1;
var PIN_HALF_WIDTH = 25;
var PIN_HEIGHT = 70;
var LOCATION_Y_NUMBER_START = 130;
var LOCATION_Y_NUMBER_END = 630;
var ANNOUNCMENTS_COUNT = 8;
var CONST_FOR_POINTER = 20;
var PIN_SIZE = 65;

// НАЧАЛО БЛОКА для генерации меток с объявлениями и размещениями их на карте
// шаблон для метки с объявлением
var pinTemplate = document.querySelector('#pin').content.querySelector('button');
// карта для метки с обхявленим
var mapPins = document.querySelector('.map__pins');
// ширина карты, на которой размещаются метки с объявлениями
var mapWidth = mapPins.clientWidth;

// функция для генерации случайных чисел в заданном интервале
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// функция для создания объекта с объявлениями
var fillAnnouncements = function () {
  // объявили массив с объявлениями
  var announcements = [];

  // в цикле генерируем 5 объектов
  for (var i = 1; i <= ANNOUNCMENTS_COUNT; i++) {
    // сгенерировали объект для добавления
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
    // добавляем сформированный объект к массиву
    announcements.push(objectToAdd);
  }
  // в ответ на вызов функции возвращаем массив с формированными объектами
  return announcements;
};

// функция используется для отрисовки конкретного объявления на карте
var renderAnnouncement = function (announcement) {
  var newPin = pinTemplate.cloneNode(true);
  var pinImg = newPin.querySelector('img');
  newPin.style.left = announcement.location.x + 'px';
  newPin.style.top = announcement.location.y + 'px';
  pinImg.src = announcement.author.avatar;
  pinImg.alt = 'Заголовок объявления';
  return newPin;
};

// объявляем переменную для массива с объявлениями и заполняем её с помощью функции
var announcments = fillAnnouncements();

// создаём переменную куда будем записывать разметку с объявлениями
var fragment = document.createDocumentFragment();

// проходим в цикле по всем объявлениям из массива announcments
for (var k = 0; k < announcments.length; k++) {
  // формируем фрагмент с разметкой
  fragment.appendChild(renderAnnouncement(announcments[k]));
}
// выводим сформированный фрагмент с разметкой на карту
mapPins.appendChild(fragment);
// КОНЕЦ БЛОКА

// НАЧАЛО БЛОКА для активации и деактивации страницы
// функция, которая меняет аттрибут доступности для переданной в неё HTML коллекцию
// используется для активации и деактивации страницы
var changeAttribute = function (collection, status) {
  for (var i = 0; i < collection.length; i++) {
    if (status === false) {
      collection[i].disabled = true;
    } else {
      collection[i].disabled = false;
    }
  }
};

// функция, в зависимости от переданного аттрибута деактивирут или активирует страницу
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

// при загрузке деактивируем страницу
activatePage(false);
// КОНЕЦ БЛОКА

// НАЧАЛО БЛОКА, который в зависимости от выбранного типа жилья устанавливает
// соответствующий плейсхолдер в поле с ценой
var typeSelect = document.querySelector('#type');
typeSelect.addEventListener('change', function () {
  var priceInput = document.querySelector('#price');

  switch (typeSelect.value) {
    case 'bungalo':
      priceInput.placeholder = '0';
      break;
    case 'flat':
      priceInput.placeholder = '1000';
      break;
    case 'house':
      priceInput.placeholder = '5000';
      break;
    case 'palace':
      priceInput.placeholder = '10000';
      break;
  }
});
// КОНЕЦ БЛОКА

// НАЧАЛО БЛОКА, который синхронизирует заначения полей приезда и отъезда
var timeInSelect = document.querySelector('#timein');
var timeOutSelect = document.querySelector('#timeout');

var changeSelectValue = function (selectedValue, selectForChange) {
  selectForChange.value = selectedValue;
};

timeInSelect.addEventListener('change', function () {
  changeSelectValue(timeInSelect.value, timeOutSelect);
});

timeOutSelect.addEventListener('change', function () {
  changeSelectValue(timeOutSelect.value, timeInSelect);
});
// КОНЕЦ БЛОКА


// НАЧАЛО БЛОКА кода, отвечающего за перемещения пина на карте
// функция для записи координатов пина в поле с адресом
var saveLocation = function (coordX, coordY) {
  var mapPinMain = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');
  coordX = mapPinMain.offsetLeft + Math.ceil(PIN_SIZE / 2);
  coordY = mapPinMain.offsetTop + PIN_SIZE + CONST_FOR_POINTER;
  address.value = coordX + ',' + coordY;
};

var mapPinMain = document.querySelector('.map__pin--main');

mapPinMain.addEventListener('mousedown', function (evt) {

  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  // флаг нужен для того, чтобы понимать перетаскивают пин
  // или просто кликнули на него и не двигали
  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var curY = mapPinMain.offsetTop - shift.y;
    var curX = mapPinMain.offsetLeft - shift.x;

    var map = document.querySelector('.map');

    // здесь мы проверям не вынесли ли пин за границы карты
    if ((curY > LOCATION_Y_NUMBER_START) && (curY < LOCATION_Y_NUMBER_END)) {
      mapPinMain.style.top = curY + 'px';
    }

    if ((curX > 0) && (curX < map.clientWidth - PIN_SIZE)) {
      mapPinMain.style.left = curX + 'px';
    }

    // записываем значения пина в поле адрес
    saveLocation(mapPinMain.style.top, mapPinMain.style.left);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    // записываем значения пина в поле адрес
    saveLocation(mapPinMain.style.top, mapPinMain.style.left);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    // если пин двигали, тогда
    if (dragged) {
      var onClickPreventDefault = function (onClickEvt) {
        onClickEvt.preventDefault();
        mapPinMain.removeEventListener('click', onClickPreventDefault);
        // активируем страницу
        activatePage(true);
      };

      mapPinMain.addEventListener('click', onClickPreventDefault);
    }
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
// КОНЕЦ БЛОКА
