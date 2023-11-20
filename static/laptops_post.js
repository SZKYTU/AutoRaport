const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const serialNumber = document
    .getElementById("serial_number")
    .value.toUpperCase();
  const model = document.getElementById("model").value.toUpperCase();
  const coment = document.getElementById("coment").value;
  const company = document.getElementById("company").value;
  const status = document.getElementById("status").value;

  const data = {
    serial_number: serialNumber,
    model: model,
    coment: coment,
    company: company,
    status: status,
  };

  fetch("/laptops/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "success") {
        console.log("Success:", data);
        alert("Equipment added successfully!");
      } else if (data.message === "laptopExist") {
        console.log("Laptop already exists:", data);
        Swal.fire({
          icon: "info",
          title: "Laptop already exists!",
          text: "Equipment already exists in the database and is available.",
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error adding equipment!");
    });
});
