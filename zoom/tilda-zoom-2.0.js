$(document).ready(function () {
    if (!window.tzoominited) {
        t_zoom_onFuncLoad('t_initZoom', function() {
            t_initZoom();
        });
    }
});

function t_initZoom() {
    if ($('[data-zoomable="yes"]').length) {
        window.tzoominited = true;
        window.tzoomopenonce = false;
        window.isDoubletapScaleAdded = false;

        $('[data-zoomable="yes"]:not(.t-slds__thumbs_gallery):not([data-img-zoom-url=""])').addClass('t-zoomable');
        $('body').append(
            '<div class="t-zoomer__wrapper">\
            <div class="t-zoomer__container">\
            </div>\
            <div class="t-zoomer__bg"></div>\
            <div class="t-zoomer__close">\
                <svg width="20" height="20" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">\
                    <path d="M1.41421 -0.000151038L0 1.41406L21.2132 22.6273L22.6274 21.2131L1.41421 -0.000151038Z" fill="black"/>\
                    <path d="M22.6291 1.41421L21.2148 0L0.00164068 21.2132L1.41585 22.6274L22.6291 1.41421Z" fill="black"/>\
                </svg>\
            </div>\
            </div>'
        );

        $('.t-zoomer__wrapper').append(
            '<div class="t-zoomer__scale showed">\
                <svg class="icon-increase" width="20" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">\
                    <path d="M22.832 22L17.8592 17.0273" stroke="black" stroke-width="2" stroke-linecap="square"/>\
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.58591 3.7511C0.917768 7.41924 0.917768 13.367 4.58591 17.0352C8.25405 20.7033 14.2019 20.7033 17.87 17.0352C21.5381 13.367 21.5381 7.41924 17.87 3.7511C14.2019 0.0829653 8.25405 0.0829653 4.58591 3.7511Z" stroke="black" stroke-width="2"/>\
                    <path d="M6.25781 10.3931H16.2035" stroke="black" stroke-width="2"/>\
                    <path d="M11.2305 15.3662V5.42053" stroke="black" stroke-width="2"/>\
                </svg>\
                <svg class="icon-decrease" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\
                    <path d="M21.9961 22L17.0233 17.0273" stroke="black" stroke-width="2" stroke-linecap="square"/>\
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.74997 3.7511C0.0818308 7.41924 0.0818308 13.367 3.74997 17.0352C7.41811 20.7033 13.3659 20.7033 17.0341 17.0352C20.7022 13.367 20.7022 7.41924 17.0341 3.7511C13.3659 0.0829653 7.41811 0.0829653 3.74997 3.7511Z" stroke="black" stroke-width="2"/>\
                    <path d="M5.41797 10.3931H15.3637" stroke="black" stroke-width="2"/>\
                </svg>\
            </div>'
        );

        $('.t-records').on('click', '.t-zoomable:not([data-img-zoom-url=""])', t_zoomHandler);
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

    var id = $(this).closest('.r').attr('id'),
        parentBlock = $('#' + id);

    var images = parentBlock.find('.t-zoomable:not(.t-slds__thumbs_gallery):not(.tn-atom__slds-img)');

    if ($('#' + id).find('.t-slds').length) {
        var slider = $(this).closest('.t-slds');
        if (slider.length) {
            images = slider.find('.t-zoomable:not(.t-slds__thumbs_gallery)');
        }
    }

    var sliderTrack = $('.t-carousel__zoomer__track');

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
            titlebody = '<div class="t-zoomer__title t-name t-descr_xxs">' + imgtitle + '</div>';
        }

        if (imgdescr !== '') {
            descrbody = '<div class="t-zoomer__descr t-descr t-descr_xxs">' + imgdescr + '</div>';
        }

        sliderTrack.append(
            '\
            <div class="t-carousel__zoomer__item">\
            <div class="t-carousel__zoomer__wrapper">\
            <img class="t-carousel__zoomer__img" src="' + images_urls + '"></div>\
            <div class="t-zoomer__comments">' + titlebody + descrbody + '</div>\
            </div>'
        );
    });

    t_zoom_setModalColor(parentBlock);

    var modal = $('.t-zoomer__wrapper'),
        slideItems = $('.t-carousel__zoomer__item'),
        imageBordersWidth = modal.height() - slideItems.height(),
        maxCommentsHeight = 0,
        zoomerComments = slideItems.find('.t-zoomer__comments');

    zoomerComments.each(function (i, comment) {
        var zoomerTitle = $(comment).find('.t-zoomer__title');
        var zoomerDescr = $(comment).find('.t-zoomer__descr');

        if ((zoomerTitle === '' && zoomerDescr === '') ||
            (!zoomerTitle.length && !zoomerDescr.length)) {

            $(comment).css('padding', '0');
        }

        var commentHeight = $(comment).innerHeight();

        maxCommentsHeight = maxCommentsHeight > commentHeight ? maxCommentsHeight : commentHeight;
    });

    zoomerComments.css('height', maxCommentsHeight);
    
    var zoomedImages = slideItems.find('.t-carousel__zoomer__img'),
        arrowWrappers = $('.t-carousel__zoomer__arrow__wrapper');

    zoomedImages.css('max-height', 'calc(100vh - ' + (maxCommentsHeight + imageBordersWidth) + 'px');
    
    arrowWrappers.css('top', 'calc(50% - ' + (maxCommentsHeight / 2) + 'px)');

    var target_url = $(this).attr('data-img-zoom-url'),
        target_img = $('.t-carousel__zoomer__img[src="' + target_url + '"]'),
        targetItem = target_img.closest('.t-carousel__zoomer__item');

    slideItems.each(function (index, item) {
        $(item).attr('data-zoomer-slide-number', index);
    });

    if (slideItems.length > 1) {
        t_zoom_loopSlider();
    }
    
    var targetPosition = targetItem.position().left;

    targetItem.addClass('active');

    sliderTrack.css({
        transition: 'none',
        transform: 'translateX(' + -targetPosition + 'px)',
    });

    setTimeout(function () {
        sliderTrack.css('transition', '');
    });

    $('.t-carousel__zoomer__control_right').click(function () {
        if (sliderTrack.attr('data-on-transition') !== 'y' &&
            modal.attr('data-on-drag') !== 'y') {
                t_zoom_unscale();

                setTimeout(function() {
                    t_zoom_showSlide('next');
    
                    t_zoom_checkForScale();
                });
        }
    });

    $('.t-carousel__zoomer__control_left').click(function () {
        if (sliderTrack.attr('data-on-transition') !== 'y' &&
            modal.attr('data-on-drag') !== 'y') {
                t_zoom_unscale();

                setTimeout(function() {
                    t_zoom_showSlide('prev');
    
                    t_zoom_checkForScale();
                });
        }
    });

    $(document).unbind('keydown');
    $(document).keydown(function (e) {
        if (e.keyCode == 37) {
            if (sliderTrack.attr('data-on-transition') !== 'y' &&
            modal.attr('data-on-drag') !== 'y') {
                t_zoom_unscale();

                setTimeout(function() {
                    t_zoom_showSlide('prev');
    
                    t_zoom_checkForScale();
                });
            }
        }

        if (e.keyCode == 39) {
            if (sliderTrack.attr('data-on-transition') !== 'y' &&
            modal.attr('data-on-drag') !== 'y') {
                t_zoom_unscale();

                setTimeout(function() {
                    t_zoom_showSlide('next');
    
                    t_zoom_checkForScale();
                });
            }
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
        if (window.isMobile) {
            return;
        }

        if ($(this).hasClass('scale-active')) {
            t_zoom_unscale();
        } else if (!window.isMobile) {
            t_zoom_close();
        }
    });

    t_zoom_checkForScale();

    t_zoom_lockScroll();

    t_zoom_initSwipe();

    t_zoom_initCloseSwipe();

    t_zoom_initResizeListener();

    window.tzoomopenonce = true;

    if (window.isMobile) {
        t_zoom_setHideControlsTimer();
        modal.on('touchstart touchmove touchend mousemove', t_zoom_setHideControlsTimer);
    }
}

