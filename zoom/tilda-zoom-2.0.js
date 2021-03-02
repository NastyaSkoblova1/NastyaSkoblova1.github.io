$(document).ready(function () {
    t_initZoom();
});

function t_initZoom() {
    if ($('[data-zoomable="yes"]').length) {
        window.tzoominited = true;
        window.tzoomopenonce = false;

        $('[data-zoomable="yes"]:not(.t-slds__thumbs_gallery)').addClass(
            't-zoomable'
        );
        $('body').append(
            '<div class="t-zoomer__wrapper">\
            <div class="t-zoomer__container">\
            </div>\
            <div class="t-zoomer__bg"></div>\
            <div class="t-zoomer__close">\
                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">\
                    <path d="M1.41421 -0.000151038L0 1.41406L21.2132 22.6273L22.6274 21.2131L1.41421 -0.000151038Z" fill="black"/>\
                    <path d="M22.6291 1.41421L21.2148 0L0.00164068 21.2132L1.41585 22.6274L22.6291 1.41421Z" fill="black"/>\
                </svg>\
            </div>\
            </div>'
        );

        if (!window.isMobile) {
            $('.t-zoomer__wrapper').append(
                '<div class="t-zoomer__scale showed">\
                    <svg class="icon-increase" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">\
                        <path d="M22.832 22L17.8592 17.0273" stroke="black" stroke-width="2" stroke-linecap="square"/>\
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.58591 3.7511C0.917768 7.41924 0.917768 13.367 4.58591 17.0352C8.25405 20.7033 14.2019 20.7033 17.87 17.0352C21.5381 13.367 21.5381 7.41924 17.87 3.7511C14.2019 0.0829653 8.25405 0.0829653 4.58591 3.7511Z" stroke="black" stroke-width="2"/>\
                        <path d="M6.25781 10.3931H16.2035" stroke="black" stroke-width="2"/>\
                        <path d="M11.2305 15.3662V5.42053" stroke="black" stroke-width="2"/>\
                    </svg>\
                    <svg class="icon-decrease" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\
                        <path d="M21.9961 22L17.0233 17.0273" stroke="black" stroke-width="2" stroke-linecap="square"/>\
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.74997 3.7511C0.0818308 7.41924 0.0818308 13.367 3.74997 17.0352C7.41811 20.7033 13.3659 20.7033 17.0341 17.0352C20.7022 13.367 20.7022 7.41924 17.0341 3.7511C13.3659 0.0829653 7.41811 0.0829653 3.74997 3.7511Z" stroke="black" stroke-width="2"/>\
                        <path d="M5.41797 10.3931H15.3637" stroke="black" stroke-width="2"/>\
                    </svg>\
                </div>'
            );
        }

        $('.t-records').on('click', '.t-zoomable', t_zoomHandler);
        $('.t-records').on('click', '.t-slds__thumbs_gallery', t_zoomHandler);
        $('.t-zoomer__close, .t-zoomer__bg').click(function () {
            t_zoom_close();
            var isPopupShown = $(document).find('.t-popup_show').length != 0;
            if (isPopupShown) {
                $(document).keydown(function (e) {
                    if (e.keyCode == 27) {
                        if (window.t_store_closePopup !== undefined) {
                            t_store_closePopup(false);
                        }
                    }
                });
            }
        });
    }
}

