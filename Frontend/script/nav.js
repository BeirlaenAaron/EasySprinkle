const navSlide = function () {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.sidebar');
    burger.addEventListener('click', () => {
        nav.classList.toggle('sidebar-active');
    });
};

navSlide();