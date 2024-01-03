// lisining for click event on the button
document.getElementById("select").addEventListener("change", updateTable);

document
  .getElementById("flexSwitchCheckDefault")
  .addEventListener("change", updateTable);

//API connection
const getLaptops = (showall) => {
  const api_get = `/laptops/list/get/${showall ? 1 : 0}`;

  console.log(api_get);

  return fetch(api_get)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching laptop list:", error);
      throw error;
    });
};

// Filter laptops by company
function filterLaptops(company) {
  getLaptops()
    .then((data) => {
      const result = data.filter((item) => item.company === company);
      console.log("Filtered laptop list:", result);

      return result;
    })
    .catch((error) => {
      console.error("Error in anotherFunction:", error);
    });
}

function updateTable() {
  const company = document.getElementById("select").value;
  const showall = document.getElementById("flexSwitchCheckDefault").checked;
  const table = document.querySelector(".table");

  getLaptops(showall)
    .then((data) => {
      const result =
        company === "all"
          ? data
          : data.filter((item) => item.company === company);

      const tbody = table.querySelector("tbody");
      tbody.innerHTML = "";

      result.forEach((item) => {
        const row = tbody.insertRow(-1);

        const link = document.createElement("a");
        link.href = "/laptop/panel/" + item.id;
        link.textContent = item.id;
        row.insertCell(0).appendChild(link);
        row.insertCell(1).textContent = item.model;
        row.insertCell(2).textContent = item.serial_number;
        row.insertCell(3).textContent = item.status;
      });

      console.log("Filtered laptop list:", result);
      return result;
    })
    .catch((error) => {
      console.error("Error in updateTable:", error);
    });
}