function t_zoomHandler() {
    $('body').addClass('t-zoomer__show');
    $('.t-zoomer__container').html(
        '\
        <div class="t-carousel__zoomed">\
            <div class="t-carousel__zoomer__slides">\
            <div class="t-carousel__zoomer__inner">\
            <div class="t-carousel__zoomer__track">\
            </div>\
            </div>\
            <div class="t-carousel__zoomer__control t-carousel__zoomer__control_left" data-zoomer-slide="prev">\
                <div class="t-carousel__zoomer__arrow__wrapper t-carousel__zoomer__arrow__wrapper_left">\
                <div class="t-carousel__zoomer__arrow t-carousel__zoomer__arrow_left t-carousel__zoomer__arrow_small"></div>\
                </div>\
            </div>\
            <div class="t-carousel__zoomer__control t-carousel__zoomer__control_right" data-zoomer-slide="next">\
                <div class="t-carousel__zoomer__arrow__wrapper t-carousel__zoomer__arrow__wrapper_right">\
                <div class="t-carousel__zoomer__arrow t-carousel__zoomer__arrow_right t-carousel__zoomer__arrow_small"></div>\
                </div>\
            </div>\
            </div>\
        </div>'
    );

    var id = $(this).closest('.r').attr('id');
    var images = $('#' + id).find('.t-zoomable:not(.t-slds__thumbs_gallery)');

    if ($('#' + id).find('.t-slds').length) {
        var slider = $(this).closest('.t-slds');
        if (slider.length) {
            images = slider.find('.t-zoomable:not(.t-slds__thumbs_gallery)');
        }
    }

    var $sliderTrack = $('.t-carousel__zoomer__track');

    images.each(function (i, image) {
        var imgtitle = '';
        var imgdescr = '';
        var titlebody = '';
        var descrbody = '';
        var images_urls = $(image).attr('data-img-zoom-url').split(',');

        if ($(image).is('img') || $(image).is('div')) {
            imgtitle = $(image).attr('title') || '';
            imgdescr = $(image).attr('data-img-zoom-descr') || '';
        }

        if (imgtitle !== '') {
            titlebody =
                '<div class="t-zoomer__title t-name t-descr_xxs">' +
                imgtitle +
                '</div>';
        }

        if (imgdescr !== '') {
            descrbody =
                '<div class="t-zoomer__descr t-descr t-descr_xxs">' +
                imgdescr +
                '</div>';
        }

        $sliderTrack.append(
            '\
            <div class="t-carousel__zoomer__item">\
            <div class="t-carousel__zoomer__wrapper">\
                <img class="t-carousel__zoomer__img" src="' +
                images_urls +
                '"></div>\
                <div class="t-zoomer__comments">' +
                titlebody +
                descrbody +
                '</div>\
            </div>'
        );
    });

    var image_descr = $('.t-carousel__zoomer__item');

    image_descr.each(function (i, image) {
        var zoomerComments = $(image).find('.t-zoomer__comments');
        var zoomerTitle = zoomerComments.find('.t-zoomer__title');
        var zoomerDescr = zoomerComments.find('.t-zoomer__descr');

        if (zoomerTitle === '' && zoomerDescr === '') {
            zoomerComments.css('padding', '0');
        }

        var height = zoomerComments.innerHeight();
        var image_active = $(image).find('.t-carousel__zoomer__wrapper');
        image_active.css('bottom', height);
    });

    var target_url = $(this).attr('data-img-zoom-url');
    var target_img = $('.t-carousel__zoomer__img[src="' + target_url + '"]');
    var $targetItem = target_img.closest('.t-carousel__zoomer__item');

    t_zoom_loopSlider();

    var slideItem = $('.t-carousel__zoomer__item');

    slideItem.each(function (index, item) {
        $(item).attr('data-zoomer-slide-number', index);
    });

    var targetPosition = $targetItem.position().left;

    $targetItem.addClass('active');

    $sliderTrack.css({
        transition: 'none',
        transform: 'translateX(' + -targetPosition + 'px)',
    });

    setTimeout(function () {
        $sliderTrack.css('transition', '');
    });

    var t_zoom_trottledShowSlide = t_zoom_throttle(t_zoom_showSlide, 270);

    $('.t-carousel__zoomer__control_right').click(function () {
        t_zoom_unscale();

        t_zoom_showSlide('next');

        t_zoom_checkForScale();
    });

    $('.t-carousel__zoomer__control_left').click(function () {
        t_zoom_unscale();

        t_zoom_showSlide('prev');

        t_zoom_checkForScale();
    });

    $(document).unbind('keydown');
    $(document).keydown(function (e) {
        if (e.keyCode == 37) {
            t_zoom_unscale();

            t_zoom_showSlide('prev');

            t_zoom_checkForScale();
        }

        if (e.keyCode == 39) {
            t_zoom_unscale();

            t_zoom_showSlide('next');

            t_zoom_checkForScale();
        }

        if (e.keyCode == 27) {
            t_zoom_close();
            var isPopupShown = $(document).find('.t-popup_show').length > 0;
            if (isPopupShown) {
                $(document).keydown(function (e) {
                    if (e.keyCode == 27) {
                        t_store_closePopup(false);
                    }
                });
            }
        }
    });

    var slides_count = $('.t-carousel__zoomer__item').size();

    $('body').addClass('t-zoomer__show_fixed');

    if (slides_count == 1) {
        $('.t-carousel__zoomer__control').css('display', 'none');
    }

    $('.t-carousel__zoomer__inner').click(function () {
        if ($(this).hasClass('scale-active')) {
            t_zoom_unscale();
        } else {
            t_zoom_close();
        }
    });

    t_zoom_checkForScale();

    t_zoom_lockScroll();

    t_zoom_initSwipe();

    t_zoom_initCloseSwipe();

    t_zoom_initResizeListener();

    window.tzoomopenonce = true;
}

