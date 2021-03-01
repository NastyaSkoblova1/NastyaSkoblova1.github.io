/* Блок GL06 */

(function ($) {
    window.processVideo = function (v) {
        mp4Src = $(v).attr('data-content-video-url-mp4');
        webmSrc = $(v).attr('data-content-video-url-webm');
        $(v).css('background-color', 'transparent');
        $(v).css('background-image', '');
        var options = {
            mp4: mp4Src,
            webm: webmSrc,
            /*poster: "",*/
            preload: 'none',
            autoplay: false,
            loop: true,
            scale: true,
            zIndex: 0,
            width: '100%',
        };
        /* Initializing the videos*/

        t_onFuncLoadVideo(function() {
            vid = $(v).videoBG(options);
            videoLoadProcessor.registerNewVideo(vid, {
                isNeedStop: false,
            });
        });
    };
    
    function SequenceController() {
        this.setScrollCb();
        this.itemHeight = screen.availHeight; /* document.documentElement.clientHeight || window.innerHeight || screen.availHeight;*/
        var itemTransitionItemRelation = 0.25;
        this.itemTransitionTop = this.itemHeight * itemTransitionItemRelation;
        this.activeItemIndex = null;
        this.windowHeight = document.documentElement.clientHeight || window.innerHeight || screen.availHeight;
        this.topOffsetShift = -150;
        $(window).resize(jQuery.proxy(this.recalculateAllSequencesOffsets, this));
        this._resizeInterval = setInterval(jQuery.proxy(this.scrollCb, this), 500);
    }

    SequenceController.prototype.defaultConfig = {
        orientation: 'vertical',
        speedFactor: 1,
        automated: false,
    };

    SequenceController.prototype.sequenceObjects = [];
    /**
     * @param {{}} sO
     */

    SequenceController.prototype.recalculateAllSequencesOffsets = function () {
        if (this._resizeTimeout) {
            clearTimeout(this._resizeTimeout);
        }

        if (this._resizeInterval) {
            clearInterval(this._resizeInterval);
        }

        this._resizeTimeout = setTimeout(
            jQuery.proxy(function () {
                this.scrollCb();
                this._resizeInterval = setInterval(jQuery.proxy(this.scrollCb, this), 500);
            }, this),
            10
        );
    };

    SequenceController.prototype.registerNewBlock = function (node) {
        if (!(node instanceof HTMLElement)) {
            throw new Error('Wrong node type in registerNewBlock');
        }
        for (var i = 0, l = this.sequenceObjects.length; i < l; i++) {
            if (this.sequenceObjects[i].sequenceBlock === node) {
                return false;
            }
        }
        var sequenceHolder = node.querySelector('[data-hook="sequence-holder"]'),
            sequenceHeight = 0,
            sequenceOffsetTop = this.getAbsoluteTopOffset(sequenceHolder),
            items = function () {
                var _items = Array.prototype.slice.call(node.querySelectorAll('[data-hook="sequence-item"]'), 0),
                    __items = [];
                _items.forEach(
                    jQuery.proxy(function (el, i, array) {
                        var elHeight = this.getItemHeight(el),
                            backgroundHolder = el.querySelector('[data-hook="item-background"]');
                        el.style.height = elHeight + 'px';
                        backgroundHolder.style.height = this.itemHeight + 'px';
                        if (i < array.length - 1) {
                            sequenceHeight += elHeight;
                        }
                        __items.push({
                            node: el,
                            height: elHeight,
                            topOffset: this.getAbsoluteTopOffset(el.querySelector('.txt-holder')) - (i == array.length - 1 ? 0 : this.topOffsetShift),
                            backgroundHolder: backgroundHolder,
                        });
                    }, this)
                );
                return __items;
            }.call(this),
            h = this.itemHeight,
            sequenceObject = {
                sequenceBlock: node,
                sequenceHolder: sequenceHolder,
                sequenceHolderTopOffset: sequenceOffsetTop,
                sequenceHeight: sequenceHeight,
                items: items,
                started: false,
                prevBackgroundColor: '',
            };
        this.sequenceObjects.push(sequenceObject);

        this.scrollCb();
        return true;
    };

    SequenceController.prototype.getItemHeight = function (el) {
        var txtBlock = el.querySelector("[data-hook='item-text']"),
            backgroundHolder = el.querySelector("[data-hook='item-background']");
        st = el.style;
        var computedTop = parseFloat(getComputedStyle(txtBlock).top);
        txtBlock.style.top = computedTop + 'px';
        var totalHeight = Math.max(txtBlock.clientHeight + computedTop, this.itemHeight);
        return totalHeight;
    };

    SequenceController.prototype.fixTextBlocksPosition = function (node) {
        txtBlocks = Array.prototype.slice.call(node.querySelectorAll('[data-hook="item-text"]'), 0);
        txtBlocks.forEach(function (el, i, array) {
            var backgroundSibling = el.parentNode.querySelector("[data-hook='item-background']");
            backgroundSibling.style.top = '-' + el.clientHeight + 'px';
        });
    };

    SequenceController.prototype.unergisterBlock = function (node) {
        for (var i = 0, l = this.sequenceObjects.length, index = null; i < l; i++) {
            if (this.sequenceObjects[i].sequenceBlock === node) {
                index = i;
                break;
            }
        }
        if (index !== null) {
            this.sequenceObjects.splice(index, 1);
            return true;
        }
        return false;
    };
    /**
     * @param {HTMLElement} el
     * @returns {Number|number}
     */
    SequenceController.prototype.getAbsoluteTopOffset = function (el) {
        var topOffset = el.offsetTop;
        el = el.offsetParent;
        while (el != null) {
            topOffset += el.offsetTop;
            el = el.offsetParent;
        }
        return topOffset;
    };
    /**
     * @param {Boolean} direction
     * 1 - from top to bottom
     * 0 - from bottom to top
     */
    SequenceController.prototype.processSequence = function (sequenceObject) {
        if (sequenceObject.started == false) {
            sequenceObject.prevBackgroundColor = document.body.style.backgroundColor;
            document.body.style.backgroundColor = 'rgb(0, 0, 0)';
            sequenceObject.started = true;
        }
        var sequenceBlock = sequenceObject.sequenceBlock,
            sequenceHolder = sequenceObject.sequenceHolder,
            sequenceItems = sequenceObject.items,
            currentItemIndex = null,
            node,
            backgroundHolder,
            backgroundHolderStyle,
            textBlock,
            opacity;
        for (var i = 0, l = sequenceItems.length, nodeRect, txtBlockRect; i < l; i++) {
            (node = sequenceItems[i].node), (txtBlockRect = node.querySelector('.txt-holder'));
            nodeRect = node.getBoundingClientRect();
            if (
                nodeRect.top < this.itemTransitionTop &&
                nodeRect.bottom < nodeRect.height + this.itemTransitionTop &&
                nodeRect.bottom > this.itemTransitionTop
            ) {
                currentItemIndex = i;
                break;
            }
        }
        if (currentItemIndex == null) {
            return;
        }
        opacity = nodeRect.top / this.itemTransitionTop;
        if (opacity > 1) {
            opacity = 1;
        } else {
            if (opacity < 0) {
                opacity = 0;
            }
        }
        for (var i = 0, l = sequenceItems.length; i < l; i++) {
            (node = sequenceItems[i].node), (backgroundHolderStyle = sequenceItems[i].backgroundHolder.style);
            if (backgroundHolderStyle.position != 'fixed') {
                backgroundHolderStyle.position = 'fixed';
            }
            if (i == currentItemIndex) {
                /* transitted already */
                backgroundHolderStyle.opacity = 1 - opacity;
                node.querySelector('.txt-holder').style.opacity = 1 - opacity;
            } else {
                if (i == currentItemIndex - 1) {
                    backgroundHolderStyle.opacity = opacity;
                    node.querySelector('.txt-holder').style.opacity = opacity;
                } else {
                    backgroundHolderStyle.opacity = 0;
                    node.querySelector('.txt-holder').style.opacity = 0;
                }
            }
        }
    };

    SequenceController.prototype.stopSequence = function (sequenceObject) {
        if (sequenceObject.started == false) {
            return;
        }
        sequenceObject.items.forEach(function (el, i, array) {
            el.backgroundHolder.style.position = 'relative';
            el.backgroundHolder.style.display = 'block';
            el.backgroundHolder.style.opacity = 1;
        });
        document.body.style.backgroundColor = sequenceObject.prevBackgroundColor;
        sequenceObject.started = false;
    };

    SequenceController.prototype.scrollCb = function () {
        var scrollTop = $(window).scrollTop();
        for (var i = 0, l = this.sequenceObjects.length, sO, top; i < l; i++) {
            sO = this.sequenceObjects[i];
            var boundingRect = sO.sequenceHolder.getBoundingClientRect();
            if (boundingRect.top < 0 && boundingRect.bottom > 0 && boundingRect.bottom > boundingRect.height - sO.sequenceHeight - 100) {
                this.processSequence(sO);
            } else {
                this.stopSequence(sO);
            }
        }
    };

    SequenceController.prototype.setScrollCb = function () {
        this._scrollCb = jQuery.proxy(this.scrollCb, this); /*.bind(this);*/

        /* $(window).scroll(this._scrollCb); */
        $(window).bind('scroll', t_throttle(this._scrollCb, 200));
    };

    window.sequenceController = new SequenceController();
})(jQuery);

function t_onFuncLoadVideo(okFunc) {
    if (typeof $.fn.videoBG  === 'function') {
        okFunc();
    } else {
        setTimeout(function checkFuncExist() {
            if (typeof $.fn.videoBG === 'function') {
                console.log(3);
                okFunc();
                return;
            }
            if (document.readyState === 'complete' && typeof $.fn.videoBG !== 'function') {
                throw new Error('$.fn.videoBG' + ' is undefined');
            }
            setTimeout(checkFuncExist, 100);
        });
    }
}
