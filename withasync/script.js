function t142_checkSize(recid) {
    var el = $("#rec" + recid).find(".t142__submit");
    if (el.length) {
        var btnheight = el.height() + 5;
        var textheight = el[0].scrollHeight;
        if (btnheight < textheight) {
            var btntext = el.text();
            el.addClass("t142__submit-overflowed")
        }
    }
}

function t228__init(recid) {
    var el = $('#rec' + recid);
    var mobile = el.find('.t228__mobile');
    var fixedBlock = mobile.css('position') === 'fixed' && mobile.css('display') === 'block';
    setTimeout(function () {
        el.find('.t-menu__link-item:not(.t-menusub__target-link):not(.tooltipstered):not(.t794__tm-link)').on('click', function () {
            if ($(this).is(".t-menu__link-item.tooltipstered, .t-menu__link-item.t-menusub__target-link, .t-menu__link-item.t794__tm-link")) {
                return
            }
            if (fixedBlock) {
                mobile.trigger('click')
            }
        });
        el.find('.t-menusub__link-item').on('click', function () {
            if (fixedBlock) {
                mobile.trigger('click')
            }
        });
        el.find('.t228__right_buttons_but .t-btn').on('click', function () {
            if (fixedBlock) {
                mobile.trigger('click')
            }
        })
    }, 500)
}

function t228_highlight() {
    var url = window.location.href;
    var pathname = window.location.pathname;
    if (url.substr(url.length - 1) == "/") {
        url = url.slice(0, -1)
    }
    if (pathname.substr(pathname.length - 1) == "/") {
        pathname = pathname.slice(0, -1)
    }
    if (pathname.charAt(0) == "/") {
        pathname = pathname.slice(1)
    }
    if (pathname == "") {
        pathname = "/"
    }
    $(".t228__list_item a[href='" + url + "']").addClass("t-active");
    $(".t228__list_item a[href='" + url + "/']").addClass("t-active");
    $(".t228__list_item a[href='" + pathname + "']").addClass("t-active");
    $(".t228__list_item a[href='/" + pathname + "']").addClass("t-active");
    $(".t228__list_item a[href='" + pathname + "/']").addClass("t-active");
    $(".t228__list_item a[href='/" + pathname + "/']").addClass("t-active")
}

function t228_checkAnchorLinks(recid) {
    var el = $('#rec' + recid);
    if ($(window).width() > 980) {
        var t228_navLinks = el.find(".t228__list_item a:not(.tooltipstered)[href*='#']");
        if (t228_navLinks.length > 0) {
            setTimeout(function () {
                t228_catchScroll(t228_navLinks)
            }, 500)
        }
    }
}

function t228_catchScroll(t228_navLinks) {
    var t228_clickedSectionId = null,
        t228_sections = [],
        t228_sectionIdTonavigationLink = [],
        t228_interval = 100,
        t228_lastCall, t228_timeoutId;
    t228_navLinks = $(t228_navLinks.get().reverse());
    t228_navLinks.each(function () {
        var t228_cursection = t228_getSectionByHref($(this));
        if (typeof t228_cursection.attr("id") != "undefined") {
            t228_sections.push(t228_cursection)
        }
        t228_sectionIdTonavigationLink[t228_cursection.attr("id")] = $(this)
    });
    t228_updateSectionsOffsets(t228_sections);
    t228_sections.sort(function (a, b) {
        return b.attr("data-offset-top") - a.attr("data-offset-top")
    });
    $(window).bind('resize', t_throttle(function () {
        t228_updateSectionsOffsets(t228_sections)
    }, 200));
    $('.t228').bind('displayChanged', function () {
        t228_updateSectionsOffsets(t228_sections)
    });
    t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId);
    t228_navLinks.click(function () {
        var clickedSection = t228_getSectionByHref($(this));
        if (!$(this).hasClass("tooltipstered") && typeof clickedSection.attr("id") != "undefined") {
            t228_navLinks.removeClass('t-active');
            $(this).addClass('t-active');
            t228_clickedSectionId = t228_getSectionByHref($(this)).attr("id")
        }
    });
    $(window).scroll(function () {
        var t228_now = new Date().getTime();
        if (t228_lastCall && t228_now < (t228_lastCall + t228_interval)) {
            clearTimeout(t228_timeoutId);
            t228_timeoutId = setTimeout(function () {
                t228_lastCall = t228_now;
                t228_clickedSectionId = t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId)
            }, t228_interval - (t228_now - t228_lastCall))
        } else {
            t228_lastCall = t228_now;
            t228_clickedSectionId = t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId)
        }
    })
}

function t228_updateSectionsOffsets(sections) {
    $(sections).each(function () {
        var t228_curSection = $(this);
        t228_curSection.attr("data-offset-top", t228_curSection.offset().top)
    })
}

function t228_getSectionByHref(curlink) {
    var curLinkValue = curlink.attr('href').replace(/\s+/g, '').replace(/.*#/, '');
    if (curlink.is('[href*="#rec"]')) {
        return $(".r[id='" + curLinkValue + "']")
    } else {
        return $(".r[data-record-type='215']").has("a[name='" + curLinkValue + "']")
    }
}

function t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId) {
    var t228_scrollPosition = $(window).scrollTop();
    var t228_valueToReturn = t228_clickedSectionId;
    if (t228_sections.length !== 0 && t228_clickedSectionId === null && t228_sections[t228_sections.length - 1].attr("data-offset-top") > (t228_scrollPosition + 300)) {
        t228_navLinks.removeClass('t-active');
        return null
    }
    $(t228_sections).each(function (e) {
        var t228_curSection = $(this),
            t228_sectionTop = t228_curSection.attr("data-offset-top"),
            t228_id = t228_curSection.attr('id'),
            t228_navLink = t228_sectionIdTonavigationLink[t228_id];
        if (((t228_scrollPosition + 300) >= t228_sectionTop) || (t228_sections[0].attr("id") == t228_id && t228_scrollPosition >= $(document).height() - $(window).height())) {
            if (t228_clickedSectionId == null && !t228_navLink.hasClass('t-active')) {
                t228_navLinks.removeClass('t-active');
                t228_navLink.addClass('t-active');
                t228_valueToReturn = null
            } else {
                if (t228_clickedSectionId != null && t228_id == t228_clickedSectionId) {
                    t228_valueToReturn = null
                }
            }
            return !1
        }
    });
    return t228_valueToReturn
}

function t228_setWidth(recid) {
    var el = $('#rec' + recid);
    if ($(window).width() > 980) {
        el.find(".t228").each(function () {
            var el = $(this);
            var left_exist = el.find('.t228__leftcontainer').length;
            var left_w = el.find('.t228__leftcontainer').outerWidth(!0);
            var max_w = left_w;
            var right_exist = el.find('.t228__rightcontainer').length;
            var right_w = el.find('.t228__rightcontainer').outerWidth(!0);
            var items_align = el.attr('data-menu-items-align');
            if (left_w < right_w) max_w = right_w;
            max_w = Math.ceil(max_w);
            var center_w = 0;
            el.find('.t228__centercontainer').find('li').each(function () {
                center_w += $(this).outerWidth(!0)
            });
            var padd_w = 40;
            var maincontainer_width = el.find(".t228__maincontainer").outerWidth();
            if (maincontainer_width - max_w * 2 - padd_w * 2 > center_w + 20) {
                if (items_align == "center" || typeof items_align === "undefined") {
                    el.find(".t228__leftside").css("min-width", max_w + "px");
                    el.find(".t228__rightside").css("min-width", max_w + "px");
                    el.find(".t228__list").removeClass("t228__list_hidden")
                }
            } else {
                el.find(".t228__leftside").css("min-width", "");
                el.find(".t228__rightside").css("min-width", "")
            }
        })
    }
}

function t228_setBg(recid) {
    var el = $('#rec' + recid);
    if ($(window).width() > 980) {
        el.find(".t228").each(function () {
            var el = $(this);
            if (el.attr('data-bgcolor-setbyscript') == "yes") {
                var bgcolor = el.attr("data-bgcolor-rgba");
                el.css("background-color", bgcolor)
            }
        })
    } else {
        el.find(".t228").each(function () {
            var el = $(this);
            var bgcolor = el.attr("data-bgcolor-hex");
            el.css("background-color", bgcolor);
            el.attr("data-bgcolor-setbyscript", "yes")
        })
    }
}

function t228_appearMenu(recid) {
    var el = $('#rec' + recid);
    if ($(window).width() > 980) {
        el.find(".t228").each(function () {
            var el = $(this);
            var appearoffset = el.attr("data-appearoffset");
            if (appearoffset != "") {
                if (appearoffset.indexOf('vh') > -1) {
                    appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)))
                }
                appearoffset = parseInt(appearoffset, 10);
                if ($(window).scrollTop() >= appearoffset) {
                    if (el.css('visibility') == 'hidden') {
                        el.finish();
                        el.css("top", "-50px");
                        el.css("visibility", "visible");
                        var topoffset = el.data('top-offset');
                        if (topoffset && parseInt(topoffset) > 0) {
                            el.animate({
                                "opacity": "1",
                                "top": topoffset + "px"
                            }, 200, function () {})
                        } else {
                            el.animate({
                                "opacity": "1",
                                "top": "0px"
                            }, 200, function () {})
                        }
                    }
                } else {
                    el.stop();
                    el.css("visibility", "hidden");
                    el.css("opacity", "0")
                }
            }
        })
    }
}

function t228_changebgopacitymenu(recid) {
    var el = $('#rec' + recid);
    if ($(window).width() > 980) {
        el.find(".t228").each(function () {
            var el = $(this);
            var bgcolor = el.attr("data-bgcolor-rgba");
            var bgcolor_afterscroll = el.attr("data-bgcolor-rgba-afterscroll");
            var bgopacityone = el.attr("data-bgopacity");
            var bgopacitytwo = el.attr("data-bgopacity-two");
            var menushadow = el.attr("data-menushadow");
            if (menushadow == '100') {
                var menushadowvalue = menushadow
            } else {
                var menushadowvalue = '0.' + menushadow
            }
            if ($(window).scrollTop() > 20) {
                el.css("background-color", bgcolor_afterscroll);
                if (bgopacitytwo == '0' || (typeof menushadow == "undefined" && menushadow == !1)) {
                    el.css("box-shadow", "none")
                } else {
                    el.css("box-shadow", "0px 1px 3px rgba(0,0,0," + menushadowvalue + ")")
                }
            } else {
                el.css("background-color", bgcolor);
                if (bgopacityone == '0.0' || (typeof menushadow == "undefined" && menushadow == !1)) {
                    el.css("box-shadow", "none")
                } else {
                    el.css("box-shadow", "0px 1px 3px rgba(0,0,0," + menushadowvalue + ")")
                }
            }
        })
    }
}

function t228_createMobileMenu(recid) {
    var el = $("#rec" + recid);
    var menu = el.find(".t228");
    var burger = el.find(".t228__mobile");
    burger.on('click', function (e) {
        menu.fadeToggle(300);
        burger.toggleClass("t228_opened")
    });
    $(window).bind('resize', t_throttle(function () {
        if ($(window).width() > 980) {
            menu.fadeIn(0)
        }
    }))
}

function t270_scroll(hash, offset, speed) {
    var $root = $('html, body');
    var target = "";
    if (speed === undefined) {
        speed = 500
    }
    try {
        target = $(hash)
    } catch (event) {
        console.log("Exception t270: " + event.message);
        return !0
    }
    if (target.length === 0) {
        target = $('a[name="' + hash.substr(1) + '"]');
        if (target.length === 0) {
            return !0
        }
    }
    $root.animate({
        scrollTop: target.offset().top - offset
    }, speed, function () {
        if (history.pushState) {
            history.pushState(null, null, hash)
        } else {
            window.location.hash = hash
        }
    });
    return !0
}

function t268_init(recid) {
    var el = $("#rec" + recid);
    el.find(".t268__col-left").css({
        'height': (el.find(".t268__col-right").height() + 'px')
    });
    $(window).resize(function () {
        el.find(".t268__col-left").css({
            'height': (el.find(".t268__col-right").height() + 'px')
        })
    })
}

function t282_showMenu(recid) {
    var el = $("#rec" + recid);
    el.find('.t282__burger, .t282__menu__item:not(".tooltipstered"):not(".t282__menu__item_submenu"), .t282__overlay').click(function () {
        if ($(this).is(".t282__menu__item.tooltipstered, .t794__tm-link")) {
            return
        }
        $('body').toggleClass('t282_opened');
        el.find('.t282__menu__container, .t282__overlay').toggleClass('t282__closed');
        el.find(".t282__menu__container").css({
            'top': (el.find(".t282__container").height() + 'px')
        })
    });
    $('.t282').bind('clickedAnchorInTooltipMenu', function () {
        $('body').removeClass('t282_opened');
        $('#rec' + recid + ' .t282__menu__container, #rec' + recid + ' .t282__overlay').addClass('t282__closed')
    });
    if (el.find('.t-menusub__link-item')) {
        el.find('.t-menusub__link-item').on('click', function () {
            $('body').removeClass('t282_opened');
            $('#rec' + recid + ' .t282__menu__container, #rec' + recid + ' .t282__overlay').addClass('t282__closed')
        })
    }
}

function t282_changeSize(recid) {
    var el = $("#rec" + recid);
    var bottomheight = el.find(".t282__menu__container");
    var headerheight = el.find(".t282__container");
    var menu = bottomheight.height() + headerheight.height();
    var win = $(window).height();
    if (menu > win) {
        $("#nav" + recid).addClass('t282__menu_static')
    } else {
        $("#nav" + recid).removeClass('t282__menu_static')
    }
}

function t282_changeBgOpacityMenu(recid) {
    var window_width = $(window).width();
    var record = $("#rec" + recid);
    record.find(".t282__container__bg").each(function () {
        var el = $(this);
        var bgcolor = el.attr("data-bgcolor-rgba");
        var bgcolor_afterscroll = el.attr("data-bgcolor-rgba-afterscroll");
        var bgopacity = el.attr("data-bgopacity");
        var bgopacity_afterscroll = el.attr("data-bgopacity2");
        var menu_shadow = el.attr("data-menu-shadow");
        if ($(window).scrollTop() > 20) {
            el.css("background-color", bgcolor_afterscroll);
            if (bgopacity_afterscroll != "0" && bgopacity_afterscroll != "0.0") {
                el.css('box-shadow', menu_shadow)
            } else {
                el.css('box-shadow', 'none')
            }
        } else {
            el.css("background-color", bgcolor);
            if (bgopacity != "0" && bgopacity != "0.0") {
                el.css('box-shadow', menu_shadow)
            } else {
                el.css('box-shadow', 'none')
            }
        }
    })
}

function t282_highlight(recid) {
    var url = window.location.href;
    var pathname = window.location.pathname;
    if (url.substr(url.length - 1) == "/") {
        url = url.slice(0, -1)
    }
    if (pathname.substr(pathname.length - 1) == "/") {
        pathname = pathname.slice(0, -1)
    }
    if (pathname.charAt(0) == "/") {
        pathname = pathname.slice(1)
    }
    if (pathname == "") {
        pathname = "/"
    }
    $(".t282__menu a[href='" + url + "']").addClass("t-active");
    $(".t282__menu a[href='" + url + "/']").addClass("t-active");
    $(".t282__menu a[href='" + pathname + "']").addClass("t-active");
    $(".t282__menu a[href='/" + pathname + "']").addClass("t-active");
    $(".t282__menu a[href='" + pathname + "/']").addClass("t-active");
    $(".t282__menu a[href='/" + pathname + "/']").addClass("t-active")
}

function t282_appearMenu(recid) {
    var window_width = $(window).width();
    $(".t282").each(function () {
        var el = $(this);
        var appearoffset = el.attr("data-appearoffset");
        if (appearoffset != "") {
            if (appearoffset.indexOf('vh') > -1) {
                appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)))
            }
            appearoffset = parseInt(appearoffset, 10);
            if ($(window).scrollTop() >= appearoffset) {
                if (el.css('visibility') == 'hidden') {
                    el.finish();
                    el.css("top", "-50px");
                    el.css("visibility", "visible");
                    el.animate({
                        "opacity": "1",
                        "top": "0px"
                    }, 200, function () {})
                }
            } else {
                el.stop();
                el.css("visibility", "hidden")
            }
        }
    })
}
var t336 = {};
t336.initeffect = function (recid) {
    $('#rec' + recid).find(".t336__cell").hover(function () {
        var sizer = $(this).find(".t336__button-container").height();
        $(this).find(".t336__textwrapper__content").css({
            'padding-bottom': (sizer + 'px')
        });
        $(this).find(".t336__button-container").addClass("t336__button-container_show")
    }, function () {
        $(this).find(".t336__textwrapper__content").css("padding-bottom", "0");
        $(this).find(".t336__button-container").removeClass("t336__button-container_show")
    })
};

function t347_setHeight(recid) {
    var el = $('#rec' + recid);
    var div = el.find(".t347__table");
    var height = div.width() * 0.5625;
    div.height(height)
}
window.t347showvideo = function (recid) {
    $(document).ready(function () {
        var el = $('#rec' + recid);
        var videourl = '';
        var youtubeid = $("#rec" + recid + " .t347__video-container").attr('data-content-popup-video-url-youtube');
        if (youtubeid > '') {
            videourl = 'https://www.youtube.com/embed/' + youtubeid
        }
        $("#rec" + recid + " .t347__video-container").removeClass("t347__hidden");
        $("#rec" + recid + " .t347__video-carier").html("<iframe id=\"youtubeiframe" + recid + "\" class=\"t347__iframe\" width=\"100%\" height=\"100%\" src=\"" + videourl + "?autoplay=1&rel=0\" frameborder=\"0\" allowfullscreen></iframe>")
    })
}
window.t347hidevideo = function (recid) {
    $(document).ready(function () {
        $("#rec" + recid + " .t347__video-container").addClass("t347__hidden");
        $("#rec" + recid + " .t347__video-carier").html("")
    })
}

function t368_alignVertical(recid) {
    var el = $("#rec" + recid);
    el.find(".t368__video").css({
        'padding-bottom': (el.find(".t368__text").height() + 12 + 'px')
    })
}

function t389_scrollToTop() {
    $('html, body').animate({
        scrollTop: 0
    }, 700)
}

function t396_init(recid) {
    var data = '';
    var res = t396_detectResolution();
    t396_initTNobj();
    t396_switchResolution(res);
    t396_updateTNobj();
    t396_artboard_build(data, recid);
    window.tn_window_width = $(window).width();
    $(window).resize(function () {
        tn_console('>>>> t396: Window on Resize event >>>>');
        t396_waitForFinalEvent(function () {
            if ($isMobile) {
                var ww = $(window).width();
                if (ww != window.tn_window_width) {
                    t396_doResize(recid)
                }
            } else {
                t396_doResize(recid)
            }
        }, 500, 'resizeruniqueid' + recid)
    });
    $(window).on("orientationchange", function () {
        tn_console('>>>> t396: Orient change event >>>>');
        t396_waitForFinalEvent(function () {
            t396_doResize(recid)
        }, 600, 'orientationuniqueid' + recid)
    });
    $(window).load(function () {
        var ab = $('#rec' + recid).find('.t396__artboard');
        t396_allelems__renderView(ab);
        if (typeof t_lazyload_update === 'function' && ab.css('overflow') === 'auto') {
            ab.bind('scroll', t_throttle(function () {
                t_lazyload_update()
            }, 500))
        }
    });
    var rec = $('#rec' + recid);
    if (rec.attr('data-connect-with-tab') == 'yes') {
        rec.find('.t396').bind('displayChanged', function () {
            var ab = rec.find('.t396__artboard');
            t396_allelems__renderView(ab)
        })
    }
}

function t396_doResize(recid) {
    var ww;
    if ($isMobile) {
        ww = $(window).width()
    } else {
        ww = window.innerWidth
    }
    window.tn_window_width = ww;
    var res = t396_detectResolution();
    var ab = $('#rec' + recid).find('.t396__artboard');
    t396_switchResolution(res);
    t396_updateTNobj();
    t396_ab__renderView(ab);
    t396_allelems__renderView(ab)
}

function t396_detectResolution() {
    var ww;
    if ($isMobile) {
        ww = $(window).width()
    } else {
        ww = window.innerWidth
    }
    var res;
    res = 1200;
    if (ww < 1200) {
        res = 960
    }
    if (ww < 960) {
        res = 640
    }
    if (ww < 640) {
        res = 480
    }
    if (ww < 480) {
        res = 320
    }
    return (res)
}

function t396_initTNobj() {
    tn_console('func: initTNobj');
    window.tn = {};
    window.tn.canvas_min_sizes = ["320", "480", "640", "960", "1200"];
    window.tn.canvas_max_sizes = ["480", "640", "960", "1200", ""];
    window.tn.ab_fields = ["height", "width", "bgcolor", "bgimg", "bgattachment", "bgposition", "filteropacity", "filtercolor", "filteropacity2", "filtercolor2", "height_vh", "valign"]
}

function t396_updateTNobj() {
    tn_console('func: updateTNobj');
    if (typeof window.zero_window_width_hook != 'undefined' && window.zero_window_width_hook == 'allrecords' && $('#allrecords').length) {
        window.tn.window_width = parseInt($('#allrecords').width())
    } else {
        window.tn.window_width = parseInt($(window).width())
    }
    window.tn.window_height = parseInt($(window).height());
    if (window.tn.curResolution == 1200) {
        window.tn.canvas_min_width = 1200;
        window.tn.canvas_max_width = window.tn.window_width
    }
    if (window.tn.curResolution == 960) {
        window.tn.canvas_min_width = 960;
        window.tn.canvas_max_width = 1200
    }
    if (window.tn.curResolution == 640) {
        window.tn.canvas_min_width = 640;
        window.tn.canvas_max_width = 960
    }
    if (window.tn.curResolution == 480) {
        window.tn.canvas_min_width = 480;
        window.tn.canvas_max_width = 640
    }
    if (window.tn.curResolution == 320) {
        window.tn.canvas_min_width = 320;
        window.tn.canvas_max_width = 480
    }
    window.tn.grid_width = window.tn.canvas_min_width;
    window.tn.grid_offset_left = parseFloat((window.tn.window_width - window.tn.grid_width) / 2)
}
var t396_waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
        if (!uniqueId) {
            uniqueId = "Don't call this twice without a uniqueId"
        }
        if (timers[uniqueId]) {
            clearTimeout(timers[uniqueId])
        }
        timers[uniqueId] = setTimeout(callback, ms)
    }
})();

function t396_switchResolution(res, resmax) {
    tn_console('func: switchResolution');
    if (typeof resmax == 'undefined') {
        if (res == 1200) resmax = '';
        if (res == 960) resmax = 1200;
        if (res == 640) resmax = 960;
        if (res == 480) resmax = 640;
        if (res == 320) resmax = 480
    }
    window.tn.curResolution = res;
    window.tn.curResolution_max = resmax
}

function t396_artboard_build(data, recid) {
    tn_console('func: t396_artboard_build. Recid:' + recid);
    tn_console(data);
    var ab = $('#rec' + recid).find('.t396__artboard');
    t396_ab__renderView(ab);
    ab.find('.tn-elem').each(function () {
        var item = $(this);
        if (item.attr('data-elem-type') == 'text') {
            t396_addText(ab, item)
        }
        if (item.attr('data-elem-type') == 'image') {
            t396_addImage(ab, item)
        }
        if (item.attr('data-elem-type') == 'shape') {
            t396_addShape(ab, item)
        }
        if (item.attr('data-elem-type') == 'button') {
            t396_addButton(ab, item)
        }
        if (item.attr('data-elem-type') == 'video') {
            t396_addVideo(ab, item)
        }
        if (item.attr('data-elem-type') == 'html') {
            t396_addHtml(ab, item)
        }
        if (item.attr('data-elem-type') == 'tooltip') {
            t396_addTooltip(ab, item)
        }
        if (item.attr('data-elem-type') == 'form') {
            t396_addForm(ab, item)
        }
        if (item.attr('data-elem-type') == 'gallery') {
            t396_addGallery(ab, item)
        }
    });
    $('#rec' + recid).find('.t396__artboard').removeClass('rendering').addClass('rendered');
    if (ab.attr('data-artboard-ovrflw') == 'visible') {
        $('#allrecords').css('overflow', 'hidden')
    }
    if ($isMobile) {
        $('#rec' + recid).append('<style>@media only screen and (min-width:1366px) and (orientation:landscape) and (-webkit-min-device-pixel-ratio:2) {.t396__carrier {background-attachment:scroll!important;}}</style>')
    }
}

function t396_ab__renderView(ab) {
    var fields = window.tn.ab_fields;
    for (var i = 0; i < fields.length; i++) {
        t396_ab__renderViewOneField(ab, fields[i])
    }
    var ab_min_height = t396_ab__getFieldValue(ab, 'height');
    var ab_max_height = t396_ab__getHeight(ab);
    var offset_top = 0;
    if (ab_min_height == ab_max_height) {
        offset_top = 0
    } else {
        var ab_valign = t396_ab__getFieldValue(ab, 'valign');
        if (ab_valign == 'top') {
            offset_top = 0
        } else if (ab_valign == 'center') {
            offset_top = parseFloat((ab_max_height - ab_min_height) / 2).toFixed(1)
        } else if (ab_valign == 'bottom') {
            offset_top = parseFloat((ab_max_height - ab_min_height)).toFixed(1)
        } else if (ab_valign == 'stretch') {
            offset_top = 0;
            ab_min_height = ab_max_height
        } else {
            offset_top = 0
        }
    }
    ab.attr('data-artboard-proxy-min-offset-top', offset_top);
    ab.attr('data-artboard-proxy-min-height', ab_min_height);
    ab.attr('data-artboard-proxy-max-height', ab_max_height);
    var abHeightVh = t396_ab__getFieldValue(ab, 'height_vh');
    if (window.isMobile && abHeightVh) {
        ab.css('height', document.documentElement.clientHeight * parseFloat(abHeightVh / 100))
    }
}

function t396_addText(ab, el) {
    tn_console('func: addText');
    var fields_str = 'top,left,width,container,axisx,axisy,widthunits,leftunits,topunits';
    var fields = fields_str.split(',');
    el.attr('data-fields', fields_str);
    t396_elem__renderView(el)
}

function t396_addImage(ab, el) {
    tn_console('func: addImage');
    var fields_str = 'img,width,filewidth,fileheight,top,left,container,axisx,axisy,widthunits,leftunits,topunits';
    var fields = fields_str.split(',');
    el.attr('data-fields', fields_str);
    t396_elem__renderView(el);
    el.find('img').on("load", function () {
        t396_elem__renderViewOneField(el, 'top');
        if (typeof $(this).attr('src') != 'undefined' && $(this).attr('src') != '') {
            setTimeout(function () {
                t396_elem__renderViewOneField(el, 'top')
            }, 2000)
        }
    }).each(function () {
        if (this.complete) $(this).load()
    });
    el.find('img').on('tuwidget_done', function (e, file) {
        t396_elem__renderViewOneField(el, 'top')
    })
}

function t396_addShape(ab, el) {
    tn_console('func: addShape');
    var fields_str = 'width,height,top,left,';
    fields_str += 'container,axisx,axisy,widthunits,heightunits,leftunits,topunits';
    var fields = fields_str.split(',');
    el.attr('data-fields', fields_str);
    t396_elem__renderView(el)
}

function t396_addButton(ab, el) {
    tn_console('func: addButton');
    var fields_str = 'top,left,width,height,container,axisx,axisy,caption,leftunits,topunits';
    var fields = fields_str.split(',');
    el.attr('data-fields', fields_str);
    t396_elem__renderView(el);
    return (el)
}

