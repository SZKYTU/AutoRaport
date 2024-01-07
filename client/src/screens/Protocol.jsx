import classes from "./Home.module.css";
export const Protocol = () => {
  return (
    <div className="container">
      <h1 className="my-5">Protokół</h1>
      <h2>Użytkownicy</h2>
      <form id="user-form">
        <div className="form-group">
          <label htmlFor="domain_login">Login domenowy:</label>
          <input
            type="text"
            className="form-control"
            id="domain_login"
            name="domain_login"
          />
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <button type="submit" className="btn btn-primary">
            Szukaj
          </button>
        </div>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Login domenowy</th>
            <th>Firma</th>
            <th>Zaznacz</th>
          </tr>
        </thead>
        <tbody id="user-table-body"></tbody>
      </table>

      <h2>Laptopy</h2>
      <form id="laptop-form">
        <div className="form-group">
          <label htmlFor="laptop-company">Firma:</label>
          <select
            className="form-control"
            id="laptop-company"
            name="laptop-company"
          >
            <option value="None">None</option>
            <option value="TelForceOne">TelForceOne</option>
            <option value="MpTech">MpTech</option>
            <option value="Teletorium">Teletorium</option>
            <option value="R2">R2</option>
            <option value="Momi">Momi</option>
          </select>
        </div>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Numer seryjny</th>
            <th>Model</th>
            <th>Komentarz</th>
            <th>Firma</th>
            <th>Status</th>
            <th>Zaznacz</th>
          </tr>
        </thead>
        <tbody id="laptop-table-body"></tbody>
      </table>

      <div className="form-group form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="charger"
          name="charger"
        />
        <label className="form-check-label" htmlFor="charger">
          Ładowarka
        </label>
      </div>

      <div className="form-group form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="mouse_keyboard_status"
          name="mouse_keyboard_status"
        />
        <label className="form-check-label" htmlFor="mouse_keyboard_status">
          Mysz i klawiatura
        </label>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <button id="generate" className="btn btn-primary">
          Generuj
        </button>
      </div>
    </div>
  );
};
