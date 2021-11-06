function workWithSlider() {
    var Carousel = function (domNode) {
        this.domNode = domNode;

        this.items = [];

        this.firstItem = null;
        this.lastItem = null;
        this.currentDomNode = null;
        this.liveRegionNode = null;
        this.currentItem = null;

        this.rotate = true;
        this.hasFocus = false;
        this.hasHover = false;
    };

    Carousel.prototype.init = function () {
        var elems;
        var elem;
        var button;
        var items;
        var item;
        var imageLinks;
        var i;

        this.liveRegionNode = this.domNode.querySelector('.carousel-items');

        items = this.domNode.querySelectorAll('.carousel-item');

        for (i = 0; i < items.length; i++) {
            item = new CarouselItem(items[i], this);

            item.init();
            this.items.push(item);

            if (!this.firstItem) {
                this.firstItem = item;
                this.currentDomNode = item.domNode;
            }
            this.lastItem = item;

            imageLinks = items[i].querySelectorAll('.carousel-image a');

            if (imageLinks && imageLinks[0]) {
                imageLinks[0].addEventListener('focus', this.handleImageLinkFocus.bind(this));
                imageLinks[0].addEventListener('blur', this.handleImageLinkBlur.bind(this));
            }
        }

        elems = document.querySelectorAll('.carousel .controls button');
        for (i = 0; i < elems.length; i++) {
            elem = elems[i];
            button = new CarouselButton(elem, this);
            button.init();
        }

        this.currentItem = this.firstItem;
    };

    Carousel.prototype.setSelected = function (newItem, moveFocus) {
        if (typeof moveFocus != 'boolean') {
            moveFocus = false;
        }

        for (var i = 0; i < this.items.length; i++) {
            this.items[i].hide();
        }

        this.currentItem = newItem;
        this.currentItem.show();

        if (moveFocus) {
            this.currentItem.domNode.focus();
        }
    };

    Carousel.prototype.setSelectedToPreviousItem = function (currentItem, moveFocus) {
        if (typeof moveFocus != 'boolean') {
            moveFocus = false;
        }

        var index;

        if (typeof currentItem !== 'object') {
            currentItem = this.currentItem;
        }

        if (currentItem === this.firstItem) {
            this.setSelected(this.lastItem, moveFocus);
        } else {
            index = this.items.indexOf(currentItem);
            this.setSelected(this.items[index - 1], moveFocus);
        }
    };

    Carousel.prototype.setSelectedToNextItem = function (currentItem, moveFocus) {
        if (typeof moveFocus != 'boolean') {
            moveFocus = false;
        }

        var index;

        if (typeof currentItem !== 'object') {
            currentItem = this.currentItem;
        }

        if (currentItem === this.lastItem) {
            this.setSelected(this.firstItem, moveFocus);
        } else {
            index = this.items.indexOf(currentItem);
            this.setSelected(this.items[index + 1], moveFocus);
        }
    };

    Carousel.prototype.updateRotation = function () {
        if (!this.hasHover && !this.hasFocus) {
            this.rotate = true;
            this.liveRegionNode.setAttribute('aria-live', 'off');
        } else {
            this.rotate = false;
            this.liveRegionNode.setAttribute('aria-live', 'polite');
        }
    };

    Carousel.prototype.handleImageLinkFocus = function () {
        this.liveRegionNode.classList.add('focus');
    };

    Carousel.prototype.handleImageLinkBlur = function () {
        this.liveRegionNode.classList.remove('focus');
    };

    /* Initialize Carousel Tablists */

    window.addEventListener('load', function () {
        var carousels = document.querySelectorAll('.carousel');

        for (var i = 0; i < carousels.length; i++) {
            var carousel = new Carousel(carousels[i]);
            carousel.init();
        }
    }, false);

    var CarouselItem = function (domNode, carouselObj) {
        this.domNode = domNode;
        this.carousel = carouselObj;
    };

    CarouselItem.prototype.init = function () {
        this.domNode.addEventListener('focusin', this.handleFocusIn.bind(this));
        this.domNode.addEventListener('focusout', this.handleFocusOut.bind(this));
    };

    CarouselItem.prototype.hide = function () {
        this.domNode.classList.remove('active');
    };

    CarouselItem.prototype.show = function () {
        this.domNode.classList.add('active');
    };

    var CarouselButton = function (domNode, carouselObj) {
        this.domNode = domNode;
        this.carousel = carouselObj;
        this.direction = 'previous';

        if (this.domNode.classList.contains('next')) {
            this.direction = 'next';
        }
    };

    CarouselButton.prototype.init = function () {
        this.domNode.addEventListener('click', this.handleClick.bind(this));
        this.domNode.addEventListener('focus', this.handleFocus.bind(this));
        this.domNode.addEventListener('blur', this.handleBlur.bind(this));
    };

    CarouselButton.prototype.changeItem = function () {
        if (this.direction === 'previous') {
            this.carousel.setSelectedToPreviousItem();
        } else {
            this.carousel.setSelectedToNextItem();
        }
    };

    CarouselButton.prototype.handleClick = function (event) {
        this.changeItem();
    };

    CarouselButton.prototype.handleFocus = function (event) {
        this.carousel.hasFocus = true;
        this.carousel.updateRotation();
    };

    CarouselButton.prototype.handleBlur = function (event) {
        this.carousel.hasFocus = false;
        this.carousel.updateRotation();
    };

    CarouselItem.prototype.handleFocusIn = function (event) {
        this.carousel.hasFocus = true;
        this.carousel.updateRotation();
    };

    CarouselItem.prototype.handleFocusOut = function (event) {
        this.carousel.hasFocus = false;
        this.carousel.updateRotation();
    };
}