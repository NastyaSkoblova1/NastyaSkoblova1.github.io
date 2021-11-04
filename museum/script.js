function openModal() {
    const modalLayer = document.querySelector('.modal__layer');
    modalLayer.classList.add('open');
}

function closeModal() {
    const modalLayer = document.querySelector('.modal__layer');
    modalLayer.classList.remove('open');
}


document.addEventListener('DOMContentLoaded', function(event) { 
    const user = document.querySelector('.user');
    user.addEventListener('click', toggleModal);

    const closeBtn = document.querySelector('.modal__close');
    closeBtn.addEventListener('click', toggleModal);

    document.addEventListener('keydown', (event) => {
        var key = event.key || event.keyCode;
        if (key === 'Escape' || key === 'Esc' || key === 27) {
            closeModal();
        }
    });
});