function t_zoom_initSwipe() {
    var $slideItems = $('.t-carousel__zoomer__item'),
        $sliderTrack = $('.t-carousel__zoomer__track');

    if ($slideItems.length > 1) {
        var hammer = new Hammer($('.t-zoomer__wrapper')[0], {
            domEvents: true,
            inputClass: Hammer.TouchInput,
            recognizers: [
                [
                    Hammer.Pan,
                    {
                        direction: Hammer.DIRECTION_HORIZONTAL,
                    },
                ],
            ],
        });

        var sliderTrackPosition = $sliderTrack.position().left;

        hammer.on('panstart', function () {
            if ($sliderTrack.attr('data-on-transition') === 'y') {
                sliderTrackPosition = undefined;
            } else {
                sliderTrackPosition = $sliderTrack.position().left;
                $sliderTrack.css('transition', 'none');
            }
        });

        hammer.on('panmove', function (event) {
            var deltaX = Math.abs(event.deltaX),
                deltaY = Math.abs(event.deltaY);

            if (sliderTrackPosition && deltaX > deltaY) {
                var newTrackPosition = sliderTrackPosition + event.deltaX;

                $sliderTrack.css(
                    'transform',
                    'translateX(' + newTrackPosition + 'px)'
                );
            }
        });

        var t_zoom_trottledShowSlide = t_zoom_throttle(t_zoom_showSlide, 270);

        if (!window.tzoomopenonce) {
            if (sliderTrackPosition) {
                hammer.on('panend', function(event) {
                    var $sliderTrack = $('.t-carousel__zoomer__track');

                    $sliderTrack.css('transition', '');
                
                    var deltaX = Math.abs(event.deltaX),
                        deltaY = Math.abs(event.deltaY);
                
                    if (deltaX > deltaY) {
                
                        if (event.velocityX < -0.4 || event.deltaX < -40) {
                            t_zoom_unscale();
                    
                            t_zoom_showSlide('next');
                    
                            t_zoom_checkForScale();
                        } else if (event.velocityX > 0.4 || event.deltaX > 40) {
                            t_zoom_unscale();
                    
                            t_zoom_showSlide('prev');
                    
                            t_zoom_checkForScale();
                        } else {
                            t_zoom_showSlide();
                        }
                
                    } else {
                        t_zoom_showSlide();
                    }
                });
            }
        }
    }
}