function t396_addVideo(ab, el) {
    tn_console('func: addVideo');
    var fields_str = 'width,height,top,left,';
    fields_str += 'container,axisx,axisy,widthunits,heightunits,leftunits,topunits';
    var fields = fields_str.split(',');
    el.attr('data-fields', fields_str);
    t396_elem__renderView(el);
    var viel = el.find('.tn-atom__videoiframe');
    var viatel = el.find('.tn-atom');
    viatel.css('background-color', '#000');
    var vihascover = viatel.attr('data-atom-video-has-cover');
    if (typeof vihascover == 'undefined') {
        vihascover = ''
    }
    if (vihascover == 'y') {
        viatel.click(function () {
            var viifel = viel.find('iframe');
            if (viifel.length) {
                var foo = viifel.attr('data-original');
                viifel.attr('src', foo)
            }
            viatel.css('background-image', 'none');
            viatel.find('.tn-atom__video-play-link').css('display', 'none')
        })
    }
    var autoplay = t396_elem__getFieldValue(el, 'autoplay');
    var showinfo = t396_elem__getFieldValue(el, 'showinfo');
    var loop = t396_elem__getFieldValue(el, 'loop');
    var mute = t396_elem__getFieldValue(el, 'mute');
    var startsec = t396_elem__getFieldValue(el, 'startsec');
    var endsec = t396_elem__getFieldValue(el, 'endsec');
    var tmode = $('#allrecords').attr('data-tilda-mode');
    var url = '';
    var viyid = viel.attr('data-youtubeid');
    if (typeof viyid != 'undefined' && viyid != '') {
        url = '//www.youtube.com/embed/';
        url += viyid + '?rel=0&fmt=18&html5=1';
        url += '&showinfo=' + (showinfo == 'y' ? '1' : '0');
        if (loop == 'y') {
            url += '&loop=1&playlist=' + viyid
        }
        if (startsec > 0) {
            url += '&start=' + startsec
        }
        if (endsec > 0) {
            url += '&end=' + endsec
        }
        if (mute == 'y') {
            url += '&mute=1'
        }
        if (vihascover == 'y') {
            url += '&autoplay=1';
            viel.html('<iframe id="youtubeiframe" width="100%" height="100%" data-original="' + url + '" frameborder="0" allowfullscreen data-flag-inst="y"></iframe>')
        } else {
            if (typeof tmode != 'undefined' && tmode == 'edit') {} else {
                if (autoplay == 'y') {
                    url += '&autoplay=1'
                }
            }
            if (window.lazy == 'y') {
                viel.html('<iframe id="youtubeiframe" class="t-iframe" width="100%" height="100%" data-original="' + url + '" frameborder="0" allowfullscreen data-flag-inst="lazy"></iframe>');
                el.append('<script>lazyload_iframe = new LazyLoad({elements_selector: ".t-iframe"});</script>')
            } else {
                viel.html('<iframe id="youtubeiframe" width="100%" height="100%" src="' + url + '" frameborder="0" allowfullscreen data-flag-inst="y"></iframe>')
            }
        }
    }
    var vivid = viel.attr('data-vimeoid');
    if (typeof vivid != 'undefined' && vivid > 0) {
        url = '//player.vimeo.com/video/';
        url += vivid + '?color=ffffff&badge=0';
        if (showinfo == 'y') {
            url += '&title=1&byline=1&portrait=1'
        } else {
            url += '&title=0&byline=0&portrait=0'
        }
        if (loop == 'y') {
            url += '&loop=1'
        }
        if (mute == 'y') {
            url += '&muted=1'
        }
        if (vihascover == 'y') {
            url += '&autoplay=1';
            viel.html('<iframe data-original="' + url + '" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
        } else {
            if (typeof tmode != 'undefined' && tmode == 'edit') {} else {
                if (autoplay == 'y') {
                    url += '&autoplay=1'
                }
            }
            if (window.lazy == 'y') {
                viel.html('<iframe class="t-iframe" data-original="' + url + '" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
                el.append('<script>lazyload_iframe = new LazyLoad({elements_selector: ".t-iframe"});</script>')
            } else {
                viel.html('<iframe src="' + url + '" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
            }
        }
    }
}

function t396_addHtml(ab, el) {
    tn_console('func: addHtml');
    var fields_str = 'width,height,top,left,';
    fields_str += 'container,axisx,axisy,widthunits,heightunits,leftunits,topunits';
    var fields = fields_str.split(',');
    el.attr('data-fields', fields_str);
    t396_elem__renderView(el)
}

function t396_addTooltip(ab, el) {
    tn_console('func: addTooltip');
    var fields_str = 'width,height,top,left,';
    fields_str += 'container,axisx,axisy,widthunits,heightunits,leftunits,topunits,tipposition';
    var fields = fields_str.split(',');
    el.attr('data-fields', fields_str);
    t396_elem__renderView(el);
    var pinEl = el.find('.tn-atom__pin');
    var tipEl = el.find('.tn-atom__tip');
    var tipopen = el.attr('data-field-tipopen-value');
    if (isMobile || (typeof tipopen != 'undefined' && tipopen == 'click')) {
        t396_setUpTooltip_mobile(el, pinEl, tipEl)
    } else {
        t396_setUpTooltip_desktop(el, pinEl, tipEl)
    }
    setTimeout(function () {
        $('.tn-atom__tip-img').each(function () {
            var foo = $(this).attr('data-tipimg-original');
            if (typeof foo != 'undefined' && foo != '') {
                $(this).attr('src', foo)
            }
        })
    }, 3000)
}

function t396_addForm(ab, el) {
    tn_console('func: addForm');
    var fields_str = 'width,top,left,';
    fields_str += 'inputs,container,axisx,axisy,widthunits,leftunits,topunits';
    var fields = fields_str.split(',');
    el.attr('data-fields', fields_str);
    t396_elem__renderView(el)
}

function t396_addGallery(ab, el) {
    tn_console('func: addForm');
    var fields_str = 'width,height,top,left,';
    fields_str += 'imgs,container,axisx,axisy,widthunits,heightunits,leftunits,topunits';
    var fields = fields_str.split(',');
    el.attr('data-fields', fields_str);
    t396_elem__renderView(el)
}

function t396_elem__setFieldValue(el, prop, val, flag_render, flag_updateui, res) {
    if (res == '') res = window.tn.curResolution;
    if (res < 1200 && prop != 'zindex') {
        el.attr('data-field-' + prop + '-res-' + res + '-value', val)
    } else {
        el.attr('data-field-' + prop + '-value', val)
    }
    if (flag_render == 'render') elem__renderViewOneField(el, prop);
    if (flag_updateui == 'updateui') panelSettings__updateUi(el, prop, val)
}

function t396_elem__getFieldValue(el, prop) {
    var res = window.tn.curResolution;
    var r;
    if (res < 1200) {
        if (res == 960) {
            r = el.attr('data-field-' + prop + '-res-960-value');
            if (typeof r == 'undefined') {
                r = el.attr('data-field-' + prop + '-value')
            }
        }
        if (res == 640) {
            r = el.attr('data-field-' + prop + '-res-640-value');
            if (typeof r == 'undefined') {
                r = el.attr('data-field-' + prop + '-res-960-value');
                if (typeof r == 'undefined') {
                    r = el.attr('data-field-' + prop + '-value')
                }
            }
        }
        if (res == 480) {
            r = el.attr('data-field-' + prop + '-res-480-value');
            if (typeof r == 'undefined') {
                r = el.attr('data-field-' + prop + '-res-640-value');
                if (typeof r == 'undefined') {
                    r = el.attr('data-field-' + prop + '-res-960-value');
                    if (typeof r == 'undefined') {
                        r = el.attr('data-field-' + prop + '-value')
                    }
                }
            }
        }
        if (res == 320) {
            r = el.attr('data-field-' + prop + '-res-320-value');
            if (typeof r == 'undefined') {
                r = el.attr('data-field-' + prop + '-res-480-value');
                if (typeof r == 'undefined') {
                    r = el.attr('data-field-' + prop + '-res-640-value');
                    if (typeof r == 'undefined') {
                        r = el.attr('data-field-' + prop + '-res-960-value');
                        if (typeof r == 'undefined') {
                            r = el.attr('data-field-' + prop + '-value')
                        }
                    }
                }
            }
        }
    } else {
        r = el.attr('data-field-' + prop + '-value')
    }
    return (r)
}

function t396_elem__renderView(el) {
    tn_console('func: elem__renderView');
    var fields = el.attr('data-fields');
    if (!fields) {
        return !1
    }
    fields = fields.split(',');
    for (var i = 0; i < fields.length; i++) {
        t396_elem__renderViewOneField(el, fields[i])
    }
}

function t396_elem__renderViewOneField(el, field) {
    var value = t396_elem__getFieldValue(el, field);
    if (field == 'left') {
        value = t396_elem__convertPosition__Local__toAbsolute(el, field, value);
        el.css('left', parseFloat(value).toFixed(1) + 'px')
    }
    if (field == 'top') {
        value = t396_elem__convertPosition__Local__toAbsolute(el, field, value);
        el.css('top', parseFloat(value).toFixed(1) + 'px')
    }
    if (field == 'width') {
        value = t396_elem__getWidth(el, value);
        el.css('width', parseFloat(value).toFixed(1) + 'px');
        var eltype = el.attr('data-elem-type');
        if (eltype == 'tooltip') {
            var pinSvgIcon = el.find('.tn-atom__pin-icon');
            if (pinSvgIcon.length > 0) {
                var pinSize = parseFloat(value).toFixed(1) + 'px';
                pinSvgIcon.css({
                    'width': pinSize,
                    'height': pinSize
                })
            }
            el.css('height', parseInt(value).toFixed(1) + 'px')
        }
        if (eltype == 'gallery') {
            var borderWidth = t396_elem__getFieldValue(el, 'borderwidth');
            var borderStyle = t396_elem__getFieldValue(el, 'borderstyle');
            if (borderStyle == 'none' || typeof borderStyle == 'undefined' || typeof borderWidth == 'undefined' || borderWidth == '') borderWidth = 0;
            value = value * 1 - borderWidth * 2;
            el.css('width', parseFloat(value).toFixed(1) + 'px');
            el.find('.t-slds__main').css('width', parseFloat(value).toFixed(1) + 'px');
            el.find('.tn-atom__slds-img').css('width', parseFloat(value).toFixed(1) + 'px')
        }
    }
    if (field == 'height') {
        var eltype = el.attr('data-elem-type');
        if (eltype == 'tooltip') {
            return
        }
        value = t396_elem__getHeight(el, value);
        el.css('height', parseFloat(value).toFixed(1) + 'px');
        if (eltype === 'gallery') {
            var borderWidth = t396_elem__getFieldValue(el, 'borderwidth');
            var borderStyle = t396_elem__getFieldValue(el, 'borderstyle');
            if (borderStyle == 'none' || typeof borderStyle == 'undefined' || typeof borderWidth == 'undefined' || borderWidth == '') borderWidth = 0;
            value = value * 1 - borderWidth * 2;
            el.css('height', parseFloat(value).toFixed(1) + 'px');
            el.find('.tn-atom__slds-img').css('height', parseFloat(value).toFixed(1) + 'px');
            el.find('.t-slds__main').css('height', parseFloat(value).toFixed(1) + 'px')
        }
    }
    if (field == 'container') {
        t396_elem__renderViewOneField(el, 'left');
        t396_elem__renderViewOneField(el, 'top')
    }
    if (field == 'width' || field == 'height' || field == 'fontsize' || field == 'fontfamily' || field == 'letterspacing' || field == 'fontweight' || field == 'img') {
        t396_elem__renderViewOneField(el, 'left');
        t396_elem__renderViewOneField(el, 'top')
    }
    if (field == 'inputs') {
        value = el.find('.tn-atom__inputs-textarea').val();
        try {
            t_zeroForms__renderForm(el, value)
        } catch (err) {}
    }
}

function t396_elem__convertPosition__Local__toAbsolute(el, field, value) {
    value = parseInt(value);
    if (field == 'left') {
        var el_container, offset_left, el_container_width, el_width;
        var container = t396_elem__getFieldValue(el, 'container');
        if (container == 'grid') {
            el_container = 'grid';
            offset_left = window.tn.grid_offset_left;
            el_container_width = window.tn.grid_width
        } else {
            el_container = 'window';
            offset_left = 0;
            el_container_width = window.tn.window_width
        }
        var el_leftunits = t396_elem__getFieldValue(el, 'leftunits');
        if (el_leftunits == '%') {
            value = t396_roundFloat(el_container_width * value / 100)
        }
        value = offset_left + value;
        var el_axisx = t396_elem__getFieldValue(el, 'axisx');
        if (el_axisx == 'center') {
            el_width = t396_elem__getWidth(el);
            value = el_container_width / 2 - el_width / 2 + value
        }
        if (el_axisx == 'right') {
            el_width = t396_elem__getWidth(el);
            value = el_container_width - el_width + value
        }
    }
    if (field == 'top') {
        var ab = el.parent();
        var el_container, offset_top, el_container_height, el_height;
        var container = t396_elem__getFieldValue(el, 'container');
        if (container == 'grid') {
            el_container = 'grid';
            offset_top = parseFloat(ab.attr('data-artboard-proxy-min-offset-top'));
            el_container_height = parseFloat(ab.attr('data-artboard-proxy-min-height'))
        } else {
            el_container = 'window';
            offset_top = 0;
            el_container_height = parseFloat(ab.attr('data-artboard-proxy-max-height'))
        }
        var el_topunits = t396_elem__getFieldValue(el, 'topunits');
        if (el_topunits == '%') {
            value = (el_container_height * (value / 100))
        }
        value = offset_top + value;
        var el_axisy = t396_elem__getFieldValue(el, 'axisy');
        if (el_axisy == 'center') {
            el_height = t396_elem__getHeight(el);
            value = el_container_height / 2 - el_height / 2 + value
        }
        if (el_axisy == 'bottom') {
            el_height = t396_elem__getHeight(el);
            value = el_container_height - el_height + value
        }
    }
    return (value)
}

function t396_ab__setFieldValue(ab, prop, val, res) {
    if (res == '') res = window.tn.curResolution;
    if (res < 1200) {
        ab.attr('data-artboard-' + prop + '-res-' + res, val)
    } else {
        ab.attr('data-artboard-' + prop, val)
    }
}

function t396_ab__getFieldValue(ab, prop) {
    var res = window.tn.curResolution;
    var r;
    if (res < 1200) {
        if (res == 960) {
            r = ab.attr('data-artboard-' + prop + '-res-960');
            if (typeof r == 'undefined') {
                r = ab.attr('data-artboard-' + prop + '')
            }
        }
        if (res == 640) {
            r = ab.attr('data-artboard-' + prop + '-res-640');
            if (typeof r == 'undefined') {
                r = ab.attr('data-artboard-' + prop + '-res-960');
                if (typeof r == 'undefined') {
                    r = ab.attr('data-artboard-' + prop + '')
                }
            }
        }
        if (res == 480) {
            r = ab.attr('data-artboard-' + prop + '-res-480');
            if (typeof r == 'undefined') {
                r = ab.attr('data-artboard-' + prop + '-res-640');
                if (typeof r == 'undefined') {
                    r = ab.attr('data-artboard-' + prop + '-res-960');
                    if (typeof r == 'undefined') {
                        r = ab.attr('data-artboard-' + prop + '')
                    }
                }
            }
        }
        if (res == 320) {
            r = ab.attr('data-artboard-' + prop + '-res-320');
            if (typeof r == 'undefined') {
                r = ab.attr('data-artboard-' + prop + '-res-480');
                if (typeof r == 'undefined') {
                    r = ab.attr('data-artboard-' + prop + '-res-640');
                    if (typeof r == 'undefined') {
                        r = ab.attr('data-artboard-' + prop + '-res-960');
                        if (typeof r == 'undefined') {
                            r = ab.attr('data-artboard-' + prop + '')
                        }
                    }
                }
            }
        }
    } else {
        r = ab.attr('data-artboard-' + prop)
    }
    return (r)
}

function t396_ab__renderViewOneField(ab, field) {
    var value = t396_ab__getFieldValue(ab, field)
}

function t396_allelems__renderView(ab) {
    tn_console('func: allelems__renderView: abid:' + ab.attr('data-artboard-recid'));
    ab.find(".tn-elem").each(function () {
        t396_elem__renderView($(this))
    })
}

function t396_ab__filterUpdate(ab) {
    var filter = ab.find('.t396__filter');
    var c1 = filter.attr('data-filtercolor-rgb');
    var c2 = filter.attr('data-filtercolor2-rgb');
    var o1 = filter.attr('data-filteropacity');
    var o2 = filter.attr('data-filteropacity2');
    if ((typeof c2 == 'undefined' || c2 == '') && (typeof c1 != 'undefined' && c1 != '')) {
        filter.css("background-color", "rgba(" + c1 + "," + o1 + ")")
    } else if ((typeof c1 == 'undefined' || c1 == '') && (typeof c2 != 'undefined' && c2 != '')) {
        filter.css("background-color", "rgba(" + c2 + "," + o2 + ")")
    } else if (typeof c1 != 'undefined' && typeof c2 != 'undefined' && c1 != '' && c2 != '') {
        filter.css({
            background: "-webkit-gradient(linear, left top, left bottom, from(rgba(" + c1 + "," + o1 + ")), to(rgba(" + c2 + "," + o2 + ")) )"
        })
    } else {
        filter.css("background-color", 'transparent')
    }
}

function t396_ab__getHeight(ab, ab_height) {
    if (typeof ab_height == 'undefined') ab_height = t396_ab__getFieldValue(ab, 'height');
    ab_height = parseFloat(ab_height);
    var ab_height_vh = t396_ab__getFieldValue(ab, 'height_vh');
    if (ab_height_vh != '') {
        ab_height_vh = parseFloat(ab_height_vh);
        if (isNaN(ab_height_vh) === !1) {
            var ab_height_vh_px = parseFloat(window.tn.window_height * parseFloat(ab_height_vh / 100));
            if (ab_height < ab_height_vh_px) {
                ab_height = ab_height_vh_px
            }
        }
    }
    return (ab_height)
}

function t396_hex2rgb(hexStr) {
    var hex = parseInt(hexStr.substring(1), 16);
    var r = (hex & 0xff0000) >> 16;
    var g = (hex & 0x00ff00) >> 8;
    var b = hex & 0x0000ff;
    return [r, g, b]
}
String.prototype.t396_replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement)
};

function t396_elem__getWidth(el, value) {
    if (typeof value == 'undefined') value = parseFloat(t396_elem__getFieldValue(el, 'width'));
    var el_widthunits = t396_elem__getFieldValue(el, 'widthunits');
    if (el_widthunits == '%') {
        var el_container = t396_elem__getFieldValue(el, 'container');
        if (el_container == 'window') {
            value = parseFloat(window.tn.window_width * parseFloat(parseInt(value) / 100))
        } else {
            value = parseFloat(window.tn.grid_width * parseFloat(parseInt(value) / 100))
        }
    }
    return (value)
}

function t396_elem__getHeight(el, value) {
    if (typeof value == 'undefined') value = t396_elem__getFieldValue(el, 'height');
    value = parseFloat(value);
    if (el.attr('data-elem-type') == 'shape' || el.attr('data-elem-type') == 'video' || el.attr('data-elem-type') == 'html' || el.attr('data-elem-type') == 'gallery') {
        var el_heightunits = t396_elem__getFieldValue(el, 'heightunits');
        if (el_heightunits == '%') {
            var ab = el.parent();
            var ab_min_height = parseFloat(ab.attr('data-artboard-proxy-min-height'));
            var ab_max_height = parseFloat(ab.attr('data-artboard-proxy-max-height'));
            var el_container = t396_elem__getFieldValue(el, 'container');
            if (el_container == 'window') {
                value = parseFloat(ab_max_height * parseFloat(value / 100))
            } else {
                value = parseFloat(ab_min_height * parseFloat(value / 100))
            }
        }
    } else if (el.attr('data-elem-type') == 'button') {
        value = value
    } else {
        value = parseFloat(el.innerHeight())
    }
    return (value)
}

function t396_roundFloat(n) {
    n = Math.round(n * 100) / 100;
    return (n)
}

function tn_console(str) {
    if (window.tn_comments == 1) console.log(str)
}

function t396_setUpTooltip_desktop(el, pinEl, tipEl) {
    var timer;
    pinEl.mouseover(function () {
        $('.tn-atom__tip_visible').each(function () {
            var thisTipEl = $(this).parents('.t396__elem');
            if (thisTipEl.attr('data-elem-id') != el.attr('data-elem-id')) {
                t396_hideTooltip(thisTipEl, $(this))
            }
        });
        clearTimeout(timer);
        if (tipEl.css('display') == 'block') {
            return
        }
        t396_showTooltip(el, tipEl)
    });
    pinEl.mouseout(function () {
        timer = setTimeout(function () {
            t396_hideTooltip(el, tipEl)
        }, 300)
    })
}

function t396_setUpTooltip_mobile(el, pinEl, tipEl) {
    pinEl.on('click', function (e) {
        if (tipEl.css('display') == 'block' && $(e.target).hasClass("tn-atom__pin")) {
            t396_hideTooltip(el, tipEl)
        } else {
            t396_showTooltip(el, tipEl)
        }
    });
    var id = el.attr("data-elem-id");
    $(document).click(function (e) {
        var isInsideTooltip = ($(e.target).hasClass("tn-atom__pin") || $(e.target).parents(".tn-atom__pin").length > 0);
        if (isInsideTooltip) {
            var clickedPinId = $(e.target).parents(".t396__elem").attr("data-elem-id");
            if (clickedPinId == id) {
                return
            }
        }
        t396_hideTooltip(el, tipEl)
    })
}

function t396_hideTooltip(el, tipEl) {
    tipEl.css('display', '');
    tipEl.css({
        "left": "",
        "transform": "",
        "right": ""
    });
    tipEl.removeClass('tn-atom__tip_visible');
    el.css('z-index', '')
}

function t396_showTooltip(el, tipEl) {
    var pos = el.attr("data-field-tipposition-value");
    if (typeof pos == 'undefined' || pos == '') {
        pos = 'top'
    };
    var elSize = el.height();
    var elTop = el.offset().top;
    var elBottom = elTop + elSize;
    var elLeft = el.offset().left;
    var elRight = el.offset().left + elSize;
    var winTop = $(window).scrollTop();
    var winWidth = $(window).width();
    var winBottom = winTop + $(window).height();
    var tipElHeight = tipEl.outerHeight();
    var tipElWidth = tipEl.outerWidth();
    var padd = 15;
    if (pos == 'right' || pos == 'left') {
        var tipElRight = elRight + padd + tipElWidth;
        var tipElLeft = elLeft - padd - tipElWidth;
        if ((pos == 'right' && tipElRight > winWidth) || (pos == 'left' && tipElLeft < 0)) {
            pos = 'top'
        }
    }
    if (pos == 'top' || pos == 'bottom') {
        var tipElRight = elRight + (tipElWidth / 2 - elSize / 2);
        var tipElLeft = elLeft - (tipElWidth / 2 - elSize / 2);
        if (tipElRight > winWidth) {
            var rightOffset = -(winWidth - elRight - padd);
            tipEl.css({
                "left": "auto",
                "transform": "none",
                "right": rightOffset + "px"
            })
        }
        if (tipElLeft < 0) {
            var leftOffset = -(elLeft - padd);
            tipEl.css({
                "left": leftOffset + "px",
                "transform": "none"
            })
        }
    }
    if (pos == 'top') {
        var tipElTop = elTop - padd - tipElHeight;
        var tipElBottom = elBottom + padd + tipElHeight;
        if (winBottom > tipElBottom && winTop > tipElTop) {
            pos = 'bottom'
        }
    }
    if (pos == 'bottom') {
        var tipElTop = elTop - padd - tipElHeight;
        var tipElBottom = elBottom + padd + tipElHeight;
        if (winBottom < tipElBottom && winTop < tipElTop) {
            pos = 'top'
        }
    }
    tipEl.attr('data-tip-pos', pos);
    tipEl.css('display', 'block');
    tipEl.addClass('tn-atom__tip_visible');
    el.css('z-index', '1000')
}

function t396_hex2rgba(hexStr, opacity) {
    var hex = parseInt(hexStr.substring(1), 16);
    var r = (hex & 0xff0000) >> 16;
    var g = (hex & 0x00ff00) >> 8;
    var b = hex & 0x0000ff;
    return [r, g, b, parseFloat(opacity)]
}

function t400_init(recid) {
    var el = $('#rec' + recid);
    var btn = el.find('.t400__submit');
    var hideBackText = btn.attr("data-hide-back-text");
    var showMoreText = btn.text();
    el.find('.t400__submit').click(function () {
        if (typeof hideBackText != 'undefined' && hideBackText.length > 0 && $(this).hasClass('t400__submit_hide-back')) {
            t400_alltabs_updateContent(recid);
            $(this).removeClass('t400__submit_hide-back');
            if (btn.hasClass('t400__submit-overflowed')) {
                btn.html("<span class=\"t400__text\">" + showMoreText + "</span>")
            } else {
                btn.html(showMoreText)
            }
            $('.t396').trigger('displayChanged');
            return
        }
        var recids = $(this).attr('data-hidden-rec-ids').split(',');
        recids.forEach(function (recid) {
            var el = $('#rec' + recid);
            el.removeClass('t400__off');
            el.css('opacity', '');
            var video = el.find('.t-video-lazyload');
            if (video.length > 0) {
                if (video.parents('.t121').length > 0 || video.parents('.t223').length > 0 || video.parents('.t230').length > 0 || video.parents('.t368').length > 0) {
                    t400_updateVideoLazyLoad(video)
                }
            }
            el.find('.t-feed, .t-store, .t117, .t121, .t132, .t223, .t226, .t228, .t229, .t230, .t268, .t279, .t341, .t346, .t347, .t349, .t351, .t353, .t384, .t385, .t386, .t396, .t404, .t409, .t410, .t412, .t418, .t422, .t425, .t428, .t433, .t456, .t477, .t478, .t480, .t486, .t498, .t504, .t506, .t509, .t511, .t517, .t518, .t519, .t520, .t532, .t533, .t538, .t539, .t544, .t545, .t552, .t554, .t570, .t577, .t592, .t598, .t599, .t601, .t604, .t605, .t609, .t615, .t616, .t650, .t659, .t670, .t675, .t686, .t688, .t694, .t698, .t700, .t726, .t728, .t734, .t738, .t740, .t744, .t754, .t760, .t762, .t764, .t774, .t776, .t778, .t780, .t786, .t798, .t799, .t801, .t822, .t826, .t827, .t829, .t842, .t843, .t849, .t850, .t851, .t856, .t858, .t859, .t860, .t881, .t902, .t912, .t923, .t937').trigger('displayChanged')
        });
        if (typeof hideBackText != 'undefined' && hideBackText.length > 0) {
            btn.addClass('t400__submit_hide-back');
            if (btn.hasClass('t400__submit-overflowed')) {
                btn.html("<span class=\"t400__text\">" + hideBackText + "</span>")
            } else {
                btn.html(hideBackText)
            }
        } else {
            el.addClass('t400__off').hide()
        }
        if (window.lazy == 'y') {
            t_lazyload_update()
        }
    });
    t400_alltabs_updateContent(recid);
    t400_checkSize(recid)
}

function t400_alltabs_updateContent(recid) {
    var el = $('#rec' + recid);
    el.find(".t400__submit").each(function (i) {
        var recids = $(this).attr('data-hidden-rec-ids').split(',');
        recids.forEach(function (recid) {
            var el = $('#rec' + recid);
            el.attr('data-animationappear', 'off');
            el.attr('data-connect-with-tab', 'yes');
            el.addClass('t400__off')
        })
    })
}

function t400_checkSize(recid) {
    var el = $("#rec" + recid).find(".t400__submit");
    if (el.length) {
        var btnheight = el.height();
        var textheight = el[0].scrollHeight;
        if (btnheight < textheight) {
            var btntext = el.text();
            el.addClass("t400__submit-overflowed");
            el.html("<span class=\"t400__text\">" + btntext + "</span>")
        }
    }
}

function t400_updateVideoLazyLoad(video) {
    setTimeout(function () {
        video.each(function () {
            var div = $(this);
            var height = div.attr('data-videolazy-height') ? $(this).attr('data-videolazy-height') : '100%';
            if (height.indexOf('vh') != -1) {
                height = '100%'
            }
            var videoId = div.attr('data-videolazy-id').trim();
            var blockId = div.attr('data-blocklazy-id') || '';
            if (typeof div.attr('data-videolazy-two-id') != 'undefined') {
                var videoTwoId = '_' + div.attr('data-videolazy-two-id') + '_'
            } else {
                var videoTwoId = ''
            }
            if (div.attr('data-videolazy-type') == 'youtube') {
                div.find('iframe').remove();
                div.prepend('<iframe id="youtubeiframe' + videoTwoId + blockId + '" width="100%" height="' + height + '" src="//www.youtube.com/embed/' + videoId + '?rel=0&fmt=18&html5=1&showinfo=0" frameborder="0" allowfullscreen></iframe>')
            }
        })
    }, 300)
}

function t410_init(recid) {
    var el = $('#rec' + recid);
    var firstimgurl = el.find(".t410__wrapper").attr("data-juxtapose-imgurl-first");
    var firstimgdescr = el.find(".t410__wrapper").attr("data-juxtapose-imgdescr-first");
    var firstimgalt = el.find(".t410__wrapper").attr("data-juxtapose-imgalt-first");
    var secondimgurl = el.find(".t410__wrapper").attr("data-juxtapose-imgurl-second");
    var secondimgdescr = el.find(".t410__wrapper").attr("data-juxtapose-imgdescr-second");
    var secondimgalt = el.find(".t410__wrapper").attr("data-juxtapose-imgalt-second");

    // t_onFuncLoad('juxtapose', function () {
    new juxtapose.JXSlider('#t410-juxtapose__' + recid, [{
        src: firstimgurl,
        label: firstimgdescr
    }, {
        src: secondimgurl,
        label: secondimgdescr
    }], {
        animate: !1,
        showLabels: !0,
        showCredits: !1,
        startingPosition: '50%',
        makeResponsive: !0,
        callback: function () {
            if (firstimgalt.length > 0) {
                el.find('.t410__wrapper .jx-image.jx-left img').attr('alt', firstimgalt)
            }
            if (secondimgalt.length > 0) {
                el.find('.t410__wrapper .jx-image.jx-right img').attr('alt', secondimgalt)
            }
            if (window.$isMobile) {
                el.find('.t410__wrapper').append('<div class="t410__mobile_left"></div><div class="t410__mobile_right"></div>');
                var hanlerWidth = el.find('.jx-handle').width(),
                    leftSide = el.find('.jx-image.jx-left'),
                    rightSide = el.find('.jx-image.jx-right'),
                    leftWidth = leftSide.width() - hanlerWidth / 2,
                    rightWidth = rightSide.width() - hanlerWidth / 2,
                    wrapper = el.find('.t410__wrapper'),
                    mobileLeft = el.find('.t410__mobile_left'),
                    mobileRight = el.find('.t410__mobile_right');
                mobileLeft.css('width', leftWidth);
                mobileRight.css('width', rightWidth);
                wrapper.on('touchend', function () {
                    leftWidth = leftSide.width() - hanlerWidth / 2;
                    rightWidth = rightSide.width() - hanlerWidth / 2;
                    mobileLeft.css('width', leftWidth);
                    mobileRight.css('width', rightWidth)
                })
            }
        }
    });
    // });
    el.find('.t410').bind('displayChanged', function () {
        window.juxtapose.sliders.forEach(function (obj) {
            if (obj.selector === '#t410-juxtapose__' + recid) {
                console.log(obj);
                obj.setWrapperDimensions();
                return
            }
        })
    })
}
t422_setHeight = function (recid) {
    if ($(window).width() > 960) {
        t422_checkEqualHeight(recid)
    } else {
        $('#rec' + recid + ' .t422__img-mobile').height(200);
        $('#rec' + recid + ' .t422__text').height('auto')
    }
};
t422_checkEqualHeight = function (recid) {
    var t422__txtel = $('#rec' + recid + ' .t422__text');
    var t422__imgel = $('#rec' + recid + ' .t422__img');
    var t422__textwrapperel = $('#rec' + recid + ' .t422__textwrapper');
    var t422__borderwidth = 0;
    if (t422__txtel.css("border-top-width") && t422__txtel.css("border-top-width")[1] != 'p') {
        t422__borderwidth = +(t422__txtel.css("border-top-width")[0] + t422__txtel.css('border-top-width')[1])
    } else {
        if (t422__txtel.css("border-top-width"))
            t422__borderwidth = +(t422__txtel.css("border-top-width")[0])
    }
    if (t422__imgel.height() < (t422__textwrapperel.outerHeight() + t422__borderwidth * 2)) {
        t422__imgel.height(t422__textwrapperel.outerHeight() + t422__borderwidth * 2)
    } else {
        if ((t422__imgel.height() - t422__borderwidth * 2) > t422__textwrapperel.outerHeight()) {
            t422__textwrapperel.outerHeight(t422__imgel.height() - t422__borderwidth * 2)
        }
    }
};

function t431_init(recid) {
    var tableHead = t431__escapeHTML($('#rec' + recid + ' .t431 .t431__data-part1').html() || "");
    var tableBody = t431__escapeHTML($('#rec' + recid + ' .t431 .t431__data-part2').html() || "");
    var tableColSize = $('#rec' + recid + ' .t431 .t431__table').attr("data-table-width");
    var hasTargetBlank = $('#rec' + recid + ' .t431 .t431__table').attr("data-target-blank");
    var tHead = t431_parseData(tableHead);
    var tBody = t431_parseData(tableBody);
    var colSize = t431_parseData(tableColSize);
    var maxColNum = t431__findMaxRowLengthInTable(tHead, tBody);
    var colWidth = t431__setColumnsWidth(colSize, maxColNum, recid);
    var container = $('#rec' + recid + ' .t431 .t431__table');
    var html = "";
    if (tHead) {
        html += t431__generateTable(tHead, "th", hasTargetBlank, colWidth, maxColNum)
    }
    if (tBody) {
        html += t431__generateTable(tBody, "td", hasTargetBlank, colWidth, maxColNum)
    }
    container.append(html)
}

function t431__findMaxRowLengthInTable(arrayHead, arrayData) {
    var headMaxLength = 0;
    var dataMaxLength = 0;
    if (arrayHead) {
        headMaxLength = t431__findMaxRowLengInArray(arrayHead)
    }
    if (arrayData) {
        dataMaxLength = t431__findMaxRowLengInArray(arrayData)
    }
    if (dataMaxLength > headMaxLength) {
        return dataMaxLength
    } else {
        return headMaxLength
    }
}

function t431__escapeHTML(string) {
    var html = string.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&nbsp;/g, 'В ');
    var result = "";
    var allowedTags = "";
    ['b', 'i', 'u', 'ul', 'li', 'ol', 'br', 'img', 's', 'sub', 'sup', 'span', 'hr', 'pre', 'code', 'mark', 'strong', 'small'].forEach(function (value) {
        allowedTags += ":not(" + value + ")"
    });
    var allowedAttrs = ['alt', 'class', 'title', 'id', 'src', 'style', 'width', 'height'];
    var fakeDOM = document.implementation.createHTMLDocument('fake');
    $.each($.parseHTML(html, fakeDOM) || [], function (i, $el) {
        var el = $($el)[0];
        if (!$($el).is(allowedTags)) {
            if (el.nodeType !== 3) {
                var temp = document.createElement(el.tagName);
                allowedAttrs.forEach(function (value) {
                    if (el.getAttribute(value) !== null) {
                        temp.setAttribute(value, el.getAttribute(value).replace(/javascript:/gi, ''))
                    }
                });
                temp.textContent = el.textContent;
                result += temp.outerHTML
            } else {
                result += el.textContent
            }
        }
    });
    return result
}

function t431__findMaxRowLengInArray(curArray) {
    var maxLength = 0;
    for (var i = 0; i < curArray.length; i++) {
        if (curArray[i].length > maxLength) {
            maxLength = curArray[i].length
        }
    }
    return maxLength
}

function t431__setColumnsWidth(colWidth, colsNumber, recid) {
    if (colWidth) {
        return colWidth[0]
    } else {
        var tableWidth = $('#rec' + recid + ' .t431 .t-container .t-col').width();
        return (tableWidth / colsNumber + "px")
    }
}

function t431__generateTable(arrayValues, colTag, hasTargetBlank, colWidth, maxColNumber) {
    var html = "";
    var tag = "";
    if (colTag == "td") {
        tag = "tbody"
    } else {
        tag = "thead"
    }
    html += '<' + tag + ' class="t431__' + tag + '">';
    for (var i = 0; i < arrayValues.length; i++) {
        if (colTag == "td") {
            if ((i + 1) % 2 > 0) {
                html += '<tr class="t431__oddrow">'
            } else {
                html += '<tr class="t431__evenrow">'
            }
        } else {
            html += '<tr>'
        }
        var addingCols = 0;
        if (arrayValues[i].length < maxColNumber) {
            addingCols = maxColNumber - arrayValues[i].length
        }
        for (var j = 0; j < (arrayValues[i].length + addingCols); j++) {
            if (arrayValues[i][j]) {
                var curWidth = "";
                if (Array.isArray(colWidth) && colWidth[j]) {
                    curWidth = colWidth[j].myText
                } else {
                    curWidth = colWidth
                }
                var ColWithAttr = '';
                if (colTag == "td") {
                    ColWithAttr = '<td class="t431__td t-text" width="' + curWidth + '">'
                } else {
                    ColWithAttr = '<th class="t431__th t-title" width="' + curWidth + '">'
                }
                if (arrayValues[i][j].myHref) {
                    var tBlank = "";
                    if (hasTargetBlank) {
                        tBlank = "target=\"_blank\""
                    }
                    var linkWithAttr = "";
                    var linkCloseTag = "";
                    if (arrayValues[i][j].myHrefType == "link") {
                        linkWithAttr = '<a href="' + arrayValues[i][j].myHref + '"' + tBlank + '>';
                        linkCloseTag = '</a>'
                    } else {
                        linkWithAttr = '<div class="t431__btnwrapper"><a href="' + arrayValues[i][j].myHref + '"' + tBlank + ' class="t-btn t-btn_sm"><table style="width:100%; height:100%"><tr><td>';
                        linkCloseTag = '</td></tr></table></a></div>'
                    }
                    html += ColWithAttr + linkWithAttr + arrayValues[i][j].myText + linkCloseTag + '</' + colTag + '>'
                } else {
                    html += ColWithAttr + arrayValues[i][j].myText + '</' + colTag + '>'
                }
            } else {
                html += '<' + colTag + ' class="t431__' + colTag + '" width="' + curWidth + '">' + '</' + colTag + '>'
            }
        }
        html += "</tr>"
    }
    html += "</" + tag + ">";
    return html
}

function t431_parseData(data) {
    if (data !== "" && typeof data != "undefined") {
        data = t431__addBrTag(data);
        var arrayTable = [];
        var arrayRow = [];
        var curItem = {
            myText: "",
            myHref: "",
            myHrefType: ""
        };
        var hasLink = "";
        var hasLinkWithSpace = "";
        var hasBtn = "";
        var hasBtnWithSpace = "";
        var endLine = "";
        for (var i = 0; i < data.length; i++) {
            if (data[i] == ";" && !(data.slice(i - 4, i) == "&lt;" || data.slice(i - 4, i) == "&gt;" || data.slice(i - 5, i) == "&amp;" || data.slice(i - 6, i) == "&nbsp;")) {
                arrayRow.push(curItem);
                curItem = {
                    myText: "",
                    myHref: ""
                };
                hasLink = "";
                hasLinkWithSpace = "";
                hasBtn = "";
                hasBtnWithSpace = ""
            } else {
                if (hasLink == "link=" || hasLinkWithSpace == " link=" || hasBtn == "button=" || hasBtnWithSpace == " button=") {
                    if (curItem.myHref === "" && hasLink === "link=") {
                        curItem.myText = curItem.myText.slice(0, -5);
                        curItem.myHrefType = "link"
                    } else {
                        if (curItem.myHref === "" && hasLinkWithSpace === " link=") {
                            curItem.myText = curItem.myText.slice(0, -6);
                            curItem.myHrefType = "link"
                        } else {
                            if (curItem.myHref === "" && hasBtn === "button=") {
                                curItem.myText = curItem.myText.slice(0, -7);
                                curItem.myHrefType = "btn"
                            } else {
                                if (curItem.myHref === "" && hasBtnWithSpace === " button=") {
                                    curItem.myText = curItem.myText.slice(0, -8);
                                    curItem.myHrefType = "btn"
                                }
                            }
                        }
                    }
                    curItem.myHref += (data[i])
                } else {
                    curItem.myText += (data[i]);
                    hasLink = t431__checkSubstr("link=", hasLink, data[i]);
                    hasLinkWithSpace = t431__checkSubstr(" link=", hasLinkWithSpace, data[i]);
                    hasBtn = t431__checkSubstr("button=", hasBtn, data[i]);
                    hasBtnWithSpace = t431__checkSubstr(" button=", hasBtnWithSpace, data[i])
                }
                endLine = t431__checkSubstr("<br />", endLine, data[i]);
                if (endLine == "<br />") {
                    if (curItem.myHref) {
                        curItem.myHref = curItem.myHref.slice(0, -6)
                    } else {
                        curItem.myText = curItem.myText.slice(0, -6)
                    }
                    arrayRow.push(curItem);
                    arrayTable.push(arrayRow);
                    curItem = {
                        myText: "",
                        myHref: ""
                    };
                    hasLink = "";
                    hasLinkWithSpace = "";
                    hasBtn = "";
                    hasBtnWithSpace = "";
                    arrayRow = []
                }
            }
        }
        if (arrayRow.length > 0 || curItem.myText !== "") {
            if (curItem !== "") {
                arrayRow.push(curItem)
            }
            arrayTable.push(arrayRow)
        }
    }
    return arrayTable
}

function t431__checkSubstr(targetSubstr, curSubstr, curSymbol) {
    if (!curSubstr && curSymbol == targetSubstr[0]) {
        return curSymbol
    } else {
        if (curSubstr) {
            for (var i = 0; i < (targetSubstr.length - 1); i++) {
                if (curSubstr[curSubstr.length - 1] == targetSubstr[i] && curSymbol == targetSubstr[i + 1]) {
                    return (curSubstr += curSymbol)
                }
            }
        }
    }
}

function t431__addBrTag(oldStringItem) {
    var newStringItem = "";
    for (var i = 0; i < oldStringItem.length; i++) {
        if (oldStringItem[i] == "\n" || oldStringItem[i] == "\r") {
            newStringItem += "<br />"
        } else {
            newStringItem += oldStringItem[i]
        }
    }
    return newStringItem.replace(/&nbsp;/g, 'В ')
}

