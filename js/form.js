'use strict';
(function () {
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
})();
