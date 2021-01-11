(function ($) {
    window.cover_init = function (id) {
        $(document).ready(function () {
            var cover_carrier = document.body.querySelector('#coverCarry' + id);
            var el = $(cover_carrier);

            var backgroundurl = el.attr('data-content-cover-bg');
            var height = el.attr('data-content-cover-height');
            var parallax = el.attr('data-content-cover-parallax');
            var videomp4 = el.attr('data-content-video-url-mp4');
            var videowebm = el.attr('data-content-video-url-webm');
            var youtubeid = el.attr('data-content-video-url-youtube');
            var noloop = el.attr('data-content-video-noloop');
            var nomute = el.attr('data-content-video-nomute');
            var bgbase64 = el.attr('data-content-bg-base64');
            var video_nocover = el.attr('data-content-video-nocover');

            if (!backgroundurl) {
                backgroundurl = '';
            }
            if (!height) {
                height = '';
            }
            if (!parallax) {
                parallax = '';
            }
            if (!videomp4) {
                videomp4 = '';
            }
            if (!videowebm) {
                videowebm = '';
            }
            if (!youtubeid) {
                youtubeid = '';
            }
            if (!noloop) {
                noloop = '';
            }
            if (!nomute) {
                nomute = '';
            }
            if (!youtubeid) {
                youtubeid = '';
            }
            if (!bgbase64) {
                bgbase64 = '';
            }

            if (video_nocover && video_nocover == 'yes') {
                videomp4 = '';
                videowebm = '';
                youtubeid = '';
            }

            if (window.isMobile && (videowebm != '' || videomp4 != '' || youtubeid != '')) {
                el.css('background-image', "url('" + backgroundurl + "')");
            }

            /*fix content height*/
            setTimeout(function () {
                cover_fixcontentheight(id);
                cover_fixBackgroundFixedStyles(id);
            }, 500);
            cover_fixBackgroundFixedNode(id);

            /*fix content height if has a logo inside*/
            var clogo = $('#rec' + id).find('img[data-hook-clogo]');
            if (clogo.length) {
                clogo.load(function () {
                    setTimeout(function () {
                        cover_fixcontentheight(id);
                        cover_fixBackgroundFixedStyles(id);
                    }, 500);
                });
            }

            if (window.isMobile) {
                $(window).on('orientationchange', function () {
                    cover_fixcontentheight(id);
                    cover_fixBackgroundFixedStyles(id);
                });
            }

            /* if set video*/
            if (videomp4 !== '' || videowebm !== '' || youtubeid !== '') {
                if (window.isMobile == false) {
                    /* Initializing the videos */
                    if (youtubeid == '' && (videomp4 != '' || videowebm != '')) {
                        el.css('background-color', '#000000');
                        el.css('background-image', "url('https://tilda.ws/img/spinner-white.gif')");
                        el.css('background-size', 'auto');
                        el.attr('data-content-cover-bg', '');
                        var loop = false;
                        if (noloop != '') {
                            loop = false;
                        } else {
                            loop = true;
                        }

                        var muted = true;
                        if (nomute != '') {
                            muted = false;
                        } else {
                            muted = true;
                        }

                        var height_more_vh = '';
                        if (parallax == 'fixed') {
                            if (height.indexOf('vh') > -1) {
                                if (parseInt(height) > 100) {
                                    el.css('height', '100vh');
                                    height_more_vh = 'yes';
                                }
                            }
                            if (height.indexOf('px') > -1) {
                                if (parseInt(height) > $(window).height()) {
                                    el.css('height', '100vh');
                                    height_more_vh = 'yes';
                                }
                            }
                        }

                        var cotimer;
                        var flagprocessed = '';
                        var wnd = $(window);
                        var prnt = el.parent();

                        wnd.scroll(function () {
                            if (cotimer) {
                                window.clearTimeout(cotimer);
                            }

                            cotimer = window.setTimeout(function () {
                                if (!(flagprocessed > 0)) {
                                    var a, b, c, d, s;

                                    a = el.offset().top;
                                    b = el.height();

                                    c = wnd.scrollTop();
                                    d = wnd.height();

                                    if (c + d > a - 500 && c <= a + b + 500) {
                                        var vid = el.videoBG({
                                            mp4: videomp4,
                                            webm: videowebm,
                                            poster: '',
                                            preload: 'none',
                                            autoplay: 'true',
                                            loop: loop,
                                            volume: 1,
                                            scale: true,
                                            zIndex: 0,
                                            width: '100%',
                                        });

                                        vid.setAttribute('muted', muted);
                                        vid.setAttribute('playsinline', ''); /* iOS only */

                                        videoLoadProcessor.registerNewVideo(vid);
                                        flagprocessed = 1;
                                    }
                                }
                            }, 100);

                            if (parallax == 'fixed' && height_more_vh == 'yes') {
                                var aa, bb, cc, dd, ss;

                                aa = prnt.offset().top;
                                bb = prnt.height();

                                cc = wnd.scrollTop();
                                dd = wnd.height();

                                if (cc >= aa + bb - dd) {
                                    el.css('position', 'absolute');
                                    el.css('bottom', '0px');
                                    el.css('top', 'auto');
                                    /*el.css("vertical-align","bottom");*/
                                } else {
                                    if (cc >= aa) {
                                        el.css('position', 'fixed');
                                        el.css('top', '0px');
                                    } else {
                                        if (cc < aa) {
                                            el.css('position', 'relative');
                                            el.css('top', 'auto');
                                        }
                                    }
                                }
                            }
                        });

                        wnd.scroll();

                        /* Initializing youtube video*/
                    } else {
                        if (youtubeid != '') {
                            el.css('background-color', '#000000');
                            el.css('background-image', '');
                            el.attr('data-content-cover-bg', '');
                            var cotimer;
                            var flagprocessed = 0;
                            var wnd = $(window);

                            wnd.scroll(function () {
                                if (cotimer) {
                                    window.clearTimeout(cotimer);
                                }

                                cotimer = window.setTimeout(function () {
                                    flagprocessed = el.find('iframe').length;
                                    if (!(flagprocessed > 0)) {
                                        var a, b, c, d, s;

                                        a = el.offset().top;
                                        b = el.height();

                                        c = wnd.scrollTop();
                                        d = wnd.height();

                                        if (c + d > a - 500 && c <= a + b + 500) {
                                            processYoutubeVideo(cover_carrier, height);
                                        }
                                    }
                                }, 100);
                            });

                            wnd.scroll();
                        }
                    }
                }
            }

            if (parallax == 'dynamic') {
                if (window.isMobile == false) {
                    var offset = el.offset().top - (el.offset().top - $(window).height());
                    if (el.height() < $(window).height()) {
                        el.height(el.height() + offset * 0.2);
                    }
                    el.parallax(0.2, true);
                }
            }

            if (bgbase64 == 'yes' && backgroundurl != '' && videomp4 == '' && videowebm == '' && youtubeid == '') {
                var bg_already = '';
                $('<img/>')
                    .attr('src', backgroundurl)
                    .load(function () {
                        $(this).remove();
                        el.css('background-image', "url('" + backgroundurl + "')");
                        el.css('opacity', '1');
                        var bg_already = 'yes';
                    });
                if (bg_already != 'yes') {
                    el.css('background-image', '');
                    el.css('opacity', '0');
                    el.css('transition', 'opacity 25ms');
                }
            }

            var coverarrow = $('#rec' + id).find('.t-cover__arrow-wrapper');
            if (coverarrow.length > 0) {
                coverarrow.click(function () {
                    var recheight = $('#rec' + id).height();
                    if (recheight > 0) {
                        $('html, body').animate({ scrollTop: $('#rec' + id).offset().top + recheight }, 500);
                    }
                });
            }
        });
    };

    $(document).ready(function () {
        var curMode = $('.t-records').attr('data-tilda-mode');
        if (curMode != 'edit') {
            $('.t-cover__carrier').each(function () {
                var id = $(this).attr('data-content-cover-id');
                if (id > 0) {
                    cover_init(id);
                }
            });
        }
    });

    var def = $.Deferred();

    window.processYoutubeVideo = function (div, height) {
        load_youtube_api();

        var defFunc = function () {
            var el = $(div);
            var src = el.attr('data-content-video-url-youtube');
            var nomute = el.attr('data-content-video-nomute');
            var noloop = el.attr('data-content-video-noloop');
            var nocover = el.attr('data-content-video-nocover');

            var iframe = document.createElement('iframe');
            iframe.src = processSrc(src, nocover, nomute);
            iframe.frameBorder = 0;
            iframe.allow = 'autoplay';

            var playtimer;
            div.appendChild(iframe);
            if (window.isMobile == false) {
                var player = new YT.Player(iframe, {
                    events: {
                        onReady: function (e) {
                            onYouTubePlayerReady_do(div, e.target, nomute);
                            if (e.target.setVolume && nomute != 'yes') {
                                e.target.setVolume(0);
                            }
                            e.target.setLoop(true);
                        },
                        onStateChange: function (e) {
                            if (e.target.setVolume && nomute != 'yes') {
                                e.target.setVolume(0);
                            }

                            if (e.data === -1) {
                                var sp = window.fix_scrolltop_beforestop_youtube;
                                if (sp >= 0) {
                                    $('html, body').scrollTop(sp);
                                    delete window.fix_scrolltop_beforestop_youtube;
                                }
                            }
                            if (e.data === YT.PlayerState.PLAYING) {
                                playtimer = window.setInterval(function () {
                                    var a = e.target.getCurrentTime();
                                    var b = e.target.getDuration();
                                    if (a + 1 > b && b !== 0) {
                                        e.target.seekTo(0);
                                        if (noloop === 'yes') {
                                            e.target.stopVideo();
                                            e.target.clearVideo();
                                        }
                                    }
                                }, 1000);
                            } else {
                                window.clearTimeout(playtimer);
                            }
                        },
                    },
                });
            }

            setWidthHeightYoutubeVideo(el, height);
        };
        def.then(defFunc);
    };

    window.onYouTubeIframeAPIReady = function () {
        def.resolve();
    };
})(jQuery);


