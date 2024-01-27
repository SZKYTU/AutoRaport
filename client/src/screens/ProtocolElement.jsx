// import classes from "./Home.module.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const download_gen_protocol = (protocolId, type) => {
  fetch(`http://192.168.1.150:5001/protocol/gen/${protocolId}/${type}`, {
    method: "GET",
    headers: {
      Accept: "application/pdf",
    },
  })
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `scan-${type}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    })
    .catch((error) => console.error("Błąd pobierania:", error));
};
const [protocolData, setProtocolData] = useState([]);

const take_protocol_info = (protocolId) => {
  fetch(`http://192.168.1.150:5001/protocol/${protocolId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setProtocolData(data);
    })
    .catch((error) => console.error("Błąd pobierania:", error));
};

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
            <tbody>
              {protocolData.map((item, index) => (
                <tr key={index}>
                  <td>{item.protocolId}</td>
                  <td>{item.company}</td>
                  <td>{item.model}</td>
                  <td>{item.serialNumber}</td>
                  <td>{item.name}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <button
            className="btn btn-primary me-2"
            onClick={() => download_gen_protocol(id, "delivery")}
          >
            Generuj protokół zdawczy
          </button>
          <button
            className="btn btn-secondary me-2"
            onClick={() => download_gen_protocol(id, "receiving")}
          >
            Generuj protokół odbiorczy
          </button>
          <button className="btn btn-success">
            {/* TODO: task nr.1 add view serwice */}
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
