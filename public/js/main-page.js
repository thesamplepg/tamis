
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

const quizForm = $('.quiz-form');

$('.quiz-btn').addEventListener('click', (e) => {
    quizForm.style.top = '50%';
});

$('.close').addEventListener('click', (e) => {
    quizForm.style.top = '-150%';
});


// send operations

const sendData = (url, data) => {
    //send data to backend
}


$('.quiz-form input[type=submit]').addEventListener('click', (e) => {

    const text = $('.quiz-form textarea').value.length;
    const phone = $('.quiz-form input[type=number]').value.length;
    const messageBlock = $('.message-block');

    let message = '';

    if(text < 20) {
        message = 'Текст должен состоять не менее из 20 символов.';
    } else if (phone < 10) {
        message = 'Номер телефона должен состоять не менее из 10 цифр.'
    } 

    if(message.length > 0) {
        messageBlock.innerHTML = message;
        messageBlock.style.display = 'block';
    } 

    e.preventDefault();

});