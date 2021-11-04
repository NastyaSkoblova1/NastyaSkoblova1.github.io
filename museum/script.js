document.addEventListener('DOMContentLoaded', function(event) { 
    const user = document.querySelector('.user');
    user.addEventListener('click', toggleModal);

    const closeBtn = document.querySelector('.modal__close');
    closeBtn.addEventListener('click', toggleModal);

    document.addEventListener('keydown', (event) => {
        var key = event.key;
        if (key === 'Escape' || key === 'Esc' || key === 27) {
            toggleModal();
        }
    });
});

const trapFocus = (element) => {
    const prevFocusableElement = document.activeElement;
    const focusableEls = Array.from(
        element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), input:not([disabled])')
    );
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];
    let currentFocus = null;

    firstFocusableEl.focus();
    currentFocus = firstFocusableEl;

    const handleFocus = e => {
        e.preventDefault();
        if (focusableEls.includes(e.target)) {
            currentFocus = e.target;
        } else {
            if (currentFocus === firstFocusableEl) {
                lastFocusableEl.focus();
            } else {
                firstFocusableEl.focus();
            }
            currentFocus = document.activeElement;
        }
    };

    document.addEventListener('focus', handleFocus, true);

    return {
        onClose: () => {
            document.removeEventListener('focus', handleFocus, true);
            prevFocusableElement.focus();
        }
    };
};

const toggleModal = ((e) => {
    const modalWrapper = document.querySelector('.modal__wrapper');
    if (modalWrapper.style.display === 'none') {
        modalWrapper.style.display = 'block';
        trapped = trapFocus(modalWrapper);
    } else {
        modalWrapper.style.display = 'none';
        trapped.onClose();
    }
})