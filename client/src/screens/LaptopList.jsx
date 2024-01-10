import classes from "./Home.module.css";
import { useEffect, useState } from "react";
export const LaptopList = () => {
  const [elements, setElements] = useState([]);
  const [search, setSearch] = useState("");
  const [company, setCompany] = useState("none");

  useEffect(() => {
    fetch(`http://localhost:5001/protocol/laptops?${company}`)
      .then((response) => response.json())
      .then((data) => {
        setElements(data);
      });
    // setElements([
    //   { id: 1, model: "asus", sn: "1112", status: "status", visible: true },
    //   { id: 2, model: "macbook", sn: "321", status: "status", visible: true },
    //   { id: 3, model: "lenovo", sn: "123", status: "status", visible: true },
    // ]);
  }, [company]);

  useEffect(() => {
    setElements((prev) =>
      prev.map((element) => {
        element.visible =
          element.model.includes(search) || element.sn.includes(search);
        return element;
      })
    );
  }, [search]);

  return (
    <div className="container">
      <div className="navbar navbar-light bg-light justify-content-between">
        <div id="filtering">
          <select
            id="select"
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => setCompany(e.target.value)}
            value={company}
          >
            <option value="none">Wybierz spółke</option>
            <option value="all">Wszystkie</option>
            <option value="TelForceOne">TelForceOne</option>
            <option value="MpTech">MpTech</option>
            <option value="Teletorium">Teletorium</option>
            <option value="Momi">Momi</option>
            <option value="R2">R2</option>
          </select>

          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              Pokaż wszystkie laptopy (nierekomendowane)
            </label>
          </div>
        </div>
        <form className="form-inline">
          <div className="form-group">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Model</th>
            <th scope="col">S/N</th>
            <th scope="col">Status</th>
          </tr>
        </thead>

        <tbody id="laptops-table-body">
          {elements.map((element) => {
            if (!element.visible) return null;
            return (
              <tr key={element.id}>
                <td>{element.id}</td>
                <td>{element.model}</td>
                <td>{element.sn}</td>
                <td>{element.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
