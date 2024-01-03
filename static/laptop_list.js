// lisining for click event on the button
document.querySelectorAll(".dropdown-item").forEach((item) => {
  item.addEventListener("click", function () {
    const selectedValue = this.getAttribute("data-value");
    updateTable(selectedValue);
    console.log("Selected value:", selectedValue);
  });
});

document
  .getElementById("flexSwitchCheckDefault")
  .addEventListener("change", function () {
    if (this.checked) {
      console.log("Switch is checked");
    } else {
      console.log("Switch is unchecked");
    }
  });

//API connection
function getLaptops() {
  let api_get = "";

  if (document.getElementById("flexSwitchCheckDefault").checked) {
    api_get = "/laptops/list/get/1";
  } else {
    api_get = "/laptops/list/get/0";
  }
  console.log(api_get);

  return fetch(api_get)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching laptop list:", error);
      throw error;
    });
}
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

function updateTable(company) {
  const table = document.querySelector(".table");

  getLaptops()
    .then((data) => {
      let result = [];

      if (company == "all") {
        result = data;
      } else {
        result = data.filter((item) => item.company === company);
      }

      const tbody = table.querySelector("tbody");
      tbody.innerHTML = "";

      result.forEach((item) => {
        const row = tbody.insertRow(-1);

        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);

        const link = document.createElement("a");
        link.href = "/laptop/panel/" + item.id;
        link.textContent = item.id;
        cell1.appendChild(link);

        cell2.textContent = item.model;
        cell3.textContent = item.serial_number;
        cell4.textContent = item.status;
      });

      console.log("Filtered laptop list:", result);
      return result;
    })
    .catch((error) => {
      console.error("Error in updateTable:", error);
    });
}