function t431_createTable(recid, tablehead, tabledata, tablecolsize, hastargetblank, btnstyles, t431__tdstyles, t431__thstyles, t431__oddrowstyles, t431__evenrowstyles) {
    var t431__arrayColSize = t431_parseData(tablecolsize);
    var t431__arrayHead = t431_parseData(tablehead);
    var t431__arrayData = t431_parseData(tabledata);
    var t431__maxcolnumber = t431__findMaxRowLengthInTable(t431__arrayHead, t431__arrayData);
    var t431__colWidth = t431__setColumnsWidth(t431__arrayColSize, t431__maxcolnumber, recid);
    if (t431__colWidth[0].myText && t431__colWidth[0].myText[t431__colWidth[0].myText.length - 1] == "%") {
        for (var i = 0; i < t431__colWidth.length; i++) {
            t431__colWidth[i].myText = t431__colWidth[i].myText.slice(0, -1);
            t431__colWidth[i].myText += "vw"
        }
    }
    var t431__container = $('#rec' + recid + ' .t431 .t-container .t431__table');
    var t431__htmlTable = "";
    if (t431__arrayHead) {
        t431__htmlTable += t431__generateHtml(recid, t431__arrayHead, "th", hastargetblank, t431__colWidth, btnstyles, t431__thstyles, null, null, t431__maxcolnumber)
    }
    t431__container.append(t431__htmlTable);
    t431__htmlTable = "";
    if (t431__arrayData) {
        t431__htmlTable += t431__generateHtml(recid, t431__arrayData, "td", hastargetblank, t431__colWidth, btnstyles, t431__tdstyles, t431__oddrowstyles, t431__evenrowstyles, t431__maxcolnumber)
    }
    t431__container.append(t431__htmlTable)
}

function t431__generateHtml(recid, arrayValues, coltag, hastargetblank, colWidth, btnstyles, colstyles, oddrowstyles, evenrowstyles, maxcolnumber) {
    var t431__htmlpart = "";
    if (coltag == "td") {
        var t431__theadorbodytag = "tbody"
    } else {
        var t431__theadorbodytag = "thead"
    }
    t431__htmlpart += '<' + t431__theadorbodytag + ' class="t431__' + t431__theadorbodytag + '">';
    var t431__firstbodyrowstyle = "";
    if ($('#rec' + recid + ' .t431 .t-container .t431__thead th').length > 0 && $('#rec' + recid + ' .t431 .t-container .t431__thead th').css("border-bottom-width")[0] != "0") {
        t431__firstbodyrowstyle = "border-top: 0 !important;"
    }
    for (var i = 0; i < arrayValues.length; i++) {
        if (coltag == "td") {
            if ((i + 1) % 2 > 0) {
                t431__htmlpart += "<tr class=\"t431__oddrow\"" + "style=\"" + oddrowstyles + "\">"
            } else {
                t431__htmlpart += "<tr class=\"t431__evenrow\"" + "style=\"" + evenrowstyles + "\">"
            }
        } else {
            t431__htmlpart += "<tr>"
        }
        var t431__addingcols = 0;
        if (arrayValues[i].length < maxcolnumber) {
            t431__addingcols = maxcolnumber - arrayValues[i].length
        }
        for (var j = 0; j < (arrayValues[i].length + t431__addingcols); j++) {
            if (arrayValues[i][j]) {
                if (Array.isArray(colWidth) && colWidth[j]) {
                    var t431__curWidth = colWidth[j].myText
                } else {
                    var t431__curWidth = colWidth
                }
                if (i == 0 && coltag == "td") {
                    var t431__colwithattr = "<" + coltag + " class=\"t431__" + coltag + "\" style=\"width:" + t431__curWidth + ";" + colstyles + t431__firstbodyrowstyle + "\">"
                } else {
                    var t431__colwithattr = "<" + coltag + " class=\"t431__" + coltag + "\" style=\"width:" + t431__curWidth + ";" + colstyles + "\">"
                }
                if (arrayValues[i][j].myHref) {
                    var t431__tblank = "";
                    if (hastargetblank) {
                        var t431__tblank = "target=\"_blank\""
                    }
                    if (arrayValues[i][j].myHrefType == "link") {
                        var t431__linkwithattr = "<a href=\"" + arrayValues[i][j].myHref + "\"" + t431__tblank + ">";
                        var t431__linkclosetag = "</a>"
                    } else {
                        var t431__linkwithattr = "<div class=\"t431__btnwrapper\"><a href=\"" + arrayValues[i][j].myHref + "\"" + t431__tblank + " class=\"t-btn t-btn_sm\" style=\"" + btnstyles + "\"><table style=\"width:100%; height:100%;\"><tr><td>";
                        var t431__linkclosetag = "</td></tr></table></a></div>"
                    }
                    t431__htmlpart += t431__colwithattr + t431__linkwithattr + arrayValues[i][j].myText + t431__linkclosetag + "</" + coltag + ">"
                } else {
                    t431__htmlpart += t431__colwithattr + arrayValues[i][j].myText + "</" + coltag + ">"
                }
            } else {
                t431__htmlpart += "<" + coltag + " class=\"t431__" + coltag + "\" style=\"width:" + t431__curWidth + ";" + colstyles + "\">" + "</" + coltag + ">"
            }
        }
        t431__htmlpart += "</tr>"
    }
    t431__htmlpart += "</" + t431__theadorbodytag + ">";
    return t431__htmlpart
}

function t446_init(recid) {
    var el = $('#rec' + recid);
    var mobile = el.find('.t446__mobile');
    var fixedBlock = mobile.css('position') === 'fixed' && mobile.css('display') === 'block';
    setTimeout(function () {
        el.find('.t-menu__link-item:not(.t-menusub__target-link):not(.tooltipstered):not(.t794__tm-link)').on('click', function () {
            if ($(this).is(".t-menu__link-item.tooltipstered, .t-menu__link-item.t-menusub__target-link, .t-menu__link-item.t794__tm-link")) {
                return
            }
            if (fixedBlock) {
                mobile.trigger('click')
            }
        });
        el.find('.t-menusub__link-item').on('click', function () {
            if (fixedBlock) {
                mobile.trigger('click')
            }
        })
    }, 500)
}

function t446_setLogoPadding(recid) {
    if ($(window).width() > 980) {
        var t446__menu = $('#rec' + recid + ' .t446');
        var t446__logo = t446__menu.find('.t446__logowrapper');
        var t446__leftpart = t446__menu.find('.t446__leftwrapper');
        var t446__rightpart = t446__menu.find('.t446__rightwrapper');
        t446__leftpart.css("padding-right", t446__logo.width() / 2 + 50);
        t446__rightpart.css("padding-left", t446__logo.width() / 2 + 50)
    }
}

function t446_checkOverflow(recid, menuheight) {
    var t446__menu = $('#rec' + recid + ' .t446');
    var t446__rightwr = t446__menu.find('.t446__rightwrapper');
    var t446__rightmenuwr = t446__rightwr.find('.t446__rightmenuwrapper');
    var t446__rightadditionalwr = t446__rightwr.find('.t446__additionalwrapper');
    var t446__burgeroverflow = t446__rightwr.find('.t446__burgerwrapper_overflow');
    var t446__burgerwithoutoverflow = t446__rightwr.find('.t446__burgerwrapper_withoutoverflow');
    if (menuheight > 0) {
        var t446__height = menuheight
    } else {
        var t446__height = 80
    }
    if ($(window).width() > 980 && (t446__rightmenuwr.width() + t446__rightadditionalwr.width()) > t446__rightwr.width()) {
        t446__menu.css("height", t446__height * 2);
        t446__rightadditionalwr.css("float", "right");
        t446__burgeroverflow.css("display", "table-cell");
        t446__burgerwithoutoverflow.css("display", "none")
    } else {
        if (t446__menu.height() > t446__height) {
            t446__menu.css("height", t446__height)
        }
        if (t446__rightadditionalwr.css("float") == "right") {
            t446__rightadditionalwr.css("float", "none")
        }
        t446__burgeroverflow.css("display", "none");
        t446__burgerwithoutoverflow.css("display", "table-cell")
    }
}

function t446_highlight() {
    var url = window.location.href;
    var pathname = window.location.pathname;
    if (url.substr(url.length - 1) == "/") {
        url = url.slice(0, -1)
    }
    if (pathname.substr(pathname.length - 1) == "/") {
        pathname = pathname.slice(0, -1)
    }
    if (pathname.charAt(0) == "/") {
        pathname = pathname.slice(1)
    }
    if (pathname == "") {
        pathname = "/"
    }
    $(".t446__list_item a[href='" + url + "']").addClass("t-active");
    $(".t446__list_item a[href='" + url + "/']").addClass("t-active");
    $(".t446__list_item a[href='" + pathname + "']").addClass("t-active");
    $(".t446__list_item a[href='/" + pathname + "']").addClass("t-active");
    $(".t446__list_item a[href='" + pathname + "/']").addClass("t-active");
    $(".t446__list_item a[href='/" + pathname + "/']").addClass("t-active")
}

function t446_checkAnchorLinks(recid) {
    if ($(window).width() >= 960) {
        var t446_navLinks = $("#rec" + recid + " .t446__list_item a:not(.tooltipstered)[href*='#']");
        if (t446_navLinks.length > 0) {
            t446_catchScroll(t446_navLinks)
        }
    }
}

function t446_catchScroll(t446_navLinks) {
    var t446_clickedSectionId = null,
        t446_sections = new Array(),
        t446_sectionIdTonavigationLink = [],
        t446_interval = 100,
        t446_lastCall, t446_timeoutId;
    t446_navLinks = $(t446_navLinks.get().reverse());
    t446_navLinks.each(function () {
        var t446_cursection = t446_getSectionByHref($(this));
        if (typeof t446_cursection.attr("id") != "undefined") {
            t446_sections.push(t446_cursection)
        }
        t446_sectionIdTonavigationLink[t446_cursection.attr("id")] = $(this)
    });
    t446_updateSectionsOffsets(t446_sections);
    t446_sections.sort(function (a, b) {
        return b.attr("data-offset-top") - a.attr("data-offset-top")
    });
    $(window).bind('resize', t_throttle(function () {
        t446_updateSectionsOffsets(t446_sections)
    }, 200));
    $('.t446').bind('displayChanged', function () {
        t446_updateSectionsOffsets(t446_sections)
    });
    setInterval(function () {
        t446_updateSectionsOffsets(t446_sections)
    }, 5000);
    t446_highlightNavLinks(t446_navLinks, t446_sections, t446_sectionIdTonavigationLink, t446_clickedSectionId);
    t446_navLinks.click(function () {
        var t446_clickedSection = t446_getSectionByHref($(this));
        if (!$(this).hasClass("tooltipstered") && typeof t446_clickedSection.attr("id") != "undefined") {
            t446_navLinks.removeClass('t-active');
            $(this).addClass('t-active');
            t446_clickedSectionId = t446_getSectionByHref($(this)).attr("id")
        }
    });
    $(window).scroll(function () {
        var t446_now = new Date().getTime();
        if (t446_lastCall && t446_now < (t446_lastCall + t446_interval)) {
            clearTimeout(t446_timeoutId);
            t446_timeoutId = setTimeout(function () {
                t446_lastCall = t446_now;
                t446_clickedSectionId = t446_highlightNavLinks(t446_navLinks, t446_sections, t446_sectionIdTonavigationLink, t446_clickedSectionId)
            }, t446_interval - (t446_now - t446_lastCall))
        } else {
            t446_lastCall = t446_now;
            t446_clickedSectionId = t446_highlightNavLinks(t446_navLinks, t446_sections, t446_sectionIdTonavigationLink, t446_clickedSectionId)
        }
    })
}

function t446_updateSectionsOffsets(sections) {
    $(sections).each(function () {
        var t446_curSection = $(this);
        t446_curSection.attr("data-offset-top", t446_curSection.offset().top)
    })
}

function t446_getSectionByHref(curlink) {
    var t446_curLinkValue = curlink.attr("href").replace(/\s+/g, '');
    if (t446_curLinkValue[0] == '/') {
        t446_curLinkValue = t446_curLinkValue.substring(1)
    }
    if (curlink.is('[href*="#rec"]')) {
        return $(".r[id='" + t446_curLinkValue.substring(1) + "']")
    } else {
        return $(".r[data-record-type='215']").has("a[name='" + t446_curLinkValue.substring(1) + "']")
    }
}

function t446_highlightNavLinks(t446_navLinks, t446_sections, t446_sectionIdTonavigationLink, t446_clickedSectionId) {
    var t446_scrollPosition = $(window).scrollTop(),
        t446_valueToReturn = t446_clickedSectionId;
    if (t446_sections.length != 0 && t446_clickedSectionId == null && t446_sections[t446_sections.length - 1].attr("data-offset-top") > (t446_scrollPosition + 300)) {
        t446_navLinks.removeClass('t-active');
        return null
    }
    $(t446_sections).each(function (e) {
        var t446_curSection = $(this),
            t446_sectionTop = t446_curSection.attr("data-offset-top"),
            t446_id = t446_curSection.attr('id'),
            t446_navLink = t446_sectionIdTonavigationLink[t446_id];
        if (((t446_scrollPosition + 300) >= t446_sectionTop) || (t446_sections[0].attr("id") == t446_id && t446_scrollPosition >= $(document).height() - $(window).height())) {
            if (t446_clickedSectionId == null && !t446_navLink.hasClass('t-active')) {
                t446_navLinks.removeClass('t-active');
                t446_navLink.addClass('t-active');
                t446_valueToReturn = null
            } else {
                if (t446_clickedSectionId != null && t446_id == t446_clickedSectionId) {
                    t446_valueToReturn = null
                }
            }
            return !1
        }
    });
    return t446_valueToReturn
}

function t446_setPath() {}

function t446_setBg(recid) {
    var window_width = $(window).width();
    if (window_width > 980) {
        $(".t446").each(function () {
            var el = $(this);
            if (el.attr('data-bgcolor-setbyscript') == "yes") {
                var bgcolor = el.attr("data-bgcolor-rgba");
                el.css("background-color", bgcolor)
            }
        })
    } else {
        $(".t446").each(function () {
            var el = $(this);
            var bgcolor = el.attr("data-bgcolor-hex");
            el.css("background-color", bgcolor);
            el.attr("data-bgcolor-setbyscript", "yes")
        })
    }
}

function t446_appearMenu(recid) {
    var window_width = $(window).width();
    if (window_width > 980) {
        $(".t446").each(function () {
            var el = $(this);
            var appearoffset = el.attr("data-appearoffset");
            if (appearoffset != "") {
                if (appearoffset.indexOf('vh') > -1) {
                    appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)))
                }
                appearoffset = parseInt(appearoffset, 10);
                if ($(window).scrollTop() >= appearoffset) {
                    if (el.css('visibility') == 'hidden') {
                        el.finish();
                        el.css("top", "-50px");
                        el.css("visibility", "visible");
                        el.animate({
                            "opacity": "1",
                            "top": "0px"
                        }, 200, function () {})
                    }
                } else {
                    el.stop();
                    el.css("visibility", "hidden")
                }
            }
        })
    }
}

function t446_changebgopacitymenu(recid) {
    var window_width = $(window).width();
    if (window_width > 980) {
        $(".t446").each(function () {
            var el = $(this);
            var bgcolor = el.attr("data-bgcolor-rgba");
            var bgcolor_afterscroll = el.attr("data-bgcolor-rgba-afterscroll");
            var bgopacityone = el.attr("data-bgopacity");
            var bgopacitytwo = el.attr("data-bgopacity-two");
            var menushadow = el.attr("data-menushadow");
            if (menushadow == '100') {
                var menushadowvalue = menushadow
            } else {
                var menushadowvalue = '0.' + menushadow
            }
            if ($(window).scrollTop() > 20) {
                el.css("background-color", bgcolor_afterscroll);
                if (bgopacitytwo == '0' || menushadow == ' ') {
                    el.css("box-shadow", "none")
                } else {
                    el.css("box-shadow", "0px 1px 3px rgba(0,0,0," + menushadowvalue + ")")
                }
            } else {
                el.css("background-color", bgcolor);
                if (bgopacityone == '0.0' || menushadow == ' ') {
                    el.css("box-shadow", "none")
                } else {
                    el.css("box-shadow", "0px 1px 3px rgba(0,0,0," + menushadowvalue + ")")
                }
            }
        })
    }
}

function t446_createMobileMenu(recid) {
    var window_width = $(window).width(),
        el = $("#rec" + recid),
        menu = el.find(".t446"),
        burger = el.find(".t446__mobile");
    burger.click(function (e) {
        menu.fadeToggle(300);
        $(this).toggleClass("t446_opened")
    });
    $(window).bind('resize', t_throttle(function () {
        window_width = $(window).width();
        if (window_width > 980) {
            menu.fadeIn(0)
        }
    }, 200));
    el.find('.t-menu__link-item').on('click', function () {
        t446_hideMenuOnMobile($(this), el)
    });
    el.find('.t446__logowrapper2 a').on('click', function () {
        t446_hideMenuOnMobile($(this), el)
    })
}

function t446_hideMenuOnMobile($this, el) {
    if ($(window).width() < 960) {
        var url = $this.attr('href').trim();
        var menu = el.find('.t446');
        var burger = el.find('.t446__mobile');
        if (url.length && url[0] === '#') {
            burger.removeClass('t446_opened');
            menu.fadeOut(300);
            return !0
        }
    }
}

function t450_showMenu(recid) {
    var el = $('#rec' + recid);
    $('body').addClass('t450__body_menushowed');
    el.find('.t450').addClass('t450__menu_show');
    el.find('.t450__overlay').addClass('t450__menu_show');
    $('.t450').bind('clickedAnchorInTooltipMenu', function () {
        t450_closeMenu()
    });
    el.find('.t450__overlay, .t450__close, a[href*=#]').click(function () {
        var url = $(this).attr('href');
        if (typeof url != 'undefined' && url != '' && (url.substring(0, 7) == '#price:' || url.substring(0, 9) == '#submenu:')) {
            return
        }
        t450_closeMenu()
    });
    $(document).keydown(function (e) {
        if (e.keyCode == 27) {
            $('body').removeClass('t390__body_popupshowed');
            $('.t390').removeClass('t390__popup_show')
        }
    })
}

function t450_closeMenu() {
    $('body').removeClass('t450__body_menushowed');
    $('.t450').removeClass('t450__menu_show');
    $('.t450__overlay').removeClass('t450__menu_show')
}

function t450_checkSize(recid) {
    var el = $('#rec' + recid).find('.t450');
    var windowheight = $(window).height() - 80;
    var contentheight = el.find(".t450__top").height() + el.find(".t450__rightside").height();
    if (contentheight > windowheight) {
        setTimeout(function () {
            el.addClass('t450__overflowed');
            el.find(".t450__container").css('height', 'auto')
        }, 200)
    }
}

function t450_appearMenu(recid) {
    var el = $('#rec' + recid);
    var burger = el.find(".t450__burger_container");
    burger.each(function () {
        var el = $(this);
        var appearoffset = el.attr("data-appearoffset");
        var hideoffset = el.attr("data-hideoffset");
        if (appearoffset != "") {
            if (appearoffset.indexOf('vh') > -1) {
                appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)))
            }
            appearoffset = parseInt(appearoffset, 10);
            if ($(window).scrollTop() >= appearoffset) {
                if (el.hasClass('t450__beforeready')) {
                    el.finish();
                    el.removeClass("t450__beforeready")
                }
            } else {
                el.stop();
                el.addClass("t450__beforeready")
            }
        }
        if (hideoffset != "") {
            if (hideoffset.indexOf('vh') > -1) {
                hideoffset = Math.floor((window.innerHeight * (parseInt(hideoffset) / 100)))
            }
            hideoffset = parseInt(hideoffset, 10);
            if ($(window).scrollTop() + $(window).height() >= $(document).height() - hideoffset) {
                if (!el.hasClass('t450__beforeready')) {
                    el.finish();
                    el.addClass("t450__beforeready")
                }
            } else {
                if (appearoffset != "") {
                    if ($(window).scrollTop() >= appearoffset) {
                        el.stop();
                        el.removeClass("t450__beforeready")
                    }
                } else {
                    el.stop();
                    el.removeClass("t450__beforeready")
                }
            }
        }
    })
}

function t450_initMenu(recid) {
    var el = $('#rec' + recid).find('.t450');
    var hook = el.attr('data-tooltip-hook');
    if (hook !== '') {
        var obj = $('a[href="' + hook + '"]');
        obj.click(function (e) {
            t450_closeMenu();
            t450_showMenu(recid);
            t450_checkSize(recid);
            e.preventDefault()
        })
    }
    $('#rec' + recid).find('.t450__burger_container').click(function (e) {
        t450_closeMenu();
        t450_showMenu(recid);
        t450_checkSize(recid)
    });
    if (isMobile) {
        $('#rec' + recid).find('.t-menu__link-item').each(function () {
            var $this = $(this);
            if ($this.hasClass('t450__link-item_submenu')) {
                $this.on('click', function () {
                    setTimeout(function () {
                        t450_checkSize(recid)
                    }, 100)
                })
            }
        })
    }
    t450_highlight()
}

function t450_highlight() {
    var url = window.location.href;
    var pathname = window.location.pathname;
    if (url.substr(url.length - 1) == "/") {
        url = url.slice(0, -1)
    }
    if (pathname.substr(pathname.length - 1) == "/") {
        pathname = pathname.slice(0, -1)
    }
    if (pathname.charAt(0) == "/") {
        pathname = pathname.slice(1)
    }
    if (pathname == "") {
        pathname = "/"
    }
    $(".t450__menu a[href='" + url + "']").addClass("t-active");
    $(".t450__menu a[href='" + url + "/']").addClass("t-active");
    $(".t450__menu a[href='" + pathname + "']").addClass("t-active");
    $(".t450__menu a[href='/" + pathname + "']").addClass("t-active");
    $(".t450__menu a[href='" + pathname + "/']").addClass("t-active");
    $(".t450__menu a[href='/" + pathname + "/']").addClass("t-active")
}

function t498_unifyHeights(recid) {
    $('#rec' + recid + ' .t498 .t-container').each(function () {
        var t498__highestBox = 0;
        $('.t498__col', this).each(function () {
            var t498__curcol = $(this);
            var t498__curcolchild = t498__curcol.find('.t498__col-wrapper');
            if (t498__curcol.height() < t498__curcolchild.height()) t498__curcol.height(t498__curcolchild.height());
            if (t498__curcol.height() > t498__highestBox) t498__highestBox = t498__curcol.height()
        });
        if ($(window).width() >= 960) {
            $('.t498__col', this).css('height', t498__highestBox)
        } else {
            $('.t498__col', this).css('height', "auto")
        }
    })
};

function t509_setHeight(recid) {
    var t509__el = $("#rec" + recid);
    var t509__image = t509__el.find(".t509__blockimg");
    t509__image.each(function () {
        var t509__width = $(this).attr("data-image-width");
        var t509__height = $(this).attr("data-image-height");
        var t509__ratio = t509__height / t509__width;
        var t509__padding = t509__ratio * 100;
        $(this).css("padding-bottom", t509__padding + "%")
    });
    if ($(window).width() > 960) {
        var t509__textwr = t509__el.find(".t509__textwrapper");
        var t509__deskimg = t509__el.find(".t509__desktopimg");
        t509__textwr.each(function () {
            $(this).css("height", t509__deskimg.innerHeight())
        })
    }
}

function t545_setHeight(recid) {
    var el = $('#rec' + recid);
    var t545_height = el.find('.t-container').attr("data-height");
    el.find('.t-container').each(function () {
        var highestBox = 0;
        $('.t545__col', this).each(function () {
            if ($(this).height() > highestBox) {
                highestBox = $(this).height()
            }
        });
        if (t545_height > highestBox) {
            highestBox = t545_height
        }
        $('.t545__textwrapper', this).css('height', highestBox);
        $('.t545__blockimg', this).css('height', highestBox)
    })
}

function t552_init(recid, ratio) {
    var t552__el = $("#rec" + recid),
        t552__image = t552__el.find(".t552__blockimg:first");
    t552__setHeight(recid, t552__image, ratio);
    var t552__doResize;
    $(window).resize(function () {
        clearTimeout(t552__doResize);
        t552__doResize = setTimeout(function () {
            t552__setHeight(recid, t552__image, ratio)
        }, 200)
    })
}

function t552__setHeight(recid, image, ratio) {
    $("#rec" + recid + " .t552__blockimg").css("height", Math.round(image.innerWidth() * ratio))
}

function t570_init(recid) {
    if ($(window).width() > 750) {
        t570_setMapHeight(recid);
        $(window).load(function () {
            t570_setMapHeight(recid)
        });
        $(window).resize(function () {
            t570_setMapHeight(recid)
        })
    }
}

function t570_setMapHeight(recid) {
    var t570__el = $('#rec' + recid),
        t570__map = t570__el.find('.t-map');
    var t570__textwrapper = t570__el.find('.t570__col_text').height();
    t570__map.css('height', t570__textwrapper).trigger('sizechange')
}

function t585_init(recid) {
    var el = $('#rec' + recid);
    var toggler = el.find(".t585__header");
    var accordion = el.find('.t585__accordion');
    if (accordion) {
        accordion = accordion.attr('data-accordion')
    } else {
        accordion = "false"
    }
    toggler.click(function () {
        if (accordion === "true") {
            toggler.not(this).removeClass("t585__opened").next().slideUp()
        }
        $(this).toggleClass("t585__opened");
        $(this).next().slideToggle();
        if (window.lazy === 'y') {
            t_lazyload_update()
        }
    })
}

function t599_init(recid) {
    var el = $('#rec' + recid);
    if (el.find('.t599__title').length) {
        t599_equalHeight(el.find('.t599__title'))
    }
    if (el.find('.t599__descr').length) {
        t599_equalHeight(el.find('.t599__descr'))
    }
    if (el.find('.t599__price').length) {
        t599_equalHeight(el.find('.t599__price'))
    }
    if (el.find('.t599__subtitle').length) {
        t599_equalHeight(el.find('.t599__subtitle'))
    }
};

function t599_equalHeight(element) {
    var highestBox = 0;
    element.css('height', '');
    element.each(function () {
        if ($(this).height() > highestBox) highestBox = $(this).height()
    });
    if ($(window).width() >= 960) {
        element.css('height', highestBox)
    } else {
        element.css('height', '')
    }
}

function t604_init(recid) {
    var el = $('#rec' + recid);
    t604_imageHeight(recid);
    t604_arrowWidth(recid);
    t604_show(recid);
    t604_hide(recid);
    $(window).bind('resize', t_throttle(function () {
        t_onFuncLoad('t_slds_updateSlider', function () {
            t_slds_updateSlider(recid)
        });
        t604_arrowWidth(recid)
    }));
    el.find('.t604').bind('displayChanged', function () {
        t_onFuncLoad('t_slds_updateSlider', function () {
            t_slds_updateSlider(recid)
        });
        t604_arrowWidth(recid)
    })
}

function t604_show(recid) {
    var el = $("#rec" + recid),
        play = el.find('.t604__play');
    play.click(function () {
        if ($(this).attr('data-slider-video-type') == 'youtube') {
            var url = $(this).attr('data-slider-video-url');
            $(this).next().html("<iframe class=\"t604__iframe\" width=\"100%\" height=\"100%\" src=\"https://www.youtube.com/embed/" + url + "?autoplay=1\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>")
        }
        if ($(this).attr('data-slider-video-type') == 'vimeo') {
            var url = $(this).attr('data-slider-video-url');
            $(this).next().html("<iframe class=\"t604__iframe\" width=\"100%\" height=\"100%\" src=\"https://player.vimeo.com/video/" + url + "?autoplay=1\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>")
        }
        $(this).next().css('z-index', '3')
    })
}

function t604_hide(recid) {
    var el = $("#rec" + recid),
        body = el.find('.t604__frame');
    el.on('updateSlider', function () {
        body.html('').css('z-index', '')
    })
}

function t604_imageHeight(recid) {
    var el = $("#rec" + recid);
    var image = el.find(".t604__separator");
    image.each(function () {
        var width = $(this).attr("data-slider-image-width");
        var height = $(this).attr("data-slider-image-height");
        var ratio = height / width;
        var padding = ratio * 100;
        $(this).css("padding-bottom", padding + "%")
    })
}

function t604_arrowWidth(recid) {
    var el = $("#rec" + recid),
        arrow = el.find('.t-slds__arrow_wrapper'),
        slideWidth = el.find('.t-slds__wrapper').width(),
        windowWidth = $(window).width(),
        arrowWidth = windowWidth - slideWidth;
    if (windowWidth > 960) {
        arrow.css('width', arrowWidth / 2)
    } else {
        arrow.css('width', '')
    }
}

function t608_setHeight(recid) {
    var el = $("#rec" + recid);
    var image = el.find(".t608__bgimg");
    image.each(function () {
        var width = $(this).attr("data-image-width");
        var height = $(this).attr("data-image-height");
        var ratio = height / width;
        var padding = ratio * 100;
        $(this).css("padding-bottom", padding + "%")
    })
}

function t616_init(recid) {
    var el = $('#rec' + recid);
    if (el.find('.t616__title').length) {
        t616_equalHeight(el.find('.t616__title'))
    }
    if (el.find('.t616__text').length) {
        t616_equalHeight(el.find('.t616__text'))
    }
    if (el.find('.t616__price').length) {
        t616_equalHeight(el.find('.t616__price'))
    }
    t616_equalHeight(el.find('.t616__header'))
};

function t616_equalHeight(element) {
    var highestBox = 0;
    element.css('height', '');
    element.each(function () {
        if ($(this).height() > highestBox) highestBox = $(this).height()
    });
    if ($(window).width() >= 960) {
        element.css('height', highestBox)
    } else {
        element.css('height', '')
    }
}

function t635_init(recid) {
    var el = $("#rec" + recid);
    var data = el.find(".t635__textholder");
    var animRecId = data.attr("data-recid");
    var screenmin = parseInt($("#rec" + animRecId).attr("data-screen-min"), 10);
    var screenmax = parseInt($("#rec" + animRecId).attr("data-screen-max"), 10);
    if (isNaN(screenmax) && isNaN(screenmin)) {
        t635_startType(recid)
    } else if (!isNaN(screenmax) && !isNaN(screenmin)) {
        if ($(window).width() >= screenmin && $(window).width() <= screenmax) {
            t635_startType(recid)
        }
    } else if (!isNaN(screenmax)) {
        if ($(window).width() <= screenmax) {
            t635_startType(recid)
        }
    } else if (!isNaN(screenmin)) {
        if ($(window).width() >= screenmin) {
            t635_startType(recid)
        }
    }
}

function t635_startType(recid) {
    var t635_el = $('#rec' + recid),
        t635_data = t635_el.find(".t635__textholder"),
        t635_animRecId = t635_data.attr("data-recid"),
        t635_animText = t635_findAnimElem(t635_animRecId),
        t635_phrasesList = [],
        t635_phrase1 = t635_data.attr("data-text1"),
        t635_phrase2 = t635_data.attr("data-text2"),
        t635_phrase3 = t635_data.attr("data-text3"),
        t635_phrase4 = t635_data.attr("data-text4"),
        t635_phrase5 = t635_data.attr("data-text5"),
        t635_speed = t635_data.attr("data-speed"),
        t635_loop = t635_data.attr("data-loop"),
        t635_backspaceDelay = t635_data.attr("data-backspacing-delay");
    if (typeof t635_animText == "undefined") {
        return
    }
    if (typeof t635_phrase1 != "undefined") {
        t635_phrasesList.push(t635_phrase1.slice(0, 80))
    }
    if (typeof t635_phrase2 != "undefined") {
        t635_phrasesList.push(t635_phrase2.slice(0, 80))
    }
    if (typeof t635_phrase3 != "undefined") {
        t635_phrasesList.push(t635_phrase3.slice(0, 80))
    }
    if (typeof t635_phrase4 != "undefined") {
        t635_phrasesList.push(t635_phrase4.slice(0, 80))
    }
    if (typeof t635_phrase5 != "undefined") {
        t635_phrasesList.push(t635_phrase5.slice(0, 80))
    }
    if (t635_animText.length !== 0 && t635_phrasesList.length !== 0) {
        var t635_animTextHtml = t635_animText.html(),
            t635_animTextSplitted = t635_animTextHtml.split("|"),
            t635_curWin = $(window);
        t635_animText.html(t635_animTextSplitted[0] + "<span class=\"t635__typing-text\"></span>" + t635_animTextSplitted[1]);
        t635_updateAnimTextLimits(t635_animRecId);
        t635_curWin.bind('resize', t_throttle(function () {
            t635_updateAnimTextLimits(t635_animRecId)
        }, 200));
        var intervalUpdate = setInterval(function () {
            t635_updateAnimTextLimits(t635_animRecId)
        }, 5000);
        var t635_animatedText = $("#rec" + t635_animRecId + " .t635__typing-text"),
            t635_animTextTop = t635_animatedText.attr("data-top-limit"),
            t635_animTextBottom = t635_animatedText.attr("data-bottom-limit"),
            t635_winTop = t635_curWin.scrollTop(),
            t635_winBottom = t635_winTop + t635_curWin.height();
        t635_animateText(t635_animRecId, t635_phrasesList, t635_speed, t635_loop, t635_backspaceDelay);
        if (t635_animTextBottom < t635_winTop || t635_animTextTop > t635_winBottom) {
            $("#rec" + t635_animRecId + " .t635__typing-text").data('typed').pauseTyping();
            $("#rec" + t635_animRecId + " .t635__typing-text").html("")
        }
        t635_curWin.bind('scroll', t_throttle(function () {
            t635_animTextTop = t635_animatedText.attr("data-top-limit");
            t635_animTextBottom = t635_animatedText.attr("data-bottom-limit");
            t635_winTop = t635_curWin.scrollTop();
            t635_winBottom = t635_winTop + t635_curWin.height();
            if (t635_animTextBottom < t635_winTop || t635_animTextTop > t635_winBottom) {
                $("#rec" + t635_animRecId + " .t635__typing-text").data('typed').pauseTyping();
                $("#rec" + t635_animRecId + " .t635__typing-text").html("")
            } else {
                $("#rec" + t635_animRecId + " .t635__typing-text").data('typed').continueTyping()
            }
        }, 200))
    }
}

function t635_findAnimElem(animRecId) {
    var animRec = $("#rec" + animRecId);
    var animH1 = animRec.find("h1:contains(\'|\')").last();
    var animH2 = animRec.find("h2:contains(\'|\')").last();
    var animH3 = animRec.find("h3:contains(\'|\')").last();
    var animDiv = animRec.find("div:contains(\'|\')").last();
    if (typeof animH1 != "undefined" && animH1.length > 0) {
        return animH1
    }
    if (typeof animH2 != "undefined" && animH2.length > 0) {
        return animH2
    }
    if (typeof animH3 != "undefined" && animH3.length > 0) {
        return animH3
    }
    if (typeof animDiv != "undefined" && animDiv.length > 0) {
        return animDiv
    }
}