// @param {string} [direction] - slider transition direction (return to current slide, if direction is not defined)
function t_zoom_showSlide(direction) {
    var $sliderTrack = $('.t-carousel__zoomer__track'),
        $slideItems = $('.t-carousel__zoomer__item', $sliderTrack),
        $targetItem = $('.t-carousel__zoomer__item.active', $sliderTrack),
        currentSlideIndex = $targetItem.index();

    if (direction === 'next') {
        currentSlideIndex = (currentSlideIndex + 1) % $slideItems.length;
    }

    if (direction === 'prev') {
        currentSlideIndex =
            ($slideItems.length + (currentSlideIndex - 1)) % $slideItems.length;
    }

    var trackPosition = $slideItems.eq(currentSlideIndex).position().left;

    $slideItems.removeClass('active').eq(currentSlideIndex).addClass('active');

    $sliderTrack
        .css('transform', 'translateX(' + -trackPosition + 'px)')
        .attr('data-on-transition', 'y');

    console.log(direction);
}

// @param {string} side - side of slider before loop ('start' or 'end')
function t_zoom_transitForLoop(side) {
    var $sliderTrack = $('.t-carousel__zoomer__track'),
        $slideItems = $('.t-carousel__zoomer__item'),
        currentSlideIndex,
        slideOffset;

    if (!side) {
        return 1;
    }

    if (side === 'start') {
        currentSlideIndex = $slideItems.length - 2;
    }

    if (side === 'end') {
        currentSlideIndex = 1;
    }

    slideOffset = $slideItems.eq(currentSlideIndex).position().left;

    $slideItems.removeClass('active').eq(currentSlideIndex).addClass('active');

    $sliderTrack.css({
        transition: 'none',
        transform: 'translateX(' + -slideOffset + 'px)',
    });

    setTimeout(function () {
        $sliderTrack.css('transition', '');
    });
}

function t_zoom_loopSlider() {
    var $sliderTrack = $('.t-carousel__zoomer__track'),
        $sliderItems = $('.t-carousel__zoomer__item', $sliderTrack),
        $firstSlideCopy = $sliderItems.eq(0).clone(),
        $lastSlideCopy = $sliderItems.eq($sliderItems.length - 1).clone();

    $sliderTrack.prepend($lastSlideCopy).append($firstSlideCopy);

    var slidesCount = $('.t-carousel__zoomer__item', $sliderTrack).length;

    $sliderTrack.on(
        'transitionend webkitTransitionEnd oTransitionEnd',
        function () {
            var currentSlideIndex = $sliderTrack.find('.active').index();

            if (currentSlideIndex === 0) {
                t_zoom_transitForLoop('start');
            }

            if (currentSlideIndex === slidesCount - 1) {
                t_zoom_transitForLoop('end');
            }

            $sliderTrack.attr('data-on-transition', '');
        }
    );
}

function t_zoom_initCloseSwipe() {
    var hammer = new Hammer($('.t-zoomer__wrapper')[0], {
        domEvents: true,
        inputClass: Hammer.TouchInput,
        recognizers: [
            [
                Hammer.Swipe,
                {
                    direction: Hammer.DIRECTION_VERTICAL,
                },
            ],
        ],
    });

    hammer.on('swipeup', t_zoom_closeSwipeHandler);
    hammer.on('swipedown', t_zoom_closeSwipeHandler);
}

function t_zoom_closeSwipeHandler(event) {
    var $modal = $('.t-zoomer__wrapper'),
        closeAnimationTime = 250,
        deltaX = Math.abs(event.deltaX),
        deltaY = Math.abs(event.deltaY);

    if (deltaY > deltaX) {
        $modal.css('transition', 'transform ' + closeAnimationTime + 'ms ease-out');

        if (event.direction === 16) {
            $modal.css('transform', 'translateY(100vh)');
        }
    
        if (event.direction === 8) {
            $modal.css('transform', 'translateY(-100vh)');
        }
    
        setTimeout(function () {
            t_zoom_close();
            $modal.css('transform', '');
        }, closeAnimationTime);
    }
}

