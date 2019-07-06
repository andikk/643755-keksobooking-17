'use strict';
(function () {
  var MAX_ROOMS_NUMBERS = 3;
  var ONE_ROOM = '1';
  var TWO_ROOMS = '2';
  var THREE_ROOMS = '3';
  var HUNDRED_ROOMS = '100';
  var OPTION_ZERO = '0';


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

  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');


  // Функция, которая отвечает за синхронихзацию полей ввода
  // количество гостей и количество комнат
  var updateCapacity = function () {
    var option0 = capacity.querySelector('option[value="0"]');
    var option1 = capacity.querySelector('option[value="1"]');
    var option2 = capacity.querySelector('option[value="2"]');
    var option3 = capacity.querySelector('option[value="3"]');


    for (var i = 0; i <= MAX_ROOMS_NUMBERS; i++) {
      capacity.querySelector('option[value="' + i +'"]').disabled = false;
    }

    switch (roomNumber.value) {
      case ONE_ROOM:
        option0.disabled = true;
        option3.disabled = true;
        option2.disabled = true;
        capacity.value = ONE_ROOM;
        break;
      case TWO_ROOMS:
        option3.disabled = true;
        option0.disabled = true;
        capacity.value = ONE_ROOM;
        break;
      case THREE_ROOMS:
        option0.disabled = true;
        capacity.value = ONE_ROOM;
        break;
      case HUNDRED_ROOMS:
        option3.disabled = true;
        option2.disabled = true;
        option1.disabled = true;
        capacity.value = OPTION_ZERO;
    }
  }

  roomNumber.addEventListener('change', updateCapacity);

  window.form = {
    updateCapacity: updateCapacity
  }


})();
