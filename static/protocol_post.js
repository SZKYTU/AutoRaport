const company = document.querySelector("#laptop-company");
const userForm = document.querySelector('#user-form');
const userTableBody = document.querySelector('#user-table-body');
const laptopForm = document.querySelector('#laptop-form');
const laptopTableBody = document.querySelector('#laptop-table-body');

const devices = []; 

userForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const domainLogin = document.querySelector('#domain_login').value;

    const url = `/protocol/users?domain_login=${domainLogin}`;

    fetch(url)
        .then(response => response.json())
        .then(users => {
            userTableBody.innerHTML = '';

            users.forEach(user => {
                const row = document.createElement('tr');
                const idCell = document.createElement('td');
                const nameCell = document.createElement('td');
                const lastNameCell = document.createElement('td');
                const domainLoginCell = document.createElement('td');
                const companyCell = document.createElement('td');
                const checkboxCell = document.createElement('td');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';


                idCell.textContent = user.id;
                nameCell.textContent = user.name;
                lastNameCell.textContent = user.l_name;
                domainLoginCell.textContent = user.domain_login;
                companyCell.textContent = user.company;

                checkboxCell.appendChild(checkbox);

                row.appendChild(idCell);
                row.appendChild(nameCell);
                row.appendChild(lastNameCell);
                row.appendChild(domainLoginCell);
                row.appendChild(companyCell);
                row.appendChild(checkboxCell);

                userTableBody.appendChild(row);
            });
        })
        .catch(error => console.error(error));
});

company.addEventListener('change', (event) => {
    event.preventDefault();

    const url = `/protocol/laptops?company=${company.value}`;

    fetch(url)
        .then(response => response.json())
        .then(laptops => {
            laptopTableBody.innerHTML = '';

            laptops.forEach(laptop => {
                const row = document.createElement('tr');
                const idCell = document.createElement('td');
                const serialNumberCell = document.createElement('td');
                const modelCell = document.createElement('td');
                const commentCell = document.createElement('td');
                const companyCell = document.createElement('td');
                const statusCell = document.createElement('td');
                const checkboxCell = document.createElement('td');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.addEventListener("change", event => {
                    console.log("cokolwiek", event.target.checked)
                    if (event.target.checked) devices.push(laptop.id)
                    else devices.filter(id => id !== laptop.id) 
                })
               

                idCell.textContent = laptop.id;
                serialNumberCell.textContent = laptop.serial_number;
                modelCell.textContent = laptop.model;
                commentCell.textContent = laptop.comment;
                companyCell.textContent = laptop.company;
                statusCell.textContent = laptop.status;

                checkboxCell.appendChild(checkbox);

                row.appendChild(idCell);
                row.appendChild(serialNumberCell);
                row.appendChild(modelCell);
                row.appendChild(commentCell);
                row.appendChild(companyCell);
                row.appendChild(statusCell);
                row.appendChild(checkboxCell);

                laptopTableBody.appendChild(row);
            });
        })
        .catch(error => console.error(error));
});
