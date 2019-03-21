var input;
var error;
var outputs;

function loadPage() {
  var btn = document.getElementById("btn");
  input = document.getElementById("input");
  error = document.getElementById("error");
  outputs = [document.getElementById("output1"), document.getElementById("output2")];
  btn.addEventListener("click", function (event) {
    outputs[0].innerHTML = "";
    outputs[1].innerHTML = "";
    error.innerHTML = "";
    if (ckeck()) {
      asyncFunction(input.value).onSuccess(successCallback).onError(errorCallback);
    }
  });
};

var errorCodes = {
  1: {
    "код": 418,
    "сообщение": "я — чайник"
  },
  2: {
    "код": 504,
    "сообщение": "шлюз не отвечает"
  },
  3: {
    "код": 408,
    "сообщение": "истекло время ожидания"
  },
  4: {
    "код": 407,
    "сообщение": "необходима аутентификация прокси"
  },
  5: {
    "код": 422,
    "сообщение": "необрабатываемый экземпляр"
  },
  6: {
    "код": 451,
    "сообщение": "недоступно по юридическим причинам"
  },
  7: {
    "код": 506,
    "сообщение": "вариант тоже проводит согласование"
  },
  8: {
    "код": 520,
    "сообщение": "неизвестная ошибка"
  },
  9: {
    "код": 509,
    "сообщение": "исчерпана пропускная ширина канала"
  },
  10: {
    "код": 203,
    "сообщение": "информация не авторитетна"
  },
};

function ckeck() {
  input.style.backgroundColor = "";
  error.innerHTML = "";
  if (isNaN(+input.value.replace(",", "."))) {
    input.style.backgroundColor = "red";
    error.innerHTML = "Введите число";
    return false;
  }
  return true;
};

function successCallback(n) {
  n *= 10;
  for (var i = 0; i < outputs.length; i++) {
    if (outputs[i].innerHTML === "") {
      outputs[i].innerHTML = n;
      if (i !== outputs.length - 1) {
      asyncFunction(n).onSuccess(successCallback).onError(errorCallback);
      }
      break;
    }
  }
  return n;
};

function errorCallback() {
  var r = (Math.floor(Math.random() * (10)) + 1);
  error.innerHTML = errorCodes[r]["код"] + "<br/>" + errorCodes[r]["сообщение"];
};

function asyncFunction(n) {
  const WAIT = 0;
  const SUCCESS = 1;
  const ERROR = 2;
  var status = WAIT;

  var timer = setTimeout(function () {
    if (Math.random() < 0.7) {
      status = SUCCESS;
    } else {
      status = ERROR;
    }
  }, Math.floor(Math.random() * (200)) + 300);

  var onObj = {
    onSuccess: function (callback) {
      var timer = setInterval(function () {
        if (status != WAIT) {
          if (status === SUCCESS) {
            n = callback(n);
            console.log("Succes ");
          }
          clearInterval(timer);
        }
      }, 100);
      return this;
    },
    onError: function (callback) {
      var timer = setInterval(function () {
        if (status != WAIT) {
          if (status === ERROR) {
            callback();
            console.log("Error ");
          }
          clearInterval(timer);
        }
      }, 100);
      return this;
    }
  }
  return onObj;
};