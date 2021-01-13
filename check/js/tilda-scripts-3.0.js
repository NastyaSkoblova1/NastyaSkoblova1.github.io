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


/* Turn off font-boosting */

(function ($) {
    $(document).ready(function () {
        // Turn off font boosting
        var userAgent = window.navigator.userAgent;
        var isInstagram = userAgent.indexOf('Instagram') !== -1;
        var isFacebook = userAgent.indexOf('FBAV') !== -1;
        var isYandex = userAgent.indexOf('YaSearchBrowser') !== -1;
        var isSamsung = userAgent.indexOf('SamsungBrowser') !== -1;
        var isAndroid = userAgent.indexOf('Android') !== -1;
        if (isAndroid && (isFacebook || isInstagram || isYandex || isSamsung)) {
            var textElement = document.createElement('p');
            textElement.style.lineHeight = '100px';
            textElement.style.padding = '0';
            textElement.style.margin = '0';
            textElement.style.height = 'auto';
            textElement.style.position = 'absolute';
            textElement.style.opacity = '0.001';
            textElement.innerText = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            document.body.appendChild(textElement);
            var factor = 100 / textElement.getBoundingClientRect().height;
            textElement.parentNode.removeChild(textElement);

            if (factor < 0.98) {
                $('body').append('<style>.t396 [data-elem-type="text"] .tn-atom {zoom: ' + factor * 100 + '%;}</style>');
            }
        }
    });
})(jQuery);



/* Tilda label */

(function ($) {
    $(document).ready(function () {
        setTimeout(function () {
            if ((!$('#tildacopy').length && !$('.t-tildalabel').length) || !$('.t-tildalabel div').length) {
                $("body").contents().filter(function () {
                    return this.nodeType == 8;
                }).each(function (i, e) {
                    if (e.nodeValue.indexOf('\'t remove this l') !== -1) {
                        $('#allrecords').after('<div class="t-tildalabel t-tildalabel-free"><div class="t-tildalabel-free__main"><a href="https://tilda.cc" target="_blank" style="padding-bottom:12px; display: block;"><img style="width:40px;" src="https://static.tildacdn.com/img/tildacopy.png"></a><div style="padding-bottom: 15px;">This site was made on <a href="https://tilda.cc" target="_blank" style="text-decoration: none; color:inherit;">Tilda — a website builder</a> that helps to&nbsp;create a&nbsp;website without any code</div><a href="https://tilda.cc/registration/" target="_blank" style="display: inline-block; padding: 10px 20px; font-size: 13px; border-radius: 50px; background-color: #fa8669; color: #fff; text-decoration: none;">Create a website</a></div><div class="t-tildalabel-free__links-wr"><a class="t-tildalabel-free__txt-link" href="http://help' + (window.browserLang === 'RU' ? '-ru' : '') + '.tilda.ws/white-label" target="_blank">' + (window.browserLang === 'RU' ? 'Как удалить этот лейбл' : 'How to remove this block') + '?</a></div></div>');
                    }
                });
            } else {
                if (!($('body').height() + 70 < $(window).height())) {
                    $('.t-tildalabel').attr('style', 'display: block !important; visibility: visible !important; position: relative !important; width: 100% !important; pointer-events: all !important; opacity: 1 !important');
                }
            }
        }, 500);
    });
})(jQuery);



/* Анимация появления */

(function ($) {
    $(document).ready(function () {
        if (window.isMobile == false && $('#allrecords').attr('data-blocks-animationoff') !== 'yes' && window.isSearchBot == false) {
            $('.r').each(function (i) {
                if ($(this).attr('style') && $(this).attr('style').indexOf('background-color') !== -1) {
                    $(this).attr('data-animationappear', 'off');
                }
            });
            /*add animation*/
            var tiles = $('.r').not('[data-animationappear=off], [data-screen-min], [data-screen-max]'),
                wnd = $(window);
            tiles.each(function (i) {
                a = $(this).offset().top;
                b = wnd.scrollTop() + wnd.height() + 300;
                if (a > 1000 && a > b) {
                    /* $(this).fadeTo(0,0); */
                    $(this).addClass('r_hidden');
                } else {
                    $(this).addClass('r_showed');
                }
                $(this).addClass('r_anim');
            });
            function blocksfade() {
                if (tiles.length) {
                    for (var i = tiles.length - 1, tile, a, b; i >= 0; i--) {
                        tile = $(tiles[i]);
                        a = tile.offset().top;
                        if (tile.outerHeight() <= 100) {
                            b = wnd.scrollTop() + wnd.height();
                        } else {
                            b = wnd.scrollTop() + wnd.height() - 100;
                        }
                        if (a < b) {
                            /*tile.fadeTo(500, 1, function() {});*/
                            tile.removeClass('r_hidden');
                            tile.addClass('r_showed');
                            tiles.splice(i, 1);
                        }
                    }
                }
            }
            wnd.bind('scroll', t_throttle(blocksfade, 200));
            blocksfade();
        }
        if ($('html').css('display') === 'none') {
            $('html').css('display', 'block');
        }
        if ($('body').height() + 70 < $(window).height()) {
            $('.t-tildalabel').css('display', 'none');
        } else {
            $('.t-tildalabel').attr('style', 'display: block !important');
        }
    });
})(jQuery);



