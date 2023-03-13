const form = document.querySelector('#myForm');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const l_name = document.querySelector('#nazwisko').value;
    const company = document.querySelector('#firma').value;
    const laptop = document.querySelector('#laptop').value;

    const url = `/protocol/users?nazwisko=${l_name}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const select = document.querySelector('#usersList');
            select.innerHTML = '';
            data.forEach(user => {
                const option = document.createElement('option');
                option.value = user.id;
                option.textContent = `${user.imie} ${user.nazwisko}`;
                select.appendChild(option);
            });
        })
        .catch(error => console.error(error));
});
