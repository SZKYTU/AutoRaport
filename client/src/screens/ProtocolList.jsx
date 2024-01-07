import classes from "./Home.module.css";
import { useEffect, useState } from "react";
export const ProtocolList = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([
      {
        id: 1,
        lastName: "asus",
        date: "1112",
        receiving: "status",
        delivery: "status",
        visible: true,
      },
      {
        id: 2,
        lastName: "macbook",
        date: "321",
        receiving: "status",
        delivery: "status",
        visible: true,
      },
      {
        id: 3,
        lastName: "lenovo",
        date: "123",
        receiving: "status",
        delivery: "status",
        visible: true,
      },
    ]);
  }, []);

  useEffect(() => {
    setData((prev) =>
      prev.map((element) => {
        element.visible =
          element.lastName.includes(search) || element.date.includes(search);
        return element;
      }),
    );
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
          {data.map((element) => {
            if (!element.visible) return null;
            return (
              <tr key={element.id}>
                <td>{element.id}</td>
                <td>{element.lastName}</td>
                <td>{element.date}</td>
                <td>{element.receiving}</td>
                <td>{element.delivery}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
