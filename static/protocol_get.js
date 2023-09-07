const dot_svg =
  '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#3db5ff}</style><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/></svg>';

fetch("/protocols/show")
  .then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  })
  .then((protocols) => {
    const tableBody = document.querySelector("#protocolsTable tbody");
    protocols.forEach((protocol) => {
      const deliveryStatus = Boolean(protocol.delivery_status);
      const receivingStatus = Boolean(protocol.receiving_status);

      const row = document.createElement("tr");
      row.innerHTML = `
        <td><a href="/protocol/view/${protocol.id}">${protocol.id}</a></td>
        <td>${protocol.last_name}</td>
        <td>${protocol.date}</td>
        <td>${receivingStatus ? dot_svg : " "}</td>
        <td>${deliveryStatus ? dot_svg : " "}</td>
      `;
      tableBody.appendChild(row);
    });
  })
  .catch((error) => console.error(error));
