import { useEffect, useState } from "react";
export const LaptopList = () => {
  const [elements, setElements] = useState({ data: [] });
  const [search, setSearch] = useState("");
  const [company, setCompany] = useState("none");
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5001/protocol/laptops?company=${company}`)
      .then((response) => response.json())
      .then((el) => el.map((item) => ({ ...item, visible: true })))
      .then((data) => {
        setElements({ data });
      });
  }, [company]);

  useEffect(() => {
    setElements((prev) => ({
      ...prev,
      data: prev.data.map((element) => {
        element.visible =
          element.model.includes(search) ||
          element.serial_number.includes(search);
        return element;
      }),
    }));
  }, [search]);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

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
              checked={isChecked}
              onChange={handleCheckboxChange}
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
          {elements.data?.map((element) => {
            if (!element.visible) return null;
            return (
              <tr key={element.id}>
                <td>{element.id}</td>
                <td>{element.model}</td>
                <td>{element.serial_number}</td>
                <td>{element.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
