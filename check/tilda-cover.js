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