/* Под вопросом. Зачем нужны window.winWidth и window.winHeight.
   Блоки скрываются через css. Без этой функции вроде всё так же работает.
*/

(function ($) {
    function setWindowVars() {
        var wnd = $(window);
        window.winWidth = wnd.width();
        window.winHeight = wnd.height();
    }

    function blocksdisplay() {
        var window_width = $(window).width();
        var recs = $('div.r[data-screen-max], div.r[data-screen-min]');
        var max, min;
        var disp;
        recs.each(function (i) {
            if ($(this).attr('data-connect-with-tab') === 'yes') return;

            disp = $(this).css('display');
            max = $(this).attr('data-screen-max');
            if (max === undefined) {
                max = 10000;
            }
            max = parseInt(max);
            
            min = $(this).attr('data-screen-min');
            if (min === undefined) {
                min = 0;
            }
            min = parseInt(min);
            /* console.log(min+"-"+max); */
            if (min <= max) {
                if (window_width <= max && window_width > min) {
                    if (disp != 'block') {
                        $(this).css('display', 'block');
                    }
                } else {
                    if (disp != 'none') {
                        $(this).css('display', 'none');
                    }
                }
            }
        });
    }

    $(document).ready(function () {
        setWindowVars();
        blocksdisplay();
        $(window).bind('resize', t_throttle(setWindowVars, 200));
        $(window).bind('resize', t_throttle(blocksdisplay, 200));
    });

    /*
	$(window).resize(function() {
		blocksdisplay();
	});
	*/
})(jQuery);


/* ??? */

(function ($) {
    /**
     * Global object that implements the event model.
     * The essence of it is that he is one and is global, it all podpisyvayutsya
     * Amity and ask him the same way
     * (Instead of each object was emitterom = /)
     *constructor
     *version 0.0.1
     */
    function Observer() {
        this.callbacks = {};
    }

    Observer.prototype.defaultConfig = {
        single: false,
        context: null,
    };

    Observer.prototype.addEventListener = function (name, callback, config) {
        evtCallbacks = this._getEventCallbacks(name);
        if (!evtCallbacks) {
            evtCallbacks = this.callbacks[name] = [];
        }

        evtCallbacks.push({
            callback: callback,
            config: typeof config == 'object' ? config : this.defaultConfig,
        });
    };

    Observer.prototype._getEventCallbacks = function (name) {
        return this.callbacks[name];
    };

    Observer.prototype.removeEventListener = function (name, callback) {
        var cbs = this._getEventCallbacks(name);
        if (!cbs) {
            return false;
        }

        for (var i = 0, l = cbs.length, cbObj; i < l; i++) {
            cbObj = cbs[i];
            if (callback === cbObj.callback) {
                cbs.splice(i, 1);
                return true;
            }
        }
        return false;
    };

    Observer.prototype.emitEvent = function (name, data) {
        var cbs = [];
        extend(cbs, this._getEventCallbacks(name));
        for (var i = 0, l = cbs.length, cbObj, cb, config; i < l; i++) {
            cbObj = cbs[i];
            cb = cbObj.callback;
            config = cbObj.config;
            if (config.context) {
                cb.call(config.context, data);
            } else {
                cb(data);
            }

            if (config.single) {
                this.removeEventListener(name, cb);
            }
        }
    };

    window.observer = new Observer();
})(jQuery);


/* Определение высоты для обложек и остальных блоков в мобильной версии, 
   уменьшение шрифта и отслеживание неоптимизированных для мобильной версии блоков
*/

