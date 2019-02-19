(function() {
        
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

    //close message

    const showedMessage = $('.quized-message');

    if(showedMessage) {
        setTimeout(() => {
            showedMessage.classList.add('hide-message');
        }, 5000);
    }


    // send operations

    const sendData = (url, data) => {
        return new Promise((resolve, reject) => {
            fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(err => reject(err));
        });
    }


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
    
})();