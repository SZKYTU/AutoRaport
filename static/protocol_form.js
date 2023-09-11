const showModalWithOptions = (id) => {
  const url = `/protocol/status/${id}`;

  let receivingStatus;
  let deliveryStatus;

  function fetchDataAndReturnArray(url) {
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const receivingStatus = data[0].receiving_status;
        const deliveryStatus = data[0].delivery_status;
        return [receivingStatus, deliveryStatus];
      })
      .catch((error) => {
        console.error("Błąd:", error);
        throw error;
      });
  }

  const test = fetchDataAndReturnArray(url).then((resultArray) => {
    receivingStatus = resultArray[0];
    deliveryStatus = resultArray[1];
    return receivingStatus, deliveryStatus;
  });
  console.log(test);

  // const focusDenyValue = false;

  const options = {
    showDenyButton: true,
    showConfirmButton: true,
    title: "Podgląd protokołów",
    confirmButtonText: "Pobierz protokół odbiorczy",
    denyButtonText: "Pobierz protokół zdawczy",
  };

  options.showDenyButton = deliveryStatus;
  console.log(test.deliveryStatus);
  options.showConfirmButton = receivingStatus;
  console.log(receivingStatus);

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
