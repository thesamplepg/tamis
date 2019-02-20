
    // change the header depends on scroll

    const scrollHandler = (e) => {
        const y = window.scrollY;
        const header = $('header');

        if(y > 0) header.style.background = 'rgba(0, 0, 0, 0.767)';
        else header.style.background = 'rgba(0, 0, 0, 0.363)';
    }

    window.addEventListener('scroll', scrollHandler);

    // scroll to content

    $('.order').addEventListener('click', (e) => {
        e.preventDefault();
        const offset = $('.content-container').offsetTop - 100;

        window.scrollTo({top: offset, behavior: 'smooth'});
    });

    //toggle quiz window

    const quizForm = $('.quiz-form');

    $('.quiz-btn').addEventListener('click', (e) => {
        quizForm.style.top = '50%';
    });

    $('.close').addEventListener('click', (e) => {
        quizForm.style.top = '-150%';
    });

    //close message

    const showedMessage = $('.quized-message');

    if(showedMessage) {
        setTimeout(() => {
            showedMessage.classList.add('hide-message');
        }, 5000);
    }

    // send quiz

    $('.quiz-form input[type=submit]').addEventListener('click', (e) => {

        const text = $('.quiz-form textarea').value;
        const phone = $('.quiz-form input[type=number]').value;
        const messageBlock = $('.message-block');

        let message = '';

        if(text.length < 20) {
            message = 'Текст должен состоять не менее из 20 символов.';
        } else if (phone.length < 10) {
            message = 'Номер телефона должен состоять не менее из 10 цифр.'
        } 

        const showMessage = (messageToShow) => {
            messageBlock.innerHTML = messageToShow;
            messageBlock.style.display = 'block';
        }

        if(message.length > 0) {
            showMessage(message);
        } else {
            messageBlock.style.display = 'none';
            sendData('/quiz', {text, phone})
                .then(({quiz}) => {
                    if(quiz == 'success') {
                        window.location.reload()
                    } else {
                        showMessage('Что то пошло не так, повторите позже');
                    }
                })
                .catch(err => console.log(err));
        }

        e.preventDefault();

    }); 
    
// create order

    const items = $('.content').children;
    const orderWindow = $('.order-content');
    const orderTitle = $('.order-content .title');
    const orderCost = $('.order-content .cost');
    const orderImg = $('.order-content .img-section');

    for(let i = 0; i < items.length; i++) {
        const item = items[i];

        const getData = (attr) => item.getAttribute(attr); 
        
        const data = {
            title: getData('data-title'),
            cost: getData('data-cost'),
            img: getData('data-img'),
            id: getData('data-id')
        }

        items[i].addEventListener('click', () => chooseOrderHandler(data));
    }

    const chooseOrderHandler = (item) => {
        orderTitle.textContent = item.title;
        orderCost.textContent = item.cost + ' СОМ';
        orderImg.style.background = `url('${item.img}') center center / cover`;
        showOrderWindow();
    }

    const showOrderWindow = () => {
        orderWindow.style.top = '0%';
    }

    const hideOrderWindow = () => {
        orderWindow.style.top = '-150%';
    }

    $('.close-order').addEventListener('click', hideOrderWindow);