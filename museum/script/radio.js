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
    filterEvents(`${filter}`);
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