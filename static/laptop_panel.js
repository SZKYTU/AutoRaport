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
