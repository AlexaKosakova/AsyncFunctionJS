var btn;
var input;
var error;
var outputs;

function loadPage() {
  btn = document.getElementById("btn");
  input = document.getElementById("input");
  error = document.getElementById("error");
  outputs = [document.getElementById("output1"),document.getElementById("output2")];
  btn.addEventListener("click", function(event){
    outputs[0].innerHTML = "";
    outputs[1].innerHTML = "";
    error.innerHTML = "";
    ckeck();
    asyncFunction(input.value).onSuccess(successCallback).onError(errorCallback).rise();
  });
}

var objError = {
  1: {"код": 418, "сообщение": "я — чайник"},
  2: {"код": 504, "сообщение": "шлюз не отвечает"},
  3: {"код": 408, "сообщение": "истекло время ожидания"},
  4: {"код": 407, "сообщение": "необходима аутентификация прокси"},
  5: {"код": 422, "сообщение": "необрабатываемый экземпляр"},
  6: {"код": 451, "сообщение": "недоступно по юридическим причинам"},
  7: {"код": 506, "сообщение": "вариант тоже проводит согласование"},
  8: {"код": 520, "сообщение": "неизвестная ошибка"},
  9: {"код": 509, "сообщение": "исчерпана пропускная ширина канала"},
  10: {"код": 203, "сообщение": "информация не авторитетна"},
};

function ckeck(){
  input.style.backgroundColor = "";
  error.innerHTML = "";
  if (isNaN(+input.value.replace(",", "."))) {
     input.style.backgroundColor = "red";
     error.innerHTML = "Number requred";
    }
  
};
  
function successCallback(n, output){
  n *= 10;
  output.innerHTML = n;
  return n;
}; //calculation

function errorCallback(n){
  var r = (Math.floor(Math.random() * (10)) + 1);
  error.innerHTML = objError[r]["код"]+"<br/>"+objError[r]["сообщение"];
}; //error

const WAIT = 0;
const SUCCESS = 1;
const ERROR = 2;

function asyncFunction(n) {
  var status = WAIT;
  this.onSuccessCallback = null;
  this.onSuccessHandler = function() { //??????
    status = SUCCESS;
    onSuccessCallback(n); 
  };
  this.onSuccess = function(callback){
      onSuccessCallback = callback;
      return this;
  }, 
  this.onErrorCallback = null;
  this.onErrorHandler = function() { //?????
    status = ERROR;
    onErrorCallback(n); 
  };
  this.onError = function(callback){
      onErrorCallback = callback;
      return this;
  }
  this.rise =  function(i) {
    i = i ? i : 0; //если i задано, то i, если нет, то 0
    if (i<outputs.length){
      if (Math.random() < 0.7) {
        n=onSuccessCallback(n, outputs[i]);
        rise(i+1);
      } else {
        onErrorCallback(n);
      } 
    }
  }

  return this;
};

/*var odd = Math.random();
    if (odd < 0.7) {
      done
    } else {
      error
    } 
*/


