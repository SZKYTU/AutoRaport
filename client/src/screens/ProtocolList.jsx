import { useEffect, useState } from "react";
export const ProtocolList = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState({ protocols: [] });

  useEffect(() => {
    fetch(`http://localhost:5001/protocols/show`)
      .then((response) => response.json())
      .then((el) => el.map((item) => ({ ...item, visible: true })))
      .then((protocols) => {
        setData({ protocols });
      });
  }, []);

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      protocols: prev.protocols.map((element) => {
        element.visible =
          element.last_name.includes(search) || element.date.includes(search);
        return element;
      }),
    }));
  }, [search]);

  return (
    <div className="container">
      <h1>Tabela protokołów</h1>
      <input
        className="form-control mb-3"
        id="searchInput"
        type="text"
        placeholder="Szukaj"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <table id="protocolsTable" className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Last Name</th>
            <th>Date</th>
            <th>Odbiorczy</th>
            <th>Zdawczy</th>
          </tr>
        </thead>
        <tbody>
          {data.protocols.map((element) => {
            if (!element.visible) return null;
            return (
              <tr key={element.id}>
                <td>{element.id}</td>
                <td>{element.last_name}</td>
                <td>{element.date}</td>
                <td>{element.delivery_status}</td>
                <td>{element.receiving_status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