function t_zoom_checkForScale() {
    var eventAdded = false;
    var zoomedImage = $(
        '.t-carousel__zoomer__item.active .t-carousel__zoomer__img:not(.loaded)'
    );

    if (!zoomedImage.length) {
        return;
    }

    /* on first gallery open wait image load */
    zoomedImage.load(function () {
        if (eventAdded) {
            return;
        }
        if (
            $(window).width() < zoomedImage[0].naturalWidth ||
            $(window).height() < zoomedImage[0].naturalHeight
        ) {
            zoomedImage.addClass('loaded');
            t_zoom_scale_init();
            return;
        }
    });

    /* on second gallery open */
    if (zoomedImage[0].complete && !eventAdded) {
        eventAdded = true;

        if ($(window).width() < zoomedImage[0].naturalWidth) {
            t_zoom_scale_init();
            return;
        } else {
            $('.t-zoomer__scale').css('display', '');
        }

        if ($(window).height() < zoomedImage[0].naturalHeight) {
            t_zoom_scale_init();
            return;
        } else {
            $('.t-zoomer__scale').css('display', '');
        }
    }
}

function t_zoom_scale_init() {
    $('.t-zoomer__scale').css('display', 'block');
    if ($('.t-zoomer__scale').attr('data-zoom-scale-init') !== 'y') {
        $('.t-zoomer__scale').attr('data-zoom-scale-init', 'y');
        $('.t-zoomer__wrapper').on('click', '.t-zoomer__scale', function (e) {
            var zoomedImage = $(
                '.t-carousel__zoomer__item.active .t-carousel__zoomer__img'
            );
            var zoomedWrapper = $('.t-zoomer__wrapper');
            var zoomerInner = $('.t-carousel__zoomer__inner');
            var $zoomerTrack = $('.t-carousel__zoomer__track');

            $zoomerTrack.css({
                transition: 'none',
                transform: 'none',
            });

            if (zoomedWrapper.hasClass('scale-active')) {
                t_zoom_unscale();
            } else {
                zoomedWrapper.addClass('scale-active');
                zoomerInner.addClass('scale-active');

                var leftCoordinate =
                    ($(window).width() - zoomedImage.width()) / 2;
                var topCoordinate =
                    ($(window).height() - zoomedImage.height()) / 2;

                zoomedImage.css('left', leftCoordinate);
                zoomedImage.css('top', topCoordinate);

                var clientYpercent;
                var imageYpx;
                var clientXpercent;
                var imageXpx;

                if ($(window).width() < zoomedImage[0].naturalWidth) {
                    clientXpercent = (e.clientX * 100) / $(window).width();
                    imageXpx =
                        -(
                            clientXpercent *
                            (zoomedImage.width() - $(window).width())
                        ) / 100;
                    zoomedImage.css('left', imageXpx + 'px');
                    zoomedImage.on(
                        window.isMobile ? 'touchmove' : 'mousemove',
                        function (e) {
                            clientXpercent =
                                ((e.originalEvent.touches !== undefined
                                    ? e.originalEvent.touches[0].clientX
                                    : e.clientX) *
                                    100) /
                                $(window).width();
                            imageXpx =
                                -(
                                    clientXpercent *
                                    (zoomedImage.width() - $(window).width())
                                ) / 100;
                            zoomedImage.css('left', imageXpx + 'px');
                        }
                    );
                }

                if ($(window).height() < zoomedImage[0].naturalHeight) {
                    clientYpercent = (e.clientY * 100) / $(window).height();
                    imageYpx =
                        -(
                            clientYpercent *
                            (zoomedImage.height() - $(window).height())
                        ) / 100;
                    zoomedImage.css('top', imageYpx + 'px');
                    zoomedImage.on(
                        window.isMobile ? 'touchmove' : 'mousemove',
                        function (e) {
                            clientYpercent =
                                ((e.originalEvent.touches !== undefined
                                    ? e.originalEvent.touches[0].clientY
                                    : e.clientY) *
                                    100) /
                                $(window).height();
                            imageYpx =
                                -(
                                    clientYpercent *
                                    (zoomedImage.height() - $(window).height())
                                ) / 100;
                            zoomedImage.css('top', imageYpx + 'px');
                        }
                    );
                }
            }
        });
    }
}

