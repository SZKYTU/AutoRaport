const showPopup = () => {
  Swal.fire({
    title: "Czu chcesz usunąć tego laptopa z bazy danych?",
    showDenyButton: true,
    confirmButtonText: "Potwierdź",
    denyButtonText: "Anuluj",
  }).then((result) => {
    if (result.isConfirmed) {
      console.log("applay");
    } else if (result.isDenied) {
      console.log("cancel");
    }
  });
};

const LaptopDelete = (laptop_id) => {
  fetch("/laptop/delete/" + laptop_id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => console.log("Success:", data))
    .catch((error) => console.error("Error:", error));
};
