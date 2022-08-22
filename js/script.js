const burger = document?.querySelector('.burger_menu');
const nav = document?.querySelector('nav');
const body = document.body;
const navItems = nav?.querySelectorAll('a');
const anchors = document.querySelectorAll('a[href*="#"]');
const itemsToAnimate = document.querySelectorAll('._animate');
const exirtLogo = document.querySelector('.logo');

if(itemsToAnimate.length > 0) {
    window.addEventListener('scroll', animate());
    function animate() {
        for(let item of itemsToAnimate) {
            const animItemOffset = offset(item).top;

            let animPoint = window.innerHeight - item.offsetHeight / 4;
            if(item.offsetHeight > window.innerHeight) {
                animPoint = window.innerHeight - window.innerHeight / 4;
            }

            if((pageYOffset > animItemOffset - animPoint) && pageYOffset  < (animItemOffset + item.offsetHeight)) {
                item.classList.add('_active');
            }
            else {
                if(!item.classList.contains('_animate-no-hide')){
                    item.classList.remove('_active');
                }
            }
        }
    }
    animate();
}

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
    body.classList.toggle('disable--scroll');
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

exirtLogo.addEventListener('click', () => {
    window.location.reload();
});


function offset(el) {
    const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
}


