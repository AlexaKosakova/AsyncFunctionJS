var input;
var error;
var outputs;
var res;

function loadPage() {
    var btn = document.getElementById("btn");
    input = document.getElementById("input");
    error = document.getElementById("error");
    outputs = [document.getElementById("output1"), document.getElementById("output2")];
    btn.addEventListener("click", function (event) {
        //if (!(res && res.isWaiting())) {
        outputs[0].innerHTML = "";
        outputs[1].innerHTML = "";
        error.innerHTML = "WAIT";
        if (ckeck()) {
            btn.disabled = true; //для одного нажатия кнопки START
            res = asyncFunction(input.value).onSuccess(successCallback).onError(errorCallback);
        }
        // }
    });
}

function ckeck() {
    input.style.backgroundColor = "";
    if (isNaN(+input.value.replace(",", "."))) {
        input.style.backgroundColor = "red";
        error.innerHTML = "Введите число";
        return false;
    }
    return true;
}

function successCallback(v) {
    for (var i = 0; i < outputs.length; i++) {
        if (outputs[i].innerHTML === "") {
            outputs[i].innerHTML = v;
            if (i !== outputs.length - 1) {
                res = asyncFunction(v).onSuccess(successCallback).onError(errorCallback);
            } else {
                error.innerHTML = "SUCCESS";
                btn.disabled = false;
            }
            break;
        }
    }
}

function errorCallback(message) {
    error.innerHTML = message;
    btn.disabled = false; //
};

function asyncFunction(n) {
    const WAIT = 0;
    const SUCCESS = 1;
    const ERROR = 2;
    const errorCodes = {
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
        }
    };


    var result = {
        status: WAIT,
        value: null,
        onSuccess: function (callback) {
            var i = 0;
            var timer = setInterval(function () {
                console.log("Succes!" + i++);
                if (result.status !== WAIT) {
                    if (result.status === SUCCESS) {
                        callback(result.value);
                        console.log("Succes!" + i++);
                    }
                    clearInterval(timer);
                }
            }, 100);
            return this;
        },
        onError: function (callback) {
            var i = 0;
            var timer = setInterval(function () {
                console.log("Error!" + i++);
                if (result.status !== WAIT) {
                    if (result.status === ERROR) {
                        callback(result.value);
                        console.log("Error!" + i++);
                    }
                    clearInterval(timer);
                }
            }, 100);
            return this;
        },
    };

    setTimeout(function () {
        if (Math.random() < 0.7) {
            result.value = n * 10;
            result.status = SUCCESS;
        } else {
            var r = (Math.floor(Math.random() * (10)) + 1);
            result.value = errorCodes[r]["код"] + ": " + errorCodes[r]["сообщение"];
            result.status = ERROR;
        }
    }, Math.floor(Math.random() * (2000)) + 3000);
    return result;
}