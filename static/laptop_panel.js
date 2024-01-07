const showPopup = (laptop_id) => {
  Swal.fire({
    title: "Czy chesz zutylizowac tego laptopa?",
    showDenyButton: true,
    confirmButtonText: "Potwierdź",
    denyButtonText: "Anuluj",
  }).then((result) => {
    if (result.isConfirmed) {
      LaptopDelete(laptop_id);
    } else if (result.isDenied) {
      console.log("cancel");
    }
  });
};

const LaptopDelete = (laptop_id) => {
  fetch("/laptop/utilization/" + laptop_id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => console.log("Success:", data))
    .catch((error) => console.error("Error:", error));
};

const update_laptop_company = (laptop_id) => {
  Swal.fire({
    title: "Wybierz spółkę",
    input: "select",
    inputOptions: {
      TelForceOne: "TelForceOne",
      MpTech: "MpTech",
      Momi: "Momi",
      Teletorium: "Teletorium",
      R2: "R2",
    },
    inputPlaceholder: "Wybierz",
    showCancelButton: true,
    inputValidator: (value) => {
      return new Promise((resolve) => {
        if (value !== "") {
          resolve();
          update_laptop_request(laptop_id, value);
        } else {
          resolve("Musisz wybrać opcję!");
        }
      });
    },
  });
};

const update_laptop_request = (laptop_id, company) => {
  const url = "/laptop/update/" + laptop_id + "/" + company;
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => console.log("Success:", data))
    .catch((error) => console.error("Error:", error));
};

const openSweetAlert = () => {
  Swal.fire({
    html: '<div id="list"></div>',
    title: "Wyszukaj",
    input: "text",
    inputLabel: "Wpisz zapytanie",
    showCancelButton: true,
    confirmButtonText: "Szukaj",
    didOpen: () => {
      // Nasłuchiwanie na zmiany w polu tekstowym
      Swal.getInput().addEventListener("input", (e) => {
        const value = e.target.value;
        // Tutaj wywołaj funkcję, która wyśle zapytanie do bazy danych
        if (value.length > 3) {
          // Przykład minimalnej długości zapytania
          queryDatabase(value);
        }
      });
    },
  });
};

// Funkcja wysyłająca zapytanie do bazy danych
const queryDatabase = async (query) => {
  try {
    // Tutaj używaj swojego API lub endpointu
    const response = await fetch("/protocol/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: query }),
    });
    const data = await response.json();
    // Wyświetl wyniki
    displayResults(data);
  } catch (error) {
    console.error("Error:", error);
    displayResults(error);
  }
};

// Funkcja wyświetlająca wyniki pod polem tekstowym
const displayResults = (data) => {
  const list = document.getElementById("list");
  list.innerHTML = JSON.stringify(data);
  console.log(data);
};
