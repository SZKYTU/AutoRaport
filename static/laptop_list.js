document.querySelectorAll(".dropdown-item").forEach((item) => {
  item.addEventListener("click", function () {
    const selectedValue = this.getAttribute("data-value");
    console.log(`Zaznaczono opcję: ${selectedValue}`);
  });
});
