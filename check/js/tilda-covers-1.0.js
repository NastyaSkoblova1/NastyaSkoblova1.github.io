(function($) {
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
                                        console.log(videoLoadProcessor);
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


    $.fn.videoBG = function (selector, options) {
        var options = {};
        if (typeof selector == 'object') {
            options = $.extend({}, $.fn.videoBG.defaults, selector);
        } else {
            if (!selector) {
                options = $.fn.videoBG.defaults;
            } else {
                return $(selector).videoBG(options);
            }
        }

        var container = $(this);

        /* check if elements available otherwise it will cause issues*/
        if (!container.length) {
            return;
        }

        /* container to be at least relative*/
        if (container.css('position') == 'static' || !container.css('position')) {
            container.css('position', 'relative');
        }

        /* we need a width*/
        if (options.width == 0) {
            options.width = container.width();
        }

        /* we need a height*/
        if (options.height == 0) {
            options.height = container.height();
        }

        /* get the wrapper*/
        /*
		var wrap = $.fn.videoBG.wrapper();
		wrap.height(options.height)
			.width(options.width);
		*/
        /* if is a text replacement*/
        if (options.textReplacement) {
            /* force sizes*/
            options.scale = true;

            /* set sizes and forcing text out*/
            container.width(options.width).height(options.height).css('text-indent', '-9999px');
        } else {
            /* set the wrapper above the video*/
            /*
			wrap.css('z-index',options.zIndex+1);
			*/
        }

        /* move the contents into the wrapper
		// commented by n.o
		//wrap.html(container.clone(true));*/

        /* get the video*/
        var video = $.fn.videoBG.video(options);

        /* if we are forcing width / height */
        if (options.scale) {
            /* overlay wrapper*/
            /*
			wrap.height(options.height)
				.width(options.width);
			*/

            /* video*/
            video.height(options.height).width(options.width);
        }

        /* add it all to the container*/
        /*
		container.html(wrap);
		*/
        container.append(video);

        if (typeof container.attr('data-content-video-nomute') === 'undefined') {
            container.find('video').prop('muted', 'true');
        }

        setWidthHeightHTMLVideo(video, options.height);

        return video.find('video')[0];
    };

    /* get the formatted video element*/
    $.fn.videoBG.video = function (options) {
        /*commented by n.o*/
        /*$('html, body').scrollTop(-1);*/

        /* video container*/
        var $div = $('<div/>');
        $div.addClass('videoBG')
            .css('position', options.position)
            .css('z-index', options.zIndex)
            .css('top', 0)
            .css('left', 0)
            .css('height', options.height)
            .css('width', options.width)
            .css('opacity', options.opacity)
            .css('overflow', 'hidden');

        /* video element*/
        var $video = $('<video/>');
        $video
            .css('position', 'relative')
            .css('z-index', options.zIndex)
            .attr('poster', options.poster)
            .css('top', 0)
            .css('left', 0)
            .css('min-width', '100%')
            .css('min-height', '100%');

        $video.prop('autoplay', options.autoplay);
        $video.prop('loop', options.loop);
        $video.prop('muted', options.muted);

        if (options.volume > 0) {
            $video.prop('volume', options.volume);
        } else {
            $video.prop('volume', 0);
        }

        /* if fullscreen*/
        if (options.fullscreen) {
            $video.bind('canplay', function () {
                /* set the aspect ratio*/
                $video.aspectRatio = $video.width() / $video.height();
                $.fn.videoBG.setFullscreen($video);
            });

            /* listen out for screenresize*/
            var resizeTimeout;
            $(window).resize(function () {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(function () {
                    $.fn.videoBG.setFullscreen($video);
                }, 100);
            });
            $.fn.videoBG.setFullscreen($video);
        }

        /* video standard element*/
        var v = $video[0];

        /* if meant to loop*/
        if (options.loop) {
            loops_left = options.loop;

            /* cant use the loop attribute as firefox doesnt support it*/
            $video.bind('ended', function () {
                /* if we have some loops to throw*/
                if (loops_left) {
                    /* replay that bad boy*/
                    v.play();
                }

                /* if not forever*/
                if (loops_left !== true) {
                    /* one less loop*/
                    loops_left--;
                }
            });
        }

        /* when can play, play*/
        $video.bind('canplay', function () {
            if (options.autoplay) {
                /* replay that bad boy*/
                v.play();
            }
        });

        /* if supports video*/
        if ($.fn.videoBG.supportsVideo()) {
            /* supports webm*/
            if ($.fn.videoBG.supportType('webm') && options.webm != '') {
                /* play webm*/
                $video.attr('src', options.webm);
            } else {
                /* supports mp4*/
                if ($.fn.videoBG.supportType('mp4') && options.mp4 != '') {
                    /* play mp4*/
                    $video.attr('src', options.mp4);

                    /*	$video.html('<source src="'.options.mp4.'" />');*/
                } else {
                    /* throw ogv at it then*/
                    /* play ogv*/
                    $video.attr('src', options.ogv);
                }
            }
        }

        /* image for those that dont support the video	*/
        var $img = $('<img/>');
        $img.attr('src', options.poster)
            .css('position', 'absolute')
            .css('z-index', options.zIndex)
            .css('top', 0)
            .css('left', 0)
            .css('min-width', '100%')
            .css('min-height', '100%');

        /* add the image to the video*/
        /* if suuports video*/
        if ($.fn.videoBG.supportsVideo()) {
            /* add the video to the wrapper*/
            $div.html($video);
        } else {
            /* nope - whoa old skool*/
            /* add the image instead*/
            $div.html($img);
        }

        /* if text replacement*/
        if (options.textReplacement) {
            /* force the heights and widths*/
            $div.css('min-height', 1).css('min-width', 1);
            $video.css('min-height', 1).css('min-width', 1);
            $img.css('min-height', 1).css('min-width', 1);

            $div.height(options.height).width(options.width);
            $video.height(options.height).width(options.width);
            $img.height(options.height).width(options.width);
        }

        if ($.fn.videoBG.supportsVideo()) {
            /*			v.play();*/
        }
        return $div;
    };

    /* check if suuports video*/
    $.fn.videoBG.supportsVideo = function () {
        return document.createElement('video').canPlayType;
    };

     /* check which type is supported*/
    $.fn.videoBG.supportType = function (str) {
        /* if not at all supported*/
        if (!$.fn.videoBG.supportsVideo()) {
            return false;
        }

        /* create video*/
        var v = document.createElement('video');

        /* check which?*/
        switch (str) {
            case 'webm':
                return v.canPlayType('video/webm; codecs="vp8, vorbis"');
                break;
            case 'mp4':
                return v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
                break;
            case 'ogv':
                return v.canPlayType('video/ogg; codecs="theora, vorbis"');
                break;
        }
        /* nope*/
        return false;
    };


    /**
     * @constructor
     */

    VideoLoadProcessor.prototype.videoTags = [];
    VideoLoadProcessor.prototype.defaultConfig = {
        isNeedStop: false,
    };
    VideoLoadProcessor.prototype.videoConfigs = [];
    /**
     * @param {HTMLVideoElement} video
     * @param {{} | Undefined} config
     */
    VideoLoadProcessor.prototype.registerNewVideo = function (video, config) {
        if (!(video instanceof HTMLVideoElement)) {
            throw new Error('Wrong tag passed into registerNewVideo');
        }
        if (this.videoTags.indexOf(video) == -1) {
            this.videoTags.push(video);
            this.videoConfigs.push(typeof config == 'undefined' ? this.defaultConfig : config);
            this.scrollCb('', true);
            return true;
        }
        return false;
    };
    /**
     * @param {HTMLVideoElement} video
     */
    VideoLoadProcessor.prototype.unergisterVideo = function (video) {
        if (!(video instanceof HTMLVideoElement)) {
            throw new Error('Wrong tag passed into unregisterNewVideo');
        }
        var index;
        if ((index = this.videoTags.indexOf(video)) > -1) {
            if (typeof video.remove == 'function') {
                video.remove();
            } else {
                if (video.parentNode) {
                    video.parentNode.removeChild(video);
                }
            }
            this.pauseVideo(video, this.videoConfigs[index]);
            this.videoTags.splice(index, 1);
            this.videoConfigs.splice(index, 1);
            return true;
        }
        return false;
    };
    VideoLoadProcessor.prototype.pauseVideo = function (video, config) {
        if (!config) {
            throw new Error('Wrong config type!');
        }
        video.pause();
        if (config.isNeedStop) {
            video.load();
        }
    };
    VideoLoadProcessor.prototype.setScrollListener = function () {
        /* $(window).scroll(jQuery.proxy(this.scrollCb, this)); */
        $(window).bind('scroll', t_throttle(jQuery.proxy(this.scrollCb, this), 200));
    };
    VideoLoadProcessor.prototype.scrollCb = function (e, firstInvoke) {
        var windowHeight = $(window).height(),
            _shift = 0,
            _v = null;
        for (var i = 0, l = this.videoTags.length; i < l; i++) {
            (_v = this.videoTags[i]), (_vrect = this.getVideoBoundingRect(_v, false));
            /* set fade volume */
            if (Math.abs(_vrect.top) < windowHeight && Math.abs(_vrect.top) > windowHeight / 2) {
                var vol = 1 - (Math.abs(_vrect.top) - windowHeight / 2) / (windowHeight / 2) - 0.2;
                if (vol > 0 && vol <= 1 && _v.volume != 0) {
                    _v.volume = vol;
                }
            }
            /* then pause              */
            if (Math.abs(_vrect.top) > windowHeight || _vrect.height == 0 /*display : none*/) {
                this.pauseVideo(_v, this.videoConfigs[i]);
                continue;
            }

            if (firstInvoke) {
                _v.play();
            }

            if (_v.paused && _v.loop) {
                _v.play();
            }
        }
    };
    VideoLoadProcessor.prototype.getVideoObject = function (video) {
        for (var i = 0, l = this.videoTags.length; i > l; i++) {
            var vo = this.videoTags[i];
            if (vo.v === video) {
                return vo;
            }
        }
        return null;
    };
    VideoLoadProcessor.prototype.getVideoBoundingRect = function (video, isNeedParent) {
        if (typeof isNeedParent == 'undefined') {
            isNeedParent = true;
        }
        var parent = null;
        if (isNeedParent) {
            parent = $(video).parents('.r')[0];
            if (!parent) {
                parent = video;
            }
        } else {
            parent = video;
        }
        return parent.getBoundingClientRect();
    };
    window.videoLoadProcessor = new VideoLoadProcessor();

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

function setWidthHeightHTMLVideo(vel, height_1) {
    var el = vel.closest('.t-cover__carrier');
    var height = height_1 + '';
    console.log('setWidthHeightHTMLVideo:' + height);
    var iframe = el.find('video');
    var nocover = el.attr('data-content-video-nocover');
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

function VideoLoadProcessor() {
    this.setScrollListener();
}