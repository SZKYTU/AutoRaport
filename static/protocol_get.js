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
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><a href="/protocol/view/${protocol.id}">${protocol.id}</a></td>
        <td>${protocol.last_name}</td>
        <td>${protocol.date}</td>
        <td>${protocol.comment}</td>
      `;
      tableBody.appendChild(row);
    });
  })
  .catch((error) => console.error(error));
