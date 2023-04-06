const xhr = new XMLHttpRequest();
xhr.open("GET", "/protocols/show");
xhr.onload = () => {
  if (xhr.status === 200) {
    const protocols = JSON.parse(xhr.responseText);
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
  } else {
    console.error(xhr.statusText);
  }
};
xhr.onerror = () => console.error(xhr.statusText);
xhr.send();