function t635_updateAnimTextLimits(t635_animRecId) {
    var t635_animatedBlock = $("#rec" + t635_animRecId),
        t635_animatedText = t635_animatedBlock.find(".t635__typing-text");
    if (typeof t635_animatedText.offset() != 'undefined') {
        t635_animatedText.attr("data-top-limit", t635_animatedText.offset().top);
        t635_animatedText.attr("data-bottom-limit", (t635_animatedBlock.offset().top + t635_animatedBlock.height()))
    }
}

function t635_animateText(t635_animRecId, t635_phrasesList, t635_speed, t635_loop, t635_backspaceDelay) {
    if (typeof t635_speed == "undefined") {
        t635_speed = 40
    }
    if (typeof t635_backspaceDelay == "undefined") {
        t635_backspaceDelay = 800
    }
    if (typeof t635_loop == "undefined") {
        t635_loop = !0
    } else {
        t635_loop = !1
    }
    $("#rec" + t635_animRecId + " .t635__typing-text").typed({
        strings: t635_phrasesList,
        typeSpeed: t635_speed * 1,
        startDelay: 600,
        backSpeed: 10,
        backDelay: t635_backspaceDelay * 1,
        loop: t635_loop,
        contentType: 'text'
    })
}

function t650_unifyHeights(recid) {
    if ($(window).width() >= 960) {
        $('#rec' + recid + ' .t650 .t-container .t650__row').each(function () {
            var t650_highestBox = 0,
                t650_currow = $(this);
            $('.t650__inner-col', this).each(function () {
                var t650_curCol = $(this),
                    t650_curText = t650_curCol.find(".t650__text"),
                    t650_curBtn = t650_curCol.find(".t650__btn-container"),
                    t650_curColHeight = t650_curText.outerHeight() + t650_curBtn.outerHeight();
                if (t650_curColHeight > t650_highestBox) {
                    t650_highestBox = t650_curColHeight
                }
            });
            $('.t650__inner-col', this).css('height', t650_highestBox)
        })
    } else {
        $('.t650__inner-col').css('height', 'auto')
    }
}

function t668_init(recid) {
    var el = $('#rec' + recid);
    var toggler = el.find(".t668__header");
    var accordion = el.find('.t668__accordion');
    if (accordion) {
        accordion = accordion.attr('data-accordion')
    } else {
        accordion = "false"
    }
    toggler.click(function () {
        if (accordion === "true") {
            toggler.not(this).removeClass("t668__opened").next().slideUp()
        }
        $(this).toggleClass("t668__opened");
        $(this).next().slideToggle();
        if (window.lazy === 'y') {
            t_lazyload_update()
        }
    })
}

function t670_init(recid) {
    t670_imageHeight(recid);
    t670_show(recid);
    t670_hide(recid)
}

function t670_show(recid) {
    var el = $('#rec' + recid);
    var play = el.find('.t670__play');
    play.click(function () {
        if ($(this).attr('data-slider-video-type') == 'youtube') {
            var url = $(this).attr('data-slider-video-url');
            $(this).next().html("<iframe class=\"t670__iframe\" width=\"100%\" height=\"100%\" src=\"https://www.youtube.com/embed/" + url + "?autoplay=1\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>")
        }
        if ($(this).attr('data-slider-video-type') == 'vimeo') {
            var url = $(this).attr('data-slider-video-url');
            $(this).next().html("<iframe class=\"t670__iframe\" width=\"100%\" height=\"100%\" src=\"https://player.vimeo.com/video/" + url + "\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen></iframe>")
        }
        $(this).next().css('z-index', '3')
    })
}

function t670_hide(recid) {
    var el = $('#rec' + recid);
    var body = el.find('.t670__frame');
    el.on('updateSlider', function () {
        body.html('').css('z-index', '')
    })
}

function t670_imageHeight(recid) {
    var el = $('#rec' + recid);
    var image = el.find('.t670__separator');
    image.each(function () {
        var width = $(this).attr('data-slider-image-width');
        var height = $(this).attr('data-slider-image-height');
        var ratio = height / width;
        var padding = ratio * 100;
        $(this).css('padding-bottom', padding + '%')
    })
}

function t675_init(recid) {
    var el = $("#rec" + recid),
        textwrapper = el.find('.t675__textwrapper'),
        dots = el.find('.t-slds__bullet_wrapper');
    textwrapper.css('margin-bottom', dots.outerHeight() + 7)
}

function t678_onSuccess(t678_form) {
    var t678_inputsWrapper = t678_form.find('.t-form__inputsbox');
    var t678_inputsHeight = t678_inputsWrapper.height();
    var t678_inputsOffset = t678_inputsWrapper.offset().top;
    var t678_inputsBottom = t678_inputsHeight + t678_inputsOffset;
    var t678_targetOffset = t678_form.find('.t-form__successbox').offset().top;
    if ($(window).width() > 960) {
        var t678_target = t678_targetOffset - 200
    } else {
        var t678_target = t678_targetOffset - 100
    }
    if (t678_targetOffset > $(window).scrollTop() || ($(document).height() - t678_inputsBottom) < ($(window).height() - 100)) {
        t678_inputsWrapper.addClass('t678__inputsbox_hidden');
        setTimeout(function () {
            if ($(window).height() > $('.t-body').height()) {
                $('.t-tildalabel').animate({
                    opacity: 0
                }, 50)
            }
        }, 300)
    } else {
        $('html, body').animate({
            scrollTop: t678_target
        }, 400);
        setTimeout(function () {
            t678_inputsWrapper.addClass('t678__inputsbox_hidden')
        }, 400)
    }
    var successurl = t678_form.data('success-url');
    if (successurl && successurl.length > 0) {
        setTimeout(function () {
            window.location.href = successurl
        }, 500)
    }
}

function t686_init(recid) {
    setTimeout(function () {
        t686_setHeight(recid)
    }, 500);
    var t686__doResize;
    $(window).resize(function () {
        clearTimeout(t686__doResize);
        t686__doResize = setTimeout(function () {
            t686_setHeight(recid)
        }, 200)
    })
}

function t686_setHeight(recid) {
    var t686_el = $('#rec' + recid + ' .t686'),
        t686_ratio = t686_el.attr('data-tile-ratio'),
        t686_ratioHeight = t686_el.find('.t686__col').width() * t686_ratio;
    t686_el.find('.t686__row').each(function () {
        var t686_largestHeight = 0,
            t686_currow = $(this);
        $('.t686__table', this).each(function () {
            var t686_curCol = $(this),
                t686_curColHeight = t686_curCol.find(".t686__textwrapper").outerHeight();
            if ($(this).find(".t686__cell").hasClass("t686__button-bottom")) {
                t686_curColHeight += t686_curCol.find(".t686__button-container").outerHeight()
            }
            if (t686_curColHeight > t686_largestHeight) {
                t686_largestHeight = t686_curColHeight
            }
        });
        if ($(window).width() >= 960) {
            if (t686_largestHeight > t686_ratioHeight) {
                $('.t686__table', this).css('height', t686_largestHeight)
            } else {
                $('.t686__table', this).css('height', t686_ratioHeight)
            }
            $('.t686__table', this).css('min-height', 'auto')
        } else {
            $('.t686__table', this).css('min-height', t686_ratioHeight);
            $('.t686__table', this).css('height', '')
        }
        if (t686_GetIEVersion() > 0) {
            var curRowHeight = $('.t686__table', this).css('height');
            $('.t686__bg', this).css('height', curRowHeight);
            $('.t686__overlay', this).css('height', curRowHeight)
        }
    })
}

function t686_GetIEVersion() {
    var sAgent = window.navigator.userAgent;
    var Idx = sAgent.indexOf("MSIE");
    if (Idx > 0) {
        return parseInt(sAgent.substring(Idx + 5, sAgent.indexOf(".", Idx)))
    } else {
        if (!!navigator.userAgent.match(/Trident\/7\./)) {
            return 11
        } else {
            return 0
        }
    }
}

function t688_unifyHeights(recid) {
    if ($(window).width() >= 960) {
        $('#rec' + recid + ' .t688 .t-container .t688__row').each(function () {
            var t688_highestBox = 0,
                t688_currow = $(this);
            $(':not(.t688__featured) .t688__inner-col', this).each(function () {
                var t688_curCol = $(this),
                    t688_curText = t688_curCol.find(".t688__textwrapper_inner"),
                    t688_curColHeight = t688_curText.outerHeight();
                if (t688_curColHeight > t688_highestBox) {
                    t688_highestBox = t688_curColHeight
                }
            });
            $('.t688__textwrapper', this).css('height', t688_highestBox);
            $('.t688__featured', this).css('height', $('.t688__col', this).height() + 'px')
        })
    } else {
        $('.t688__textwrapper').css('height', 'auto');
        $("#rec" + recid).find(".t688__featured").css({
            'height': ($("#rec" + recid).find(".t688__col").height() + 'px')
        })
    }
}

function t691_unifyHeights(recid) {
    if ($(window).width() >= 960) {
        $('#rec' + recid + ' .t691 .t-container .t691__row').each(function () {
            var t691__highestBox = 0;
            var t691__currow = $(this);
            $('.t691__col', this).each(function () {
                var t691__curcol = $(this);
                var t691__curcolinfo = t691__curcol.find('.t691__sectioninfowrapper');
                var t691__curcolpers = t691__curcol.find('.t691__personwrapper');
                var t691__curcolinnerheight = t691__curcolinfo.outerHeight() + t691__curcolpers.outerHeight();
                if (t691__curcolinnerheight > t691__highestBox) {
                    t691__highestBox = t691__curcolinnerheight
                }
            });
            $('.t691__col', this).css('height', t691__highestBox)
        })
    }
};

function t696_onSuccess(t696_form) {
    var t696_inputsWrapper = t696_form.find('.t-form__inputsbox');
    var t696_inputsHeight = t696_inputsWrapper.height();
    var t696_inputsOffset = t696_inputsWrapper.offset().top;
    var t696_inputsBottom = t696_inputsHeight + t696_inputsOffset;
    var t696_targetOffset = t696_form.find('.t-form__successbox').offset().top;
    if ($(window).width() > 960) {
        var t696_target = t696_targetOffset - 200
    } else {
        var t696_target = t696_targetOffset - 100
    }
    if (t696_targetOffset > $(window).scrollTop() || ($(document).height() - t696_inputsBottom) < ($(window).height() - 100)) {
        t696_inputsWrapper.addClass('t696__inputsbox_hidden');
        setTimeout(function () {
            if ($(window).height() > $('.t-body').height()) {
                $('.t-tildalabel').animate({
                    opacity: 0
                }, 50)
            }
        }, 300)
    } else {
        $('html, body').animate({
            scrollTop: t696_target
        }, 400);
        setTimeout(function () {
            t696_inputsWrapper.addClass('t696__inputsbox_hidden')
        }, 400)
    }
    var successurl = t696_form.data('success-url');
    if (successurl && successurl.length > 0) {
        setTimeout(function () {
            window.location.href = successurl
        }, 500)
    }
}

function t698_fixcontentheight(id) {
    var el = $("#rec" + id);
    var hcover = el.find(".t-cover").height();
    var hcontent = el.find("div[data-hook-content]").outerHeight();
    if (hcontent > 300 && hcover < hcontent) {
        var hcontent = hcontent + 120;
        if (hcontent > 1000) {
            hcontent += 100
        }
        console.log('auto correct cover height: ' + hcontent);
        el.find(".t-cover").height(hcontent);
        el.find(".t-cover__filter").height(hcontent);
        el.find(".t-cover__carrier").height(hcontent);
        el.find(".t-cover__wrapper").height(hcontent);
        if ($isMobile == !1) {
            setTimeout(function () {
                var divvideo = el.find(".t-cover__carrier");
                if (divvideo.find('iframe').length > 0) {
                    console.log('correct video from cover_fixcontentheight');
                    setWidthHeightYoutubeVideo(divvideo, hcontent + 'px')
                }
            }, 2000)
        }
    }
}

function t698_onSuccess(t698_form) {
    var t698_inputsWrapper = t698_form.find('.t-form__inputsbox');
    var t698_inputsHeight = t698_inputsWrapper.height();
    var t698_inputsOffset = t698_inputsWrapper.offset().top;
    var t698_inputsBottom = t698_inputsHeight + t698_inputsOffset;
    var t698_targetOffset = t698_form.find('.t-form__successbox').offset().top;
    if ($(window).width() > 960) {
        var t698_target = t698_targetOffset - 200
    } else {
        var t698_target = t698_targetOffset - 100
    }
    if (t698_targetOffset > $(window).scrollTop() || ($(document).height() - t698_inputsBottom) < ($(window).height() - 100)) {
        t698_inputsWrapper.addClass('t698__inputsbox_hidden');
        setTimeout(function () {
            if ($(window).height() > $('.t-body').height()) {
                $('.t-tildalabel').animate({
                    opacity: 0
                }, 50)
            }
        }, 300)
    } else {
        $('html, body').animate({
            scrollTop: t698_target
        }, 400);
        setTimeout(function () {
            t698_inputsWrapper.addClass('t698__inputsbox_hidden')
        }, 400)
    }
    var successurl = t698_form.data('success-url');
    if (successurl && successurl.length > 0) {
        setTimeout(function () {
            window.location.href = successurl
        }, 500)
    }
}

function t704_onSuccess(t704_form) {
    var t704_inputsWrapper = t704_form.find('.t-form__inputsbox');
    var t704_inputsHeight = t704_inputsWrapper.height();
    var t704_inputsOffset = t704_inputsWrapper.offset().top;
    var t704_inputsBottom = t704_inputsHeight + t704_inputsOffset;
    var t704_targetOffset = t704_form.find('.t-form__successbox').offset().top;
    if ($(window).width() > 960) {
        var t704_target = t704_targetOffset - 200
    } else {
        var t704_target = t704_targetOffset - 100
    }
    if (t704_targetOffset > $(window).scrollTop() || ($(document).height() - t704_inputsBottom) < ($(window).height() - 100)) {
        t704_inputsWrapper.addClass('t704__inputsbox_hidden');
        setTimeout(function () {
            if ($(window).height() > $('.t-body').height()) {
                $('.t-tildalabel').animate({
                    opacity: 0
                }, 50)
            }
        }, 300)
    } else {
        $('html, body').animate({
            scrollTop: t704_target
        }, 400);
        setTimeout(function () {
            t704_inputsWrapper.addClass('t704__inputsbox_hidden')
        }, 400)
    }
    var successurl = t704_form.data('success-url');
    if (successurl && successurl.length > 0) {
        setTimeout(function () {
            window.location.href = successurl
        }, 500)
    }
}

function t706_onSuccessCallback(t706_form) {
    $(".t706__cartwin-products").slideUp(10, function () {});
    $(".t706__cartwin-bottom").slideUp(10, function () {});
    $(".t706 .t-form__inputsbox").slideUp(700, function () {});
    try {
        tcart__unlockScroll()
    } catch (e) {}
}

function t712_onSuccess(t712_form) {
    var t712_inputsWrapper = t712_form.find('.t-form__inputsbox');
    var t712_inputsHeight = t712_inputsWrapper.height();
    var t712_inputsOffset = t712_inputsWrapper.offset().top;
    var t712_inputsBottom = t712_inputsHeight + t712_inputsOffset;
    var t712_targetOffset = t712_form.find('.t-form__successbox').offset().top;
    if ($(window).width() > 960) {
        var t712_target = t712_targetOffset - 200
    } else {
        var t712_target = t712_targetOffset - 100
    }
    if (t712_targetOffset > $(window).scrollTop() || ($(document).height() - t712_inputsBottom) < ($(window).height() - 100)) {
        t712_inputsWrapper.addClass('t712__inputsbox_hidden');
        setTimeout(function () {
            if ($(window).height() > $('.t-body').height()) {
                $('.t-tildalabel').animate({
                    opacity: 0
                }, 50)
            }
        }, 300)
    } else {
        $('html, body').animate({
            scrollTop: t712_target
        }, 400);
        setTimeout(function () {
            t712_inputsWrapper.addClass('t712__inputsbox_hidden')
        }, 400)
    }
    var successurl = t712_form.data('success-url');
    if (successurl && successurl.length > 0) {
        setTimeout(function () {
            window.location.href = successurl
        }, 500)
    }
}

function t712_fixcontentheight(id) {
    var el = $("#rec" + id);
    var hcover = el.find(".t-cover").height();
    var hcontent = el.find("div[data-hook-content]").outerHeight();
    if (hcontent > 300 && hcover < hcontent) {
        var hcontent = hcontent + 120;
        if (hcontent > 1000) {
            hcontent += 100
        }
        console.log('auto correct cover height: ' + hcontent);
        el.find(".t-cover").height(hcontent);
        el.find(".t-cover__filter").height(hcontent);
        el.find(".t-cover__carrier").height(hcontent);
        el.find(".t-cover__wrapper").height(hcontent);
        if ($isMobile == !1) {
            setTimeout(function () {
                var divvideo = el.find(".t-cover__carrier");
                if (divvideo.find('iframe').length > 0) {
                    console.log('correct video from cover_fixcontentheight');
                    setWidthHeightYoutubeVideo(divvideo, hcontent + 'px')
                }
            }, 2000)
        }
    }
}

function t718_onSuccess(t718_form) {
    var t718_inputsWrapper = t718_form.find('.t-form__inputsbox');
    var t718_inputsHeight = t718_inputsWrapper.height();
    var t718_inputsOffset = t718_inputsWrapper.offset().top;
    var t718_inputsBottom = t718_inputsHeight + t718_inputsOffset;
    var t718_targetOffset = t718_form.find('.t-form__successbox').offset().top;
    if ($(window).width() > 960) {
        var t718_target = t718_targetOffset - 200
    } else {
        var t718_target = t718_targetOffset - 100
    }
    if (t718_targetOffset > $(window).scrollTop() || ($(document).height() - t718_inputsBottom) < ($(window).height() - 100)) {
        t718_inputsWrapper.addClass('t718__inputsbox_hidden');
        setTimeout(function () {
            if ($(window).height() > $('.t-body').height()) {
                $('.t-tildalabel').animate({
                    opacity: 0
                }, 50)
            }
        }, 300)
    } else {
        $('html, body').animate({
            scrollTop: t718_target
        }, 400);
        setTimeout(function () {
            t718_inputsWrapper.addClass('t718__inputsbox_hidden')
        }, 400)
    }
    var successurl = t718_form.data('success-url');
    if (successurl && successurl.length > 0) {
        setTimeout(function () {
            window.location.href = successurl
        }, 500)
    }
}

function t720_onSuccess(t720_form) {
    var t720_inputsWrapper = t720_form.find('.t-form__inputsbox');
    var t720_inputsHeight = t720_inputsWrapper.height();
    var t720_inputsOffset = t720_inputsWrapper.offset().top;
    var t720_inputsBottom = t720_inputsHeight + t720_inputsOffset;
    var t720_targetOffset = t720_form.find('.t-form__successbox').offset().top;
    if ($(window).width() > 960) {
        var t720_target = t720_targetOffset - 200
    } else {
        var t720_target = t720_targetOffset - 100
    }
    if (t720_targetOffset > $(window).scrollTop() || ($(document).height() - t720_inputsBottom) < ($(window).height() - 100)) {
        t720_inputsWrapper.addClass('t720__inputsbox_hidden');
        setTimeout(function () {
            if ($(window).height() > $('.t-body').height()) {
                $('.t-tildalabel').animate({
                    opacity: 0
                }, 50)
            }
        }, 300)
    } else {
        $('html, body').animate({
            scrollTop: t720_target
        }, 400);
        setTimeout(function () {
            t720_inputsWrapper.addClass('t720__inputsbox_hidden')
        }, 400)
    }
    var successurl = t720_form.data('success-url');
    if (successurl && successurl.length > 0) {
        setTimeout(function () {
            window.location.href = successurl
        }, 500)
    }
}

function t720_fixcontentheight(id) {
    var el = $("#rec" + id);
    var hcover = el.find(".t-cover").height();
    var hcontent = el.find("div[data-hook-content]").outerHeight();
    if (hcontent > 300 && hcover < hcontent) {
        var hcontent = hcontent + 120;
        if (hcontent > 1000) {
            hcontent += 100
        }
        console.log('auto correct cover height: ' + hcontent);
        el.find(".t-cover").height(hcontent);
        el.find(".t-cover__filter").height(hcontent);
        el.find(".t-cover__carrier").height(hcontent);
        el.find(".t-cover__wrapper").height(hcontent);
        if ($isMobile == !1) {
            setTimeout(function () {
                var divvideo = el.find(".t-cover__carrier");
                if (divvideo.find('iframe').length > 0) {
                    console.log('correct video from cover_fixcontentheight');
                    setWidthHeightYoutubeVideo(divvideo, hcontent + 'px')
                }
            }, 2000)
        }
    }
}

function t722_onSuccess(t722_form) {
    var t722_inputsWrapper = t722_form.find('.t-form__inputsbox');
    var t722_inputsHeight = t722_inputsWrapper.height();
    var t722_inputsOffset = t722_inputsWrapper.offset().top;
    var t722_inputsBottom = t722_inputsHeight + t722_inputsOffset;
    var t722_targetOffset = t722_form.find('.t-form__successbox').offset().top;
    if ($(window).width() > 960) {
        var t722_target = t722_targetOffset - 200
    } else {
        var t722_target = t722_targetOffset - 100
    }
    if (t722_targetOffset > $(window).scrollTop() || ($(document).height() - t722_inputsBottom) < ($(window).height() - 100)) {
        t722_inputsWrapper.addClass('t722__inputsbox_hidden');
        setTimeout(function () {
            if ($(window).height() > $('.t-body').height()) {
                $('.t-tildalabel').animate({
                    opacity: 0
                }, 50)
            }
        }, 300)
    } else {
        $('html, body').animate({
            scrollTop: t722_target
        }, 400);
        setTimeout(function () {
            t722_inputsWrapper.addClass('t722__inputsbox_hidden')
        }, 400)
    }
    var successurl = t722_form.data('success-url');
    if (successurl && successurl.length > 0) {
        setTimeout(function () {
            window.location.href = successurl
        }, 500)
    }
}

function t722_fixcontentheight(id) {
    var el = $("#rec" + id);
    var hcover = el.find(".t-cover").height();
    var hcontent = el.find("div[data-hook-content]").outerHeight();
    if (hcontent > 300 && hcover < hcontent) {
        var hcontent = hcontent + 120;
        if (hcontent > 1000) {
            hcontent += 100
        }
        console.log('auto correct cover height: ' + hcontent);
        el.find(".t-cover").height(hcontent);
        el.find(".t-cover__filter").height(hcontent);
        el.find(".t-cover__carrier").height(hcontent);
        el.find(".t-cover__wrapper").height(hcontent);
        if ($isMobile == !1) {
            setTimeout(function () {
                var divvideo = el.find(".t-cover__carrier");
                if (divvideo.find('iframe').length > 0) {
                    console.log('correct video from cover_fixcontentheight');
                    setWidthHeightYoutubeVideo(divvideo, hcontent + 'px')
                }
            }, 2000)
        }
    }
}

function t734_init(recid) {
    var rec = $('#rec' + recid);
    if ($('body').find('.t830').length > 0) {
        if (rec.find('.t-slds__items-wrapper').hasClass('t-slds_animated-none')) {
            t_onFuncLoad('t_sldsInit', function () {
                t_sldsInit(recid)
            })
        } else {
            setTimeout(function () {
                t_onFuncLoad('t_sldsInit', function () {
                    t_sldsInit(recid)
                })
            }, 500)
        }
    } else {
        t_onFuncLoad('t_sldsInit', function () {
            t_sldsInit(recid)
        })
    }
    rec.find('.t734').bind('displayChanged', function () {
        t_onFuncLoad('t_slds_updateSlider', function () {
            t_slds_updateSlider(recid)
        })
    })
}

function t744_init(recid) {
    t_onFuncLoad('t_sldsInit', function () {
        t_sldsInit(recid)
    });
    setTimeout(function () {
        t_onFuncLoad('t_prod__init', function () {
            t_prod__init(recid)
        });
        t744__hoverZoom_init(recid)
    }, 500);
    $('#rec' + recid).find('.t744').bind('displayChanged', function () {
        t744_updateSlider(recid)
    })
}

function t744__hoverZoom_init(recid) {
    if (isMobile) {
        return
    }
    var rec = $('#rec' + recid);
    try {
        if (rec.find('[data-hover-zoom]')[0]) {
            if (!jQuery.cachedZoomScript) {
                jQuery.cachedZoomScript = function (url) {
                    var options = {
                        dataType: 'script',
                        cache: !0,
                        url: url
                    };
                    return jQuery.ajax(options)
                }
            }
            $.cachedZoomScript('https://static.tildacdn.com/js/tilda-hover-zoom-1.0.min.js').done(function (script, textStatus) {
                if (textStatus == 'success') {
                    setTimeout(function () {
                        t_hoverZoom_init(recid, ".t-slds__container")
                    }, 500)
                } else {
                    console.log('Upload script error: ' + textStatus)
                }
            })
        }
    } catch (e) {
        console.log('Zoom image init error: ' + e.message)
    }
}

function t744_updateSlider(recid) {
    var el = $('#rec' + recid);
    t_onFuncLoad('t_slds_SliderWidth', function () {
        t_slds_SliderWidth(recid)
    });
    sliderWrapper = el.find('.t-slds__items-wrapper');
    sliderWidth = el.find('.t-slds__container').width();
    pos = parseFloat(sliderWrapper.attr('data-slider-pos'));
    sliderWrapper.css({
        transform: 'translate3d(-' + (sliderWidth * pos) + 'px, 0, 0)'
    });
    t_onFuncLoad('t_slds_UpdateSliderHeight', function () {
        t_slds_UpdateSliderHeight(recid)
    });
    t_onFuncLoad('t_slds_UpdateSliderArrowsHeight', function () {
        t_slds_UpdateSliderArrowsHeight(recid)
    })
}

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
        t746_arrowWidth(recid)
    }, 200));
    $(window).on("orientationchange", function (event) {
        setTimeout(function () {
            t_onFuncLoad('t_slds_updateSlider', function () {
                t_slds_updateSlider(recid)
            })
        }, 500)
    });
    if (hook !== '') {
        t_onFuncLoad('t_sldsInit', function () {
            t_sldsInit(recid)
        });
        popup.click(function (e) {
            if (e.target == this) {
                iframeBody.html('').css('z-index', '');
                t746_closePopup(recid)
            }
        });
        el.find('.t-popup__close').click(function (e) {
            iframeBody.html('').css('z-index', '');
            t746_closePopup(recid)
        });
        $(document).keydown(function (e) {
            if (e.keyCode == 27) {
                t746_closePopup(recid);
                iframeBody.html('').css('z-index', '')
            }
        });
        $('.r').on('click', 'a[href="' + hook + '"]', function (e) {
            t746_showPopup(recid);
            t_onFuncLoad('t_slds_updateSlider', function () {
                t_slds_updateSlider(recid)
            });
            t746_arrowWidth(recid);
            t746_resizePopup(recid);
            e.preventDefault();
            if (window.lazy == 'y') {
                t_lazyload_update()
            }
            if (analitics > '') {
                var virtTitle = hook;
                if (virtTitle.substring(0, 7) == '#popup:') {
                    virtTitle = virtTitle.substring(7)
                }
                Tilda.sendEventToStatistics(analitics, virtTitle)
            }
        })
    }
}

function t746_showPopup(recid) {
    var el = $('#rec' + recid);
    var popup = el.find('.t-popup');
    var iframeBody = el.find('.t746__frame');
    popup.css('display', 'block');
    setTimeout(function () {
        popup.find('.t-popup__container').addClass('t-popup__container-animated');
        popup.addClass('t-popup_show')
    }, 50);
    $('body').addClass('t-body_popupshowed')
}

function t746_closePopup(recid) {
    $('body').removeClass('t-body_popupshowed');
    $('#rec' + recid + ' .t-popup').removeClass('t-popup_show');
    setTimeout(function () {
        $('.t-popup').not('.t-popup_show').css('display', 'none')
    }, 300)
}

function t746_resizePopup(recid) {
    var el = $("#rec" + recid),
        div = el.find(".t-popup__container").height(),
        win = $(window).height(),
        popup = el.find(".t-popup__container");
    if (div > win) {
        popup.addClass('t-popup__container-static')
    } else {
        popup.removeClass('t-popup__container-static')
    }
}

function t746_sendPopupEventToStatistics(popupname) {
    var virtPage = '/tilda/popup/';
    var virtTitle = 'Popup: ';
    if (popupname.substring(0, 7) == '#popup:') {
        popupname = popupname.substring(7)
    }
    virtPage += popupname;
    virtTitle += popupname;
    if (ga) {
        if (window.mainTracker != 'tilda') {
            ga('send', {
                'hitType': 'pageview',
                'page': virtPage,
                'title': virtTitle
            })
        }
    }
    if (window.mainMetrika > '' && window[window.mainMetrika]) {
        window[window.mainMetrika].hit(virtPage, {
            title: virtTitle,
            referer: window.location.href
        })
    }
}

function t746_show(recid) {
    var el = $("#rec" + recid),
        play = el.find('.t746__play');
    play.click(function () {
        if ($(this).attr('data-slider-video-type') == 'youtube') {
            var url = $(this).attr('data-slider-video-url');
            $(this).next().html("<iframe class=\"t746__iframe\" width=\"100%\" height=\"100%\" src=\"https://www.youtube.com/embed/" + url + "?autoplay=1\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>")
        }
        if ($(this).attr('data-slider-video-type') == 'vimeo') {
            var url = $(this).attr('data-slider-video-url');
            $(this).next().html("<iframe class=\"t746__iframe\" width=\"100%\" height=\"100%\" src=\"https://player.vimeo.com/video/" + url + "?autoplay=1\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>")
        }
        $(this).next().css('z-index', '3')
    })
}

function t746_hide(recid) {
    var el = $("#rec" + recid),
        body = el.find('.t746__frame');
    el.on('updateSlider', function () {
        body.html('').css('z-index', '')
    })
}

function t746_imageHeight(recid) {
    var el = $("#rec" + recid);
    var image = el.find(".t746__separator");
    image.each(function () {
        var width = $(this).attr("data-slider-image-width");
        var height = $(this).attr("data-slider-image-height");
        var ratio = height / width;
        var padding = ratio * 100;
        $(this).css("padding-bottom", padding + "%")
    })
}

function t746_arrowWidth(recid) {
    var el = $("#rec" + recid),
        arrow = el.find('.t-slds__arrow_wrapper'),
        slideWidth = el.find('.t-slds__wrapper').width(),
        windowWidth = $(window).width(),
        arrowWidth = windowWidth - slideWidth;
    if (windowWidth > 960 && arrow.parents('.t-slds__arrow_container').hasClass('t-slds__arrow-nearpic')) {
        arrow.css('width', arrowWidth / 2)
    } else {
        arrow.css('width', '')
    }
}

function t750_init(recid) {
    t_onFuncLoad('t_sldsInit', function () {
        t_sldsInit(recid)
    });
    setTimeout(function () {
        t_onFuncLoad('t_prod__init', function () {
            t_prod__init(recid)
        });
        t750_initPopup(recid)
    }, 500)
}

function t750_initPopup(recid) {
    $('#rec' + recid).attr('data-animationappear', 'off');
    $('#rec' + recid).css('opacity', '1');
    var el = $('#rec' + recid).find('.t-popup'),
        hook = el.attr('data-tooltip-hook'),
        analitics = el.attr('data-track-popup');
    if (hook !== '') {
        $('.r').on('click', 'a[href="' + hook + '"]', function (e) {
            t750_showPopup(recid);
            e.preventDefault();
            if (window.lazy == 'y') {
                t_lazyload_update()
            }
            if (analitics > '') {
                var virtTitle = hook;
                if (virtTitle.substring(0, 7) == '#popup:') {
                    virtTitle = virtTitle.substring(7)
                }
                Tilda.sendEventToStatistics(analitics, virtTitle)
            }
        })
    }
}

function t750_showPopup(recid) {
    var el = $('#rec' + recid),
        popup = el.find('.t-popup'),
        sliderWrapper = el.find('.t-slds__items-wrapper'),
        sliderWidth = el.find('.t-slds__container').width(),
        pos = parseFloat(sliderWrapper.attr('data-slider-pos'));
    popup.css('display', 'block');
    setTimeout(function () {
        popup.find('.t-popup__container').addClass('t-popup__container-animated');
        popup.addClass('t-popup_show');
        t_onFuncLoad('t_slds_SliderWidth', function () {
            t_slds_SliderWidth(recid)
        });
        sliderWrapper = el.find('.t-slds__items-wrapper');
        sliderWidth = el.find('.t-slds__container').width();
        pos = parseFloat(sliderWrapper.attr('data-slider-pos'));
        sliderWrapper.css({
            transform: 'translate3d(-' + (sliderWidth * pos) + 'px, 0, 0)'
        });
        t_onFuncLoad('t_slds_UpdateSliderHeight', function () {
            t_slds_UpdateSliderHeight(recid)
        });
        t_onFuncLoad('t_slds_UpdateSliderArrowsHeight', function () {
            t_slds_UpdateSliderArrowsHeight(recid)
        });
        if (window.lazy == 'y') {
            t_lazyload_update()
        }
    }, 50);
    $('body').addClass('t-body_popupshowed');
    el.find('.t-popup').mousedown(function (e) {
        var windowWidth = $(window).width();
        var maxScrollBarWidth = 17;
        var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
        if (e.clientX > windowWithoutScrollBar) {
            return
        }
        if (e.target == this) {
            t750_closePopup()
        }
    });
    el.find('.t-popup__close, .t750__close-text').click(function (e) {
        t750_closePopup()
    });
    $(document).keydown(function (e) {
        if (e.keyCode == 27) {
            t750_closePopup()
        }
    })
}

function t750_closePopup() {
    $('body').removeClass('t-body_popupshowed');
    $('.t-popup').removeClass('t-popup_show');
    setTimeout(function () {
        $('.t-popup').not('.t-popup_show').css('display', 'none')
    }, 300)
}

function t750_sendPopupEventToStatistics(popupname) {
    var virtPage = '/tilda/popup/';
    var virtTitle = 'Popup: ';
    if (popupname.substring(0, 7) == '#popup:') {
        popupname = popupname.substring(7)
    }
    virtPage += popupname;
    virtTitle += popupname;
    if (ga) {
        if (window.mainTracker != 'tilda') {
            ga('send', {
                'hitType': 'pageview',
                'page': virtPage,
                'title': virtTitle
            })
        }
    }
    if (window.mainMetrika > '' && window[window.mainMetrika]) {
        window[window.mainMetrika].hit(virtPage, {
            title: virtTitle,
            referer: window.location.href
        })
    }
}

function t754__init(recid) {
    setTimeout(function () {
        t_onFuncLoad('t_prod__init', function () {
            t_prod__init(recid)
        });
        t754__hoverZoom_init(recid);
        t754_initPopup(recid);
        t754__updateLazyLoad(recid);
        t754__alignButtons_init(recid);
        if (typeof t_store_addProductQuantityEvents !== 'undefined') {
            t754_initProductQuantity(recid)
        }
    }, 500)
}

function t754_initProductQuantity(recid) {
    var el = $('#rec' + recid);
    var productList = el.find(".t754__col, .t754__product-full");
    productList.each(function (i, product) {
        t_store_addProductQuantityEvents($(product))
    })
}

