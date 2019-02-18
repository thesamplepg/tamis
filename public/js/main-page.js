
const $ = (identifier) => document.querySelector(identifier); 

const scrollHandler = (e) => {
    const y = window.scrollY;
    const header = $('header');

    if(y > 0) header.style.background = 'rgba(0, 0, 0, 0.767)';
    else header.style.background = 'rgba(0, 0, 0, 0.363)';
}

window.addEventListener('scroll', scrollHandler);


const responsiveNav = $('.responsive-nav');

$('.burger').addEventListener('click', (e) => {
    responsiveNav.classList.add('show');
});

responsiveNav.addEventListener('click', (e) => {
    if(!e.target.classList.contains('list-item')) {
        responsiveNav.classList.remove('show');
    }
});

