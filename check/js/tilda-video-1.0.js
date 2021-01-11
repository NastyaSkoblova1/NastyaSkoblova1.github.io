/**
 * @VideoBG function preserve Copyright 2011 Syd Lawrence ( www.sydlawrence.com ). Version: 0.2
 * Licensed under MIT and GPLv2.
 */

(function ($) {
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

    /* set to fullscreen*/
    $.fn.videoBG.setFullscreen = function ($el) {
        var windowWidth = $(window).width(),
            windowHeight = $(window).height();

        $el.css('min-height', 0).css('min-width', 0);
        $el.parent().width(windowWidth).height(windowHeight);
        /* if by width */
        if (windowWidth / windowHeight > $el.aspectRatio) {
            $el.width(windowWidth).height('auto');
            /* shift the element up*/
            var height = $el.height();
            var shift = (height - windowHeight) / 2;
            if (shift < 0) {
                shift = 0;
            }
            $el.css('top', -shift);
        } else {
            $el.width('auto').height(windowHeight);
            /* shift the element left*/
            var width = $el.width();
            var shift = (width - windowWidth) / 2;
            if (shift < 0) {
                shift = 0;
            }
            $el.css('left', -shift);

            /* this is a hack mainly due to the iphone*/
            if (shift === 0) {
                var t = setTimeout(function () {
                    $.fn.videoBG.setFullscreen($el);
                }, 500);
            }
        }

        $('body > .videoBG_wrapper').width(windowWidth).height(windowHeight);
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

    /* get the overlay wrapper*/
    $.fn.videoBG.wrapper = function () {
        var $wrap = $('<div/>');
        $wrap.addClass('videoBG_wrapper').css('position', 'absolute').css('top', 0).css('left', 0);
        return $wrap;
    };

    /* these are the defaults*/
    $.fn.videoBG.defaults = {
        mp4: '',
        ogv: '',
        webm: '',
        poster: '',
        autoplay: true,
        loop: true,
        scale: false,
        position: 'absolute',
        opacity: 1,
        textReplacement: false,
        zIndex: 0,
        width: 0,
        height: 0,
        fullscreen: false,
        imgFallback: true,
    };
})(jQuery);


(function ($) {
    /**
     * @constructor
     */
    function VideoLoadProcessor() {
        this.setScrollListener();
    }

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