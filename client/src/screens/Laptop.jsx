import classes from "./Home.module.css";
export const Laptop = () => {
  return (
    <div className="container">
      <div className="text-center mb-4">
        <h1 className="d-inline-block align-middle me-3">Dodawanie Sprzętu</h1>
        <a href="/laptop/list" className="btn btn-outline-primary align-middle">
          Zobacz baze sprzętu
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8c7b7b"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
          </svg>
        </a>
      </div>

      <form>
        <div className="mb-3">
          <label className="form-label" htmlFor="serial_number">
            Numer Seryjnyr:
          </label>
          <input
            type="text"
            id="serial_number"
            name="serial_number"
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="model">
            Model:
          </label>
          <input
            type="text"
            id="model"
            name="model"
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="comment">
            Komentarz:
          </label>
          <input
            type="text"
            id="coment"
            name="coment"
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="company">
            Spółka/Firma:
          </label>
          <select id="company" name="company" className="form-select">
            <option value="None">None</option>
            <option value="TelForceOne">TelForceOne</option>
            <option value="MpTech">MpTech</option>
            <option value="Teletorium">Teletorium</option>
            <option value="R2">R2</option>
            <option value="Momi">Momi</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="status">
            Status:
          </label>
          <select id="status" name="status" className="form-select">
            <option value="New">Nowy</option>
            <option value="Used">Uszkodzony</option>
          </select>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Zatwierdz Sprzet
          </button>
        </div>
      </form>
    </div>
  );
};
