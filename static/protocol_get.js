const up_arrow =
  '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>';

const down_arrow =
  '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>';

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
        <td>${protocol.delivery_status ? up_arrow : down_arrow}</td>
        <td>${protocol.receiving_status ? up_arrow : down_arrow}</td> // :TODO
      `;
      tableBody.appendChild(row);
    });
  })
  .catch((error) => console.error(error));
