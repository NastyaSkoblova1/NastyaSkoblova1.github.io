document.addEventListener('DOMContentLoaded', function () {
    workWithTabs();
    addCarousel()

    var filter = new RadioGroup(document.getElementById('filter__list'));
    filter.init();

    const user = document.querySelector('.user');
    user.addEventListener('click', function () {
        openDialog('dialog', this)
    });

    document.querySelector('.modal__close').addEventListener('click', function () {
        closeDialog(this);
    });

    document.querySelector('.modal__form').addEventListener('submit', function () {
        closeDialog(this);
    });

    document.querySelector('.search').addEventListener('submit', function (e) {
        e.preventDefault();
    });

    var isSubmit = false;
    document.querySelector('.footer__form').addEventListener('submit', function (e) {
        e.preventDefault();
        if (!isSubmit) {
            let formStatusWrapper = document.createElement('div');
            formStatusWrapper.className = 'form__status-wrapper';
            formStatusWrapper.innerHTML = '<img src="assets/i-success.svg"><span>Вы успешно подписались на рассылку!</span>'
            document.querySelector('.form__status').appendChild(formStatusWrapper);
            isSubmit = true;
        }
    });
});



function addCarousel() {
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
        var carousel = new Carousel(document.querySelector('.carousel'));
        carousel.init();
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


var aria = aria || {};
aria.Utils = aria.Utils || {};

(function () {

  aria.Utils.IgnoreUtilFocusChanges = false;

  aria.Utils.focusFirstDescendant = function (element) {
    for (var i = 0; i < element.childNodes.length; i++) {
      var child = element.childNodes[i];
      if (aria.Utils.attemptFocus(child) ||
        aria.Utils.focusFirstDescendant(child)) {
        return true;
      }
    }
    return false;
  };

  aria.Utils.attemptFocus = function (element) {
    if (!aria.Utils.isFocusable(element)) {
      return false;
    }
    aria.Utils.IgnoreUtilFocusChanges = true;
    try {
      element.focus();
    } catch (e) {}
    aria.Utils.IgnoreUtilFocusChanges = false;
    return (document.activeElement === element);
  };

  /* Modals can open modals. Keep track of them with this array. */
  aria.OpenDialogList = aria.OpenDialogList || new Array(0);

  aria.getCurrentDialog = function () {
    if (aria.OpenDialogList && aria.OpenDialogList.length) {
      return aria.OpenDialogList[aria.OpenDialogList.length - 1];
    }
  };

  aria.closeCurrentDialog = function () {
    var currentDialog = aria.getCurrentDialog();
    if (currentDialog) {
      currentDialog.close();
      return true;
    }
    return false;
  };

  aria.handleEscape = function (event) {
    var key = event.which || event.keyCode;

    if (key === aria.KeyCode.ESC && aria.closeCurrentDialog()) {
      event.stopPropagation();
    }
  };

  document.addEventListener('keyup', aria.handleEscape);

  aria.Dialog = function (dialogId, focusAfterClosed, focusFirst) {
    this.dialogNode = document.getElementById(dialogId);

    if (typeof focusAfterClosed === 'string') {
      this.focusAfterClosed = document.getElementById(focusAfterClosed);
    } else if (typeof focusAfterClosed === 'object') {
      this.focusAfterClosed = focusAfterClosed;
    } else {
      throw new Error(
        'the focusAfterClosed parameter is required for the aria.Dialog constructor.');
    }

    if (typeof focusFirst === 'string') {
      this.focusFirst = document.getElementById(focusFirst);
    } else if (typeof focusFirst === 'object') {
      this.focusFirst = focusFirst;
    } else {
      this.focusFirst = null;
    }

    // Bracket the dialog node with two invisible, focusable nodes.
    // While this dialog is open, we use these to make sure that focus never
    // leaves the document even if dialogNode is the first or last node.
    var preDiv = document.createElement('div');
    this.preNode = this.dialogNode.parentNode.insertBefore(preDiv, this.dialogNode);
    this.preNode.tabIndex = 0;
    var postDiv = document.createElement('div');
    this.postNode = this.dialogNode.parentNode.insertBefore(postDiv, this.dialogNode.nextSibling);
    this.postNode.tabIndex = 0;

    // If this modal is opening on top of one that is already open,
    // get rid of the document focus listener of the open dialog.
    if (aria.OpenDialogList.length > 0) {
      aria.getCurrentDialog().removeListeners();
    }

    this.addListeners();
    aria.OpenDialogList.push(this);
    this.dialogNode.className = 'default_dialog'; // make visible

    if (this.focusFirst) {
      this.focusFirst.focus();
    } else {
      aria.Utils.focusFirstDescendant(this.dialogNode);
    }

    this.lastFocus = document.activeElement;
  };

  aria.Dialog.prototype.close = function () {
    aria.OpenDialogList.pop();
    this.removeListeners();
    aria.Utils.remove(this.preNode);
    aria.Utils.remove(this.postNode);
    this.dialogNode.className = 'hidden';
    this.focusAfterClosed.focus();
  };

  aria.Dialog.prototype.addListeners = function () {
    document.addEventListener('focus', this.trapFocus, true);
  };

  aria.Dialog.prototype.removeListeners = function () {
    document.removeEventListener('focus', this.trapFocus, true);
  };

  aria.Dialog.prototype.trapFocus = function (event) {
    if (aria.Utils.IgnoreUtilFocusChanges) {
      return;
    }
    var currentDialog = aria.getCurrentDialog();
    if (currentDialog.dialogNode.contains(event.target)) {
      currentDialog.lastFocus = event.target;
    } else {
      aria.Utils.focusFirstDescendant(currentDialog.dialogNode);
      currentDialog.lastFocus = document.activeElement;
    }
  };

  window.openDialog = function (dialogId, focusAfterClosed, focusFirst) {
    new aria.Dialog(dialogId, focusAfterClosed, focusFirst);
  };

  window.closeDialog = function (closeButton) {
    aria.getCurrentDialog().close();
  };
}());


aria.KeyCode = {
  BACKSPACE: 8,
  TAB: 9,
  RETURN: 13,
  ESC: 27,
  SPACE: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  DELETE: 46
};

aria.Utils.remove = function (item) {
  if (item.remove && typeof item.remove === 'function') {
    return item.remove();
  }
  if (item.parentNode &&
    item.parentNode.removeChild &&
    typeof item.parentNode.removeChild === 'function') {
    return item.parentNode.removeChild(item);
  }
  return false;
};

aria.Utils.isFocusable = function (element) {
  if (element.tabIndex > 0 || (element.tabIndex === 0 && element.getAttribute('tabIndex') !== null)) {
    return true;
  }

  if (element.disabled) {
    return false;
  }

  switch (element.nodeName) {
    case 'A':
      return !!element.href && element.rel != 'ignore';
    case 'INPUT':
      return element.type != 'hidden' && element.type != 'file';
    case 'BUTTON':
    case 'SELECT':
    case 'TEXTAREA':
      return true;
    default:
      return false;
  }
};


var RadioGroup = function (domNode) {
    this.domNode = domNode;
    this.radioButtons = [];
    this.firstRadioButton = null;
    this.lastRadioButton = null;

};

RadioGroup.prototype.init = function () {
    // initialize pop up menus
    if (!this.domNode.getAttribute('role')) {
        this.domNode.setAttribute('role', 'radiogroup');
    }

    var rbs = this.domNode.querySelectorAll('[role=radio]');

    for (var i = 0; i < rbs.length; i++) {
        var rb = new RadioButton(rbs[i], this);
        rb.init();
        this.radioButtons.push(rb);

        if (!this.firstRadioButton) {
            this.firstRadioButton = rb;
        }
        this.lastRadioButton = rb;
    }
    this.firstRadioButton.domNode.tabIndex = 0;
};

RadioGroup.prototype.setChecked = function (currentItem) {
    for (var i = 0; i < this.radioButtons.length; i++) {
        var rb = this.radioButtons[i];
        rb.domNode.setAttribute('aria-checked', 'false');
        rb.domNode.tabIndex = -1;
    }
    currentItem.domNode.setAttribute('aria-checked', 'true');
    currentItem.domNode.tabIndex = 0;
    currentItem.domNode.focus();
};

RadioGroup.prototype.setCheckedToPreviousItem = function (currentItem) {
    var index;

    if (currentItem === this.firstRadioButton) {
        this.setChecked(this.lastRadioButton);
    } else {
        index = this.radioButtons.indexOf(currentItem);
        this.setChecked(this.radioButtons[index - 1]);
    }
};

RadioGroup.prototype.setCheckedToNextItem = function (currentItem) {
    var index;

    if (currentItem === this.lastRadioButton) {
        this.setChecked(this.firstRadioButton);
    } else {
        index = this.radioButtons.indexOf(currentItem);
        this.setChecked(this.radioButtons[index + 1]);
    }
};

var RadioButton = function (domNode, groupObj) {
    this.domNode = domNode;
    this.radioGroup = groupObj;

    this.keyCode = Object.freeze({
        return: 13,
        space: 32,
        enter: 13,
        end: 35,
        home: 36,
        left: 37,
        up: 38,
        right: 39,
        down: 40
    });
};

RadioButton.prototype.init = function () {
    this.domNode.addEventListener('keydown', this.handleKeydown.bind(this));
    this.domNode.addEventListener('click', this.handleClick.bind(this));
    this.domNode.addEventListener('focus', this.handleFocus.bind(this));
    this.domNode.addEventListener('blur', this.handleBlur.bind(this));

};

/* EVENT HANDLERS */

RadioButton.prototype.handleKeydown = function (event) {
    var flag = false;

    switch (event.keyCode) {
        case this.keyCode.space:
        case this.keyCode.enter:
        case this.keyCode.return:
            this.radioGroup.setChecked(this);
            activateTab(event.target)
            flag = true;
            break;

        case this.keyCode.up:
            this.radioGroup.setCheckedToPreviousItem(this);
            flag = true;
            break;

        case this.keyCode.down:
            this.radioGroup.setCheckedToNextItem(this);
            flag = true;
            break;

        case this.keyCode.left:
            this.radioGroup.setCheckedToPreviousItem(this);
            flag = true;
            break;

        case this.keyCode.right:
            this.radioGroup.setCheckedToNextItem(this);
            flag = true;
            break;

        default:
            break;
    }

    if (flag) {
        event.stopPropagation();
        event.preventDefault();
    }
};

RadioButton.prototype.handleClick = function (event) {
    var tab = event.target;
    this.radioGroup.setChecked(this);
    activateTab(tab, false);
};

RadioButton.prototype.handleFocus = function () {
    this.domNode.classList.add('focus');
};

RadioButton.prototype.handleBlur = function () {
    this.domNode.classList.remove('focus');
};


function activateTab(tab) {
    var filter = tab.getAttribute('data-event-date');
    Array.from(document.querySelectorAll('.filter')).forEach((tab) => {
        tab.classList.remove('filter_active');
    });
    filterEvents(filter);
};

function filterEvents(filter) {
    const eventsArr = Array.from(document.querySelectorAll('.event'));
    if (filter === 'all') {
        eventsArr.forEach((item) => {
            item.classList.remove('event_hide');
        });
    } else {
        eventsArr.forEach((item) => {
            if (item.getAttribute('data-event-date') !== filter) {
                item.classList.add('event_hide');
            } else {
                item.classList.remove('event_hide');
            }
        });
    }
}



function workWithTabs() {
    var tablist = document.querySelectorAll('[role="tablist"]')[0];
    var tabs;
    var panels;

    generateArrays();

    function generateArrays() {
        tabs = document.querySelectorAll('[role="tab"]');
        panels = document.querySelectorAll('[role="tabpanel"]');
    };

    // For easy reference
    var keys = {
        end: 35,
        home: 36,
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        delete: 46,
        enter: 13,
        space: 32
    };

    // Add or subtract depending on key pressed
    var direction = {
        37: -1,
        38: -1,
        39: 1,
        40: 1
    };

    // Bind listeners
    for (i = 0; i < tabs.length; ++i) {
        addListeners(i);
    };

    function addListeners(index) {
        tabs[index].addEventListener('click', clickEventListener);
        tabs[index].addEventListener('keydown', keydownEventListener);
        tabs[index].addEventListener('keyup', keyupEventListener);

        // Build an array with all tabs (<button>s) in it
        tabs[index].index = index;
    };

    // When a tab is clicked, activateTab is fired to activate it
    function clickEventListener(event) {
        var tab = event.target;
        activateTab(tab, false);
    };

    // Handle keydown on tabs
    function keydownEventListener(event) {
        var key = event.keyCode;

        switch (key) {
            case keys.end:
                event.preventDefault();
                // Activate last tab
                focusLastTab();
                break;
            case keys.home:
                event.preventDefault();
                // Activate first tab
                focusFirstTab();
                break;

                // Up and down are in keydown
                // because we need to prevent page scroll >:)
            case keys.up:
            case keys.down:
                determineOrientation(event);
                break;
        };
    };

    // Handle keyup on tabs
    function keyupEventListener(event) {
        var key = event.keyCode;

        switch (key) {
            case keys.left:
            case keys.right:
                determineOrientation(event);
                break;
            case keys.enter:
            case keys.space:
                activateTab(event.target);
                break;
        };
    };

    // When a tablists aria-orientation is set to vertical,
    // only up and down arrow should function.
    // In all other cases only left and right arrow function.
    function determineOrientation(event) {
        var key = event.keyCode;
        var vertical = tablist.getAttribute('aria-orientation') == 'vertical';
        var proceed = false;

        if (vertical) {
            if (key === keys.up || key === keys.down) {
                event.preventDefault();
                proceed = true;
            };
        } else {
            if (key === keys.left || key === keys.right) {
                proceed = true;
            };
        };

        if (proceed) {
            switchTabOnArrowPress(event);
        };
    };

    // Either focus the next, previous, first, or last tab
    // depending on key pressed
    function switchTabOnArrowPress(event) {
        var pressed = event.keyCode;

        if (direction[pressed]) {
            var target = event.target;
            if (target.index !== undefined) {
                if (tabs[target.index + direction[pressed]]) {
                    tabs[target.index + direction[pressed]].focus();
                } else if (pressed === keys.left || pressed === keys.up) {
                    focusLastTab();
                } else if (pressed === keys.right || pressed == keys.down) {
                    focusFirstTab();
                };
            };
        };
    };

    // Activates any given tab panel
    function activateTab(tab, setFocus) {
        setFocus = setFocus || true;
        // Deactivate all other tabs
        deactivateTabs();

        // Remove tabindex attribute
        tab.removeAttribute('tabindex');

        // Set the tab as selected
        tab.setAttribute('aria-selected', 'true');

        // Get the value of aria-controls (which is an ID)
        var controls = tab.getAttribute('aria-controls');

        // Remove hidden attribute from tab panel to make it visible
        document.getElementById(controls).removeAttribute('hidden');

        // Set focus when required
        if (setFocus) {
            tab.focus();
        };
    };

    // Deactivate all tabs and tab panels
    function deactivateTabs() {
        for (t = 0; t < tabs.length; t++) {
            tabs[t].setAttribute('tabindex', '-1');
            tabs[t].setAttribute('aria-selected', 'false');
        };

        for (p = 0; p < panels.length; p++) {
            panels[p].setAttribute('hidden', 'hidden');
        };
    };

    // Make a guess
    function focusFirstTab() {
        tabs[0].focus();
    };

    // Make a guess
    function focusLastTab() {
        tabs[tabs.length - 1].focus();
    };
}