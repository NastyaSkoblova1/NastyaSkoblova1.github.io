function t746_initPopup(recid) {
    $('#rec' + recid).attr('data-animationappear', 'off');
    $('#rec' + recid).css('opacity', '1');
    var el = $('#rec' + recid);
    var popup = el.find('.t-popup');
    var iframeBody = el.find('.t746__frame');
    var hook = popup.attr('data-tooltip-hook');
    var analitics = popup.attr('data-track-popup');

    t746_imageHeight(recid);
    t746_arrowWidth(recid);
    t746_show(recid);
    t746_hide(recid);

    $(window).bind('resize', t_throttle(function () {
        t746_arrowWidth(recid);
    }, 200));

    $(window).on("orientationchange", function (event) {
        setTimeout(function () {
            t_onFuncLoad('t_slds_updateSlider', function () {
                t_slds_updateSlider(recid);
            });
        }, 500);
    });

    if (hook !== '') {
        t_onFuncLoad('t_sldsInit', function () {
            t_sldsInit(recid);
        });

        popup.click(function (e) {
            if (e.target == this) {
                iframeBody.html('').css('z-index', '');
                t746_closePopup(recid);
            }
        });
    
        el.find('.t-popup__close').click(function (e) {
            iframeBody.html('').css('z-index', '');
            t746_closePopup(recid);
        });
    
        $(document).keydown(function (e) {
            if (e.keyCode == 27) {
                t746_closePopup(recid);
                iframeBody.html('').css('z-index', '');
            }
        });

        $('.r').on('click', 'a[href="' + hook + '"]', function (e) {
            t746_showPopup(recid);
            t_onFuncLoad('t_slds_updateSlider', function () {
                t_slds_updateSlider(recid);
            });
            t746_arrowWidth(recid);
            t746_resizePopup(recid);
            e.preventDefault();
            if (window.lazy == 'y') {
                t_lazyload_update();
            }
            if (analitics > '') {
                var virtTitle = hook;
                if (virtTitle.substring(0, 7) == '#popup:') {
                    virtTitle = virtTitle.substring(7);
                }
                Tilda.sendEventToStatistics(analitics, virtTitle);
            }
        });
    }
}

function t746_showPopup(recid) {
    var el = $('#rec' + recid);
    var popup = el.find('.t-popup');
    var iframeBody = el.find('.t746__frame');

    popup.css('display', 'block');

    setTimeout(function () {
        popup.find('.t-popup__container').addClass('t-popup__container-animated');
        popup.addClass('t-popup_show');
    }, 50);

    $('body').addClass('t-body_popupshowed');
}

function t746_closePopup(recid) {
    $('body').removeClass('t-body_popupshowed');
    $('#rec' + recid + ' .t-popup').removeClass('t-popup_show');
    setTimeout(function () {
        $('.t-popup').not('.t-popup_show').css('display', 'none');
    }, 300);
}

function t746_resizePopup(recid) {
    var el = $("#rec" + recid),
        div = el.find(".t-popup__container").height(),
        win = $(window).height(),
        popup = el.find(".t-popup__container");
    if (div > win) {
        popup.addClass('t-popup__container-static');
    } else {
        popup.removeClass('t-popup__container-static');
    }
}
/* deprecated */
function t746_sendPopupEventToStatistics(popupname) {
    var virtPage = '/tilda/popup/';
    var virtTitle = 'Popup: ';
    if (popupname.substring(0, 7) == '#popup:') {
        popupname = popupname.substring(7);
    }

    virtPage += popupname;
    virtTitle += popupname;

    if (ga) {
        if (window.mainTracker != 'tilda') {
            ga('send', {
                'hitType': 'pageview',
                'page': virtPage,
                'title': virtTitle
            });
        }
    }

    if (window.mainMetrika > '' && window[window.mainMetrika]) {
        window[window.mainMetrika].hit(virtPage, {
            title: virtTitle,
            referer: window.location.href
        });
    }
}

function t746_show(recid) {
    var el = $("#rec" + recid),
        play = el.find('.t746__play');
    play.click(function () {
        if ($(this).attr('data-slider-video-type') == 'youtube') {
            var url = $(this).attr('data-slider-video-url');
            $(this).next().html("<iframe class=\"t746__iframe\" width=\"100%\" height=\"100%\" src=\"https://www.youtube.com/embed/" + url + "?autoplay=1\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>");
        }
        if ($(this).attr('data-slider-video-type') == 'vimeo') {
            var url = $(this).attr('data-slider-video-url');
            $(this).next().html("<iframe class=\"t746__iframe\" width=\"100%\" height=\"100%\" src=\"https://player.vimeo.com/video/" + url + "?autoplay=1\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>");
        }
        $(this).next().css('z-index', '3');
    });
}

function t746_hide(recid) {
    var el = $("#rec" + recid),
        body = el.find('.t746__frame');
    el.on('updateSlider', function () {
        body.html('').css('z-index', '');
    });
}

function t746_imageHeight(recid) {
    var el = $("#rec" + recid);
    var image = el.find(".t746__separator");
    image.each(function () {
        var width = $(this).attr("data-slider-image-width");
        var height = $(this).attr("data-slider-image-height");
        var ratio = height / width;
        var padding = ratio * 100;
        $(this).css("padding-bottom", padding + "%");
    });
}

function t746_arrowWidth(recid) {
    var el = $("#rec" + recid),
        arrow = el.find('.t-slds__arrow_wrapper'),
        slideWidth = el.find('.t-slds__wrapper').width(),
        windowWidth = $(window).width(),
        arrowWidth = windowWidth - slideWidth;
    if (windowWidth > 960 && arrow.parents('.t-slds__arrow_container').hasClass('t-slds__arrow-nearpic')) {
        arrow.css('width', arrowWidth / 2);
    } else {
        arrow.css('width', '');
    }
}
