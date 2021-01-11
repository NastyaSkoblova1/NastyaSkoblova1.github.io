/* Объявление глобальных переменных */

window.isSearchBot = false;
if (/Bot/i.test(navigator.userAgent)) {
    window.isSearchBot = true;
}

window.isMobile = false;
window.$isMobile = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    window.isMobile = true;
    window.$isMobile = true;
}

window.isiOS = false;
if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    window.isiOS = true;
}

window.isiOSVersion = '';
if(window.isiOS) {
    var version = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
    if (version !== null) {
        window.isiOSVersion = [parseInt(version[1], 10), parseInt(version[2], 10), parseInt(version[3] || 0, 10)];
    }
}

window.browserLang = (window.navigator.userLanguage || window.navigator.language).toUpperCase().slice(0, 2);
window.tildaBrowserLang = window.browserLang;

/* ******** */


/* Служебные функции */

function t_throttle(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last, deferTimer;
    return function () {
        var context = scope || this;

        var now = +new Date(),
            args = arguments;
        if (last && now < last + threshhold) {
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                last = now;
                fn.apply(context, args);
            }, threshhold);
        } else {
            last = now;
            fn.apply(context, args);
        }
    };
}

function t_onFuncLoad(funcName, okFunc, time) {
    if (typeof window[funcName] === 'function') {
        okFunc();
    } else {
        var timerId = setTimeout(function checkFuncExist() {
            if (typeof window[funcName] === 'function') {
                okFunc();
                return;
            }
            timerId = setTimeout(checkFuncExist, time || 100);
        });
    }
}

/* ******** */