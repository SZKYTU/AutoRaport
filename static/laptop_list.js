// lisining for click event on the button
document.querySelectorAll(".dropdown-item").forEach((item) => {
  item.addEventListener("click", function () {
    const selectedValue = this.getAttribute("data-value");
    filterLaptops(selectedValue);
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
  return fetch("/laptops/list/get")
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
    })
    .catch((error) => {
      console.error("Error in anotherFunction:", error);
    });
}