function t754__showMore(recid) {
    var el = $('#rec' + recid).find(".t754");
    var showmore = el.find('.t754__showmore');
    var cards_count = parseInt(el.attr('data-show-count'), 10);
    if (cards_count > 0) {
        if (showmore.text() === '') {
            showmore.find('td').text(t754__dict('loadmore'))
        }
        showmore.show();
        el.find('.t754__col').hide();
        var cards_size = el.find('.t754__col').size();
        var cards_count = parseInt(el.attr('data-show-count'), 10);
        var x = cards_count;
        var y = cards_count;
        t754__showSeparator(el, x);
        el.find('.t754__col:lt(' + x + ')').show();
        showmore.click(function () {
            x = (x + y <= cards_size) ? x + y : cards_size;
            el.find('.t754__col:lt(' + x + ')').show();
            if (x == cards_size) {
                showmore.hide()
            }
            t754__showSeparator(el, x)
        })
    }
}

function t754__showSeparator(el, x) {
    el.find('.t754__separator_number').addClass('t754__separator_hide');
    el.find('.t754__separator_hide').each(function () {
        if ($(this).attr('data-product-separator-number') <= x) {
            $(this).removeClass('t754__separator_hide')
        }
    })
}

function t754__dict(msg) {
    var dict = [];
    dict.loadmore = {
        EN: 'Load more',
        RU: 'Р—Р°РіСЂСѓР·РёС‚СЊ РµС‰Рµ',
        FR: 'Charger plus',
        DE: 'Mehr laden',
        ES: 'Carga mГЎs',
        PT: 'Carregue mais',
        UK: 'Р—Р°РІР°РЅС‚Р°Р¶РёС‚Рё С‰Рµ',
        JA: 'г‚‚гЃЈгЃЁиЄ­гЃїиѕјг‚Ђ',
        ZH: 'иЈќиј‰ж›ґе¤љ',
    };
    var lang = window.tildaBrowserLang;
    if (typeof dict[msg] !== 'undefined') {
        if (typeof dict[msg][lang] !== 'undefined' && dict[msg][lang] != '') {
            return dict[msg][lang]
        } else {
            return dict[msg].EN
        }
    }
    return 'Text not found "' + msg + '"'
}

function t754__alignButtons_init(recid) {
    var el = $('#rec' + recid);
    if (el.find('[data-buttons-v-align]')[0]) {
        try {
            t754__alignButtons(recid);
            $(window).bind('resize', t_throttle(function () {
                if (typeof window.noAdaptive !== 'undefined' && window.noAdaptive === !0 && $isMobile) {
                    return
                }
                t754__alignButtons(recid)
            }, 200));
            el.find('.t754').bind('displayChanged', function () {
                t754__alignButtons(recid)
            });
            if ($isMobile) {
                $(window).on('orientationchange', function () {
                    t754__alignButtons(recid)
                })
            }
        } catch (e) {
            console.log('buttons-v-align error: ' + e.message)
        }
    }
}

function t754__alignButtons(recid) {
    var rec = $('#rec' + recid);
    var wrappers = rec.find('.t754__textwrapper');
    var maxHeight = 0;
    var itemsInRow = rec.find('.t-container').attr('data-blocks-per-row') * 1;
    var mobileView = $(window).width() <= 480;
    var tableView = $(window).width() <= 960 && $(window).width() > 480;
    var mobileOneRow = $(window).width() <= 960 && rec.find('.t754__container_mobile-flex')[0] ? !0 : !1;
    var mobileTwoItemsInRow = $(window).width() <= 480 && rec.find('.t754 .mobile-two-columns')[0] ? !0 : !1;
    if (mobileView) {
        itemsInRow = 1
    }
    if (tableView) {
        itemsInRow = 2
    }
    if (mobileTwoItemsInRow) {
        itemsInRow = 2
    }
    if (mobileOneRow) {
        itemsInRow = 999999
    }
    var i = 1;
    var wrappersInRow = [];
    $.each(wrappers, function (key, element) {
        element.style.height = 'auto';
        if (itemsInRow === 1) {
            element.style.height = 'auto'
        } else {
            wrappersInRow.push(element);
            if (element.offsetHeight > maxHeight) {
                maxHeight = element.offsetHeight
            }
            $.each(wrappersInRow, function (key, wrapper) {
                wrapper.style.height = maxHeight + 'px'
            });
            if (i === itemsInRow) {
                i = 0;
                maxHeight = 0;
                wrappersInRow = []
            }
            i++
        }
    })
}

function t754__hoverZoom_init(recid) {
    if (isMobile) {
        return
    }
    var rec = $('#rec' + recid);
    try {
        if (rec.find('[data-hover-zoom]')[0]) {
            if (!jQuery.cachedZoomScript) {
                jQuery.cachedZoomScript = function (url) {
                    var options = {
                        dataType: 'script',
                        cache: !0,
                        url: url
                    };
                    return jQuery.ajax(options)
                }
            }
            $.cachedZoomScript('https://static.tildacdn.com/js/tilda-hover-zoom-1.0.min.js').done(function (script, textStatus) {
                if (textStatus == 'success') {
                    setTimeout(function () {
                        t_hoverZoom_init(recid, ".t-slds__container")
                    }, 500)
                } else {
                    console.log('Upload script error: ' + textStatus)
                }
            })
        }
    } catch (e) {
        console.log('Zoom image init error: ' + e.message)
    }
}

function t754__updateLazyLoad(recid) {
    var scrollContainer = $("#rec" + recid + " .t754__container_mobile-flex");
    var curMode = $(".t-records").attr("data-tilda-mode");
    if (scrollContainer.length && curMode != "edit" && curMode != "preview") {
        scrollContainer.bind('scroll', t_throttle(function () {
            if (window.lazy == 'y') {
                t_lazyload_update()
            }
        }))
    }
}

function t754_initPopup(recid) {
    var rec = $('#rec' + recid);
    rec.find('[href^="#prodpopup"]').one("click", function (e) {
        e.preventDefault();
        var el_popup = rec.find('.t-popup');
        var el_prod = $(this).closest('.js-product');
        var lid_prod = el_prod.attr('data-product-lid');
        t_onFuncLoad('t_sldsInit', function () {
            t_sldsInit(recid + ' #t754__product-' + lid_prod + '')
        })
    });
    rec.find('[href^="#prodpopup"]').click(function (e) {
        e.preventDefault();
        t754_showPopup(recid);
        var el_popup = rec.find('.t-popup');
        var el_prod = $(this).closest('.js-product');
        var lid_prod = el_prod.attr('data-product-lid');
        el_popup.find('.js-product').css('display', 'none');
        var el_fullprod = el_popup.find('.js-product[data-product-lid="' + lid_prod + '"]');
        el_fullprod.css('display', 'block');
        var analitics = el_popup.attr('data-track-popup');
        if (analitics > '') {
            var virtTitle = el_fullprod.find('.js-product-name').text();
            if (!virtTitle) {
                virtTitle = 'prod' + lid_prod
            }
            Tilda.sendEventToStatistics(analitics, virtTitle)
        }
        var curUrl = window.location.href;
        if (curUrl.indexOf('#!/tproduct/') < 0 && curUrl.indexOf('%23!/tproduct/') < 0 && curUrl.indexOf('#%21%2Ftproduct%2F') < 0) {
            if (typeof history.replaceState != 'undefined') {
                window.history.replaceState('', '', window.location.href + '#!/tproduct/' + recid + '-' + lid_prod)
            }
        }
        t754_updateSlider(recid + ' #t754__product-' + lid_prod + '');
        if (window.lazy == 'y') {
            t_lazyload_update()
        }
    });
    if ($('#record' + recid).length == 0) {
        t754_checkUrl(recid)
    }
    t754_copyTypography(recid)
}

function t754_checkUrl(recid) {
    var curUrl = window.location.href;
    var tprodIndex = curUrl.indexOf('#!/tproduct/');
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && tprodIndex < 0) {
        tprodIndex = curUrl.indexOf('%23!/tproduct/');
        if (tprodIndex < 0) {
            tprodIndex = curUrl.indexOf('#%21%2Ftproduct%2F')
        }
    }
    if (tprodIndex >= 0) {
        var curUrl = curUrl.substring(tprodIndex, curUrl.length);
        var curProdLid = curUrl.substring(curUrl.indexOf('-') + 1, curUrl.length);
        var rec = $('#rec' + recid);
        if (curUrl.indexOf(recid) >= 0 && rec.find('[data-product-lid=' + curProdLid + ']').length) {
            rec.find('[data-product-lid=' + curProdLid + '] [href^="#prodpopup"]').triggerHandler('click')
        }
    }
}

function t754_updateSlider(recid) {
    var el = $('#rec' + recid);
    t_onFuncLoad('t_slds_SliderWidth', function () {
        t_slds_SliderWidth(recid)
    });
    var sliderWrapper = el.find('.t-slds__items-wrapper');
    var sliderWidth = el.find('.t-slds__container').width();
    var pos = parseFloat(sliderWrapper.attr('data-slider-pos'));
    sliderWrapper.css({
        transform: 'translate3d(-' + (sliderWidth * pos) + 'px, 0, 0)'
    });
    t_onFuncLoad('t_slds_UpdateSliderHeight', function () {
        t_slds_UpdateSliderHeight(recid)
    });
    t_onFuncLoad('t_slds_UpdateSliderArrowsHeight', function () {
        t_slds_UpdateSliderArrowsHeight(recid)
    })
}

function t754_showPopup(recid) {
    var el = $('#rec' + recid);
    var popup = el.find('.t-popup');
    popup.css('display', 'block');
    setTimeout(function () {
        popup.find('.t-popup__container').addClass('t-popup__container-animated');
        popup.addClass('t-popup_show');
        if (window.lazy == 'y') {
            t_lazyload_update()
        }
    }, 50);
    $('body').addClass('t-body_popupshowed');
    el.find('.t-popup').mousedown(function (e) {
        var windowWidth = $(window).width();
        var maxScrollBarWidth = 17;
        var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
        if (e.clientX > windowWithoutScrollBar) {
            return
        }
        if (e.target == this) {
            t754_closePopup()
        }
    });
    el.find('.t-popup__close, .t754__close-text').click(function (e) {
        t754_closePopup()
    });
    $(document).keydown(function (e) {
        if (e.keyCode == 27) {
            t754_closePopup()
        }
    })
}

function t754_closePopup() {
    $('body').removeClass('t-body_popupshowed');
    $('.t-popup').removeClass('t-popup_show');
    var curUrl = window.location.href;
    var indexToRemove = curUrl.indexOf('#!/tproduct/');
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && indexToRemove < 0) {
        indexToRemove = curUrl.indexOf('%23!/tproduct/');
        if (indexToRemove < 0) {
            indexToRemove = curUrl.indexOf('#%21%2Ftproduct%2F')
        }
    }
    curUrl = curUrl.substring(0, indexToRemove);
    setTimeout(function () {
        $(".t-popup").scrollTop(0);
        $('.t-popup').not('.t-popup_show').css('display', 'none');
        if (typeof history.replaceState != 'undefined') {
            window.history.replaceState('', '', curUrl)
        }
    }, 300)
}

function t754_removeSizeStyles(styleStr) {
    if (typeof styleStr != "undefined" && (styleStr.indexOf('font-size') >= 0 || styleStr.indexOf('padding-top') >= 0 || styleStr.indexOf('padding-bottom') >= 0)) {
        var styleStrSplitted = styleStr.split(';');
        styleStr = "";
        for (var i = 0; i < styleStrSplitted.length; i++) {
            if (styleStrSplitted[i].indexOf('font-size') >= 0 || styleStrSplitted[i].indexOf('padding-top') >= 0 || styleStrSplitted[i].indexOf('padding-bottom') >= 0) {
                styleStrSplitted.splice(i, 1);
                i--;
                continue
            }
            if (styleStrSplitted[i] == "") {
                continue
            }
            styleStr += styleStrSplitted[i] + ";"
        }
    }
    return styleStr
}

function t754_copyTypography(recid) {
    var rec = $('#rec' + recid);
    var titleStyle = rec.find('.t754__title').attr('style');
    var descrStyle = rec.find('.t754__descr').attr('style');
    rec.find('.t-popup .t754__title').attr("style", t754_removeSizeStyles(titleStyle));
    rec.find('.t-popup .t754__descr, .t-popup .t754__text').attr("style", t754_removeSizeStyles(descrStyle))
}

function t756_init(recid) {
    t_onFuncLoad('t_sldsInit', function () {
        t_sldsInit(recid)
    });
    setTimeout(function () {
        t_onFuncLoad('t_prod__init', function () {
            t_prod__init(recid)
        });
        t756_initPopup(recid)
    }, 500)
}

function t756_initPopup(recid) {
    $('#rec' + recid).attr('data-animationappear', 'off');
    $('#rec' + recid).css('opacity', '1');
    var el = $('#rec' + recid).find('.t-popup'),
        hook = el.attr('data-tooltip-hook'),
        analitics = el.attr('data-track-popup');
    if (hook !== '') {
        $('.r').on('click', 'a[href="' + hook + '"]', function (e) {
            t756_showPopup(recid);
            e.preventDefault();
            if (analitics > '') {
                var virtTitle = hook;
                if (virtTitle.substring(0, 7) == '#popup:') {
                    virtTitle = virtTitle.substring(7)
                }
                Tilda.sendEventToStatistics(analitics, virtTitle)
            }
        })
    }
}

function t756_showPopup(recid) {
    var el = $('#rec' + recid),
        popup = el.find('.t-popup'),
        sliderWrapper = el.find('.t-slds__items-wrapper'),
        sliderWidth = el.find('.t-slds__container').width(),
        pos = parseFloat(sliderWrapper.attr('data-slider-pos'));
    popup.css('display', 'block');
    setTimeout(function () {
        popup.find('.t-popup__container').addClass('t-popup__container-animated');
        popup.addClass('t-popup_show');
        t_onFuncLoad('t_slds_SliderWidth', function () {
            t_slds_SliderWidth(recid)
        });
        sliderWrapper = el.find('.t-slds__items-wrapper');
        sliderWidth = el.find('.t-slds__container').width();
        pos = parseFloat(sliderWrapper.attr('data-slider-pos'));
        sliderWrapper.css({
            transform: 'translate3d(-' + (sliderWidth * pos) + 'px, 0, 0)'
        });
        t_onFuncLoad('t_slds_UpdateSliderHeight', function () {
            t_slds_UpdateSliderHeight(recid)
        });
        t_onFuncLoad('t_slds_UpdateSliderArrowsHeight', function () {
            t_slds_UpdateSliderArrowsHeight(recid)
        });
        if (window.lazy == 'y') {
            t_lazyload_update()
        }
    }, 50);
    $('body').addClass('t-body_popupshowed');
    el.find('.t-popup').mousedown(function (e) {
        if (e.target == this) {
            t756_closePopup(recid)
        }
    });
    el.find('.t-popup__close, .t756__close-text').click(function (e) {
        t756_closePopup(recid)
    });
    el.find('a[href*=#]').click(function (e) {
        var url = $(this).attr('href');
        if (!url || url.substring(0, 7) != '#price:') {
            t756_closePopup(recid);
            if (!url || url.substring(0, 7) == '#popup:') {
                setTimeout(function () {
                    $('body').addClass('t-body_popupshowed')
                }, 300)
            }
        }
    });
    $(document).keydown(function (e) {
        if (e.keyCode == 27) {
            t756_closePopup(recid)
        }
    })
}

function t756_closePopup(recid) {
    $('body').removeClass('t-body_popupshowed');
    $('#rec' + recid + ' .t-popup').removeClass('t-popup_show');
    setTimeout(function () {
        $('.t-popup').not('.t-popup_show').css('display', 'none')
    }, 300)
}

function t756_sendPopupEventToStatistics(popupname) {
    var virtPage = '/tilda/popup/';
    var virtTitle = 'Popup: ';
    if (popupname.substring(0, 7) == '#popup:') {
        popupname = popupname.substring(7)
    }
    virtPage += popupname;
    virtTitle += popupname;
    if (window.Tilda && typeof Tilda.sendEventToStatistics == 'function') {
        Tilda.sendEventToStatistics(virtPage, virtTitle, '', 0)
    } else {
        if (ga) {
            if (window.mainTracker != 'tilda') {
                ga('send', {
                    'hitType': 'pageview',
                    'page': virtPage,
                    'title': virtTitle
                })
            }
        }
        if (window.mainMetrika > '' && window[window.mainMetrika]) {
            window[window.mainMetrika].hit(virtPage, {
                title: virtTitle,
                referer: window.location.href
            })
        }
    }
}

function t760_init(recid) {
    setTimeout(function () {
        t_onFuncLoad('t_prod__init', function () {
            t_prod__init(recid)
        })
    }, 500);
    t760_floating(recid);
    $(window).bind('resize', t_throttle(function () {
        t760_floating(recid)
    }, 300));
    $('#rec' + recid).find('.t760').bind('displayChanged', function () {
        t760_floating(recid)
    })
}

function t760_floating(recid) {
    var element = $('#rec' + recid);
    if ($isMobile == !1) {
        element.find(".t760__floatable[data-floating='yes']").each(function () {
            var div = $(this);
            t760_floating_init(div)
        })
    }
}

function t760_floating_init(el) {
    var wnd = $(window);
    var col = el.parent();
    el.css('max-width', '');
    el.css('max-width', el.width());
    el.css('width', '100%');
    col.css('min-height', '');
    col.css('min-height', el.height());
    $(window).load(function () {
        col.css('min-height', el.height())
    });
    wnd.bind('scroll', t_throttle(function () {
        t760_floating_scroll(el, wnd, col)
    }, 20));
    wnd.resize(function () {
        wnd.scroll()
    });
    wnd.scroll()
}

function t760_floating_scroll(el, wnd, col) {
    var wnd_height = wnd.height();
    var wnd_width = wnd.width();
    if (wnd_width <= 1024) {
        el.removeClass('t760__fixedTop');
        el.removeClass('t760__fixedBottom');
        el.removeClass('t760__floating');
        return ('')
    }
    el.css('max-width', col.width());
    if (col.height() < el.height() && col.height() > 0) {
        col.height(el.height())
    }
    var el_height = el.height();
    var col_top = col.offset().top;
    var col_width = col.width();
    var col_height = col.height();
    var col_bottom = col_top + col_height;
    var wnd_top = wnd.scrollTop();
    var wnd_bottom = wnd_top + wnd_height;
    var offset = parseFloat(el.attr('data-offset-top'));
    if (wnd_top + el_height + offset >= col_bottom) {
        el.css('top', '');
        el.addClass('t760__fixedBottom');
        el.removeClass('t760__fixedTop');
        el.removeClass('t760__floating')
    } else if (wnd_top + offset > col_top) {
        el.css('top', offset);
        el.addClass('t760__floating');
        el.removeClass('t760__fixedBottom');
        el.removeClass('t760__fixedTop')
    } else {
        el.css('top', '');
        el.addClass('t760__fixedTop');
        el.removeClass('t760__fixedBottom');
        el.removeClass('t760__floating')
    }
}

function t762_init(recid) {
    t_onFuncLoad('t_sldsInit', function () {
        t_sldsInit(recid)
    });
    setTimeout(function () {
        t_onFuncLoad('t_prod__init', function () {
            t_prod__init(recid)
        });
        t762__hoverZoom_init(recid)
    }, 500);
    $('#rec' + recid).find('.t762').bind('displayChanged', function () {
        t_onFuncLoad('t_slds_updateSlider', function () {
            t_slds_updateSlider(recid)
        })
    })
}

function t762__hoverZoom_init(recid) {
    if (isMobile) {
        return
    }
    var rec = $('#rec' + recid);
    try {
        if (rec.find('[data-hover-zoom]')[0]) {
            if (!jQuery.cachedZoomScript) {
                jQuery.cachedZoomScript = function (url) {
                    var options = {
                        dataType: 'script',
                        cache: !0,
                        url: url
                    };
                    return jQuery.ajax(options)
                }
            }
            $.cachedZoomScript('https://static.tildacdn.com/js/tilda-hover-zoom-1.0.min.js').done(function (script, textStatus) {
                if (textStatus == 'success') {
                    setTimeout(function () {
                        t_hoverZoom_init(recid, ".t-slds__container")
                    }, 500)
                } else {
                    console.log('Upload script error: ' + textStatus)
                }
            })
        }
    } catch (e) {
        console.log('Zoom image init error: ' + e.message)
    }
}

function t764_init(recid) {
    var el = $('#rec' + recid);
    t_onFuncLoad('t_sldsInit', function () {
        t_sldsInit(recid)
    });
    t_onFuncLoad('t_slds_SliderWidth', function () {
        t_slds_SliderWidth(recid)
    });
    var sliderWrapper = el.find('.t-slds__items-wrapper');
    var sliderWidth = el.find('.t-slds__container').width();
    var pos = parseFloat(sliderWrapper.attr('data-slider-pos'), 10);
    sliderWrapper.css({
        transform: 'translate3d(-' + (sliderWidth * pos) + 'px, 0, 0)'
    });
    t_onFuncLoad('t_slds_UpdateSliderHeight', function () {
        t_slds_UpdateSliderHeight(recid)
    });
    t_onFuncLoad('t_slds_UpdateSliderArrowsHeight', function () {
        t_slds_UpdateSliderArrowsHeight(recid)
    });
    el.find('.t764').bind('displayChanged', function () {
        t_onFuncLoad('t_slds_updateSlider', function () {
            t_slds_updateSlider(recid)
        })
    })
}

function t766_init(recid) {
    t_onFuncLoad('t_sldsInit', function () {
        t_sldsInit(recid)
    });
    setTimeout(function () {
        t_onFuncLoad('t_prod__init', function () {
            t_prod__init(recid)
        });
        t766_initPopup(recid)
    }, 500)
}

function t766_initPopup(recid) {
    $('#rec' + recid).attr('data-animationappear', 'off');
    $('#rec' + recid).css('opacity', '1');
    var el = $('#rec' + recid).find('.t-popup'),
        hook = el.attr('data-tooltip-hook'),
        analitics = el.attr('data-track-popup');
    t_onFuncLoad('t_sldsInit', function () {
        t_sldsInit(recid)
    });
    if (hook !== '') {
        $('.r').on('click', 'a[href="' + hook + '"]', function (e) {
            t766_showPopup(recid);
            e.preventDefault();
            if (analitics > '') {
                var virtTitle = hook;
                if (virtTitle.substring(0, 7) == '#popup:') {
                    virtTitle = virtTitle.substring(7)
                }
                Tilda.sendEventToStatistics(analitics, virtTitle)
            }
        })
    }
}

function t766_showPopup(recid) {
    var el = $('#rec' + recid),
        popup = el.find('.t-popup'),
        sliderWrapper = el.find('.t-slds__items-wrapper'),
        sliderWidth = el.find('.t-slds__container').width(),
        pos = parseFloat(sliderWrapper.attr('data-slider-pos'));
    popup.css('display', 'block');
    setTimeout(function () {
        popup.find('.t-popup__container').addClass('t-popup__container-animated');
        popup.addClass('t-popup_show');
        t_onFuncLoad('t_slds_SliderWidth', function () {
            t_slds_SliderWidth(recid)
        });
        sliderWrapper = el.find('.t-slds__items-wrapper');
        sliderWidth = el.find('.t-slds__container').width();
        pos = parseFloat(sliderWrapper.attr('data-slider-pos'));
        sliderWrapper.css({
            transform: 'translate3d(-' + (sliderWidth * pos) + 'px, 0, 0)'
        });
        t_onFuncLoad('t_slds_UpdateSliderHeight', function () {
            t_slds_UpdateSliderHeight(recid)
        });
        t_onFuncLoad('t_slds_UpdateSliderArrowsHeight', function () {
            t_slds_UpdateSliderArrowsHeight(recid)
        });
        if (window.lazy == 'y') {
            t_lazyload_update()
        }
    }, 50);
    $('body').addClass('t-body_popupshowed');
    el.find('.t-popup').mousedown(function (e) {
        var windowWidth = $(window).width();
        var maxScrollBarWidth = 17;
        var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
        if (e.clientX > windowWithoutScrollBar) {
            return
        }
        if (e.target == this) {
            t766_closePopup(recid)
        }
    });
    el.find('.t-popup__close, .t766__close-text').click(function (e) {
        t766_closePopup(recid)
    });
    el.find('a[href*=#]').click(function (e) {
        var url = $(this).attr('href');
        if (!url || url.substring(0, 7) != '#price:') {
            t766_closePopup(recid);
            if (!url || url.substring(0, 7) == '#popup:') {
                setTimeout(function () {
                    $('body').addClass('t-body_popupshowed')
                }, 300)
            }
        }
    });
    $(document).keydown(function (e) {
        if (e.keyCode == 27) {
            t766_closePopup(recid)
        }
    })
}

function t766_closePopup(recid) {
    $('body').removeClass('t-body_popupshowed');
    $('#rec' + recid + ' .t-popup').removeClass('t-popup_show');
    setTimeout(function () {
        $('.t-popup').not('.t-popup_show').css('display', 'none')
    }, 300)
}

function t766_sendPopupEventToStatistics(popupname) {
    var virtPage = '/tilda/popup/';
    var virtTitle = 'Popup: ';
    if (popupname.substring(0, 7) == '#popup:') {
        popupname = popupname.substring(7)
    }
    virtPage += popupname;
    virtTitle += popupname;
    if (window.Tilda && typeof Tilda.sendEventToStatistics == 'function') {
        Tilda.sendEventToStatistics(virtPage, virtTitle, '', 0)
    } else {
        if (ga) {
            if (window.mainTracker != 'tilda') {
                ga('send', {
                    'hitType': 'pageview',
                    'page': virtPage,
                    'title': virtTitle
                })
            }
        }
        if (window.mainMetrika > '' && window[window.mainMetrika]) {
            window[window.mainMetrika].hit(virtPage, {
                title: virtTitle,
                referer: window.location.href
            })
        }
    }
}

function t772_init(recid) {
    $('.t772__container_mobile-flex').bind('touchstart', function () {
        $('.t772__col').bind('touchmove', function () {
            if (typeof $(".t-records").attr('data-tilda-mode') == 'undefined') {
                if (window.lazy == 'y') {
                    t_lazyload_update()
                }
            }
        })
    }).mouseup(function () {
        $('.t772__col').unbind('touchend')
    })
}

function t774_init(recid) {
    t774_unifyHeights(recid);
    $(window).bind('resize', t_throttle(function () {
        t774_unifyHeights(recid)
    }, 200));
    $(".t774").bind("displayChanged", function () {
        t774_unifyHeights(recid)
    });
    $(window).load(function () {
        t774_unifyHeights(recid)
    });
    setTimeout(function () {
        t774__updateLazyLoad(recid)
    }, 500)
}

function t774__updateLazyLoad(recid) {
    var scrollContainer = $("#rec" + recid + " .t774__container_mobile-flex");
    var curMode = $(".t-records").attr("data-tilda-mode");
    if (scrollContainer.length && curMode != "edit" && curMode != "preview" && window.lazy === "y") {
        scrollContainer.bind('scroll', t_throttle(function () {
            t_lazyload_update()
        }, 500))
    }
}

function t774_unifyHeights(recid) {
    var t774_el = $('#rec' + recid),
        t774_blocksPerRow = t774_el.find(".t774__container").attr("data-blocks-per-row"),
        t774_cols = t774_el.find(".t774__content"),
        t774_mobScroll = t774_el.find(".t774__scroll-icon-wrapper").length;
    if ($(window).width() <= 480 && t774_mobScroll == 0) {
        t774_cols.css("height", "auto");
        return
    }
    var t774_perRow = +t774_blocksPerRow;
    if ($(window).width() <= 960 && t774_mobScroll > 0) {
        var t774_perRow = t774_cols.length
    } else {
        if ($(window).width() <= 960) {
            var t774_perRow = 2
        }
    }
    for (var i = 0; i < t774_cols.length; i += t774_perRow) {
        var t774_maxHeight = 0,
            t774_row = t774_cols.slice(i, i + t774_perRow);
        t774_row.each(function () {
            var t774_curText = $(this).find(".t774__textwrapper"),
                t774_curBtns = $(this).find(".t774__btn-wrapper, .t774__btntext-wrapper"),
                t774_itemHeight = t774_curText.outerHeight() + t774_curBtns.outerHeight();
            if (t774_itemHeight > t774_maxHeight) {
                t774_maxHeight = t774_itemHeight
            }
        });
        t774_row.css("height", t774_maxHeight)
    }
}

function t776__init(recid) {
    setTimeout(function () {
        t_onFuncLoad('t_prod__init', function () {
            t_prod__init(recid)
        });
        t776_initPopup(recid);
        t776__hoverZoom_init(recid);
        t776__updateLazyLoad(recid);
        t776__alignButtons_init(recid);
        if (typeof t_store_addProductQuantityEvents !== 'undefined') {
            t776_initProductQuantity(recid)
        }
    }, 500)
}

function t776_initProductQuantity(recid) {
    var el = $('#rec' + recid);
    var productList = el.find(".t776__col, .t776__product-full");
    productList.each(function (i, product) {
        t_store_addProductQuantityEvents($(product))
    })
}

function t776__showMore(recid) {
    var el = $('#rec' + recid).find(".t776");
    var showmore = el.find('.t776__showmore');
    var cards_count = parseInt(el.attr('data-show-count'), 10);
    if (cards_count > 0) {
        if (showmore.text() === '') {
            showmore.find('td').text(t776__dict('loadmore'))
        }
        showmore.show();
        el.find('.t776__col').hide();
        var cards_size = el.find('.t776__col').size();
        var x = cards_count;
        var y = cards_count;
        t776__showSeparator(el, x);
        el.find('.t776__col:lt(' + x + ')').show();
        showmore.click(function () {
            x = (x + y <= cards_size) ? x + y : cards_size;
            el.find('.t776__col:lt(' + x + ')').show();
            if (x == cards_size) {
                showmore.hide()
            }
            t776__showSeparator(el, x)
        })
    }
}

function t776__showSeparator(el, x) {
    el.find('.t776__separator_number').addClass('t776__separator_hide');
    el.find('.t776__separator_hide').each(function () {
        if ($(this).attr('data-product-separator-number') <= x) {
            $(this).removeClass('t776__separator_hide')
        }
    })
}

function t776__dict(msg) {
    var dict = [];
    dict.loadmore = {
        EN: 'Load more',
        RU: 'Р—Р°РіСЂСѓР·РёС‚СЊ РµС‰Рµ',
        FR: 'Charger plus',
        DE: 'Mehr laden',
        ES: 'Carga mГЎs',
        PT: 'Carregue mais',
        UK: 'Р—Р°РІР°РЅС‚Р°Р¶РёС‚Рё С‰Рµ',
        JA: 'г‚‚гЃЈгЃЁиЄ­гЃїиѕјг‚Ђ',
        ZH: 'иЈќиј‰ж›ґе¤љ',
    };
    var lang = window.tildaBrowserLang;
    if (typeof dict[msg] !== 'undefined') {
        if (typeof dict[msg][lang] !== 'undefined' && dict[msg][lang] != '') {
            return dict[msg][lang]
        } else {
            return dict[msg].EN
        }
    }
    return 'Text not found "' + msg + '"'
}

function t776__alignButtons_init(recid) {
    var el = $('#rec' + recid);
    if (el.find('[data-buttons-v-align]')[0]) {
        try {
            t776__alignButtons(recid);
            $(window).bind('resize', t_throttle(function () {
                if (typeof window.noAdaptive !== 'undefined' && window.noAdaptive === !0 && $isMobile) {
                    return
                }
                t776__alignButtons(recid)
            }));
            el.find('.t776').bind('displayChanged', function () {
                t776__alignButtons(recid)
            });
            if ($isMobile) {
                $(window).on('orientationchange', function () {
                    t776__alignButtons(recid)
                })
            }
        } catch (e) {
            console.log('buttons-v-align error: ' + e.message)
        }
    }
}

function t776__alignButtons(recid) {
    var rec = $('#rec' + recid);
    var wrappers = rec.find('.t776__textwrapper');
    var maxHeight = 0;
    var itemsInRow = rec.find('.t-container').attr('data-blocks-per-row') * 1;
    var mobileView = $(window).width() <= 480;
    var tableView = $(window).width() <= 960 && $(window).width() > 480;
    var mobileOneRow = $(window).width() <= 960 && rec.find('.t776__container_mobile-flex')[0] ? true : !1;
    var mobileTwoItemsInRow = $(window).width() <= 480 && rec.find('.t776 .mobile-two-columns')[0] ? true : !1;
    if (mobileView) {
        itemsInRow = 1
    }
    if (tableView) {
        itemsInRow = 2
    }
    if (mobileTwoItemsInRow) {
        itemsInRow = 2
    }
    if (mobileOneRow) {
        itemsInRow = 999999
    }
    var i = 1;
    var wrappersInRow = [];
    $.each(wrappers, function (key, element) {
        element.style.height = 'auto';
        if (itemsInRow === 1) {
            element.style.height = 'auto'
        } else {
            wrappersInRow.push(element);
            if (element.offsetHeight > maxHeight) {
                maxHeight = element.offsetHeight
            }
            $.each(wrappersInRow, function (key, wrapper) {
                wrapper.style.height = maxHeight + 'px'
            });
            if (i === itemsInRow) {
                i = 0;
                maxHeight = 0;
                wrappersInRow = []
            }
            i++
        }
    })
}

function t776__hoverZoom_init(recid) {
    if (isMobile) {
        return
    }
    var rec = $('#rec' + recid);
    try {
        if (rec.find('[data-hover-zoom]')[0]) {
            if (!jQuery.cachedZoomScript) {
                jQuery.cachedZoomScript = function (url) {
                    var options = {
                        dataType: 'script',
                        cache: !0,
                        url: url
                    };
                    return jQuery.ajax(options)
                }
            }
            $.cachedZoomScript('https://static.tildacdn.com/js/tilda-hover-zoom-1.0.min.js').done(function (script, textStatus) {
                if (textStatus == 'success') {
                    setTimeout(function () {
                        t_hoverZoom_init(recid, ".t-slds__container")
                    }, 500)
                } else {
                    console.log('Upload script error: ' + textStatus)
                }
            })
        }
    } catch (e) {
        console.log('Zoom image init error: ' + e.message)
    }
}

function t776__updateLazyLoad(recid) {
    var scrollContainer = $("#rec" + recid + " .t776__container_mobile-flex");
    var curMode = $(".t-records").attr("data-tilda-mode");
    if (scrollContainer.length && curMode != "edit" && curMode != "preview") {
        scrollContainer.bind('scroll', t_throttle(function () {
            if (window.lazy == 'y') {
                t_lazyload_update()
            }
        }))
    }
}