function t_zoom_close() {
    t_zoom_unscale();
    $('body').removeClass('t-zoomer__show t-zoomer__show_fixed');
    $(document).unbind('keydown');
    t_zoom_unlockScroll();
}

function t_zoom_unscale() {
    $(
        '.t-zoomer__wrapper.scale-active, .t-carousel__zoomer__inner'
    ).removeClass('scale-active');

    var $zoomedItem = $('.t-carousel__zoomer__item.active'),
        $zoomedImage = $('.t-carousel__zoomer__img', $zoomedItem),
        $zoomerTrack = $('.t-carousel__zoomer__track');

    $zoomedImage.off('mousemove touchmove').css('left', '').css('top', '');

    var trackPosition = $zoomedItem.position().left;

    $zoomerTrack.css('transform', 'translateX(' + -trackPosition + 'px)');

    setTimeout(function () {
        $zoomerTrack.css('transition', '');
    });
}

function t_zoom_lockScroll() {
    var isAndroid = /(android)/i.test(navigator.userAgent);

    if ((window.isiOS && !window.MSStream) || isAndroid) {
        if ((window.isiOSVersion !== '' && window.isiOSVersion !== undefined) || isAndroid) {
            if (window.isiOSVersion[0] === 11 || isAndroid) {
                var body = $('body');
                if (!body.hasClass('t-body_scroll-locked')) {
                    var bodyScrollTop =
                        typeof window.pageYOffset !== 'undefined'
                            ? window.pageYOffset
                            : (
                                  document.documentElement ||
                                  document.body.parentNode ||
                                  document.body
                              ).scrollTop;
                    body.addClass('t-body_scroll-locked');
                    body.css('top', '-' + bodyScrollTop + 'px');
                    body.attr('data-popup-scrolltop', bodyScrollTop);
                }
            }
        }
    }
}

function t_zoom_unlockScroll() {
    var isAndroid = /(android)/i.test(navigator.userAgent);

    if ((window.isiOS && !window.MSStream) || isAndroid) {
        if ((window.isiOSVersion !== '' && window.isiOSVersion !== undefined) || isAndroid) {
            if (window.isiOSVersion[0] === 11 || isAndroid) {
                var body = $('body');
                if (body.hasClass('t-body_scroll-locked')) {
                    var bodyScrollTop = $('body').attr('data-popup-scrolltop');
                    body.removeClass('t-body_scroll-locked');
                    body.css('top', '');
                    body.removeAttr('data-popup-scrolltop');
                    window.scrollTo(0, bodyScrollTop);
                }
            }
        }
    }
}

function t_zoom_initResizeListener() {
    var debouncedResizeHandler = t_throttle(t_zoom_resizeHandler, 300);

    $(window).on('resize', debouncedResizeHandler);
}

function t_zoom_resizeHandler() {
    var $sliderTrack = $('.t-carousel__zoomer__track'),
        activeSlidePosition = $(
            '.t-carousel__zoomer__item.active',
            $sliderTrack
        ).position().left;

    $sliderTrack.css('transform', 'translateX(' + -activeSlidePosition + 'px)');
}

function t_zoom_throttle(fn, interval) {
    var lastTime;

    return function throttled() {
        var timeSinceLastExecution = Date.now() - lastTime;

        if (!lastTime || timeSinceLastExecution >= interval) {
            fn.apply(this, arguments);
            lastTime = Date.now();
        }
    };
}