function cover_fixcontentheight(id) {
    /* correct cover height if content more when cover height */
    var el = $('#rec' + id);
    var hcover = el.find('.t-cover').height();
    var hcontent = el.find('div[data-hook-content]').outerHeight();
    if (hcontent > 300 && hcover < hcontent + 40) {
        var hcontent = hcontent + 120;
        if (hcontent > 1000) {
            hcontent += 100;
        }
        console.log('auto correct cover height: ' + hcontent);
        el.find('.t-cover').height(hcontent);
        el.find('.t-cover__filter').height(hcontent);
        el.find('.t-cover__carrier').height(hcontent);
        el.find('.t-cover__wrapper').height(hcontent);
        if (window.isMobile == false) {
            setTimeout(function () {
                var divvideo = el.find('.t-cover__carrier');
                if (divvideo.find('iframe').length > 0) {
                    console.log('correct video from cover_fixcontentheight');
                    setWidthHeightYoutubeVideo(divvideo, hcontent + 'px');
                }
                if (divvideo.find('video').length > 0) {
                    console.log('correct html5video from cover_fixcontentheight');
                    /* n: need to dev */
                    /* setWidthHeightHTMLVideo(divvideo, hcontent); */
                }
            }, 2000);
        }
        if (typeof window.t_lazyload_updateResize_elem === 'function') {
            try {
                window.t_lazyload_updateResize_elem(el.find('.t-cover__carrier'));
            } catch (e) {
                console.log('error:' + e);
            }
        } else {
        }
    }
}

