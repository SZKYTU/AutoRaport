const showModalWithOptions = (id) => {
  const url = `/protocol/status/${id}`;
  const resultList = [];

  const test = fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.hasOwnProperty("delivery_status")) {
        resultList.push(data.delivery_status);
      }
      if (data.hasOwnProperty("receiving_status")) {
        resultList.push(data.receiving_status);
      }

      console.log(resultList);
    })
    .catch((error) => {
      console.error("Błąd podczas pobierania danych:", error);
    });

  const options = {
    showDenyButton: true,
    showConfirmButton: true,
    title: "Podgląd protokołów",
    confirmButtonText: "Pobierz protokół odbiorczy",
    denyButtonText: "Pobierz protokół zdawczy",
  };

  options.showConfirmButton = resultList[1];
  console.log(test);
  options.showDenyButton = resultList[0];

  Swal.fire(options).then((result) => {
    if (result.isConfirmed) {
      window.location.href = `/protocol/download/${id}/receiving`;
    } else if (result.isDenied) {
      window.location.href = `/protocol/download/${id}/delivery`;
    }
  });
};

const protocolTable = (id) => {
  const protocol_id = id;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `/protocol/${protocol_id}`);
  xhr.onload = () => {
    if (xhr.status === 200) {
      const protocol = JSON.parse(xhr.responseText);
      const tableBody = document.querySelector("#protocolTable tbody");
      const row = document.createElement("tr");
      row.innerHTML = `
            <td>${protocol.laptop.company}</td>
            <td>${protocol.laptop.model}</td>
            <td>${protocol.laptop.serial_number}</td>
            <td>${protocol.protocol.last_name}</td>
            <td>${protocol.protocol.date}</td>
          `;
      tableBody.appendChild(row);
    } else {
      console.error(xhr.statusText);
    }
  };
  xhr.send();
};
