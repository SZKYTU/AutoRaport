const form = document.getElementById('protocol-form');
form.addEventListener('submit', e => {
    e.preventDefault();

    const first_name = form.first_name.value;
    const last_name = form.last_name.value;
    const comment = form.comment.value;

    fetch('/api/protocol', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ first_name, last_name, comment })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert('Protocol submitted successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting the protocol. Please try again later.');
        });
});