function cover_checkIsFixForBackgroundNeeded(id) {
    var rec = document.body.querySelector('#rec' + id);
    if (!rec) {
        return;
    }
    var coverCarrier = rec.querySelector('.t-cover__carrier');
    var youtubeUrl;
    var mp4Url;
    var webmUrl;
    if (coverCarrier !== null) {
        youtubeUrl = coverCarrier.getAttribute('data-content-video-url-youtube');
        mp4Url = coverCarrier.getAttribute('data-content-video-url-mp4');
        webmUrl = coverCarrier.getAttribute('data-content-video-url-webm');
    }
    var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    var isMobile = window.isMobile || (/Macintosh/.test(navigator.userAgent) && 'ontouchend' in document); // fix for ios13+
    if (
        !isMobile &&
        is_safari &&
        !youtubeUrl &&
        !mp4Url &&
        !webmUrl &&
        coverCarrier &&
        coverCarrier.getAttribute('data-content-cover-parallax') === 'fixed' &&
        !window['cover' + id + 'fixbackgroundstyles']
    ) {
        return true;
    } else {
        return false;
    }
}

function cover_fixBackgroundFixedNode(id) {
    if (cover_checkIsFixForBackgroundNeeded(id)) {
        var rec = document.body.querySelector('#rec' + id);
        var parent = document.body.querySelector('#rec' + id + ' .t-cover').parentNode;
        console.log('new fix node background-position: fixed');
        if (!window.cover_fixBackgroundStyles) {
            var css =
                    '.t-cover__container {position: relative;}.t-cover__container .t-cover {clip: rect(0, auto, auto, 0);position: absolute;top: 0;left: 0;width: 100%;height: 100% !important;}.t-cover__container .t-cover .t-cover__carrier {position: fixed;display: block;top: 0;left: 0;width: 100%;height: 100%!important;background-size: cover;background-position: center center;transform: translateZ(0);will-change: transform;}',
                head = document.head || document.getElementsByTagName('head')[0],
                style = document.createElement('style');

            head.appendChild(style);

            style.type = 'text/css';
            if (style.styleSheet) {
                // This is required for IE8 and below.
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
            window.cover_fixBackgroundStyles = true;
        }

        var newWrapper = document.createElement('div');
        newWrapper.classList.add('t-cover__container');
        parent.prepend(newWrapper);

        var cover = rec.querySelector('.t-cover');
        var coverHeight = cover.style.height;
        newWrapper.style.height = coverHeight;
        newWrapper.append(cover);

        // specific covers fixes - with video popup and avatar section
        var specificCovers = {
            275: '.t256__video-container',
            286: '.t266__video-container',
            337: '.t-container',
            906: '.t906__video-container',
        };

        var classContainer = specificCovers[rec.getAttribute('data-record-type')];
        if (classContainer !== undefined) {
            var container = rec.querySelector(classContainer);
            newWrapper.append(container);
        }

        window['cover' + id + 'fixbackgroundnodes'] = true;
    }
}

function cover_fixBackgroundFixedStyles(id) {
    var rec = document.body.querySelector('#rec' + id);

    if (cover_checkIsFixForBackgroundNeeded(id)) {
        console.log('new fix style background-position: fixed');
        var newWrapper = rec.querySelector('.t-cover__container');
        var cover = rec.querySelector('.t-cover');
        var coverHeight = cover.style.height;
        cover.style.height = 0;

        newWrapper.style.height = coverHeight;

        window['cover' + id + 'fixbackgroundstyles'] = true;
    } else {
        return;
    }
}

function processSrc(src, nocover, nomute) {
    if (src.indexOf('https://www.youtube.com/embed') == -1) {
        src = 'https://www.youtube.com/embed' + (src[0] == '/' ? src : '/' + src);
    }
    var extractVideoId = function (src) {
        var parts = src.split('/'),
            neededPart = null;
        for (var i = 0, l = parts.length; i < l; i++) {
            if (parts[i] == 'embed') {
                neededPart = parts[i + 1];
            }
        }
        return neededPart;
    };
    var currentLocation = location.protocol + '//' + location.host;

    if (nocover != 'yes') {
        src =
            (src[src.length - 1] == '/' ? src : src) +
            '?autoplay=1&loop=1&enablejsapi=1&&playerapiid=featuredytplayer&controls=0&modestbranding=1&rel=0&showinfo=0&color=white&iv_load_policy=3&theme=light&wmode=transparent&origin=' +
            currentLocation +
            '&playlist=' +
            extractVideoId(src);
    } else {
        src =
            (src[src.length - 1] == '/' ? src : src) +
            '?autoplay=0&loop=0&enablejsapi=1&&playerapiid=featuredytplayer&controls=1&modestbranding=1&rel=0&showinfo=0&color=black&iv_load_policy=3&theme=dark&wmode=transparent&origin=' +
            currentLocation;
    }

    if (nomute !== 'yes') {
        src += '&mute=1';
    }

    return src;
}

function onYouTubePlayerReady_do(div, player, nomute) {
    var timer;
    var wnd = $(window);
    var frame = $(div);
    var timer_count = 0;

    wnd.scroll(function () {
        if (timer) {
            window.clearTimeout(timer);
            if (timer_count >= 15) {
                timer_player_do(frame, wnd, player, nomute);
                timer_count = 0;
            }
            timer_count++;
        }

        timer = window.setTimeout(function () {
            timer_player_do(frame, wnd, player, nomute);
            timer_count = 0;
        }, 100);
    });

    wnd.scroll();
}

function timer_player_do(frame, wnd, player, nomute) {
    var a, b, c, d, s;

    a = frame.offset().top;
    b = frame.height();

    c = wnd.scrollTop();
    d = wnd.height();

    s = player.getPlayerState();

    if (c + d > a && c <= a + b) {
        if (s !== 1) {
            player.playVideo();
        }
        if (nomute == 'yes') {
            if (c > a + b - 100) {
                player.setVolume(30);
            } else {
                if (c > a + b - 200) {
                    player.setVolume(70);
                } else {
                    if (c + d < a + 200) {
                        player.setVolume(30);
                    } else {
                        player.setVolume(100);
                    }
                }
            }
        } else {
            /* console.log("no"); */
        }
    } else {
        if (c + d < a && c + d > a - 500) {
            if (s !== 2) {
                player.playVideo();
                player.pauseVideo();
            }
        } else {
            if (c > a + b && c < a + b + 500) {
                if (s !== 2) {
                    player.pauseVideo();
                }
            } else {
                if (s !== 2) {
                    player.pauseVideo();
                }
            }
        }
    }
}

function load_youtube_api() {
    if (window.loadytapi_flag !== 'yes') {
        window.loadytapi_flag = 'yes';
        var tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
}

function setWidthHeightYoutubeVideo(el, height) {
    console.log('setWidthHeightYoutubeVideo:' + height);
    var iframe = el.find('iframe');
    var nocover = el.attr('data-content-video-nocover');
    var noadcut = el.attr('data-content-video-noadcut-youtube');
    var customratio = el.attr('data-content-video-ratio');

    var video_ratio = 0.5625;
    if (customratio > 0) video_ratio = parseFloat(customratio) * 1;

    if (nocover != 'yes') {
        if (!height) {
            height = '100vh';
        }
        if (height.indexOf('vh') > -1) {
            var wh = window.innerHeight;
            if (!wh) {
                wh = $(window).height();
            }
            var div_height = Math.floor(wh * (parseInt(height) / 100));
        } else {
            var div_height = parseInt(height);
        }
        var div_width = Math.floor(parseInt(window.innerWidth));
        if (!div_width) {
            div_width = $(window).width();
        }
        var video_width = div_width;
        var video_height = video_width * video_ratio;

        var vw2 = video_width;
        var vh2 = video_height;
        var vh3 = video_height;
        var delta_coef = 1;

        if (noadcut == 'yes') {
        } else {
            vh2 = vh2 + 110 + 110;
            vh3 = video_height - 220;
        }

        /* count delt_coef if video height less than div height*/
        if (vh3 < div_height) {
            if (video_height < div_height) {
                var delta_coef = div_height / video_height + 0.02;
            } else {
                var delta_coef = video_height / div_height + 0.02;
            }
        }

        var zoom_video_width = Math.floor(vw2 * delta_coef);
        var zoom_video_height = Math.floor(vh2 * delta_coef);

        var heightDelta = zoom_video_height - div_height;
        var widthDelta = zoom_video_width - div_width;

        iframe.height(zoom_video_height + 'px');
        iframe.width(zoom_video_width + 'px');

        if (heightDelta > 0) {
            iframe.css('margin-top', -Math.floor(heightDelta / 2) + 'px');
        }
        if (widthDelta > 0) {
            iframe.css('margin-left', -Math.floor(widthDelta / 2) + 'px');
        }
    } else {
        var video_height;
        if (!height) {
            video_height = Math.floor(el.width() * video_ratio);
        }
        if (height && height.indexOf('vh') > -1) {
            video_height = Math.floor(window.innerHeight * (parseInt(height) / 100));
        } else {
            if (height) {
                video_height = parseInt(height);
            }
        }

        iframe.css('width', '100%');
        iframe.height(video_height + 'px');
    }
}