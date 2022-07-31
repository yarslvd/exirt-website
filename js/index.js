const burger = document?.querySelector('.burger_menu');
const nav = document?.querySelector('nav');
const body = document.body;
const navItems = nav?.querySelectorAll('a');
const anchors = document.querySelectorAll('a[href*="#"]');

for(let anchor of anchors) {
    if(anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const anchorID = anchor.getAttribute('href');
            document.querySelector(anchorID).scrollIntoView({
                behavior: 'smooth', block: 'start'
            })
        })
    }
}

burger?.addEventListener('click', () => {
    body.classList.toggle('disable--scroll')
    burger?.classList.toggle('burger--active');
    nav?.classList.toggle('nav--visible');
});

navItems.forEach(el => {
    el.addEventListener('click', () => {
        body.classList.remove('disable--scroll')
        burger?.classList.remove('burger--active');
        nav?.classList.remove('nav--visible')
    });
});