function t_zoom_initSwipe() {
    var slideItems = $('.t-carousel__zoomer__item'),
        sliderTrack = $('.t-carousel__zoomer__track'),
        modal = $('.t-zoomer__wrapper');

    if (slideItems.length > 1) {
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

        // setTimeout(function() {
        //     var style = 'touch-action: manipulation;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);'
        //     $('.t-zoomer__wrapper').attr('style', style);
        // }, 500)

        var sliderTrackPosition,
            isScaled = false;

        hammer.on('panstart', function () {

            if (sliderTrack.attr('data-on-transition') !== 'y') {

                sliderTrackPosition = sliderTrack.position().left;
                sliderTrack.css('transition', 'none');

            } else {

                sliderTrackPosition = null;

            }

            isScaled = window.visualViewport.scale !== 1 || modal.hasClass('scale-active');
        });

        hammer.on('panmove', function (event) {

            if (sliderTrack.attr('data-on-transition') !== 'y' &&
                modal.attr('data-on-drag') !== 'y' &&
                event.maxPointers === 1 &&
                !isScaled) {

                var deltaX = Math.abs(event.deltaX);

                if (deltaX > 40) {
                    sliderTrack.attr('data-on-drag', 'y');
                }
    
                if (sliderTrackPosition) {
                    var newTrackPosition = sliderTrackPosition + event.deltaX;

                    sliderTrack.css(
                        'transform',
                        'translateX(' + newTrackPosition + 'px)'
                    );
                }
            }
        });

        if (!window.tzoomopenonce) {
                hammer.on('panend', function(event) {
                    var sliderTrack = $('.t-carousel__zoomer__track');

                    sliderTrack.attr('data-on-drag', '');
                    
                    if (sliderTrack.attr('data-on-transition') !== 'y' &&
                        modal.attr('data-on-drag') !== 'y' &&
                        event.maxPointers === 1 &&
                        !isScaled) {

                        sliderTrack.css('transition', '');

                        var velocity = Math.abs(event.velocityX),
                            sliderTrackOffset = sliderTrack.position().left,
                            slideItem = $('.t-carousel__zoomer__item'),
                            slideWidth = slideItem.width(),
                            targetSlideOffset = sliderTrack.find('.t-carousel__zoomer__item.active').position().left,
                            distance = slideWidth - Math.abs(sliderTrackOffset + targetSlideOffset),
                            transitionTime = (distance / velocity) / 1000;

                        transitionTime = transitionTime > 0.6 ? 0.6 : transitionTime < 0.2 ? 0.2 : transitionTime;

                        sliderTrack.css('transition-duration', transitionTime + 's');
                    
                        if (event.velocityX < -0.5 || event.deltaX < -80) {
                            t_zoom_unscale();
                    
                            t_zoom_showSlide('next');
                    
                            t_zoom_checkForScale();
                        } else if (event.velocityX > 0.5 || event.deltaX > 80) {
                            t_zoom_unscale();
                    
                            t_zoom_showSlide('prev');
                    
                            t_zoom_checkForScale();
                        } else {
                            t_zoom_showSlide();
                        }
                    }
                });
        }
    }
}

