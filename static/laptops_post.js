const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const serialNumber = document.getElementById('serial_number').value;
    const model = document.getElementById('model').value;
    const coment = document.getElementById('coment').value;
    const company = document.getElementById('company').value;
    const status = document.getElementById('status').value;

    const data = {
        serial_number: serialNumber,
        model: model,
        coment: coment,
        company: company,
        status: status
    };

    fetch('/laptops/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Equipment added successfully!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error adding equipment!');
        });
});
