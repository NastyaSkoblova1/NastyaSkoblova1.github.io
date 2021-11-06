// document.addEventListener('DOMContentLoaded', function(event) { 
//     const user = document.querySelector('.user');
//     user.addEventListener('click', toggleModal);

//     const closeBtn = document.querySelector('.modal__close');
//     closeBtn.addEventListener('click', toggleModal);

//     document.addEventListener('keydown', (event) => {
//         var key = event.key;
//         if (key === 'Escape' || key === 'Esc' || key === 27) {
//             toggleModal();
//         }
//     });

//     var filters = ['all', 'today', 'tomorrow'];
//     filters.forEach(function (filter) {
//         document.querySelector(`.filter[data-event-date="${filter}"]`).addEventListener('click', function() {
//             Array.from(document.querySelectorAll('.filter')).forEach((tab) => {
//                 tab.classList.remove('filter_active');
//             });
//             this.classList.add('filter_active');
//             filterEvents(`${filter}`);
//         });
//     });
// });

// function filterEvents(filter) {
//     const eventsArr = Array.from(document.querySelectorAll('.event'));
//     if (filter === 'all') {
//         eventsArr.forEach((item) => {
//             item.classList.remove('event_hide');
//         });
//     } else {
//         eventsArr.forEach((item) => {
//             if (item.getAttribute('data-event-date') !== filter) {
//                 item.classList.add('event_hide');
//             } else {
//                 item.classList.remove('event_hide');
//             }
//         });
//     }

// }


// const trapFocus = (element) => {
//     const prevFocusableElement = document.activeElement;
//     const focusableEls = Array.from(
//         element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), input:not([disabled])')
//     );
//     const firstFocusableEl = focusableEls[0];
//     const lastFocusableEl = focusableEls[focusableEls.length - 1];
//     let currentFocus = null;

//     firstFocusableEl.focus();
//     currentFocus = firstFocusableEl;

//     const handleFocus = e => {
//         e.preventDefault();
//         if (focusableEls.includes(e.target)) {
//             currentFocus = e.target;
//         } else {
//             if (currentFocus === firstFocusableEl) {
//                 lastFocusableEl.focus();
//             } else {
//                 firstFocusableEl.focus();
//             }
//             currentFocus = document.activeElement;
//         }
//     };

//     document.addEventListener('focus', handleFocus, true);

//     return {
//         onClose: () => {
//             document.removeEventListener('focus', handleFocus, true);
//             prevFocusableElement.focus();
//         }
//     };
// };

// const toggleModal = ((e) => {
//     const modalWrapper = document.querySelector('.modal__wrapper');
//     if (modalWrapper.style.display === 'none') {
//         modalWrapper.style.display = 'block';
//         trapped = trapFocus(modalWrapper);
//     } else {
//         modalWrapper.style.display = 'none';
//         trapped.onClose();
//     }
// })



document.addEventListener('DOMContentLoaded', function () {
    workWithTabs();
    workWithSlider()

    var rg1 = new RadioGroup(document.getElementById('filter__list'));
    rg1.init();

    const user = document.querySelector('.user');
    user.addEventListener('click', function() {
        openDialog('dialog', this)
    });  
});