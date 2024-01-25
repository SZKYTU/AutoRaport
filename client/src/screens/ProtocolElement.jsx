// import classes from "./Home.module.css";
import { useParams } from "react-router-dom";

export const ProtocolElement = () => {
  const { id } = useParams();
  return (
    <div className="container my-4">
      <div className="text-center">
        <h2>Panel Protokołu id: {id}</h2>
      </div>
      <div className="row">
        <div className="col">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID Protokołu</th>
                <th>Firma</th>
                <th>Model Sprzętu</th>
                <th>Numer Seryjny</th>
                <th>Imię i Nazwisko</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>{"/* Tutaj umieść wiersze z danymi protokołu */"}</tbody>
          </table>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <button className="btn btn-primary me-2">
            Generuj protokół zdawczy
          </button>
          <button className="btn btn-secondary me-2">
            Generuj protokół odbiorczy
          </button>
          <button className="btn btn-success">
            Wyświetl dostępne protokoły
          </button>
        </div>
      </div>

      <div className="row my-4">
        <div className="col">
          <input type="file" className="form-control" />
          <button className="btn btn-outline-primary mt-2">
            Wgraj protokół zdawczy
          </button>
        </div>
        <div className="col">
          <input type="file" className="form-control" />
          <button className="btn btn-outline-primary mt-2">
            Wgraj protokół odbiorczy
          </button>
        </div>
      </div>
    </div>
  );
};
