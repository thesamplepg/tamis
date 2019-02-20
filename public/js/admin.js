

const trashHandler = (e) => {
    if(e.target.parentElement.classList.contains('trash')) {
        
        const elementToRemove = e.target.parentElement.parentElement; 
        const id = elementToRemove.getAttribute('data-id');
        const type = elementToRemove.getAttribute('type');
       
        sendData('/admin/remove', {id, type})
            .then(data => {
                if(data.removed) {
                    elementToRemove.remove();
                }
            })
            .catch(err => console.log(err));
    }
}

document.addEventListener('click', trashHandler);