(function ($) {
    if (window.isMobile == true) {
        var correctHeight = function () {
            /* covers */
            var coverCarries = document.body.querySelectorAll('.t-cover__carrier');
            var viewPortHeight = $(window).height();
            var factor = 0;
            for (var i = 0, l = coverCarries.length, cc, ccStyle, newHeight, parent, opacityLayer, textBox; i < l; i++) {
                cc = coverCarries[i];
                ccStyle = cc.style;
                if (ccStyle.height.indexOf('vh') > -1) {
                    factor = parseInt(ccStyle.height, 10) / 100;
                    newHeight = Math.round(viewPortHeight * factor) + 'px';
                    parent = $(cc).parent('.t-cover');
                    if (parent && (parent = parent[0])) {
                        opacityLayer = parent.querySelector('.t-cover__filter');
                        textBox = parent.querySelector('.t-cover__wrapper');
                        if (opacityLayer) {
                            opacityLayer.style.height = newHeight;
                        }
                        if (textBox) {
                            textBox.style.height = newHeight;
                        }
                        ccStyle.height = parent.style.height = newHeight;
                    }
                }
            }
            /* others */
            var elCarries = document.body.querySelectorAll('[data-height-correct-vh]');
            viewPortHeight = $(window).height();
            factor = 0;
            for (var i = 0, l = elCarries.length, cc, ccStyle, newHeight, parent, opacityLayer, textBox; i < l; i++) {
                cc = elCarries[i];
                ccStyle = cc.style;
                if (ccStyle.height.indexOf('vh') > -1) {
                    factor = parseInt(ccStyle.height) / 100;
                    newHeight = viewPortHeight + 'px';
                    parent = $(cc).parent('.t-cover');
                    ccStyle.height = newHeight;
                }
            }
        };
        $(document).ready(function () {
            setTimeout(function () {
                correctHeight();
            }, 400);
        });
        $(window).load(function () {
            setTimeout(function () {
                correctHeight();
            }, 400);
        });

        if ($(window).width() < 480) {
            $(document).ready(function () {
                $('div[data-customstyle=yes]').each(function (index) {
                    if ($(this).css('font-size').replace('px', '') > 26) {
                        $(this).css('font-size', '');
                        $(this).css('line-height', '');
                    }
                });
                $('[field]')
                    .find('span')
                    .each(function (index) {
                        if ($(this).css('font-size').replace('px', '') > 26) {
                            $(this).css('font-size', '');
                        }
                    });
                var sta;
                $('.t-title, .t-name, .t-heading, .t-descr, .t-text, .t-subtitle')
                    .not('.tn-elem, .tn-atom, [data-auto-correct-line-height=false]')
                    .each(function () {
                        sta = $(this).attr('style');
                        if (typeof sta != 'undefined' && sta != '' && sta.indexOf('font-size') > -1) {
                            if ($(this).css('font-size').replace('px', '') > 26) {
                                var newsta = sta.replace('font-size', 'fontsize').replace('line-height', 'lineheight');
                                $(this).attr('style', newsta);
                            }
                        }
                    });
            });

            $(window).load(function () {
                var window_width = $(window).width();
                $('.r:visible').each(function () {
                    var el = $(this);
                    $(this)
                        .find('div')
                        .not(
                            '[data-auto-correct-mobile-width=false], .tn-elem, .tn-atom, .tn-atom__sbs-anim-wrapper, .tn-atom__prx-wrapper, .tn-atom__videoiframe, .tn-atom .t-form *, .tn-atom__sticky-wrapper, .t-store__relevants__container, .t-slds__items-wrapper, .js-product-controls-wrapper, .js-product-edition-option, .t-product__option-variants'
                        )
                        .each(function () {
                            var r_div_width = parseInt($(this).outerWidth(true));
                            if (r_div_width > window_width) {
                                if ($(this).is('[data-customstyle="yes"]')) {
                                    if ($(this).parent().is('[data-auto-correct-mobile-width=false]')) {
                                        return;
                                    }
                                }

                                console.log('Block not optimized for mobile width. Block width:' + r_div_width + ' Block id:' + el.attr('id'));
                                console.log($(this));
                                el.css('overflow', 'auto');
                                if (r_div_width - 3 > window_width) {
                                    el.css('word-break', 'break-all');
                                }
                            }
                        });
                });
            });
        } else if ($(window).width() < 900) {
            $(document).ready(function () {
                $('div[data-customstyle=yes]').each(function (index) {
                    if ($(this).css('font-size').replace('px', '') > 30) {
                        $(this).css('font-size', '');
                        $(this).css('line-height', '');
                    }
                });
                $('[field]')
                    .find('span')
                    .each(function (index) {
                        if ($(this).css('font-size').replace('px', '') > 30) {
                            $(this).css('font-size', '');
                        }
                    });
                var sta;
                $('.t-title, .t-name, .t-heading, .t-descr, .t-text, .t-subtitle')
                    .not('.tn-elem, .tn-atom')
                    .each(function (index) {
                        sta = $(this).attr('style');
                        if (typeof sta != 'undefined' && sta != '' && sta.indexOf('font-size') > -1) {
                            if ($(this).css('font-size').replace('px', '') > 30) {
                                var newsta = sta.replace('font-size', 'fontsize').replace('line-height', 'lineheight');
                                $(this).attr('style', newsta);
                            }
                        }
                    });
            });
        }
    }
})(jQuery);



