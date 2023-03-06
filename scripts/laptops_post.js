const form = document.getElementById('add-laptop-form');
form.addEventListener('submit', event => {
    event.preventDefault();
    const data = {
        serial_number: form.elements['serial_number'].value,
        model: form.elements['model'].value,
        cement: form.elements['cement'].value,
        company: form.elements['company'].value,
        status: form.elements['status'].value,
    };
    fetch('/laptops', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
            form.reset();
        })
        .catch(error => {
            console.error('There was a problem adding the laptop:', error);
        });
});
