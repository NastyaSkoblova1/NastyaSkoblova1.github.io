function t_initZoom() {
    if ($('[data-zoomable="yes"]').length) {
        window.tzoominited = true;
        $('[data-zoomable="yes"]:not(.t-slds__thumbs_gallery)').addClass("t-zoomable");
        $("body").append('<div class="t-zoomer__wrapper">\
            <div class="t-zoomer__container">\
            </div>\
            <div class="t-zoomer__bg"></div>\
            <div class="t-zoomer__close">\
                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">\
                    <path d="M1.41421 -0.000151038L0 1.41406L21.2132 22.6273L22.6274 21.2131L1.41421 -0.000151038Z" fill="black"/>\
                    <path d="M22.6291 1.41421L21.2148 0L0.00164068 21.2132L1.41585 22.6274L22.6291 1.41421Z" fill="black"/>\
                </svg>\
            </div>\
            </div>');

        if (!window.isMobile) {
            $('.t-zoomer__wrapper').append('<div class="t-zoomer__scale showed">\
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
        </div>');
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
    $('.t-zoomer__container').html('\
    <div class="t-carousel__zoomed">\
        <div class="t-carousel__zoomer__slides">\
        <div class="t-carousel__zoomer__inner">\
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
    </div>');

    var id = $(this).closest('.r').attr('id');
    var images = $('#' + id).find('.t-zoomable:not(.t-slds__thumbs_gallery)');
    if ($('#' + id).find('.t-slds').length) {
        var slider = $(this).closest('.t-slds');
        if (slider.length) {
            images = slider.find('.t-zoomable:not(.t-slds__thumbs_gallery)');
        }
    }

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

        $('.t-carousel__zoomer__inner').append('\
        <div class="t-carousel__zoomer__item">\
        <div class="t-carousel__zoomer__wrapper">\
            <img class="t-carousel__zoomer__img" src="' + images_urls + '"></div>\
            <div class="t-zoomer__comments">' + titlebody + descrbody + '</div>\
        </div>');
    });

    var image_descr = $('.t-carousel__zoomer__item');
    image_descr.each(function (i, image) {
        $(image).css('display', 'block');
        var zoomerComments = $(image).find('.t-zoomer__comments');
        var zoomerTitle = zoomerComments.find('.t-zoomer__title');
        var zoomerDescr = zoomerComments.find('.t-zoomer__descr');
        if (zoomerTitle === '' && zoomerDescr === '') {
            zoomerComments.css('padding', '0');
        }
        var height = zoomerComments.innerHeight();
        $(image).css('display', '');
        var image_active = $(image).find('.t-carousel__zoomer__wrapper');
        image_active.css('bottom', height);
    });

    var target_url = $(this).attr('data-img-zoom-url');
    var target_img = $('.t-carousel__zoomer__img[src="' + target_url + '"]');
    var slideItem = $('.t-carousel__zoomer__item');
    target_img.closest(slideItem).addClass('active');

    slideItem.each(function (index, item) {
        $(item).attr('data-zoomer-slide-number', index);
    });

    var pos = parseInt($('.t-carousel__zoomer__item:visible').attr('data-zoomer-slide-number'), 10);
    $('.t-carousel__zoomer__control_right').click(function () {
        t_zoom_unscale()

        pos = (pos + 1) % slideItem.length;
        slideItem.removeClass('active').eq(pos).addClass('active');
        t_zoom_checkForScale();
    });

    $('.t-carousel__zoomer__control_left').click(function () {
        t_zoom_unscale()

        pos = (pos - 1) % slideItem.length;
        slideItem.removeClass('active').eq(pos).addClass('active');
        t_zoom_checkForScale();
    });

    $(document).unbind('keydown');
    $(document).keydown(function (e) {
        if (e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 27) {
            t_zoom_unscale();

            var key = {
                37: (pos - 1),
                39: (pos + 1),
            }

            pos = key[e.keyCode] % slideItem.length;

            slideItem.removeClass('active').eq(pos).addClass('active');
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
}

function t_zoom_initSwipe() {
    var slideItem = $('.t-carousel__zoomer__item');
    var pos = parseInt($('.t-carousel__zoomer__item:visible').attr('data-zoomer-slide-number'), 10);

    if (slideItem.length > 1) {

        hammer = new Hammer($('.t-zoomer__wrapper')[0], {
            domEvents: true,
            inputClass: Hammer.TouchInput,
            recognizers: [
                [Hammer.Pan, {
                    direction: Hammer.DIRECTION_HORIZONTAL
                }]
            ]
        });


        hammer.on('panend', function(event) {
            if (event.velocityX < -0.4) {
                t_zoom_unscale()
        
                pos = (pos + 1) % slideItem.length;
                slideItem.removeClass('active').eq(pos).addClass('active');
                t_zoom_checkForScale();
            } else if (event.velocityX > 0.4) {
                t_zoom_unscale()
        
                pos = (pos - 1) % slideItem.length;
                slideItem.removeClass('active').eq(pos).addClass('active');
                t_zoom_checkForScale();
            }
        });

        var style = $('.t-zoomer__wrapper').attr('style');
        $('.t-zoomer__wrapper').attr('style', style.replace(' -webkit-user-drag: none;', ''))
    }
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
        if ($(window).width() < zoomedImage[0].naturalWidth || $(window).height() < zoomedImage[0].naturalHeight) {
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
            var zoomedImage = $('.t-carousel__zoomer__item.active .t-carousel__zoomer__img');
            var zoomedWrapper = $('.t-zoomer__wrapper');
            var zoomerInner = $('.t-carousel__zoomer__inner');

            if (zoomedWrapper.hasClass('scale-active')) {
                t_zoom_unscale();
            } else {
                zoomedWrapper.addClass('scale-active');
                zoomerInner.addClass('scale-active');

                var leftCoordinate = ($(window).width() - zoomedImage.width()) / 2;
                var topCoordinate = ($(window).height() - zoomedImage.height()) / 2;

                zoomedImage.css('left', leftCoordinate);
                zoomedImage.css('top', topCoordinate);

                var clientYpercent;
                var imageYpx;
                var clientXpercent;
                var imageXpx;

                if ($(window).width() < zoomedImage[0].naturalWidth) {
                    clientXpercent = (e.clientX * 100) / $(window).width();
                    imageXpx = -(clientXpercent * (zoomedImage.width() - $(window).width())) / 100;
                    zoomedImage.css('left', imageXpx + 'px');
                    zoomedImage.on(window.isMobile ? 'touchmove' : 'mousemove', function (e) {
                        clientXpercent = (e.originalEvent.touches !== undefined ? e.originalEvent.touches[0].clientX : e.clientX) * 100 / $(window).width();
                        imageXpx = -(clientXpercent * (zoomedImage.width() - $(window).width())) / 100;
                        zoomedImage.css('left', imageXpx + 'px');
                    });
                }

                if ($(window).height() < zoomedImage[0].naturalHeight) {
                    clientYpercent = (e.clientY * 100) / $(window).height();
                    imageYpx = -(clientYpercent * (zoomedImage.height() - $(window).height())) / 100;
                    zoomedImage.css('top', imageYpx + 'px');
                    zoomedImage.on(window.isMobile ? 'touchmove' : 'mousemove', function (e) {
                        console.log(e);
                        clientYpercent = (e.originalEvent.touches !== undefined ? e.originalEvent.touches[0].clientY : e.clientY) * 100 / $(window).height();
                        imageYpx = -(clientYpercent * (zoomedImage.height() - $(window).height())) / 100;
                        zoomedImage.css('top', imageYpx + 'px');
                    });
                }
            }
        })
    }
}

function t_zoom_close() {
    t_zoom_unscale();
    $('body').removeClass('t-zoomer__show t-zoomer__show_fixed');
    $(document).unbind('keydown');
    t_zoom_unlockScroll();
}

function t_zoom_unscale() {
    $('.t-zoomer__wrapper.scale-active, .t-carousel__zoomer__inner').removeClass('scale-active');
    var zoomedImage = $('.t-carousel__zoomer__item.active .t-carousel__zoomer__img');
    zoomedImage.off('mousemove touchmove').css('left', '').css('top', '');
}

$(document).ready(function () {
    t_initZoom();
});

function t_zoom_lockScroll() {
    if (window.isiOS && !window.MSStream) {
        if (window.isiOSVersion !== '' && window.isiOSVersion !== undefined) {
            if (window.isiOSVersion[0] === 11) {
                var body = $('body');
                if (!body.hasClass('t-body_scroll-locked')) {
                    var bodyScrollTop =
                        typeof window.pageYOffset !== 'undefined' ?
                        window.pageYOffset :
                        (document.documentElement || document.body.parentNode || document.body).scrollTop;
                    body.addClass('t-body_scroll-locked');
                    body.css('top', '-' + bodyScrollTop + 'px');
                    body.attr('data-popup-scrolltop', bodyScrollTop);
                }
            }
        }
    }
}

function t_zoom_unlockScroll() {
    if (window.isiOS && !window.MSStream) {
        if (window.isiOSVersion !== '' && window.isiOSVersion !== undefined) {
            if (window.isiOSVersion[0] === 11) {
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