// @param {string} [direction] - slider transition direction (return to current slide, if direction is not defined)
function t_zoom_showSlide(direction) {
    var sliderTrack = $('.t-carousel__zoomer__track'),
        slideItems = sliderTrack.find('.t-carousel__zoomer__item'),
        targetItem = sliderTrack.find('.t-carousel__zoomer__item.active'),
        currentSlideIndex = targetItem.index();

    if (direction === 'next') {
        currentSlideIndex = (currentSlideIndex + 1) % slideItems.length;
        sliderTrack.attr('data-on-transition', 'y');
    }

    if (direction === 'prev') {
        currentSlideIndex = (slideItems.length + (currentSlideIndex - 1)) % slideItems.length;
        sliderTrack.attr('data-on-transition', 'y');
    }

    var trackPosition = slideItems.eq(currentSlideIndex).position().left;

    slideItems.removeClass('active').eq(currentSlideIndex).addClass('active');

    sliderTrack.css('transform', 'translateX(' + -trackPosition + 'px)');
        
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
    var sliderTrack = $('.t-carousel__zoomer__track'),
        sliderItems = sliderTrack.find('.t-carousel__zoomer__item'),
        firstSlideCopy = sliderItems.eq(0).clone(),
        lastSlideCopy = sliderItems.eq(sliderItems.length - 1).clone();

    sliderTrack.prepend(lastSlideCopy).append(firstSlideCopy);

    var slidesCount = sliderTrack.find('.t-carousel__zoomer__item').length;

    sliderTrack.on(
        'transitionend webkitTransitionEnd oTransitionEnd',
        function () {
            var currentSlideIndex = sliderTrack.find('.active').index();

            if (currentSlideIndex === 0) {
                t_zoom_transitForLoop('start');
            }

            if (currentSlideIndex === slidesCount - 1) {
                t_zoom_transitForLoop('end');
            }

            sliderTrack.attr('data-on-transition', '');
        }
    );
}