function t776_initPopup(recid) {
    var rec = $('#rec' + recid);
    rec.find('[href^="#prodpopup"]').each(function (e) {
        var el_popup = rec.find('.t-popup');
        var el_prod = $(this).closest('.js-product');
        var lid_prod = el_prod.attr('data-product-lid');
        $(".r").find('a[href$="#!/tproduct/' + recid + '-' + lid_prod + '"]').click(function (e) {
            if (rec.find('[data-product-lid=' + lid_prod + ']').length) {
                rec.find('[data-product-lid=' + lid_prod + '] [href^="#prodpopup"]').triggerHandler('click')
            }
        })
    });
    rec.find('[href^="#prodpopup"]').one("click", function (e) {
        e.preventDefault();
        var el_popup = rec.find('.t-popup');
        var el_prod = $(this).closest('.js-product');
        var lid_prod = el_prod.attr('data-product-lid');
        t_onFuncLoad('t_sldsInit', function () {
            t_sldsInit(recid + ' #t776__product-' + lid_prod + '')
        })
    });
    rec.find('[href^="#prodpopup"]').click(function (e) {
        e.preventDefault();
        t776_showPopup(recid);
        var el_popup = rec.find('.t-popup');
        var el_prod = $(this).closest('.js-product');
        var lid_prod = el_prod.attr('data-product-lid');
        el_popup.find('.js-product').css('display', 'none');
        var el_fullprod = el_popup.find('.js-product[data-product-lid="' + lid_prod + '"]');
        el_fullprod.css('display', 'block');
        var analitics = el_popup.attr('data-track-popup');
        if (analitics > '') {
            var virtTitle = el_fullprod.find('.js-product-name').text();
            if (!virtTitle) {
                virtTitle = 'prod' + lid_prod
            }
            Tilda.sendEventToStatistics(analitics, virtTitle)
        }
        var curUrl = window.location.href;
        if (curUrl.indexOf('#!/tproduct/') < 0 && curUrl.indexOf('%23!/tproduct/') < 0) {
            if (typeof history.replaceState != 'undefined') {
                window.history.replaceState('', '', window.location.href + '#!/tproduct/' + recid + '-' + lid_prod)
            }
        }
        t776_updateSlider(recid + ' #t776__product-' + lid_prod + '');
        if (window.lazy == 'y') {
            t_lazyload_update()
        }
    });
    if ($('#record' + recid).length == 0) {
        t776_checkUrl(recid)
    }
    t776_copyTypography(recid)
}

function t776_checkUrl(recid) {
    var curUrl = window.location.href;
    var tprodIndex = curUrl.indexOf('#!/tproduct/');
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && tprodIndex < 0) {
        tprodIndex = curUrl.indexOf('%23!/tproduct/')
    }
    if (tprodIndex >= 0) {
        var curUrl = curUrl.substring(tprodIndex, curUrl.length);
        var curProdLid = curUrl.substring(curUrl.indexOf('-') + 1, curUrl.length);
        var rec = $('#rec' + recid);
        if (curUrl.indexOf(recid) >= 0 && rec.find('[data-product-lid=' + curProdLid + ']').length) {
            rec.find('[data-product-lid=' + curProdLid + '] [href^="#prodpopup"]').triggerHandler('click')
        }
    }
}

function t776_updateSlider(recid) {
    var el = $('#rec' + recid);
    t_onFuncLoad('t_slds_SliderWidth', function () {
        t_slds_SliderWidth(recid)
    });
    var sliderWrapper = el.find('.t-slds__items-wrapper');
    var sliderWidth = el.find('.t-slds__container').width();
    var pos = parseFloat(sliderWrapper.attr('data-slider-pos'));
    sliderWrapper.css({
        transform: 'translate3d(-' + (sliderWidth * pos) + 'px, 0, 0)'
    });
    t_onFuncLoad('t_slds_UpdateSliderHeight', function () {
        t_slds_UpdateSliderHeight(recid)
    });
    t_onFuncLoad('t_slds_UpdateSliderArrowsHeight', function () {
        t_slds_UpdateSliderArrowsHeight(recid)
    })
}

function t776_showPopup(recid) {
    var el = $('#rec' + recid);
    var popup = el.find('.t-popup');
    popup.css('display', 'block');
    setTimeout(function () {
        popup.find('.t-popup__container').addClass('t-popup__container-animated');
        popup.addClass('t-popup_show');
        if (window.lazy == 'y') {
            t_lazyload_update()
        }
    }, 50);
    $('body').addClass('t-body_popupshowed');
    el.find('.t-popup').mousedown(function (e) {
        var windowWidth = $(window).width();
        var maxScrollBarWidth = 17;
        var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
        if (e.clientX > windowWithoutScrollBar) {
            return
        }
        if (e.target == this) {
            t776_closePopup()
        }
    });
    el.find('.t-popup__close, .t776__close-text').click(function (e) {
        t776_closePopup()
    });
    $(document).keydown(function (e) {
        if (e.keyCode == 27) {
            t776_closePopup()
        }
    })
}

function t776_closePopup() {
    $('body').removeClass('t-body_popupshowed');
    $('.t-popup').removeClass('t-popup_show');
    var curUrl = window.location.href;
    var indexToRemove = curUrl.indexOf('#!/tproduct/');
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && indexToRemove < 0) {
        indexToRemove = curUrl.indexOf('%23!/tproduct/')
    }
    curUrl = curUrl.substring(0, indexToRemove);
    setTimeout(function () {
        $(".t-popup").scrollTop(0);
        $('.t-popup').not('.t-popup_show').css('display', 'none');
        if (typeof history.replaceState != 'undefined') {
            window.history.replaceState('', '', curUrl)
        }
    }, 300)
}

function t776_removeSizeStyles(styleStr) {
    if (typeof styleStr != "undefined" && (styleStr.indexOf('font-size') >= 0 || styleStr.indexOf('padding-top') >= 0 || styleStr.indexOf('padding-bottom') >= 0)) {
        var styleStrSplitted = styleStr.split(';');
        styleStr = "";
        for (var i = 0; i < styleStrSplitted.length; i++) {
            if (styleStrSplitted[i].indexOf('font-size') >= 0 || styleStrSplitted[i].indexOf('padding-top') >= 0 || styleStrSplitted[i].indexOf('padding-bottom') >= 0) {
                styleStrSplitted.splice(i, 1);
                i--;
                continue
            }
            if (styleStrSplitted[i] == "") {
                continue
            }
            styleStr += styleStrSplitted[i] + ";"
        }
    }
    return styleStr
}

function t776_copyTypography(recid) {
    var rec = $('#rec' + recid);
    var titleStyle = rec.find('.t776__title').attr('style');
    var descrStyle = rec.find('.t776__descr').attr('style');
    rec.find('.t-popup .t776__title').attr("style", t776_removeSizeStyles(titleStyle));
    rec.find('.t-popup .t776__descr, .t-popup .t776__text').attr("style", t776_removeSizeStyles(descrStyle))
}

function t778__init(recid) {
    t_onFuncLoad('t_prod__init', function () {
        t_prod__init(recid)
    });
    t778_initPopup(recid);
    t778__hoverZoom_init(recid);
    t778__updateLazyLoad(recid);
    t778__alignButtons_init(recid);
    t778__showMore(recid);
    if (typeof t_store_addProductQuantityEvents !== 'undefined') {
        t778_initProductQuantity(recid)
    }
}

function t778_initProductQuantity(recid) {
    var el = $('#rec' + recid);
    var productList = el.find(".t778__col, .t778__product-full");
    productList.each(function (i, product) {
        t_store_addProductQuantityEvents($(product))
    })
}

function t778__showMore(recid) {
    var el = $('#rec' + recid).find(".t778");
    var showmore = el.find('.t778__showmore');
    var cards_count = parseInt(el.attr('data-show-count'), 10);
    if (cards_count > 0) {
        if (showmore.text() === '') {
            showmore.find('td').text(t778__dict('loadmore'))
        }
        showmore.show();
        el.find('.t778__col').hide();
        var cards_size = el.find('.t778__col').size();
        var x = cards_count;
        var y = cards_count;
        t778__showSeparator(el, x);
        el.find('.t778__col:lt(' + x + ')').show();
        showmore.click(function () {
            x = (x + y <= cards_size) ? x + y : cards_size;
            el.find('.t778__col:lt(' + x + ')').show();
            if (x == cards_size) {
                showmore.hide()
            }
            t778__showSeparator(el, x)
        })
    }
}

function t778__dict(msg) {
    var dict = [];
    dict.loadmore = {
        EN: 'Load more',
        RU: 'Р—Р°РіСЂСѓР·РёС‚СЊ РµС‰Рµ',
        FR: 'Charger plus',
        DE: 'Mehr laden',
        ES: 'Carga mГЎs',
        PT: 'Carregue mais',
        UK: 'Р—Р°РІР°РЅС‚Р°Р¶РёС‚Рё С‰Рµ',
        JA: 'г‚‚гЃЈгЃЁиЄ­гЃїиѕјг‚Ђ',
        ZH: 'иЈќиј‰ж›ґе¤љ',
    };
    var lang = window.tildaBrowserLang;
    if (typeof dict[msg] !== 'undefined') {
        if (typeof dict[msg][lang] !== 'undefined' && dict[msg][lang] != '') {
            return dict[msg][lang]
        } else {
            return dict[msg].EN
        }
    }
    return 'Text not found "' + msg + '"'
}

function t778__showSeparator(el, x) {
    el.find('.t778__separator_number').addClass('t778__separator_hide');
    el.find('.t778__separator_hide').each(function () {
        if ($(this).attr('data-product-separator-number') <= x) {
            $(this).removeClass('t778__separator_hide')
        }
    })
}

function t778__hoverZoom_init(recid) {
    if (isMobile) {
        return
    }
    var rec = $('#rec' + recid);
    try {
        if (rec.find('[data-hover-zoom]')[0]) {
            if (!jQuery.cachedZoomScript) {
                jQuery.cachedZoomScript = function (url) {
                    var options = {
                        dataType: 'script',
                        cache: !0,
                        url: url
                    };
                    return jQuery.ajax(options)
                }
            }
            $.cachedZoomScript('https://static.tildacdn.com/js/tilda-hover-zoom-1.0.min.js').done(function (script, textStatus) {
                if (textStatus == 'success') {
                    setTimeout(function () {
                        t_hoverZoom_init(recid, ".t-slds__container")
                    }, 500)
                } else {
                    console.log('Upload script error: ' + textStatus)
                }
            })
        }
    } catch (e) {
        console.log('Zoom image init error: ' + e.message)
    }
}

function t778__updateLazyLoad(recid) {
    var scrollContainer = $("#rec" + recid + " .t778__container_mobile-flex");
    var curMode = $(".t-records").attr("data-tilda-mode");
    if (scrollContainer.length && curMode != "edit" && curMode != "preview") {
        scrollContainer.bind('scroll', t_throttle(function () {
            if (window.lazy == 'y') {
                t_lazyload_update()
            }
        }))
    }
}

function t778__alignButtons_init(recid) {
    var el = $('#rec' + recid);
    if (el.find('[data-buttons-v-align]')[0]) {
        try {
            t778__alignButtons(recid);
            $(window).bind('resize', t_throttle(function () {
                if (typeof window.noAdaptive !== 'undefined' && window.noAdaptive === !0 && $isMobile) {
                    return
                }
                t778__alignButtons(recid)
            }));
            el.find('.t778').bind('displayChanged', function () {
                t778__alignButtons(recid)
            });
            if ($isMobile) {
                $(window).on('orientationchange', function () {
                    t778__alignButtons(recid)
                })
            }
        } catch (e) {
            console.log('buttons-v-align error: ' + e.message)
        }
    }
}

function t778__alignButtons(recid) {
    var rec = $('#rec' + recid);
    var contents = rec.find('.t778__content');
    var maxHeight = 0;
    var maxHeightBtns = 0;
    var itemsInRow = rec.find('.t-container').attr('data-blocks-per-row') * 1;
    var mobileView = $(window).width() <= 480;
    var tableView = $(window).width() <= 960 && $(window).width() > 480;
    var mobileOneRow = $(window).width() <= 960 && rec.find('.t778__container_mobile-flex')[0] ? !0 : !1;
    var mobileTwoItemsInRow = $(window).width() <= 480 && rec.find('.t778 .mobile-two-columns')[0] ? !0 : !1;
    if (mobileView) {
        itemsInRow = 1
    }
    if (tableView) {
        itemsInRow = 2
    }
    if (mobileTwoItemsInRow) {
        itemsInRow = 2
    }
    if (mobileOneRow) {
        itemsInRow = 999999
    }
    var i = 1;
    var textWrappersInRow = [];
    var btnWrappersInRow = [];
    $.each(contents, function (key, content) {
        var textWrapper = $(content).find('.t778__textwrapper');
        if (textWrapper.length > 0) {
            textWrapper = textWrapper[0];
            textWrapper.style.height = 'auto';
            if (itemsInRow === 1) {
                textWrapper.style.height = 'auto'
            } else {
                textWrappersInRow.push(textWrapper);
                if (textWrapper.offsetHeight > maxHeight) {
                    maxHeight = textWrapper.offsetHeight
                }
                $.each(textWrappersInRow, function (key, wrapper) {
                    wrapper.style.height = maxHeight + 'px'
                })
            }
        }
        var btnWrapper = $(content).find('.t778__btn-wrapper');
        if (btnWrapper.length > 0) {
            btnWrapper = btnWrapper[0];
            btnWrapper.style.marginTop = '';
            if (itemsInRow === 1) {
                btnWrapper.style.marginTop = ''
            } else {
                btnWrappersInRow.push(btnWrapper);
                if (btnWrapper.offsetHeight > maxHeightBtns) {
                    maxHeightBtns = btnWrapper.offsetHeight
                }
                $.each(btnWrappersInRow, function (key, btn) {
                    if (maxHeightBtns > btn.offsetHeight) {
                        btn.style.marginTop = (maxHeightBtns - btn.offsetHeight) + 'px'
                    }
                })
            }
        }
        if (i === itemsInRow) {
            i = 0;
            maxHeight = 0;
            textWrappersInRow = [];
            maxHeightBtns = 0;
            btnWrappersInRow = []
        }
        i++
    })
}

function t778_initPopup(recid) {
    var rec = $('#rec' + recid);
    rec.find('[href^="#prodpopup"]').each(function (e) {
        var el_popup = rec.find('.t-popup');
        var el_prod = $(this).closest('.js-product');
        var lid_prod = el_prod.attr('data-product-lid');
        $(".r").find('a[href$="#!/tproduct/' + recid + '-' + lid_prod + '"]').click(function (e) {
            if (rec.find('[data-product-lid=' + lid_prod + ']').length) {
                rec.find('[data-product-lid=' + lid_prod + '] [href^="#prodpopup"]').triggerHandler('click')
            }
        })
    });
    rec.find('[href^="#prodpopup"]').one("click", function (e) {
        e.preventDefault();
        var el_popup = rec.find('.t-popup');
        var el_prod = $(this).closest('.js-product');
        var lid_prod = el_prod.attr('data-product-lid');
        t_onFuncLoad('t_sldsInit', function () {
            t_sldsInit(recid + ' #t778__product-' + lid_prod + '')
        })
    });
    rec.find('[href^="#prodpopup"]').click(function (e) {
        e.preventDefault();
        t778_showPopup(recid);
        var el_popup = rec.find('.t-popup');
        var el_prod = $(this).closest('.js-product');
        var lid_prod = el_prod.attr('data-product-lid');
        el_popup.find('.js-product').css('display', 'none');
        var el_fullprod = el_popup.find('.js-product[data-product-lid="' + lid_prod + '"]');
        el_fullprod.css('display', 'block');
        var analitics = el_popup.attr('data-track-popup');
        if (analitics > '') {
            var virtTitle = el_fullprod.find('.js-product-name').text();
            if (!virtTitle) {
                virtTitle = 'prod' + lid_prod
            }
            Tilda.sendEventToStatistics(analitics, virtTitle)
        }
        var curUrl = window.location.href;
        if (curUrl.indexOf('#!/tproduct/') < 0 && curUrl.indexOf('%23!/tproduct/') < 0) {
            if (typeof history.replaceState != 'undefined') {
                window.history.replaceState('', '', window.location.href + '#!/tproduct/' + recid + '-' + lid_prod)
            }
        }
        t778_updateSlider(recid + ' #t778__product-' + lid_prod + '');
        if (window.lazy == 'y') {
            t_lazyload_update()
        }
    });
    if ($('#record' + recid).length == 0) {
        t778_checkUrl(recid)
    }
    t778_copyTypography(recid)
}

function t778_checkUrl(recid) {
    var curUrl = window.location.href;
    var tprodIndex = curUrl.indexOf('#!/tproduct/');
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && tprodIndex < 0) {
        tprodIndex = curUrl.indexOf('%23!/tproduct/')
    }
    if (tprodIndex >= 0) {
        var curUrl = curUrl.substring(tprodIndex, curUrl.length);
        var curProdLid = curUrl.substring(curUrl.indexOf('-') + 1, curUrl.length);
        var rec = $('#rec' + recid);
        if (curUrl.indexOf(recid) >= 0 && rec.find('[data-product-lid=' + curProdLid + ']').length) {
            rec.find('[data-product-lid=' + curProdLid + '] [href^="#prodpopup"]').triggerHandler('click')
        }
    }
}

function t778_updateSlider(recid) {
    var el = $('#rec' + recid);
    t_onFuncLoad('t_slds_SliderWidth', function () {
        t_slds_SliderWidth(recid)
    });
    var sliderWrapper = el.find('.t-slds__items-wrapper');
    var sliderWidth = el.find('.t-slds__container').width();
    var pos = parseFloat(sliderWrapper.attr('data-slider-pos'));
    sliderWrapper.css({
        transform: 'translate3d(-' + (sliderWidth * pos) + 'px, 0, 0)'
    });
    t_onFuncLoad('t_slds_UpdateSliderHeight', function () {
        t_slds_UpdateSliderHeight(recid)
    });
    t_onFuncLoad('t_slds_UpdateSliderArrowsHeight', function () {
        t_slds_UpdateSliderArrowsHeight(recid)
    })
}

function t778_showPopup(recid) {
    var el = $('#rec' + recid);
    var popup = el.find('.t-popup');
    popup.css('display', 'block');
    setTimeout(function () {
        popup.find('.t-popup__container').addClass('t-popup__container-animated');
        popup.addClass('t-popup_show');
        if (window.lazy == 'y') {
            t_lazyload_update()
        }
    }, 50);
    $('body').addClass('t-body_popupshowed');
    el.find('.t-popup').mousedown(function (e) {
        var windowWidth = $(window).width();
        var maxScrollBarWidth = 17;
        var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
        if (e.clientX > windowWithoutScrollBar) {
            return
        }
        if (e.target == this) {
            t778_closePopup()
        }
    });
    el.find('.t-popup__close, .t778__close-text').click(function (e) {
        t778_closePopup()
    });
    $(document).keydown(function (e) {
        if (e.keyCode == 27) {
            t778_closePopup()
        }
    })
}

function t778_closePopup() {
    $('body').removeClass('t-body_popupshowed');
    $('.t-popup').removeClass('t-popup_show');
    var curUrl = window.location.href;
    var indexToRemove = curUrl.indexOf('#!/tproduct/');
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && indexToRemove < 0) {
        indexToRemove = curUrl.indexOf('%23!/tproduct/')
    }
    curUrl = curUrl.substring(0, indexToRemove);
    setTimeout(function () {
        $(".t-popup").scrollTop(0);
        $('.t-popup').not('.t-popup_show').css('display', 'none');
        if (typeof history.replaceState != 'undefined') {
            window.history.replaceState('', '', curUrl)
        }
    }, 300)
}

function t778_removeSizeStyles(styleStr) {
    if (typeof styleStr != "undefined" && (styleStr.indexOf('font-size') >= 0 || styleStr.indexOf('padding-top') >= 0 || styleStr.indexOf('padding-bottom') >= 0)) {
        var styleStrSplitted = styleStr.split(';');
        styleStr = "";
        for (var i = 0; i < styleStrSplitted.length; i++) {
            if (styleStrSplitted[i].indexOf('font-size') >= 0 || styleStrSplitted[i].indexOf('padding-top') >= 0 || styleStrSplitted[i].indexOf('padding-bottom') >= 0) {
                styleStrSplitted.splice(i, 1);
                i--;
                continue
            }
            if (styleStrSplitted[i] == "") {
                continue
            }
            styleStr += styleStrSplitted[i] + ";"
        }
    }
    return styleStr
}

function t778_copyTypography(recid) {
    var rec = $('#rec' + recid);
    var titleStyle = rec.find('.t778__title').attr('style');
    var descrStyle = rec.find('.t778__descr').attr('style');
    rec.find('.t-popup .t778__title').attr("style", t778_removeSizeStyles(titleStyle));
    rec.find('.t-popup .t778__descr, .t-popup .t778__text').attr("style", t778_removeSizeStyles(descrStyle))
}

function t778_unifyHeights(recid) {
    var t778_el = $('#rec' + recid),
        t778_blocksPerRow = t778_el.find(".t778__container").attr("data-blocks-per-row"),
        t778_cols = t778_el.find(".t778__textwrapper"),
        t778_mobScroll = t778_el.find(".t778__scroll-icon-wrapper").length;
    if ($(window).width() <= 480 && t778_mobScroll == 0) {
        t778_cols.css("height", "auto");
        return
    }
    var t778_perRow = +t778_blocksPerRow;
    if ($(window).width() <= 960 && t778_mobScroll > 0) {
        var t778_perRow = t778_cols.length
    } else {
        if ($(window).width() <= 960) {
            var t778_perRow = 2
        }
    }
    for (var i = 0; i < t778_cols.length; i += t778_perRow) {
        var t778_maxHeight = 0,
            t778_row = t778_cols.slice(i, i + t778_perRow);
        t778_row.each(function () {
            var t778_curText = $(this).find(".t778__textwrapper"),
                t778_curBtns = $(this).find(".t778__btn-wrapper_absolute"),
                t778_itemHeight = t778_curText.outerHeight() + t778_curBtns.outerHeight();
            if (t778_itemHeight > t778_maxHeight) {
                t778_maxHeight = t778_itemHeight
            }
        });
        t778_row.css("height", t778_maxHeight)
    }
}

function t780_init(recid) {
    if ($("#rec" + recid + " .t-slds").length) {
        t_onFuncLoad('t_sldsInit', function () {
            t_sldsInit(recid)
        })
    }
    setTimeout(function () {
        t_onFuncLoad('t_prod__init', function () {
            t_prod__init(recid)
        })
    }, 500);
    $('#rec' + recid).find('.t780').bind('displayChanged', function () {
        t_onFuncLoad('t_slds_updateSlider', function () {
            t_slds_updateSlider(recid)
        })
    })
}

function t786__init(recid) {
    setTimeout(function () {
        t_onFuncLoad('t_prod__init', function () {
            t_prod__init(recid)
        });
        t786_initPopup(recid);
        t786__hoverZoom_init(recid);
        t786__updateLazyLoad(recid);
        t786__alignButtons_init(recid);
        if (typeof t_store_addProductQuantityEvents !== 'undefined') {
            t786_initProductQuantity(recid)
        }
    }, 500)
}

function t786_initProductQuantity(recid) {
    var el = $('#rec' + recid);
    var productList = el.find(".t786__col, .t786__product-full");
    productList.each(function (i, product) {
        t_store_addProductQuantityEvents($(product))
    })
}

function t786__alignButtons_init(recid) {
    var el = $('#rec' + recid);
    if (el.find('[data-buttons-v-align]')[0]) {
        try {
            t786__alignButtons(recid);
            $(window).bind('resize', t_throttle(function () {
                if (typeof window.noAdaptive !== 'undefined' && window.noAdaptive === !0 && $isMobile) {
                    return
                }
                t786__alignButtons(recid)
            }));
            el.find('.t786').bind('displayChanged', function () {
                t786__alignButtons(recid)
            });
            if ($isMobile) {
                $(window).on('orientationchange', function () {
                    t786__alignButtons(recid)
                })
            }
        } catch (e) {
            console.log('buttons-v-align error: ' + e.message)
        }
    }
}

function t786__showMore(recid) {
    var el = $('#rec' + recid).find(".t786");
    var showmore = el.find('.t786__showmore');
    var cards_count = parseInt(el.attr('data-show-count'), 10);
    if (cards_count > 0) {
        if (showmore.text() === '') {
            showmore.find('td').text(t786__dict('loadmore'))
        }
        showmore.show();
        el.find('.t786__col').hide();
        var cards_size = el.find('.t786__col').size();
        var x = cards_count;
        var y = cards_count;
        t786__showSeparator(el, x);
        el.find('.t786__col:lt(' + x + ')').show();
        showmore.click(function () {
            x = (x + y <= cards_size) ? x + y : cards_size;
            el.find('.t786__col:lt(' + x + ')').show();
            if (x == cards_size) {
                showmore.hide()
            }
            t786__showSeparator(el, x)
        })
    }
}

function t786__dict(msg) {
    var dict = [];
    dict.loadmore = {
        EN: 'Load more',
        RU: 'Р—Р°РіСЂСѓР·РёС‚СЊ РµС‰Рµ',
        FR: 'Charger plus',
        DE: 'Mehr laden',
        ES: 'Carga mГЎs',
        PT: 'Carregue mais',
        UK: 'Р—Р°РІР°РЅС‚Р°Р¶РёС‚Рё С‰Рµ',
        JA: 'г‚‚гЃЈгЃЁиЄ­гЃїиѕјг‚Ђ',
        ZH: 'иЈќиј‰ж›ґе¤љ',
    };
    var lang = window.tildaBrowserLang;
    if (typeof dict[msg] !== 'undefined') {
        if (typeof dict[msg][lang] !== 'undefined' && dict[msg][lang] != '') {
            return dict[msg][lang]
        } else {
            return dict[msg].EN
        }
    }
    return 'Text not found "' + msg + '"'
}

function t786__showSeparator(el, x) {
    el.find('.t786__separator_number').addClass('t786__separator_hide');
    el.find('.t786__separator_hide').each(function () {
        if ($(this).attr('data-product-separator-number') <= x) {
            $(this).removeClass('t786__separator_hide')
        }
    })
}

function t786__alignButtons(recid) {
    var rec = $('#rec' + recid);
    var wrappers = rec.find('.t786__textwrapper');
    var maxHeight = 0;
    var itemsInRow = rec.find('.t-container').attr('data-blocks-per-row') * 1;
    var mobileView = $(window).width() <= 480;
    var tableView = $(window).width() <= 960 && $(window).width() > 480;
    var mobileOneRow = $(window).width() <= 960 && rec.find('.t786__container_mobile-flex')[0] ? !0 : !1;
    var mobileTwoItemsInRow = $(window).width() <= 480 && rec.find('.t786 .mobile-two-columns')[0] ? !0 : !1;
    if (mobileView) {
        itemsInRow = 1
    }
    if (tableView) {
        itemsInRow = 2
    }
    if (mobileTwoItemsInRow) {
        itemsInRow = 2
    }
    if (mobileOneRow) {
        itemsInRow = 999999
    }
    var i = 1;
    var wrappersInRow = [];
    $.each(wrappers, function (key, element) {
        element.style.height = 'auto';
        if (itemsInRow === 1) {
            element.style.height = 'auto'
        } else {
            wrappersInRow.push(element);
            if (element.offsetHeight > maxHeight) {
                maxHeight = element.offsetHeight
            }
            $.each(wrappersInRow, function (key, wrapper) {
                wrapper.style.height = maxHeight + 'px'
            });
            if (i === itemsInRow) {
                i = 0;
                maxHeight = 0;
                wrappersInRow = []
            }
            i++
        }
    })
}

function t786__hoverZoom_init(recid) {
    if (isMobile) {
        return
    }
    var rec = $('#rec' + recid);
    try {
        if (rec.find('[data-hover-zoom]')[0]) {
            if (!jQuery.cachedZoomScript) {
                jQuery.cachedZoomScript = function (url) {
                    var options = {
                        dataType: 'script',
                        cache: !0,
                        url: url
                    };
                    return jQuery.ajax(options)
                }
            }
            $.cachedZoomScript('https://static.tildacdn.com/js/tilda-hover-zoom-1.0.min.js').done(function (script, textStatus) {
                if (textStatus == 'success') {
                    setTimeout(function () {
                        t_hoverZoom_init(recid, ".t-slds__container")
                    }, 500)
                } else {
                    console.log('Upload script error: ' + textStatus)
                }
            })
        }
    } catch (e) {
        console.log('Zoom image init error: ' + e.message)
    }
}

function t786__updateLazyLoad(recid) {
    var scrollContainer = $("#rec" + recid + " .t786__container_mobile-flex");
    var curMode = $(".t-records").attr("data-tilda-mode");
    if (scrollContainer.length && curMode != "edit" && curMode != "preview") {
        scrollContainer.bind('scroll', t_throttle(function () {
            if (window.lazy == 'y') {
                t_lazyload_update()
            }
        }))
    }
}

function t786_initPopup(recid) {
    var rec = $('#rec' + recid);
    rec.find('[href^="#prodpopup"]').one("click", function (e) {
        e.preventDefault();
        var el_popup = rec.find('.t-popup');
        var el_prod = $(this).closest('.js-product');
        var lid_prod = el_prod.attr('data-product-lid');
        t_onFuncLoad('t_sldsInit', function () {
            t_sldsInit(recid + ' #t786__product-' + lid_prod + '')
        })
    });
    rec.find('[href^="#prodpopup"]').click(function (e) {
        e.preventDefault();
        t786_showPopup(recid);
        var el_popup = rec.find('.t-popup');
        var el_prod = $(this).closest('.js-product');
        var lid_prod = el_prod.attr('data-product-lid');
        el_popup.find('.js-product').css('display', 'none');
        var el_fullprod = el_popup.find('.js-product[data-product-lid="' + lid_prod + '"]');
        el_fullprod.css('display', 'block');
        var analitics = el_popup.attr('data-track-popup');
        if (analitics > '') {
            var virtTitle = el_fullprod.find('.js-product-name').text();
            if (!virtTitle) {
                virtTitle = 'prod' + lid_prod
            }
            Tilda.sendEventToStatistics(analitics, virtTitle)
        }
        var curUrl = window.location.href;
        if (curUrl.indexOf('#!/tproduct/') < 0 && curUrl.indexOf('%23!/tproduct/') < 0) {
            if (typeof history.replaceState != 'undefined') {
                window.history.replaceState('', '', window.location.href + '#!/tproduct/' + recid + '-' + lid_prod)
            }
        }
        t786_updateSlider(recid + ' #t786__product-' + lid_prod + '');
        if (window.lazy == 'y') {
            t_lazyload_update()
        }
    });
    if ($('#record' + recid).length == 0) {
        t786_checkUrl(recid)
    }
    t786_copyTypography(recid)
}

function t786_checkUrl(recid) {
    var curUrl = window.location.href;
    var tprodIndex = curUrl.indexOf('#!/tproduct/');
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && tprodIndex < 0) {
        tprodIndex = curUrl.indexOf('%23!/tproduct/')
    }
    if (tprodIndex >= 0) {
        var curUrl = curUrl.substring(tprodIndex, curUrl.length);
        var curProdLid = curUrl.substring(curUrl.indexOf('-') + 1, curUrl.length);
        var rec = $('#rec' + recid);
        if (curUrl.indexOf(recid) >= 0 && rec.find('[data-product-lid=' + curProdLid + ']').length) {
            rec.find('[data-product-lid=' + curProdLid + '] [href^="#prodpopup"]').triggerHandler('click')
        }
    }
}

function t786_updateSlider(recid) {
    var el = $('#rec' + recid);
    t_onFuncLoad('t_slds_SliderWidth', function () {
        t_slds_SliderWidth(recid)
    });
    var sliderWrapper = el.find('.t-slds__items-wrapper');
    var sliderWidth = el.find('.t-slds__container').width();
    var pos = parseFloat(sliderWrapper.attr('data-slider-pos'));
    sliderWrapper.css({
        transform: 'translate3d(-' + (sliderWidth * pos) + 'px, 0, 0)'
    });
    t_onFuncLoad('t_slds_UpdateSliderHeight', function () {
        t_slds_UpdateSliderHeight(recid)
    });
    t_onFuncLoad('t_slds_UpdateSliderArrowsHeight', function () {
        t_slds_UpdateSliderArrowsHeight(recid)
    })
}

function t786_showPopup(recid) {
    var el = $('#rec' + recid);
    var popup = el.find('.t-popup');
    popup.css('display', 'block');
    setTimeout(function () {
        popup.find('.t-popup__container').addClass('t-popup__container-animated');
        popup.addClass('t-popup_show');
        if (window.lazy == 'y') {
            t_lazyload_update()
        }
    }, 50);
    $('body').addClass('t-body_popupshowed');
    el.find('.t-popup').mousedown(function (e) {
        var windowWidth = $(window).width();
        var maxScrollBarWidth = 17;
        var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
        if (e.clientX > windowWithoutScrollBar) {
            return
        }
        if (e.target == this) {
            t786_closePopup()
        }
    });
    el.find('.t-popup__close, .t786__close-text').click(function (e) {
        t786_closePopup()
    });
    $(document).keydown(function (e) {
        if (e.keyCode == 27) {
            t786_closePopup()
        }
    })
}

function t786_closePopup() {
    $('body').removeClass('t-body_popupshowed');
    $('.t-popup').removeClass('t-popup_show');
    var curUrl = window.location.href;
    var indexToRemove = curUrl.indexOf('#!/tproduct/');
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && indexToRemove < 0) {
        indexToRemove = curUrl.indexOf('%23!/tproduct/')
    }
    curUrl = curUrl.substring(0, indexToRemove);
    setTimeout(function () {
        $(".t-popup").scrollTop(0);
        $('.t-popup').not('.t-popup_show').css('display', 'none');
        if (typeof history.replaceState != 'undefined') {
            window.history.replaceState('', '', curUrl)
        }
    }, 300)
}

function t786_removeSizeStyles(styleStr) {
    if (typeof styleStr != "undefined" && (styleStr.indexOf('font-size') >= 0 || styleStr.indexOf('padding-top') >= 0 || styleStr.indexOf('padding-bottom') >= 0)) {
        var styleStrSplitted = styleStr.split(';');
        styleStr = "";
        for (var i = 0; i < styleStrSplitted.length; i++) {
            if (styleStrSplitted[i].indexOf('font-size') >= 0 || styleStrSplitted[i].indexOf('padding-top') >= 0 || styleStrSplitted[i].indexOf('padding-bottom') >= 0) {
                styleStrSplitted.splice(i, 1);
                i--;
                continue
            }
            if (styleStrSplitted[i] == "") {
                continue
            }
            styleStr += styleStrSplitted[i] + ";"
        }
    }
    return styleStr
}

function t786_copyTypography(recid) {
    var rec = $('#rec' + recid);
    var titleStyle = rec.find('.t786__title').attr('style');
    var descrStyle = rec.find('.t786__descr').attr('style');
    rec.find('.t-popup .t786__title').attr("style", t786_removeSizeStyles(titleStyle));
    rec.find('.t-popup .t786__descr, .t-popup .t786__text').attr("style", t786_removeSizeStyles(descrStyle))
}

