'use strict';
(function () {
  var MAX_ROOMS_NUMBERS = 3;
  var ONE_ROOM = '1';
  var TWO_ROOMS = '2';
  var THREE_ROOMS = '3';
  var HUNDRED_ROOMS = '100';
  var OPTION_ZERO = '0';
  var PRICE_BUNGALO = '0';
  var PRICE_FLAT = '1000';
  var PRICE_HOUSE = '5000';
  var PRICE_PALACE = '10000';

  // НАЧАЛО БЛОКА, который в зависимости от выбранного типа жилья устанавливает
  // соответствующий плейсхолдер в поле с ценой
  var typeSelect = document.querySelector('#type');
  typeSelect.addEventListener('change', function () {
    var priceInput = document.querySelector('#price');

    switch (typeSelect.value) {
      case 'bungalo':
        priceInput.placeholder = PRICE_BUNGALO;
        priceInput.min = PRICE_BUNGALO;
        break;
      case 'flat':
        priceInput.placeholder = PRICE_FLAT;
        priceInput.min = PRICE_FLAT;
        break;
      case 'house':
        priceInput.placeholder = PRICE_HOUSE;
        priceInput.min = PRICE_HOUSE;
        break;
      case 'palace':
        priceInput.placeholder = PRICE_PALACE;
        priceInput.min = PRICE_PALACE;
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
      capacity.querySelector('option[value="' + i + '"]').disabled = false;
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
  };

  roomNumber.addEventListener('change', updateCapacity);

  var form = document.querySelector('.ad-form');

  var mainBlock = document.querySelector('main');
  var msgTemplateSuccess = document.querySelector('#success').content.querySelector('.success');
  var msgTemplateError = document.querySelector('#error').content.querySelector('.error');
  var btn = msgTemplateError.querySelector('.error__button');
  mainBlock.appendChild(msgTemplateSuccess);
  mainBlock.appendChild(msgTemplateError);
  msgTemplateSuccess.style = 'display: none';
  msgTemplateError.style = 'display: none';

  var showSuccessWindow = function () {
    msgTemplateSuccess.style = 'display: block';

    var closeMessage = function () {
      msgTemplateSuccess.style = 'display: none';
    };

    var onEscPress = function (evt) {
      if (evt.keyCode === window.data.ESC) {
        closeMessage();
      }
    };

    document.addEventListener('keydown', onEscPress);
    msgTemplateSuccess.addEventListener('click', closeMessage);

  };

  var showErrorWindow = function () {
    msgTemplateError.style = 'display: block';
    var closeMessage = function () {
      msgTemplateError.style = 'display: none';
    };

    var onEscPress = function (evt) {
      if (evt.keyCode === window.data.ESC) {
        closeMessage();
      }
    };

    document.addEventListener('keydown', onEscPress);
    msgTemplateError.addEventListener('click', closeMessage);
    btn.addEventListener('click', closeMessage);
  };

  var onSuccess = function (data) {
    if (data) {
      form.reset();
      window.pin.deletePins();
      window.card.closePopup();
      window.map.pinMainToCenter();
      window.map.activatePage(false);
      showSuccessWindow();
    }
  };

  var onError = function () {
    showErrorWindow();
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.load('https://js.dump.academy/keksobooking', onSuccess, onError, 'POST', new FormData(form));
  });

  var btnReset = form.querySelector('.ad-form__reset');
  btnReset.addEventListener('click', function () {
    form.reset();
    window.pin.deletePins();
    window.card.closePopup();
    window.map.pinMainToCenter();
    window.map.activatePage(false);
  });


  window.form = {
    updateCapacity: updateCapacity
  };

})();
