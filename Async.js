var btn;
var input;
var error;
var outputs;

function loadPage() {
  btn = document.getElementById("btn");
  input = document.getElementById("input");
  error = document.getElementById("error");
  outputs = [document.getElementById("output1"), document.getElementById("output2")];
  btn.addEventListener("click", function (event) {
    outputs[0].innerHTML = "";
    outputs[1].innerHTML = "";
    error.innerHTML = "";
    ckeck();
    asyncFunction(input.value).onSuccess(successCallback).onError(errorCallback);
  });
};

var objError = {
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
    error.innerHTML = "Number requred";
  }
};

function successCallback(n, j) {
  n *= 10;
  outputs[j].innerHTML = n;
  return n;
};

function errorCallback() {
  var r = (Math.floor(Math.random() * (10)) + 1);
  error.innerHTML = objError[r]["код"] + "<br/>" + objError[r]["сообщение"];
};

function asyncFunction(n) {
  const WAIT = 0;
  const SUCCESS = 1;
  const ERROR = 2;
  var statuses = [];
  for (i = 0; i < outputs.length; i++) {
    statuses.push("WAIT");
}
  
  var timer = setTimeout(function () {
    for (i = 0; i < statuses.length; i++) {
      if (Math.random() < 0.7) {
        statuses[i] = SUCCESS;
      } else {
        statuses[i] = ERROR;
        for (l = i + 1; l < statuses.length; l++) {
          statuses[l] = WAIT;
        }
        break;
      }
    }
  }, Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000);

  var onObj = {
    onSuccess: function (callback) {
      var timer = setInterval(function () {
        if (statuses[0] != WAIT) {
          for (i = 0; i < statuses.length; i++) {
            if (statuses[i] === SUCCESS) {
              n = callback(n, i);
              console.log("Succes " + i);
              clearInterval(timer);
            }
          }
        }
      }, 500);
      return this;
    },
    onError: function (callback) {
      var timer = setInterval(function () {
        if (statuses[0] != WAIT) {
          for (i = 0; i < statuses.length; i++) {
            if (statuses[i] === ERROR) {
              callback();
              console.log("Error" + i);
              clearInterval(timer);
              break;
            }
          }
        }
      }, 500);
      //onErrorCallback();
      return this;
    }
  }
  return onObj;
};