function t_zoom_initCloseSwipe() {
    var hammer = new Hammer($('.t-zoomer__wrapper')[0], {
        domEvents: true,
        inputClass: Hammer.TouchInput,
        recognizers: [
            [
                Hammer.Pan,
                {
                    direction: Hammer.DIRECTION_VERTICAL,
                },
            ],
        ],
    });
    
    var modal = $('.t-zoomer__wrapper'),
        sliderTrack = $('.t-carousel__zoomer__track'),
        isScaled = false,
        modalPosition;
  
    hammer.on('panstart', function () {
        modalPosition = modal.position().top;
        modal.css('transition', 'none');

        isScaled = window.visualViewport.scale !== 1 || modal.hasClass('scale-active');
    });

    hammer.on('panmove', function (event) {
        var deltaY = Math.abs(event.deltaY);
  
        if ((sliderTrack.attr('data-on-drag') !== 'y' || modal.attr('data-on-drag') === 'y') &&
            ((event.angle > -120 && event.angle < -60) || (event.angle < 120 && event.angle > 60)) &&
              event.maxPointers === 1 &&
              !isScaled) {
            
            if (deltaY > 40) {
                
                modal.attr('data-on-drag', 'y');

            }
            
            var newTrackPosition = modalPosition + event.deltaY;
  
            modal.css(
                'transform',
                'translateY(' + newTrackPosition + 'px)'
            );
        }
    });
  
    hammer.on('panend', t_zoom_closeSwipeHandler);
}

function t_zoom_closeSwipeHandler(event) {
    var modal = $('.t-zoomer__wrapper'),
        closeAnimationTime = 300,
        isScaled = window.visualViewport.scale !== 1 || modal.hasClass('scale-active');
  
    modal.css('transition', 'transform ' + closeAnimationTime + 'ms ease-out');
  
    if (Math.abs(event.deltaY) < 40) {
        modal.css('transform', '');
    }
  
    if (modal.attr('data-on-drag') === 'y' &&
        event.maxPointers === 1 &&
        !isScaled) {
  
        if (event.deltaY < -200 || event.velocityY < -0.3) {

            modal.css('transform', 'translateY(-100vh)');
  
            setTimeout(function () {
                t_zoom_close();
                modal.css('transform', '');
            }, closeAnimationTime);

        } else if (event.deltaY > 200 || event.velocityY > 0.3) {

            modal.css('transform', 'translateY(100vh)');
  
            setTimeout(function () {
                t_zoom_close();
                modal.css('transform', '');
            }, closeAnimationTime);

        } else {
            modal.css('transform', '');
        }
    }
  
    modal.attr('data-on-drag', '');
}