function t796_init(recid) {
    var el = $("#rec" + recid);
    var winWidth = $(window).width();
    var screenMin = el.attr("data-screen-min");
    var screenMax = el.attr("data-screen-max");
    if (typeof screenMin !== 'undefined') {
        if (winWidth < parseInt(screenMin, 10)) {
            return !1
        }
    }
    if (typeof screenMax !== 'undefined') {
        if (winWidth > parseInt(screenMax, 10)) {
            return !1
        }
    }
    var shapeEl = el.find(".t796__shape-border");
    var recs = el.find(".t796").attr("data-shape-rec-ids");
    if (typeof recs != "undefined") {
        recs = recs.split(",");
        recs.forEach(function (rec_id, i, arr) {
            var curRec = $("#rec" + rec_id);
            var curShapeEl = shapeEl.clone();
            t796_setColor(el, curShapeEl);
            t796_addDivider(curRec, curShapeEl)
        })
    } else {
        var excludes = "[data-record-type='215'],[data-record-type='706'],[data-record-type='651'],[data-record-type='825'],[data-record-type='708']";
        var curRec;
        if (shapeEl.hasClass('t796__shape-border_top') || shapeEl.hasClass('t796__shape-border_top-flip')) {
            curRec = el.next(".r");
            if (curRec.is(excludes)) {
                curRec = curRec.next(".r")
            }
        }
        if (shapeEl.hasClass('t796__shape-border_bottom') || shapeEl.hasClass('t796__shape-border_bottom-flip')) {
            curRec = el.prev(".r");
            if (curRec.is(excludes)) {
                curRec = curRec.prev(".r")
            }
        }
        if (curRec.length !== 0) {
            var curShapeEl = shapeEl.clone();
            t796_setColor(el, curShapeEl);
            t796_addDivider(curRec, curShapeEl)
        }
    }
}

function t796_addDivider(curRec, curShapeEl) {
    curRec.attr("data-animationappear", "off").removeClass('r_hidden');
    var coverWrapper = curRec.find(".t-cover");
    var zeroWrapper = curRec.find(".t396");
    if (coverWrapper.find('.t557__snow-layer').length > 0) {
        curShapeEl.css('z-index', 1)
    }
    if (coverWrapper.length > 0 || zeroWrapper.length > 0) {
        if (coverWrapper.length > 0) {
            coverWrapper.find(".t-cover__filter").after(curShapeEl)
        }
        if (zeroWrapper.length > 0) {
            zeroWrapper.after(curShapeEl);
            curRec.css("position", "relative")
        }
        curShapeEl.css("display", "block")
    } else {
        var wrapper = curRec;
        var curRecType = curRec.attr("data-record-type");
        if (wrapper.length === 0) {
            return !0
        }
        wrapper.append(curShapeEl);
        wrapper.css("position", "relative");
        if (curRecType != "554" && curRecType != "125") {
            wrapper.children("div").first().css({
                "position": "relative",
                "z-index": "1"
            }).addClass("t796_cont-near-shape-divider")
        }
        var excludeBlocks = {
            734: 1,
            675: 1,
            279: 1,
            694: 1,
            195: 1,
            938: 1,
        }
        if (excludeBlocks[curRecType] !== undefined) {
            curShapeEl.css("z-index", excludeBlocks[curRecType])
        }
        curShapeEl.css("display", "block")
    }
}

function t796_setColor(el, curShapeEl) {
    if (typeof curShapeEl.attr("data-fill-color") != "undefined") {
        return
    }
    var nearestBlock;
    if (curShapeEl.hasClass("t796__shape-border_bottom") || curShapeEl.hasClass("t796__shape-border_bottom-flip")) {
        nearestBlock = el.next(".r")
    } else {
        nearestBlock = el.prev(".r")
    }
    if (nearestBlock.length === 0) {
        return
    }
    var fillColor = nearestBlock.attr("data-bg-color");
    if (typeof fillColor == "undefined") {
        return
    }
    curShapeEl.find(".t796__svg").css("fill", fillColor)
}

function t797_init(recid) {
    if (isMobile) {
        $("#rec" + recid + " .t797__txt-wrapper").css("display", "none")
    }
    t_onFuncLoad('tvote__init', function () {
        tvote__init(recid)
    })
}

function t806__init(recid) {
    t_onFuncLoad('tvote__init', function () {
        tvote__init(recid)
    });
    var testWrap = $('#rec' + recid);
    var testContainer = testWrap.find('.t806');
    var rightAnswersCount;
    var testAnswers = testWrap.find('.t806__answers');
    var testBlock = testWrap.find('.t806__test');
    var testResultWrap = testWrap.find('.t806__result-wrap');
    var shareVK = testWrap.find('.t806__social-btn-vk');
    var shareFB = testWrap.find('.t806__social-btn-fb');
    var shareTwitter = testWrap.find('.t806__social-btn-twitter');
    var rightTestAnswers = [];
    var testImgSrc = [];
    var startTitle = testWrap.find('.t806__start-title').text();
    var startText = testWrap.find('.t806__start-text').text();
    var siteLocation = window.location.href;
    testBlock.addClass('t806__counter');
    testBlock.attr('data-count', 0);
    testResultWrap.each(function (i) {
        if ($(testResultWrap[i]).find('img').attr('src') !== '') {
            testImgSrc.push($(testResultWrap[i]).find('img').attr('src'))
        }
    });
    if (testImgSrc.length == 1) {
        testResultWrap.each(function (i) {
            $(testResultWrap[i]).find('img').attr('src', testImgSrc[0]);
            $(testResultWrap[i]).find('.t806__result-desc').removeClass('t806__result-desc_withoutimg');
            $(testResultWrap[i]).find('.t806__result-count, .t806__result-variant').css('color', '#ffffff')
        })
    }
    testAnswers.each(function () {
        rightTestAnswers.push($(this).attr('data-right-answer'));
        $(this).removeAttr('data-right-answer')
    });
    t806__changeRadio(recid, rightTestAnswers);
    t806__changeTestInput(recid);
    t806__startClickBtn(recid);
    t806__checkClickBtn(recid, rightTestAnswers);
    t806__nextClickBtn(recid);
    t806__resultClickBtn(recid);
    t806__restartClickBtn(recid, rightTestAnswers);
    shareVK.click(function () {
        t806_shareVK(recid, startTitle, siteLocation)
    });
    shareFB.click(function () {
        t806_shareFB(recid, startTitle, startText, siteLocation)
    });
    shareTwitter.click(function () {
        t806_shareTwitter(recid, startTitle, siteLocation)
    });
    t806__clearFormOnBackClick(testWrap)
}

function t806_scrollToTop(testBlock) {
    var topCoordinate = testBlock.offset().top;
    $('html, body').animate({
        scrollTop: topCoordinate
    }, 0)
}

function t806__clearFormOnBackClick(testWrap) {
    window.addEventListener('pagehide', function () {
        testWrap.find('.t806__input').prop('checked', !1)
    })
}

function t806__startClickBtn(test) {
    var testWrap = $('#rec' + test);
    var questionFirst = 1;
    var testBtnStart = testWrap.find('.t806__start-btn');
    testBtnStart.on('click', function (e) {
        var testStart = $(this).parents('.t806__start');
        testStart.hide();
        testStart.next().show();
        t806__showNumber(test, questionFirst);
        t806_fixcontentheight(test);
        t806_scrollToTop(testWrap);
        if (typeof $(".t-records").attr("data-tilda-mode") == "undefined") {
            if (window.lazy == 'y') {
                t_lazyload_update()
            }
        }
        e.preventDefault()
    })
}

function t806__changeRadio(test, rightansw) {
    var testBlock = $('#rec' + test);
    var testInput = testBlock.find('.t806__input[type="radio"]');
    var lastQuestion = testBlock.find('.t806__question').last();
    lastQuestion.addClass('t806__lastquestion');
    testInput.change(function () {
        var rightAnswersCount = testBlock.find('.t806__counter').attr('data-count');
        var testItem = $(this).parents('#rec' + test + ' .t806__question');
        var testAnswers = $(this).parents('#rec' + test + ' .t806__answers');
        var answerVote = $(this).parents('#rec' + test + ' .t806__answers').find('.t806__answer .t-vote__btn-res');
        var currentRightAnswer = rightansw[testItem.attr('data-question-num') - 1];
        if ($(this).attr('type') === 'radio') {
            var checkedRadio = $(this).val();
            testAnswers.addClass('t806__answers_answered');
            if (testItem.hasClass('t806__lastquestion')) {
                testAnswers.siblings('.t806__btn-wrapper').find('.t806__btn_result').addClass('t806__btn_show')
            } else {
                testAnswers.siblings('.t806__btn-wrapper').find('.t806__btn_next').addClass('t806__btn_show')
            }
            testItem.find('.t806__input').attr('disabled', !0);
            if (+checkedRadio === +currentRightAnswer) {
                rightAnswersCount++;
                testBlock.find('.t806__counter').attr('data-count', rightAnswersCount)
            }
            if (+testItem.find('.t806__input:checked').val() !== +currentRightAnswer) {
                testItem.find('.t806__input:checked').parents('.t806__answer').addClass('t806__answer_wrong')
            }
            testItem.find('.t806__input:checked').parent().siblings('.t806__details').show();
            testItem.find('.t806__input[value="' + currentRightAnswer + '"]').parents('.t806__answer').addClass('t806__answer_correct');
            answerVote.addClass('t806__answer-vote_show');
            testItem.find('.t806__input:checked').parents('.t806__answer_correct').addClass('t806__answer_withoutopacity');
            testItem.find('.t806__input[type="radio"]').parents('.t806__answer_correct').addClass('t806__answer_withoutopacity')
        }
        t806_fixcontentheight(test)
    })
}

function t806__changeTestInput(test) {
    var testBlock = $('#rec' + test);
    var testInput = testBlock.find('.t806__input[type="checkbox"]');
    var lastQuestion = testBlock.find('.t806__question').last();
    var checkedAnswerCheck = [];
    testBlock.find('.t806__answers').attr('data-test-checked', '');
    lastQuestion.addClass('t806__lastquestion');
    testInput.change(function () {
        var testAnswers = $(this).parents('#rec' + test + ' .t806__answers');
        if ($(this).attr('type') === 'checkbox') {
            testAnswers.siblings('.t806__btn-wrapper').find('.t806__btn_check').addClass('t806__btn_show')
        }
        if ($(this).attr('type') === 'checkbox' && $(this).is(':checked') && checkedAnswerCheck.indexOf($(this).val()) === -1) {
            checkedAnswerCheck.push($(this).val())
        }
        if ($(this).attr('type') === 'checkbox' && !$(this).is(":checked")) {
            checkedAnswerCheck.splice(checkedAnswerCheck.indexOf($(this).val()), 1)
        }
        testAnswers.attr('data-test-checked', checkedAnswerCheck.join(','));
        t806_fixcontentheight(test)
    });
    return checkedAnswerCheck
}

function t806__checkClickBtn(test, rightansw) {
    var rightChecked = !1;
    var testBlock = $('#rec' + test);
    var testBtnCheck = testBlock.find('.t806__btn_check');
    var testInput = testBlock.find('.t806__input');
    var checkedAnswersTruth = [];
    testBtnCheck.on('click', function (e) {
        var rightAnswersCount = testBlock.find('.t806__counter').attr('data-count');
        var testItem = $(this).parents('#rec' + test + ' .t806__question');
        var testAnswers = $(this).parents('#rec' + test + ' .t806__question').find('.t806__answers');
        var answerVote = $(this).parents('.t806__btn-wrapper').siblings('#rec' + test + ' .t806__answers').find('.t806__answer .t-vote__btn-res');
        var checkboxAnswersArr = [];
        var checkboxAnswers = rightansw[testItem.attr('data-question-num') - 1].split(',');
        var checkedAnswers = testAnswers.attr('data-test-checked').split(',');
        for (var i = 0; i < checkboxAnswers.length; i++) {
            checkboxAnswersArr.push(checkboxAnswers[i])
        }
        testItem.find(testInput).attr('disabled', !0);
        answerVote.addClass('t806__answer-vote_show');
        checkedAnswers.forEach(function (item, i) {
            var checkedCheckboxSort = checkedAnswers.sort();
            var checkboxAnswersArrSort = checkboxAnswersArr.sort();
            if (+checkedCheckboxSort[i] === +checkboxAnswersArrSort[i] && checkedCheckboxSort.length === checkboxAnswersArrSort.length) {
                checkedAnswersTruth.push(1)
            } else {
                checkedAnswersTruth.push(0)
            }
        });
        var rightChecked = checkedAnswersTruth.every(function (item) {
            return item == 1
        });
        if (testItem.find(testInput).attr('type') === 'checkbox') {
            checkboxAnswersArr.forEach(function (item) {
                testItem.find('.t806__input[value="' + +item + '"]').parents('.t806__answer').addClass('t806__answer_correct')
            });
            checkedAnswers.forEach(function (item) {
                if (checkboxAnswersArr.indexOf(item) === -1) {
                    testItem.find('.t806__input[value="' + +item + '"]:checked').parents('.t806__answer').addClass('t806__answer_wrong');
                    testItem.find('.t806__input[value="' + +item + '"]').parent().siblings().show()
                }
            })
        }
        testItem.find('.t806__input:checked').parents('.t806__answer_correct').addClass('t806__answer_withoutopacity');
        if (rightChecked) {
            rightAnswersCount++;
            testBlock.find('.t806__counter').attr('data-count', rightAnswersCount)
        }
        checkedAnswersTruth = [];
        $(this).removeClass('t806__btn_show');
        if (testItem.hasClass('t806__lastquestion')) {
            $(this).parents('.t806__question').find('.t806__btn_result').addClass('t806__btn_show')
        } else {
            $(this).parents('.t806__question').find('.t806__btn_next').addClass('t806__btn_show')
        }
        testAnswers.addClass('t806__answers_answered');
        t806_fixcontentheight(test);
        if (typeof $(".t-records").attr("data-tilda-mode") == "undefined") {
            if (window.lazy == 'y') {
                t_lazyload_update()
            }
        }
        testItem.find('.t806__input:checked').parent().siblings('.t806__details').show();
        t806__changeTestInput(test);
        e.preventDefault()
    })
}

function t806__nextClickBtn(test) {
    var testBlock = $('#rec' + test);
    var testBtnNext = testBlock.find('.t806__btn_next');
    var questionNumber;
    testBtnNext.on('click', function (e) {
        var parentTop = $(this).parents('#rec' + test + ' .t806').offset().top;
        var testItem = $(this).parents('#rec' + test + ' .t806__question');
        questionNumber = testItem.next().attr('data-question-num');
        testItem.hide();
        testItem.next().show();
        t806__showNumber(test, questionNumber);
        t806_fixcontentheight(test);
        t806_scrollToTop(testBlock);
        if (typeof $(".t-records").attr("data-tilda-mode") == "undefined") {
            if (window.lazy == 'y') {
                t_lazyload_update()
            }
        }
        e.preventDefault()
    })
}

function t806__resultClickBtn(test) {
    var testBtnResult = $('#rec' + test + ' .t806__btn_result');
    var testBlock = $('#rec' + test);
    testBtnResult.on('click', function (e) {
        var parentTop = $(this).parents('#rec' + test + ' .t806__test').offset().top;
        var testItem = $(this).parents('#rec' + test + ' .t806__question');
        testItem.hide();
        t806_scrollToTop(testBlock);
        t806__showResult(test);
        t806_fixcontentheight(test);
        if (typeof $(".t-records").attr("data-tilda-mode") == "undefined") {
            if (window.lazy == 'y') {
                t_lazyload_update()
            }
        }
        e.preventDefault()
    })
}

function t806__restartClickBtn(test, rightansw) {
    var testBlock = $('#rec' + test);
    var testContainer = testBlock.find('.t806');
    var testRestart = testBlock.find('.t806__btn_restart');
    var testItemAll = testBlock.find('.t806__question');
    testRestart.on('click', function (e) {
        testBlock.find('.t806__start').show();
        testBlock.find('.t806__result').hide();
        testBlock.find('.t806__btn_next').removeClass('t806__btn_show');
        testBlock.find('.t806__btn_result').removeClass('t806__btn_show');
        testBlock.find('.t806__btn_check').removeClass('t806__btn_show');
        testBlock.find('.t806__details').hide();
        testBlock.find('.t806__answers').removeClass('t806__answers_answered');
        testBlock.find('.t806__answers').attr('data-test-checked', '');
        testBlock.find('.t806__answer').removeClass('t806__answer_correct');
        testBlock.find('.t806__answer').removeClass('t806__answer_wrong');
        testBlock.find('.t806__input').parents('.t806__answer').removeClass('t806__answer_withoutopacity');
        testBlock.find('.t806__input').prop('checked', !1);
        testBlock.find('.t806__input').removeAttr('disabled');
        testBlock.find('.t806__answer .t-vote__btn-res').removeClass('t806__answer-vote_show');
        $('#rec' + test + ' .t806__counter').attr('data-count', 0);
        testBlock.find('.t806__number').text(1 + '/' + testItemAll.length);
        t806_fixcontentheight(test);
        if (testContainer.hasClass('t806__test-reload')) {
            document.location.reload(!0)
        }
        e.preventDefault()
    })
}

function t806__showResult(test) {
    var testBlock = $('#rec' + test);
    var testContainer = testBlock.find('.t806');
    var fullResult = testBlock.find('.t806__result');
    var startImg = testBlock.find('.t806__start-img img');
    var fullResultLength = fullResult.length;
    var allResult;
    var resultLength = testBlock.find('.t806__result').length;
    var rightAnswersCount = $('#rec' + test).find('.t806__counter').attr('data-count');
    var testItemAll = $('#rec' + test + ' .t806__question');
    var resultCount = $('#rec' + test + ' .t806__result .t806__result-count');
    var resultPercent = rightAnswersCount != 0 ? rightAnswersCount / testItemAll.length * 100 : 0;
    if (testContainer.hasClass('t806__result-new-calc')) {
        if (!Number.isInteger(resultPercent)) {
            resultPercent = resultPercent.toFixed(3)
        }
    }
    resultCount.text(rightAnswersCount + '/' + testItemAll.length);
    t806__openResultWrapper(testContainer, resultPercent, testBlock, fullResultLength);
    var resultData = [];
    fullResult.each(function (i) {
        if ($(fullResult[i]).css('display') == 'block') {
            resultData[0] = $(fullResult[i]).find('.t806__result-variant').text()
            resultData[1] = $(fullResult[i]).find('.t806__result-count').text();
            resultData[2] = '';
            var img = $(fullResult[i]).find('.t806__result-wrap img');
            if (testContainer.hasClass('t806__test-reload')) {
                if (img.length != 0) {
                    if (typeof window.lazy !== 'undefined') {
                        resultData[2] = img.attr('data-original') || img.attr('src')
                    } else {
                        resultData[2] = img.attr('src')
                    }
                }
                if (img.length == 0 && startImg.length != 0) {
                    if (typeof window.lazy !== 'undefined') {
                        resultData[2] = startImg.attr('data-original') || img.attr('src')
                    } else {
                        resultData[2] = startImg.attr('src')
                    }
                }
            }
            if (!testContainer.hasClass('t806__test-reload')) {
                if (img.length != 0) {
                    resultData[2] = img.attr('src')
                }
                if (img.length == 0 && startImg.length != 0) {
                    resultData[2] = startImg.attr('src')
                }
            }
            resultData[3] = $(fullResult[i]).attr('data-quiz-result-number')
        }
    });
    return resultData
}

function t806__openResultWrapper(testContainer, resultPercent, testBlock, fullResultLength) {
    if (testContainer.hasClass('t806__result-new-calc')) {
        if (resultPercent <= 100 * 1 / fullResultLength) {
            testBlock.find('.t806__result_1').show();
            return
        }
        for (var i = 0; i < fullResultLength; i++) {
            var minResult = 100 * (i + 1) / fullResultLength;
            var maxResult = 100 * (i + 2) / fullResultLength;
            minResult = Math.floor(minResult) == minResult ? minResult : minResult.toFixed(3);
            maxResult = Math.floor(maxResult) == maxResult ? maxResult : maxResult.toFixed(3);
            if (resultPercent >= minResult && resultPercent <= maxResult) {
                testBlock.find('.t806__result_' + (i + 2)).show();
                return
            }
        }
        if (resultPercent > 100 * (fullResultLength - 1) / fullResultLength) {
            testBlock.find('.t806__result_' + fullResultLength).show();
            return
        }
    } else {
        if (resultPercent <= 100 * 1 / fullResultLength) {
            testBlock.find('.t806__result_1').show()
        }
        for (var i = 0; i < fullResultLength; i++) {
            if (resultPercent > 100 * (i + 1) / fullResultLength && resultPercent <= 100 * (i + 2) / fullResultLength) {
                testBlock.find('.t806__result_' + (i + 2)).show()
            }
        }
        if (resultPercent > 100 * (fullResultLength - 1) / fullResultLength) {
            testBlock.find('.t806__result_' + fullResultLength).show()
        }
    }
}

function t806__showNumber(test, number) {
    var testItemNumber = $('#rec' + test + ' .t806__number');
    var testItemAll = $('#rec' + test + ' .t806__question');
    testItemNumber.html('<span>' + number + '</span>' + '<span>/</span>' + '<span>' + testItemAll.length + '</span>')
}

function t806_fixcontentheight(id) {
    var el = $("#rec" + id);
    var hcover = el.find(".t-cover").height();
    var hcontent = el.find("div[data-hook-content]").outerHeight();
    if (hcontent > 300 && hcover < hcontent) {
        var hcontent = hcontent + 120;
        if (hcontent > 1000) {
            hcontent += 100
        }
        el.find(".t-cover").height(hcontent);
        el.find(".t-cover__filter").height(hcontent);
        el.find(".t-cover__carrier").height(hcontent);
        el.find(".t-cover__wrapper").height(hcontent);
        if ($isMobile == !1) {
            setTimeout(function () {
                var divvideo = el.find(".t-cover__carrier");
                if (divvideo.find('iframe').length > 0) {
                    setWidthHeightYoutubeVideo(divvideo, hcontent + 'px')
                }
            }, 2000)
        }
    }
}

function t806_changeShareFBUrl(siteLocation, searchUrl) {
    var url = siteLocation.split('?')[0] + '?';
    var searchParametrs = decodeURIComponent(searchUrl.substring(1));
    var params = searchParametrs.split('&');
    params.forEach(function (item) {
        if (item.indexOf('fb_action_ids') == -1 && item.indexOf('fb_action_types') == -1 && item.indexOf('result') == -1) {
            url = url + item + '&'
        }
    });
    url = url.substring(0, url.length - 1);
    return url
}

function t806_shareVK(recid, ptitle, purl) {
    var dataForShare = t806__showResult(recid);
    var text = dataForShare[0];
    var count = dataForShare[1];
    var slash = (dataForShare[2] || "").indexOf('/') == 0 ? '' : '/';
    var urlPathname = window.location.pathname.length > 1 ? window.location.pathname : '';
    var img = (dataForShare[2] || "").indexOf('://') != -1 ? dataForShare[2] : window.location.protocol + '//' + window.location.host + urlPathname + slash + dataForShare[2];
    var resultNumber = dataForShare[3];
    var idUrl = recid + resultNumber + 'vk';
    var urlValueImg = 'https://vote.tildacdn.com/vote/2/share/index.php?text=' + text;
    urlValueImg += '&result=' + count;
    if ((dataForShare[2] || "").length > 0) {
        urlValueImg += '&url=' + img
    }
    urlValueImg += '&id=' + idUrl;
    urlValueImg += '&social=vk' + '&name=' + ptitle;
    var value = $.ajax({
        url: urlValueImg,
        type: 'GET',
        async: !1,
        data: {
            format: 'json'
        },
        error: function (e) {
            console.log('t806 error: ' + e)
        },
        complete: function (data) {
            var urlImg = (data.responseJSON.url || '').replace(/\?.*/, '');
            var shareUrl = window.location.href.indexOf('#') != -1 ? purl.split('#')[0] : purl;
            url = 'http://vkontakte.ru/share.php?url=' + shareUrl + '&title=' + ptitle + '&description=' + ptitle + '&image=' + urlImg + '&noparse=true';
            t806__openPopup(url)
        }
    })
}

function t806_shareFB(recid, ptitle, pdescr, purl) {
    var dataForShare = t806__showResult(recid);
    var text = dataForShare[0];
    var count = dataForShare[1];
    var slash = (dataForShare[2] || "").indexOf('/') == 0 ? '' : '/';
    var urlPathname = window.location.pathname.length > 1 ? window.location.pathname : '';
    var img = (dataForShare[2] || "").indexOf('://') != -1 ? dataForShare[2] : window.location.protocol + '//' + window.location.host + urlPathname + slash + dataForShare[2];
    var resultNumber = dataForShare[3];
    var idUrl = recid + resultNumber + 'fb';
    var param = count.substring(0, count.indexOf('/')) + count.substring(count.indexOf('/') + 1);
    var urlValueImg = 'https://vote.tildacdn.com/vote/2/share/index.php?text=' + text;
    urlValueImg += '&result=' + count;
    if ((dataForShare[2] || "").length > 0) {
        urlValueImg += '&url=' + img
    }
    urlValueImg += '&id=' + idUrl;
    urlValueImg += '&social=fb' + '&name=' + ptitle;
    var value = $.ajax({
        url: urlValueImg,
        type: 'GET',
        async: !1,
        data: {
            format: 'json'
        },
        error: function (e) {
            console.log('t806 error: ' + e)
        },
        complete: function (data) {
            var urlImg = data.responseJSON.url;
            var searchUrl = window.location.search;
            purl = (searchUrl !== '' ? t806_changeShareFBUrl(purl, searchUrl) : purl) + '?result=' + param;
            FB.ui({
                method: 'share_open_graph',
                action_type: 'og.shares',
                action_properties: JSON.stringify({
                    object: {
                        'og:url': purl
                    }
                })
            })
        }
    })
}

function t806_shareTwitter(recid, ptitle, purl) {
    var dataForShare = t806__showResult(recid);
    var testWrap = $('#rec' + recid);
    var testContainer = testWrap.find('.t806');
    var text = dataForShare[0];
    var count = dataForShare[1];
    var img = dataForShare[2];
    var resultCount = count.substring(0, count.indexOf('/'));
    var allCount = count.substring(count.indexOf('/') + 1)
    var result;
    if (testContainer.hasClass('t806__ru')) {
        result = 'РњРѕР№ СЂРµР·СѓР»СЊС‚Р°С‚: ' + resultCount + ' РёР· ' + allCount + '. ' + text
    }
    if (testContainer.hasClass('t806__en')) {
        result = 'My result: ' + resultCount + ' out of ' + allCount + '. ' + text
    }
    purl = purl.replace(/&/g, '%26');
    url = 'https://twitter.com/share?url=' + purl + '&text=' + result;
    url = encodeURI(url);
    t806__openPopup(url)
}

function t806__openPopup(url) {
    window.open(url, '', 'toolbar=0,status=0,width=626,height=436')
}

function t807__init(recid) {
    t_onFuncLoad('tvote__init', function () {
        tvote__init(recid)
    });
    var testWrap = $('#rec' + recid);
    $('#rec' + recid).find('.t-vote').bind('tildavote:numberschanged', function () {
        $(".js-vote-item").each(function () {
            var percentage = $(this).find(".t-vote__btn-res__percent");
            if (typeof percentage != "undefined") {
                var bar = $(this).find(".t807__answer-progressbar");
                bar.css("width", percentage.html())
            }
        })
    });
    $('#rec' + recid).find('.t-vote').bind('tildavote:resultsended', function () {
        if (!$(this).hasClass('t-vote_sended') || $(this).hasClass('t807__hidden')) {
            return
        }
        $(this).addClass('t807__hidden');
        if (!$(this).attr('data-vote-visibility') && $(this).hasClass('t807__test')) {
            t807__onSuccess(recid)
        }
    });
    t807__replyClickBtn(recid)
}

function t807__replyClickBtn(test) {
    var testBlock = $('#rec' + test);
    var replyBtn = testBlock.find('.t807__btn_reply');
    replyBtn.on('click', function (e) {
        e.preventDefault()
    })
}

function t807__onSuccess(test) {
    var testBlock = $('#rec' + test).find('.t807__test');
    var t807_targetOffset = testBlock.offset().top;
    if ($(window).width() > 960) {
        var t807_target = t807_targetOffset - 200
    } else {
        var t807_target = t807_targetOffset - 100
    }
    $('html, body').animate({
        scrollTop: t807_target
    }, 400)
}

function t821_init(recid) {
    var rec = $('#rec' + recid);
    var el = rec.find('.t821');
    var isFixed = (el.css('position') == 'fixed');
    var redactorMode = el.hasClass('t821_redactor-mode');
    if (!redactorMode) {
        el.removeClass('t821__beforeready');
        if (isFixed && el.attr('data-bgopacity-two')) {
            t821_changebgopacitymenu(recid);
            $(window).bind('scroll', t_throttle(function () {
                t821_changebgopacitymenu(recid)
            }, 200))
        }
        if (isFixed && el.attr('data-appearoffset')) {
            el.removeClass('t821__beforeready');
            t821_appearMenu(recid);
            $(window).bind('scroll', t_throttle(function () {
                t821_appearMenu(recid)
            }, 200))
        }
    }
    t821_setBg(recid);
    $(window).bind('resize', t_throttle(function () {
        t821_setBg(recid)
    }, 200))
}

function t821_setBg(recid) {
    var window_width = $(window).width();
    if (window_width > 980) {
        $(".t821").each(function () {
            var el = $(this);
            if (el.attr('data-bgcolor-setbyscript') == "yes") {
                var bgcolor = el.attr("data-bgcolor-rgba");
                el.css("background-color", bgcolor)
            }
        })
    } else {
        $(".t821").each(function () {
            var el = $(this);
            var bgcolor = el.attr("data-bgcolor-hex");
            el.css("background-color", bgcolor);
            el.attr("data-bgcolor-setbyscript", "yes")
        })
    }
}

function t821_appearMenu(recid) {
    var window_width = $(window).width();
    if (window_width > 980) {
        $(".t821").each(function () {
            var el = $(this);
            var appearoffset = el.attr("data-appearoffset");
            if (appearoffset != "") {
                if (appearoffset.indexOf('vh') > -1) {
                    appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)))
                }
                appearoffset = parseInt(appearoffset, 10);
                if ($(window).scrollTop() >= appearoffset) {
                    if (el.css('visibility') == 'hidden') {
                        el.finish();
                        el.css("top", "-50px");
                        el.css("visibility", "visible");
                        el.animate({
                            "opacity": "1",
                            "top": "0px"
                        }, 200, function () {})
                    }
                } else {
                    el.stop();
                    el.css("visibility", "hidden")
                }
            }
        })
    }
}

function t821_changebgopacitymenu(recid) {
    var window_width = $(window).width();
    if (window_width > 980) {
        $(".t821").each(function () {
            var el = $(this);
            var bgcolor = el.attr("data-bgcolor-rgba");
            var bgcolor_afterscroll = el.attr("data-bgcolor-rgba-afterscroll");
            var bgopacityone = el.attr("data-bgopacity");
            var bgopacitytwo = el.attr("data-bgopacity-two");
            var menushadow = el.attr("data-menushadow");
            if (menushadow == '100') {
                var menushadowvalue = menushadow
            } else {
                var menushadowvalue = '0.' + menushadow
            }
            if ($(window).scrollTop() > 20) {
                el.css("background-color", bgcolor_afterscroll);
                if (bgopacitytwo == '0' || menushadow == ' ') {
                    el.css("box-shadow", "none")
                } else {
                    el.css("box-shadow", "0px 1px 3px rgba(0,0,0," + menushadowvalue + ")")
                }
            } else {
                el.css("background-color", bgcolor);
                if (bgopacityone == '0.0' || menushadow == ' ') {
                    el.css("box-shadow", "none")
                } else {
                    el.css("box-shadow", "0px 1px 3px rgba(0,0,0," + menushadowvalue + ")")
                }
            }
        })
    }
}

function t821_createMobileMenu(recid) {
    var window_width = $(window).width(),
        el = $("#rec" + recid),
        menu = el.find(".t821"),
        burger = el.find(".t821__mobile");
    burger.click(function (e) {
        menu.fadeToggle(300);
        $(this).toggleClass("t821_opened")
    })
    $(window).bind('resize', t_throttle(function () {
        window_width = $(window).width();
        if (window_width > 980) {
            menu.fadeIn(0)
        }
    }, 200))
}

function t822_init(recid) {
    t822_setHeight(recid);
    $(window).load(function () {
        t822_setHeight(recid)
    });
    $(window).bind('resize', t_throttle(function () {
        if (typeof window.noAdaptive != "undefined" && window.noAdaptive == !0 && $isMobile) {
            return
        }
        t822_setHeight(recid)
    }, 200));
    $('.t822').bind('displayChanged', function () {
        t822_setHeight(recid)
    })
}

function t822_setHeight(recid) {
    $('#rec' + recid + ' .t822 .t-container').each(function () {
        var t822__highestBox = 0;
        $('.t822__col', this).each(function () {
            var t822__curcol = $(this);
            var t822__curcolchild = t822__curcol.find('.t822__col-wrapper');
            if (t822__curcol.height() < t822__curcolchild.height()) t822__curcol.height(t822__curcolchild.height());
            if (t822__curcol.height() > t822__highestBox) t822__highestBox = t822__curcol.height()
        });
        if ($(window).width() >= 960) {
            $('.t822__col', this).css('height', t822__highestBox)
        } else {
            $('.t822__col', this).css('height', "auto")
        }
    })
};

function t827_init(recid) {
    var rec = $('#rec' + recid);
    var grid = rec.find('.t827__grid');
    var sizer = rec.find('.t827__grid-sizer');
    var item = rec.find('.t827__grid-item');
    var images = rec.find('.t827__grid img');
    var overlay = rec.find('.t827__overlay');
    var startContainerWidth = rec.find('.t827__grid-sizer').width();
    t827_reverse(grid, item);
    images.load(function () {
        t827_initMasonry(rec, recid, grid);
        setTimeout(function () {
            t827_showOverlay(overlay, item)
        }, 500)
    });
    if (overlay.hasClass('t827__overlay_preview')) {
        setTimeout(function () {
            t827_showOverlay(overlay, item)
        }, 1000)
    }
    t827_initMasonry(rec, recid, grid);
    $(window).bind('resize', function () {
        if (typeof window.noAdaptive != "undefined" && window.noAdaptive == !0 && $isMobile) {
            return
        }
        t827_calcColumnWidth(rec, startContainerWidth, grid, sizer, item)
    });
    $('.t827').bind('displayChanged', function () {
        t827_initMasonry(rec, recid, grid);
        t827_calcColumnWidth(rec, startContainerWidth, grid, sizer, item)
    });
    t827_calcColumnWidth(rec, startContainerWidth, grid, sizer, item)
}

function t827_reverse(grid, item) {
    if (grid.hasClass('t827__grid_reverse')) {
        grid.append(function () {
            return $(this).children().get().reverse()
        })
    }
}

function t827_initMasonry(rec, recid, grid) {
    var $grid = grid;
    var gutterSizerWidth = rec.find('.t827__gutter-sizer').width();
    var gutterElement = rec.find('.t827__gutter-sizer').width() == 40 ? 39 : '#rec' + recid + ' .t827__gutter-sizer';
    t_onFuncLoad('imagesLoaded', function () {
        $grid.imagesLoaded(function () {
            $grid.masonry({
                itemSelector: '#rec' + recid + ' .t827__grid-item',
                columnWidth: '#rec' + recid + ' .t827__grid-sizer',
                gutter: gutterElement,
                isFitWidth: !0,
                transitionDuration: 0
            })
        });
    });
}

