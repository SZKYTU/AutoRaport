const form = document.querySelector('#myForm');
const table = $('#usersTable').DataTable({
    columns: [
        { title: "ID", data: "id" },
        { title: "Imię", data: "imie" },
        { title: "Nazwisko", data: "nazwisko" }
    ]
});

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
            table.clear().rows.add(data).draw();
        })
        .catch(error => console.error(error));
});
