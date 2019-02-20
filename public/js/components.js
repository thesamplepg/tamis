const $ = (identifier) => document.querySelector(identifier); 

const sendData = (url, data) => {
    console.log(url, data);
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