function t_zoom_checkForScale() {
    var eventAdded = false;
    var zoomedImage = $('.t-carousel__zoomer__item.active .t-carousel__zoomer__img:not(.loaded)');

    if (!zoomedImage.length) {
        return;
    }

    /* on first gallery open wait image load */
    zoomedImage.load(function () {
        if (eventAdded) {
            return;
        }
        if ($(window).width() < zoomedImage[0].naturalWidth ||
            $(window).height() < zoomedImage[0].naturalHeight) {

            zoomedImage.addClass('loaded');
            
            if (!window.isDoubletapScaleAdded) t_zoom_doubletapScaleInit();
            
            t_zoom_scale_init();
            return;

        }
    });

    /* on second gallery open */
    if (zoomedImage[0].complete && !eventAdded) {
        eventAdded = true;

        if ($(window).width() < zoomedImage[0].naturalWidth ||
            $(window).height() < zoomedImage[0].naturalHeight) {

            if (!window.isDoubletapScaleAdded) t_zoom_doubletapScaleInit();

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
        $('.t-zoomer__wrapper').on('click', '.t-zoomer__scale', function (event) {
            var zoomedImage = $('.t-carousel__zoomer__item.active .t-carousel__zoomer__img');
            var zoomedWrapper = $('.t-zoomer__wrapper');
            var zoomerInner = $('.t-carousel__zoomer__inner');
            var zoomerTrack = $('.t-carousel__zoomer__track');

            zoomedImage.css('max-height', '');
            
            zoomerTrack.css({
                transition: 'none',
                transform: 'none',
            });

            if (zoomedWrapper.hasClass('scale-active')) {
                t_zoom_unscale();
            } else {
                zoomedWrapper.addClass('scale-active');
                zoomerInner.addClass('scale-active');

                if (window.isMobile) {
                    t_zoom_mobileZoomPositioningInit(zoomedImage);
                } else {
                    t_zoom_desktopZoomPositioningInit(zoomedImage, event);
                }
            }
        });
    }
}

function t_zoom_doubletapScaleInit() {

    window.isDoubletapScaleAdded = true;

    var hammer = new Hammer($('.t-zoomer__wrapper')[0], {
        domEvents: true,
        inputClass: Hammer.TouchInput,
        recognizers: [
            [
                Hammer.Tap,
            ],
        ],
    });

    hammer.on('tap', function(e) {
        if (e.tapCount === 2 &&
            $('body').hasClass('t-zoomer__show') &&
            !e.target.closest('.t-carousel__zoomer__control')) {

            var zoomedImage = $('.t-carousel__zoomer__item.active .t-carousel__zoomer__img');
            var zoomedWrapper = $('.t-zoomer__wrapper');
            var zoomerInner = $('.t-carousel__zoomer__inner');
            var zoomerTrack = $('.t-carousel__zoomer__track');

            zoomedImage.css('max-height', '');
            
            zoomerTrack.css({
                transition: 'none',
                transform: 'none',
            });

            if (zoomedWrapper.hasClass('scale-active')) {
                t_zoom_unscale();
            } else {
                zoomedWrapper.addClass('scale-active');
                zoomerInner.addClass('scale-active');

                t_zoom_mobileZoomPositioningInit(zoomedImage);
            }
        }
    });
}

// @param {jQuery element} zoomedImage
// @param {object} event
function t_zoom_desktopZoomPositioningInit(zoomedImage, event) {

    var leftCoordinate = ($(window).width() - zoomedImage.width()) / 2,
        topCoordinate = ($(window).height() - zoomedImage.height()) / 2;

    zoomedImage.css({
        left: leftCoordinate,
        top: topCoordinate,
    });

    var clientYpercent;
    var imageYpx;
    var clientXpercent;
    var imageXpx;

    if ($(window).width() < zoomedImage[0].naturalWidth) {
        clientXpercent = (event.clientX * 100) / $(window).width();
        imageXpx = -(clientXpercent * (zoomedImage.width() - $(window).width())) / 100;
        zoomedImage.css('left', imageXpx + 'px');
        zoomedImage.on(window.isMobile ? 'touchmove' : 'mousemove', function (e) {
            clientXpercent = (e.originalEvent.touches !== undefined ? e.originalEvent.touches[0].clientX : e.clientX) * 100 / $(window).width();
            imageXpx = -(clientXpercent * (zoomedImage.width() - $(window).width())) / 100;
            zoomedImage.css('left', imageXpx + 'px');
        });
    }

    if ($(window).height() < zoomedImage[0].naturalHeight) {
        clientYpercent = (event.clientY * 100) / $(window).height();
        imageYpx = -(clientYpercent * (zoomedImage.height() - $(window).height())) / 100;
        zoomedImage.css('top', imageYpx + 'px');
        zoomedImage.on(window.isMobile ? 'touchmove' : 'mousemove', function (e) {
            clientYpercent = (e.originalEvent.touches !== undefined ? e.originalEvent.touches[0].clientY : e.clientY) * 100 / $(window).height();
            imageYpx = -(clientYpercent * (zoomedImage.height() - $(window).height())) / 100;
            zoomedImage.css('top', imageYpx + 'px');
        });
    }
}

// @param {jQuery element} zoomedImage
function t_zoom_mobileZoomPositioningInit(zoomedImage) {

    var leftCoordinate = ($(window).width() - zoomedImage.width()) / 2,
        topCoordinate = ($(window).height() - zoomedImage.height()) / 2;

    zoomedImage.css({
        left: leftCoordinate,
        top: topCoordinate,
    });

    var currentPosition = {
        x: 0,
        y: 0,
    };

    var startTouchPosition = {},
        currentTranslate = {};

    zoomedImage.on('touchstart', function(event) {
        startTouchPosition = t_zoom_getTouchEventXY(event);
    });
    
    zoomedImage.on('touchmove', function(event) {
        var currentTouchPosition = t_zoom_getTouchEventXY(event),
            moveVelocity = 1.5,
            imageOffsetX = (currentTouchPosition.x - startTouchPosition.x) * moveVelocity,
            imageOffsetY = (currentTouchPosition.y - startTouchPosition.y) * moveVelocity;

        currentTranslate.x = currentPosition.x + imageOffsetX;
        currentTranslate.y = currentPosition.y + imageOffsetY;

        if (currentTranslate.x > -leftCoordinate) {
            currentTranslate.x = -leftCoordinate;
        }

        if (currentTranslate.x < leftCoordinate) {
            currentTranslate.x = leftCoordinate;
        }
        
        if (currentTranslate.y > -topCoordinate) {
            currentTranslate.y = -topCoordinate;
        }

        if (currentTranslate.y < topCoordinate) {
            currentTranslate.y = topCoordinate;
        }

        zoomedImage.css('transform', 'translate(' + currentTranslate.x + 'px, ' + currentTranslate.y + 'px)');
    });

    zoomedImage.on('touchend touchcancel', function() {
        currentPosition.x = currentTranslate.x;
        currentPosition.y = currentTranslate.y;
    });
}

// @param {object} event - touch event obj
// @return {object} - {x, y} object with coordinates of pointer current position
function t_zoom_getTouchEventXY(event) {
    var coordinates = {
        x: 0,
        y: 0,
    };

    if(event.type == 'touchstart' || event.type == 'touchmove' || event.type == 'touchend' || event.type == 'touchcancel'){
        var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

        coordinates.x = touch.pageX;
        coordinates.y = touch.pageY;
    }
    
    return coordinates;
}

function t_zoom_close() {
    t_zoom_unscale();
    $('body').removeClass('t-zoomer__show t-zoomer__show_fixed');
    $(document).unbind('keydown');
    t_zoom_unlockScroll();
}

function t_zoom_unscale() {
    $('.t-zoomer__wrapper.scale-active, .t-carousel__zoomer__inner').removeClass('scale-active');

    var zoomedItem = $('.t-carousel__zoomer__item.active'),
        zoomedImage = zoomedItem.find('.t-carousel__zoomer__img'),
        zoomerTrack = $('.t-carousel__zoomer__track'),
        modal = $('.t-zoomer__wrapper'),
        imageBordersWidth = modal.height() - zoomedItem.height(),
        zoomerComments = $(zoomedItem).find('.t-zoomer__comments'),
        height = zoomerComments.innerHeight();

    zoomedImage.off('mousemove touchmove').css({
        transform: '',
        left: '',
        top: '',
        maxHeight: 'calc(100vh - ' + (imageBordersWidth + height) + 'px',
    });

    var trackPosition = zoomedItem.position().left;

    zoomerTrack.css('transform', 'translateX(' + -trackPosition + 'px)');

    setTimeout(function () {
        zoomerTrack.css('transition', '');
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
    var sliderTrack = $('.t-carousel__zoomer__track'),
        activeSlidePosition = sliderTrack.find('.t-carousel__zoomer__item.active').position().left;

    sliderTrack.css('transform', 'translateX(' + -activeSlidePosition + 'px)');
}

function t_zoom_onFuncLoad(funcName, okFunc, time) {
    if (typeof window[funcName] === 'function') {
        okFunc();
    } else {
        setTimeout(function checkFuncExist() {
            if (typeof window[funcName] === 'function') {
                okFunc();
                return;
            }
            if (document.readyState === 'complete' && typeof window[funcName] !== 'function') {
                throw new Error(funcName + ' is undefined');
            }
            setTimeout(checkFuncExist, time || 100);
        });
    }
}

//@param {jQuery element} - block from which modal was called
function t_zoom_setModalColor(parent) {
    var COLOR_WHITE = '#ffffff',
        COLOR_BLACK = '#000000';

    var parentBGColor = parent.attr('data-bg-color') ? parent.attr('data-bg-color') : COLOR_WHITE;

    parentBGColor = t_zoom_hexToRgb(parentBGColor);

    var modalContainer = $('.t-zoomer__container'),
        modalSvg = $('.t-zoomer__wrapper svg'),
        modalPath = modalSvg.find('path'),
        controlsBG = $('.t-zoomer__close, .t-zoomer__scale'),
        arrowsWrapper = modalContainer.find('.t-carousel__zoomer__arrow__wrapper'),
        modalTextColor,
        controlsBGColor;

    var modalBGColor = t_zoom_luma_rgb(parentBGColor) === 'black' ? COLOR_BLACK : COLOR_WHITE;

    if (modalBGColor === COLOR_BLACK) {
        modalTextColor = COLOR_WHITE;
        controlsBGColor = 'rgba(1, 1, 1, 0.3)';

        arrowsWrapper.addClass('t-carousel__zoomer__arrow__wrapper_dark');
    } else {
        modalTextColor = COLOR_BLACK;
        controlsBGColor = 'rgba(255, 255, 255, 0.3)';

        arrowsWrapper.removeClass('t-carousel__zoomer__arrow__wrapper_dark');
    }

    controlsBG.css('background', controlsBGColor);

    modalContainer.css({
        'background-color': modalBGColor,
        'color': modalTextColor,
    });

    modalSvg.each(function(_, svg) {
        $(svg).attr('fill') === 'none' ? 'none' : modalTextColor;
    });

    modalPath.each(function(_, path) {
        if ($(path).attr('stroke')) {
            $(path).attr('stroke', modalTextColor);
        }

        if ($(path).attr('fill')) {
            $(path).attr('fill', modalTextColor);
        }
    });

    $('.t-zoomer__title, .t-zoomer__descr').css('color', modalTextColor);
}

// @param {string | array} color - color in rgb format
// @return {string} - (black | white) depending of illumination of the passed color
function t_zoom_luma_rgb(color) {
    var isArray = Array.isArray(color);

    if (typeof color == 'undefined') {
        return 'black';
    }
    if (color.indexOf('rgb') != 0 && !isArray) {
        return 'black';
    }

    var rgb = isArray ? color : color.split('(')[1].split(')')[0].split(',');

    if (rgb.length < 3) {
        return 'black';
    }

    return ((0.2126 * rgb[0]) + (0.7152 * rgb[1]) + (0.0722 * rgb[2])) < 128 ? 'black' : 'white';
}

// @param {string} hex - color in hex format
// @return {array} - color in RGB format
function t_zoom_hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var aaa = result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
    return result ? [aaa.r, aaa.g, aaa.b] : null;
}

function t_zoom_setHideControlsTimer() {
    var controls = $('.t-carousel__zoomer__arrow__wrapper, .t-zoomer__scale');

    controls.removeClass('t-zoomer__hide-animation');

    setTimeout(function() {
        controls.addClass('t-zoomer__hide-animation');
    });
}