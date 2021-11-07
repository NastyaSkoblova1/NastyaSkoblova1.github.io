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