function t827_showOverlay(overlay, item) {
    if ($(window).width() >= 1024) {
        overlay.css('display', 'block')
    } else {
        item.click(function () {
            if ($(this).find('.t827__overlay').css('opacity') == '0') {
                overlay.css('opacity', '0');
                $(this).find('.t827__overlay').css('opacity', '1')
            } else {
                $(this).find('.t827__overlay').css('opacity', '0')
            }
        })
    }
}

function t827_calcColumnWidth(rec, startcontainerwidth, grid, sizer, item) {
    var containerWidth = rec.find('.t827__container').width();
    var sizerWidth = rec.find('.t827__grid-sizer').width();
    var itemWidth = rec.find('.t827__grid-item').width();
    var gutterSizerWidth = rec.find('.t827__gutter-sizer').width() == 40 ? 39 : rec.find('.t827__gutter-sizer').width();
    var columnAmount = Math.round(containerWidth / startcontainerwidth);
    var newSizerWidth = ((containerWidth - gutterSizerWidth * (columnAmount - 1)) / columnAmount);
    if (containerWidth >= itemWidth) {
        sizer.css('width', newSizerWidth);
        item.css('width', newSizerWidth)
    } else {
        grid.css('width', '100%');
        sizer.css('width', '100%');
        item.css('width', '100%')
    }
}

function t829_init(recid) {
    var rec = $('#rec' + recid);
    var grid = rec.find('.t829__grid');
    var sizer = rec.find('.t829__grid-sizer');
    var item = rec.find('.t829__grid-item');
    var images = rec.find('.t829__grid img');
    var startContainerWidth = rec.find('.t829__grid-sizer').width();
    images.load(function () {
        if (!(grid.hasClass('t829__container_mobile-flex') && $(window).width() < 768)) {
            t829_initMasonry(rec, recid, grid)
        }
    });
    if (!(grid.hasClass('t829__container_mobile-flex') && $(window).width() < 768)) {
        t829_initMasonry(rec, recid, grid);
        t829_calcColumnWidth(rec, startContainerWidth, grid, sizer, item)
    }
    grid.bind('touchmove scroll', function () {
        if (typeof $('.t-records').attr('data-tilda-mode') == 'undefined') {
            if (window.lazy == 'y') {
                t_lazyload_update()
            }
        }
    })
    $(window).bind('resize', function () {
        if (typeof window.noAdaptive != "undefined" && window.noAdaptive == !0 && $isMobile) {
            return
        }
        if (!(grid.hasClass('t829__container_mobile-flex') && $(window).width() < 768)) {
            t829_calcColumnWidth(rec, startContainerWidth, grid, sizer, item)
        }
    });
    rec.find('.t829').bind('displayChanged', function () {
        if (grid.hasClass('t829__container_mobile-flex')) {
            if ($(window).width() >= 768) {
                t829_initMasonry(rec, recid, grid)
            }
        } else {
            t829_initMasonry(rec, recid, grid)
        }
        if (!(grid.hasClass('t829__container_mobile-flex') && $(window).width() < 768)) {
            t829_calcColumnWidth(rec, startContainerWidth, grid, sizer, item)
        }
    })
}

function t829_initMasonry(rec, recid, grid) {
    var $grid = grid;
    var gutterSizerWidth = rec.find('.t829__gutter-sizer').width();
    var gutterElement = rec.find('.t829__gutter-sizer').width() == 40 ? 39 : '#rec' + recid + ' .t829__gutter-sizer';
    t_onFuncLoad('imagesLoaded', function () {
    $grid.imagesLoaded(function () {
        $grid.masonry({
            itemSelector: '#rec' + recid + ' .t829__grid-item',
            columnWidth: '#rec' + recid + ' .t829__grid-sizer',
            gutter: gutterElement,
            isFitWidth: !0,
            transitionDuration: 0
        })
    });
    });
}

function t829_calcColumnWidth(rec, startcontainerwidth, grid, sizer, item) {
    var containerWidth = rec.find('.t829__container').width();
    var sizerWidth = rec.find('.t829__grid-sizer').width();
    var itemWidth = rec.find('.t829__grid-item').width();
    var gutterSizerWidth = rec.find('.t829__gutter-sizer').width() == 40 ? 39 : rec.find('.t829__gutter-sizer').width();
    var columnAmount = Math.round(containerWidth / startcontainerwidth);
    var newSizerWidth = ((containerWidth - gutterSizerWidth * (columnAmount - 1)) / columnAmount);
    newSizerWidth = Math.floor(newSizerWidth);
    if (containerWidth >= itemWidth) {
        sizer.css('width', newSizerWidth);
        item.css('width', newSizerWidth)
    } else {
        grid.css('width', '100%');
        sizer.css('width', '100%');
        item.css('width', '100%')
    }
}

function t830_init(recid) {
    var rec = $('#rec' + recid);
    var allrecords = $("#allrecords");
    var el = rec.find('.t830');
    var panel = rec.find('.t830__panel');
    var overlay = rec.find('.t830m__overlay');
    var menu = rec.find('.t830m');
    var submenu = rec.find('.t830m__submenu');
    var burger = rec.find('.t830__side .t830__burger');
    var menuItem = rec.find('.t830m__list-title a');
    var submenuItem = rec.find('.t830m__submenu-item a');
    t830_initMenu(rec, menu, burger);
    t830_removePadding(rec, allrecords);
    t830_calcCol(rec, menu, allrecords);
    t830_menuHighlight();
    t830_submenuHighlight();
    t830_openSubmenu(rec);
    t830_hoverShowMenu(rec, menu, panel, overlay, burger);
    $(window).resize(function () {
        t830_calcCol(rec, menu, allrecords);
        t830_removePadding(rec, allrecords);
        if (menu.hasClass('t830m_close') && $(window).width() > 1499) {
            overlay.removeClass('t830m__menu_show')
        }
    });
    if (submenu.hasClass('t830m__submenu_close')) {
        t830_toggleMenu(rec, submenu)
    }
    if ($(window).width() > 1259) {
        t830_scrollSideMenu(rec)
    }
    menuItem.click(function () {
        if (window.location.hash.length != 0) {
            menuItem.removeClass('t-active');
            $(this).addClass('t-active')
        }
    });
    submenuItem.click(function () {
        if (window.location.hash.length != 0) {
            submenuItem.removeClass('t-active');
            $(this).addClass('t-active')
        }
    });
    t830_checkAnchorLinks(recid)
}

function t830_calcCol(rec, menu, allrecords) {
    if ($(window).width() > 1259 && !menu.hasClass('t830m_open')) {
        allrecords.addClass('t830__allrecords_padd');
        $('.t-tildalabel').addClass('t830__t-tildalabel_padd')
    }
    if ($(window).width() > 1259 && menu.hasClass('t830m_open')) {
        allrecords.addClass('t830__allrecords_padd-small');
        $('.t-tildalabel').addClass('t830__t-tildalabel_padd-small')
    }
}

function t830_toggleMenu(rec, submenu) {
    var listTitle = rec.find('.t830m__list-title_toggle');
    var submenu;
    var textTitle;
    listTitle.click(function () {
        submenu = $(this).next();
        textTitle = $(this).find('.t830m__list-title-text');
        submenu.slideToggle('slow');
        textTitle.toggleClass('t830m__list-title-text_opacity');
        textTitle.toggleClass('t-menu__link-item')
    })
}

function t830_openSubmenu(rec) {
    var submenuItem = rec.find('.t830m__submenu-item a.t-active');
    submenuItem.parents('.t830m__submenu').css('display', 'block')
}

function t830_hoverShowMenu(rec, menu, panel, overlay, burger) {
    if ($(window).width() > 1259 && panel.hasClass('t830__panel_hover')) {
        panel.mouseenter(function (e) {
            menu.addClass('t830m__menu_show');
            burger.addClass('t830__burger_open');
            overlay.addClass('t830m__overlay_hover')
        });
        menu.mouseleave(function () {
            menu.removeClass('t830m__menu_show');
            burger.removeClass('t830__burger_open')
        });
        overlay.mouseenter(function () {
            menu.removeClass('t830m__menu_show');
            burger.removeClass('t830__burger_open');
            overlay.removeClass('t830m__overlay_hover')
        })
        menu.find('a').on('click', function () {
            menu.removeClass('t830m__menu_show');
            burger.removeClass('t830__burger_open')
        });
        burger.click(function () {
            if (burger.hasClass('t830__burger_open')) {
                t830_closeMenu(rec, menu);
                burger.removeClass('t830__burger_open')
            } else {
                menu.addClass('t830m__menu_show');
                burger.addClass('t830__burger_open');
                overlay.addClass('t830m__overlay_hover')
            }
        })
    }
}

function t830_showMenu(rec, menu, burger) {
    var panel = rec.find('.t830__panel');
    $('body').addClass('t830__body_menushowed');
    rec.find('.t830m').addClass('t830m__menu_show');
    rec.find('.t830m__overlay').addClass('t830m__menu_show');
    rec.find('.t830m__overlay, .t830m__close, a[href*=#]').click(function () {
        if ($(this).is('.tooltipstered, .t794__tm-link')) {
            return
        }
        t830_closeMenu(rec, menu);
        burger.removeClass('t830__burger_open')
    });
    panel.addClass('t830__panel_close');
    $(document).keydown(function (e) {
        if (e.keyCode == 27) {
            if ($('.t-site-search-popup__background').length === 0) {
                $('body').removeClass('t830__body_menushowed');
                $('.t830m').removeClass('t830m__menu_show');
                burger.removeClass('t830__burger_open');
                $('.t830m__overlay').removeClass('t830m__menu_show')
            }
        }
    })
}

function t830_closeMenu(rec, menu) {
    var panel = rec.find('.t830__panel');
    if (menu.hasClass('t830m_open') && $(window).width() < 1500) {
        panel.removeClass('t830__panel_close')
    }
    $('body').removeClass('t830__body_menushowed');
    $('.t830m').removeClass('t830m__menu_show');
    $('.t830m__overlay').removeClass('t830m__menu_show')
}

function t830_initMenu(rec, menu, burger) {
    var obj = rec.find('.t830__menu__content');
    var panel = rec.find('.t830__panel');
    var menu = rec.find('.t830m');
    if (panel.hasClass('t830__panel_click') || (panel.hasClass('t830__panel_hover') && $(window).width() <= 1259)) {
        obj.click(function (e) {
            if (menu.hasClass('t830m__menu_show')) {
                burger.removeClass('t830__burger_open');
                t830_closeMenu(rec, menu)
            } else {
                burger.addClass('t830__burger_open');
                t830_showMenu(rec, menu, burger)
            }
            e.preventDefault()
        })
    }
    $('.t830').bind('clickedAnchorInTooltipMenu', function () {
        t830_closeMenu(rec, menu)
    })
}

function t830_menuHighlight() {
    var url = window.location.href;
    var pathname = window.location.pathname;
    if (url.substr(url.length - 1) == '/') {
        url = url.slice(0, -1)
    }
    if (pathname.substr(pathname.length - 1) == "/") {
        pathname = pathname.slice(0, -1)
    }
    if (pathname.charAt(0) == '/') {
        pathname = pathname.slice(1)
    }
    if (pathname == '') {
        pathname = '/'
    }
    $(".t830m__list-title a[href='" + url + "']").addClass('t-active');
    $(".t830m__list-title a[href='" + url + "/']").addClass('t-active');
    $(".t830m__list-title a[href='" + pathname + "']").addClass('t-active');
    $(".t830m__list-title a[href='/" + pathname + "']").addClass('t-active');
    $(".t830m__list-title a[href='" + pathname + "/']").addClass('t-active');
    $(".t830m__list-title a[href='/" + pathname + "/']").addClass('t-active')
}

function t830_submenuHighlight() {
    var url = window.location.href;
    var pathname = window.location.pathname;
    if (url.substr(url.length - 1) == '/') {
        url = url.slice(0, -1)
    }
    if (pathname.substr(pathname.length - 1) == '/') {
        pathname = pathname.slice(0, -1)
    }
    if (pathname.charAt(0) == '/') {
        pathname = pathname.slice(1)
    }
    if (pathname == '') {
        pathname = "/"
    }
    $(".t830m__submenu-item a[href='" + url + "']").addClass('t-active');
    $(".t830m__submenu-item a[href='" + url + "/']").addClass('t-active');
    $(".t830m__submenu-item a[href='" + pathname + "']").addClass('t-active');
    $(".t830m__submenu-item a[href='/" + pathname + "']").addClass('t-active');
    $(".t830m__submenu-item a[href='" + pathname + "/']").addClass('t-active');
    $(".t830m__submenu-item a[href='/" + pathname + "/']").addClass('t-active')
}

function t830_scrollSideMenu(rec) {
    var container = rec.find('.t830m__container');
    container.on('scroll wheel DOMMouseScroll mousewheel', function (e) {
        var searchResultContainer = rec.find('.t-site-search-dm');
        if (searchResultContainer.length == 0) {
            t830_stopScroll(this, e)
        }
    })
}

function t830_stopScroll(block, eventScroll) {
    var $this = $(block);
    var scrollTop = block.scrollTop;
    var scrollHeight = block.scrollHeight;
    var height = $this.height();
    var delta = (eventScroll.type == 'DOMMouseScroll' ? eventScroll.originalEvent.detail * -40 : eventScroll.originalEvent.wheelDelta);
    var up = delta > 0;
    var prevent = function () {
        eventScroll.stopPropagation();
        eventScroll.preventDefault();
        eventScroll.returnValue = !1;
        return !1
    }
    if (!up && -delta > scrollHeight - height - scrollTop) {
        $this.scrollTop(scrollHeight);
        return prevent()
    } else if (up && delta > scrollTop) {
        $this.scrollTop(0);
        return prevent()
    }
}

function t830_removePadding(rec, allrecords) {
    if (rec.css('display') == 'none') {
        allrecords.css('padding-left', 0);
        $('.t-tildalabel').css('padding-left', 0)
    }
}

function t830_checkAnchorLinks(recid) {
    if ($(window).width() >= 960) {
        var submenuNavLinks = $("#rec" + recid + " .t830m__list a:not(.tooltipstered)[href*='#']");
        if (submenuNavLinks.length > 0) {
            setTimeout(function () {
                t830_catchScroll(submenuNavLinks, recid)
            }, 500)
        }
    }
}

function t830_catchScroll(navLinks, recid) {
    var rec = $('#rec' + recid);
    var clickedSectionId = null;
    var sections = new Array();
    var sectionIdTonavigationLink = [];
    var interval = 100;
    var lastCall;
    var timeoutId;
    var navLinks = $(navLinks.get().reverse());
    navLinks.each(function () {
        var cursection = t830_getSectionByHref($(this));
        if (typeof cursection.attr('id') != 'undefined') {
            sections.push(cursection)
        }
        sectionIdTonavigationLink[cursection.attr('id')] = $(this)
    });
    t830_updateSectionsOffsets(sections);
    sections.sort(function (a, b) {
        return b.attr('data-offset-top') - a.attr('data-offset-top')
    });
    $(window).bind('resize', t_throttle(function () {
        t830_updateSectionsOffsets(sections)
    }, 200));
    $('.t830').bind('displayChanged', function () {
        t830_updateSectionsOffsets(sections)
    });
    setInterval(function () {
        t830_updateSectionsOffsets(sections)
    }, 5000);
    t830_highlightNavLinks(navLinks, sections, sectionIdTonavigationLink, clickedSectionId);
    navLinks.click(function () {
        var clickedSection = t830_getSectionByHref($(this));
        if (!$(this).hasClass('tooltipstered') && typeof clickedSection.attr('id') != 'undefined') {
            navLinks.removeClass('t-active');
            $(this).addClass('t-active');
            clickedSectionId = t830_getSectionByHref($(this)).attr("id")
        }
    });
    $(window).scroll(function () {
        var now = new Date().getTime();
        if (lastCall && now < (lastCall + interval)) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(function () {
                lastCall = now;
                clickedSectionId = t830_highlightNavLinks(navLinks, sections, sectionIdTonavigationLink, clickedSectionId)
            }, interval - (now - lastCall))
        } else {
            lastCall = now;
            clickedSectionId = t830_highlightNavLinks(navLinks, sections, sectionIdTonavigationLink, clickedSectionId)
        }
    })
}

function t830_getSectionByHref(curlink) {
    var curLinkValue = curlink.attr('href').replace(/\s+/g, '');
    if (curLinkValue[0] == '/') {
        curLinkValue = curLinkValue.substring(1)
    }
    if (curlink.is('[href*="#rec"]')) {
        return $(".r[id='" + curLinkValue.substring(1) + "']")
    } else {
        return $(".r[data-record-type='215']").has("a[name='" + curLinkValue.substring(1) + "']")
    }
}

function t830_highlightNavLinks(navLinks, sections, sectionIdTonavigationLink, clickedSectionId) {
    var scrollPosition = $(window).scrollTop();
    var valueToReturn = clickedSectionId;
    if (sections.length != 0 && clickedSectionId == null && sections[sections.length - 1].attr('data-offset-top') > (scrollPosition + 300)) {
        navLinks.removeClass('t-active');
        return null
    }
    $(sections).each(function (e) {
        var curSection = $(this);
        var sectionTop = curSection.attr('data-offset-top');
        var id = curSection.attr('id');
        var navLink = sectionIdTonavigationLink[id];
        if (((scrollPosition + 300) >= sectionTop) || (sections[0].attr("id") == id && scrollPosition >= $(document).height() - $(window).height())) {
            if (clickedSectionId == null && !navLink.hasClass('t-active')) {
                navLinks.removeClass('t-active');
                navLink.addClass('t-active');
                valueToReturn = null
            } else {
                if (clickedSectionId != null && id == clickedSectionId) {
                    valueToReturn = null
                }
            }
            return !1
        }
    });
    return valueToReturn
}

function t830_updateSectionsOffsets(sections) {
    $(sections).each(function () {
        var curSection = $(this);
        curSection.attr('data-offset-top', curSection.offset().top)
    })
}

function t843_init(recid) {
    var rec = $('#rec' + recid);
    var container = rec.find('.t843');
    t843_setHeight(rec);
    $(window).bind('resize', t_throttle(function () {
        if (typeof window.noAdaptive != "undefined" && window.noAdaptive == !0 && $isMobile) {
            return
        }
        t843_setHeight(rec)
    }, 200));
    $('.t843').bind('displayChanged', function () {
        t843_setHeight(rec)
    });
    if (container.hasClass('t843__previewmode')) {
        setInterval(function () {
            t843_setHeight(rec)
        }, 5000)
    }
}

function t843_setHeight(rec) {
    var image = rec.find('.t843__blockimg');
    image.each(function () {
        var width = $(this).attr('data-image-width');
        var height = $(this).attr('data-image-height');
        var ratio = height / width;
        var padding = ratio * 100;
        $(this).css('padding-bottom', padding + '%')
    });
    if ($(window).width() > 960) {
        var textwr = rec.find('.t843__textwrapper');
        var deskimg = rec.find('.t843__desktopimg');
        textwr.each(function (i) {
            $(this).css('height', $(deskimg[i]).innerHeight())
        })
    }
}

function t857__init(recid) {
    $('.t857__container_mobile-flex').bind('touchstart', function () {
        $('.t857__col').bind('touchmove', function () {
            if (typeof $(".t-records").attr('data-tilda-mode') == 'undefined') {
                if (window.lazy == 'y') {
                    t_lazyload_update()
                }
            }
        })
    }).mouseup(function () {
        $('.t857__col').unbind('touchend')
    })
}

function t858_init(recid) {
    var rec = $('#rec' + recid);
    var container = rec.find('.t858');
    var doResize;
    t858_unifyHeights(rec);
    $(window).resize(function () {
        clearTimeout(doResize);
        doResize = setTimeout(function () {
            t858_unifyHeights(rec)
        }, 200)
    });
    $(window).load(function () {
        t858_unifyHeights(rec)
    });
    $('.t858').bind('displayChanged', function () {
        t858_unifyHeights(rec)
    });
    if (container.hasClass('t858__previewmode')) {
        setInterval(function () {
            t858_unifyHeights(rec)
        }, 5000)
    }
}

function t858_unifyHeights(rec) {
    if ($(window).width() >= 960) {
        rec.find('.t858 .t-container .t858__row').each(function () {
            var highestBox = 0;
            var currow = $(this);
            $('.t858__inner-col', this).each(function () {
                var curCol = $(this);
                var curWrap = curCol.find('.t858__wrap');
                var curColHeight = curWrap.outerHeight();
                if (curColHeight > highestBox) {
                    highestBox = curColHeight
                }
            });
            $('.t858__inner-col', this).css('height', highestBox)
        })
    } else {
        $('.t858__inner-col').css('height', 'auto')
    }
}

function t922_init(recid) {
    setTimeout(function () {
        $('#rec' + recid + ' .t-cover__carrier').addClass('js-product-img');
        t_onFuncLoad('t_prod__init', function () {
            t_prod__init(recid)
        })
    }, 500)
}

function t923_init(recid) {
    var el = $('#rec' + recid);
    t923_unifyHeights(recid);
    $(window).bind('resize', t_throttle(function () {
        t923_unifyHeights(recid)
    }));
    el.find(".t923").bind("displayChanged", function () {
        t923_unifyHeights(recid)
    });
    $(window).load(function () {
        t923_unifyHeights(recid)
    })
}

function t923_unifyHeights(recid) {
    var el = $('#rec' + recid);
    var cols = el.find(".t923__content");
    var maxHeight = 0;
    cols.each(function () {
        var text = $(this).find(".t923__textwrapper");
        var btns = $(this).find(".t923__btn-wrapper, .t923__btntext-wrapper");
        var itemHeight = text.outerHeight() + btns.outerHeight();
        if (itemHeight > maxHeight) {
            maxHeight = itemHeight
        }
    });
    cols.each(function (i, el) {
        var height = $(el).css("height");
        if (height !== maxHeight + 'px') {
            $(el).css("height", maxHeight)
        }
    });
    t_onFuncLoad('t_slds_updateSlider', function () {
        t_slds_updateSlider(recid)
    })
}

function t934__init(recid) {
    var rec = $('#rec' + recid);
    t934__changeMenuColor(rec);
    $(window).bind('scroll', function () {
        t934__changeMenuColor(rec)
    });
    $(window).bind('resize', function () {
        t934__changeMenuColor(rec)
    })
}

function t934__changeMenuColor(rec) {
    if ($(window).width() > 960) {
        if ($(window).scrollTop() > 50) {
            rec.find('.t934__header').addClass('t934__header_opacity');
            if (typeof window.tildaMainHeaderColor != 'undefined') {
                rec.find('.t934__title').removeClass('t934__title_white')
            }
        } else {
            rec.find('.t934__header').removeClass('t934__header_opacity');
            if (typeof window.tildaMainHeaderColor != 'undefined') {
                rec.find('.t934__title').addClass('t934__title_white')
            }
        }
    } else {
        rec.find('.t934__title').removeClass('t934__title_white')
    }
}

function t951__init(recid) {
    setTimeout(function () {
        t_onFuncLoad('t_prod__init', function () {
            t_prod__init(recid)
        });
        t951_initPopup(recid);
        t951__hoverZoom_init(recid);
        t951__updateLazyLoad(recid);
        t951__alignButtons_init(recid)
    }, 500)
}

function t951__alignButtons_init(recid) {
    var el = $('#rec' + recid);
    if (el.find('[data-buttons-v-align]')[0]) {
        try {
            t951__alignButtons(recid);
            $(window).bind('resize', t_throttle(function () {
                if (typeof window.noAdaptive !== 'undefined' && window.noAdaptive === !0 && $isMobile) {
                    return
                }
                t951__alignButtons(recid)
            }));
            el.find('.t951').bind('displayChanged', function () {
                t951__alignButtons(recid)
            });
            if ($isMobile) {
                $(window).on('orientationchange', function () {
                    t951__alignButtons(recid)
                })
            }
        } catch (e) {
            console.log('buttons-v-align error: ' + e.message)
        }
    }
}

function t951__showMore(recid) {
    var el = $('#rec' + recid).find(".t951");
    var showmore = el.find('.t951__showmore');
    var cards_count = parseInt(el.attr('data-show-count'), 10);
    if (cards_count > 0) {
        if (showmore.text() === '') {
            showmore.find('td').text(t951__dict('loadmore'))
        }
        showmore.show();
        el.find('.t951__col').hide();
        var cards_size = el.find('.t951__col').size();
        var x = cards_count;
        var y = cards_count;
        t951__showSeparator(el, x);
        el.find('.t951__col:lt(' + x + ')').show();
        showmore.click(function () {
            x = (x + y <= cards_size) ? x + y : cards_size;
            el.find('.t951__col:lt(' + x + ')').show();
            if (x == cards_size) {
                showmore.hide()
            }
            t951__showSeparator(el, x)
        })
    }
}

function t951__dict(msg) {
    var dict = [];
    dict.loadmore = {
        EN: 'Load more',
        RU: 'Р—Р°РіСЂСѓР·РёС‚СЊ РµС‰Рµ',
        FR: 'Charger plus',
        DE: 'Mehr laden',
        ES: 'Carga mГЎs',
        PT: 'Carregue mais',
        UK: 'Р—Р°РІР°РЅС‚Р°Р¶РёС‚Рё С‰Рµ',
        JA: 'г‚‚гЃЈгЃЁиЄ­гЃїиѕјг‚Ђ',
        ZH: 'иЈќиј‰ж›ґе¤љ',
    };
    var lang = window.tildaBrowserLang;
    if (typeof dict[msg] !== 'undefined') {
        if (typeof dict[msg][lang] !== 'undefined' && dict[msg][lang] != '') {
            return dict[msg][lang]
        } else {
            return dict[msg].EN
        }
    }
    return 'Text not found "' + msg + '"'
}

function t951__showSeparator(el, x) {
    el.find('.t951__separator_number').addClass('t951__separator_hide');
    el.find('.t951__separator_hide').each(function () {
        if ($(this).attr('data-product-separator-number') <= x) {
            $(this).removeClass('t951__separator_hide')
        }
    })
}

function t951__alignButtons(recid) {
    var rec = $('#rec' + recid);
    var wrappers = rec.find('.t951__textwrapper');
    var maxHeight = 0;
    var itemsInRow = rec.find('.t-container').attr('data-blocks-per-row') * 1;
    var mobileView = $(window).width() <= 480;
    var tableView = $(window).width() <= 960 && $(window).width() > 480;
    var mobileOneRow = $(window).width() <= 960 && rec.find('.t951__container_mobile-flex')[0] ? !0 : !1;
    var mobileTwoItemsInRow = $(window).width() <= 480 && rec.find('.t951 .mobile-two-columns')[0] ? !0 : !1;
    if (mobileView) {
        itemsInRow = 1
    }
    if (tableView) {
        itemsInRow = 2
    }
    if (mobileTwoItemsInRow) {
        itemsInRow = 2
    }
    if (mobileOneRow) {
        itemsInRow = 999999
    }
    var i = 1;
    var wrappersInRow = [];
    $.each(wrappers, function (key, element) {
        element.style.height = 'auto';
        if (itemsInRow === 1) {
            element.style.height = 'auto'
        } else {
            wrappersInRow.push(element);
            if (element.offsetHeight > maxHeight) {
                maxHeight = element.offsetHeight
            }
            $.each(wrappersInRow, function (key, wrapper) {
                wrapper.style.height = maxHeight + 'px'
            });
            if (i === itemsInRow) {
                i = 0;
                maxHeight = 0;
                wrappersInRow = []
            }
            i++
        }
    })
}

function t951__hoverZoom_init(recid) {
    if (isMobile) {
        return
    }
    var rec = $('#rec' + recid);
    try {
        if (rec.find('[data-hover-zoom]')[0]) {
            if (!jQuery.cachedZoomScript) {
                jQuery.cachedZoomScript = function (url) {
                    var options = {
                        dataType: 'script',
                        cache: !0,
                        url: url
                    };
                    return jQuery.ajax(options)
                }
            }
            $.cachedZoomScript('https://static.tildacdn.com/js/tilda-hover-zoom-1.0.min.js').done(function (script, textStatus) {
                if (textStatus == 'success') {
                    setTimeout(function () {
                        t_hoverZoom_init(recid, ".t-slds__container")
                    }, 500)
                } else {
                    console.log('Upload script error: ' + textStatus)
                }
            })
        }
    } catch (e) {
        console.log('Zoom image init error: ' + e.message)
    }
}

function t951__updateLazyLoad(recid) {
    var scrollContainer = $("#rec" + recid + " .t951__container_mobile-flex");
    var curMode = $(".t-records").attr("data-tilda-mode");
    if (scrollContainer.length && curMode != "edit" && curMode != "preview") {
        scrollContainer.bind('scroll', t_throttle(function () {
            if (window.lazy == 'y') {
                t_lazyload_update()
            }
        }))
    }
}

function t951_initPopup(recid) {
    var rec = $('#rec' + recid);
    rec.find('[href^="#prodpopup"]').one("click", function (e) {
        e.preventDefault();
        var el_popup = rec.find('.t-popup');
        var el_prod = $(this).closest('.js-product');
        var lid_prod = el_prod.attr('data-product-lid');
        t_onFuncLoad('t_sldsInit', function () {
            t_sldsInit(recid + ' #t951__product-' + lid_prod + '')
        })
    });
    rec.find('[href^="#prodpopup"]').click(function (e) {
        e.preventDefault();
        t951_showPopup(recid);
        var el_popup = rec.find('.t-popup');
        var el_prod = $(this).closest('.js-product');
        var lid_prod = el_prod.attr('data-product-lid');
        el_popup.find('.js-product').css('display', 'none');
        var el_fullprod = el_popup.find('.js-product[data-product-lid="' + lid_prod + '"]');
        el_fullprod.css('display', 'block');
        var analitics = el_popup.attr('data-track-popup');
        if (analitics > '') {
            var virtTitle = el_fullprod.find('.js-product-name').text();
            if (!virtTitle) {
                virtTitle = 'prod' + lid_prod
            }
            Tilda.sendEventToStatistics(analitics, virtTitle)
        }
        var curUrl = window.location.href;
        if (curUrl.indexOf('#!/tproduct/') < 0 && curUrl.indexOf('%23!/tproduct/') < 0) {
            if (typeof history.replaceState != 'undefined') {
                window.history.replaceState('', '', window.location.href + '#!/tproduct/' + recid + '-' + lid_prod)
            }
        }
        t951_updateSlider(recid + ' #t951__product-' + lid_prod + '');
        if (window.lazy == 'y') {
            t_lazyload_update()
        }
    });
    if ($('#record' + recid).length == 0) {
        t951_checkUrl(recid)
    }
    t951_copyTypography(recid)
}

function t951_checkUrl(recid) {
    var curUrl = window.location.href;
    var tprodIndex = curUrl.indexOf('#!/tproduct/');
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && tprodIndex < 0) {
        tprodIndex = curUrl.indexOf('%23!/tproduct/')
    }
    if (tprodIndex >= 0) {
        var curUrl = curUrl.substring(tprodIndex, curUrl.length);
        var curProdLid = curUrl.substring(curUrl.indexOf('-') + 1, curUrl.length);
        var rec = $('#rec' + recid);
        if (curUrl.indexOf(recid) >= 0 && rec.find('[data-product-lid=' + curProdLid + ']').length) {
            rec.find('[data-product-lid=' + curProdLid + '] [href^="#prodpopup"]').triggerHandler('click')
        }
    }
}

function t951_updateSlider(recid) {
    var el = $('#rec' + recid);
    t_onFuncLoad('t_slds_SliderWidth', function () {
        t_slds_SliderWidth(recid)
    });
    var sliderWrapper = el.find('.t-slds__items-wrapper');
    var sliderWidth = el.find('.t-slds__container').width();
    var pos = parseFloat(sliderWrapper.attr('data-slider-pos'));
    sliderWrapper.css({
        transform: 'translate3d(-' + (sliderWidth * pos) + 'px, 0, 0)'
    });
    t_onFuncLoad('t_slds_UpdateSliderHeight', function () {
        t_slds_UpdateSliderHeight(recid)
    });
    t_onFuncLoad('t_slds_UpdateSliderArrowsHeight', function () {
        t_slds_UpdateSliderArrowsHeight(recid)
    })
}

function t951_showPopup(recid) {
    var el = $('#rec' + recid);
    var popup = el.find('.t-popup');
    popup.css('display', 'block');
    setTimeout(function () {
        popup.find('.t-popup__container').addClass('t-popup__container-animated');
        popup.addClass('t-popup_show');
        if (window.lazy == 'y') {
            t_lazyload_update()
        }
    }, 50);
    $('body').addClass('t-body_popupshowed');
    el.find('.t-popup').mousedown(function (e) {
        var windowWidth = $(window).width();
        var maxScrollBarWidth = 17;
        var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
        if (e.clientX > windowWithoutScrollBar) {
            return
        }
        if (e.target == this) {
            t951_closePopup()
        }
    });
    el.find('.t-popup__close, .t951__close-text').click(function (e) {
        t951_closePopup()
    });
    $(document).keydown(function (e) {
        if (e.keyCode == 27) {
            t951_closePopup()
        }
    })
}

function t951_closePopup() {
    $('body').removeClass('t-body_popupshowed');
    $('.t-popup').removeClass('t-popup_show');
    var curUrl = window.location.href;
    var indexToRemove = curUrl.indexOf('#!/tproduct/');
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && indexToRemove < 0) {
        indexToRemove = curUrl.indexOf('%23!/tproduct/')
    }
    curUrl = curUrl.substring(0, indexToRemove);
    setTimeout(function () {
        $(".t-popup").scrollTop(0);
        $('.t-popup').not('.t-popup_show').css('display', 'none');
        if (typeof history.replaceState != 'undefined') {
            window.history.replaceState('', '', curUrl)
        }
    }, 300)
}

function t951_removeSizeStyles(styleStr) {
    if (typeof styleStr != "undefined" && (styleStr.indexOf('font-size') >= 0 || styleStr.indexOf('padding-top') >= 0 || styleStr.indexOf('padding-bottom') >= 0)) {
        var styleStrSplitted = styleStr.split(';');
        styleStr = "";
        for (var i = 0; i < styleStrSplitted.length; i++) {
            if (styleStrSplitted[i].indexOf('font-size') >= 0 || styleStrSplitted[i].indexOf('padding-top') >= 0 || styleStrSplitted[i].indexOf('padding-bottom') >= 0) {
                styleStrSplitted.splice(i, 1);
                i--;
                continue
            }
            if (styleStrSplitted[i] == "") {
                continue
            }
            styleStr += styleStrSplitted[i] + ";"
        }
    }
    return styleStr
}

function t951_copyTypography(recid) {
    var rec = $('#rec' + recid);
    var titleStyle = rec.find('.t951__title').attr('style');
    var descrStyle = rec.find('.t951__descr').attr('style');
    rec.find('.t-popup .t951__title').attr("style", t951_removeSizeStyles(titleStyle));
    rec.find('.t-popup .t951__descr, .t-popup .t951__text').attr("style", t951_removeSizeStyles(descrStyle))
}