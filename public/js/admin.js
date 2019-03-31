const trashHandler = (e) => {
    if (e.target.parentElement.classList.contains('trash')) {

        const elementToRemove = e.target.parentElement.parentElement;
        const id = elementToRemove.getAttribute('data-id');
        const type = elementToRemove.getAttribute('type');

        sendData('/admin/remove', {
                id,
                type
            })
            .then(data => {
                if (data.removed) {
                    elementToRemove.remove();
                }
            })
            .catch(err => console.log(err));
    }
}

document.addEventListener('click', trashHandler);

// show product by id

const input = $('#inputForId');
const product = $('.product');

const showProduct = (data) => {
    const productTitle = $('.product-title');
    const productImg = $('.product-img');
    const productCost = $('.product-cost');
    const productDescription = $('.product-description');

    productTitle.textContent = data.title;
    productDescription.textContent = data.description;
    productImg.style.background = "url('" + data.img + "') center center / cover";
    productCost.textContent = data.cost + ' СОМ';
    product.style.display = 'block';
    //url('${data.img}') center center / cover;
}

const inputHandler = (e) => {
    const id = input.value;
    const product = $('.product');
    const productError = $('.product-error')

    sendData('/admin/check', {
            id
        })
        .then(data => {
            if (data.check) {
                productError.style.display = 'none';
                showProduct(data);
            } else {
                product.style.display = 'none';
                productError.style.display = 'block';
            }
        })
        .catch(err => {
            product.style.display = 'none';
            productError.style.display = 'block';
        });
}

input.addEventListener('input', inputHandler);