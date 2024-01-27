import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const ProtocolElement = () => {
  const [protocolData, setProtocolData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const { id } = useParams();

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

  const take_protocol_info = (protocolId) => {
    fetch(`http://192.168.1.150:5001/protocol/${protocolId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProtocolData(data);
      })
      .catch((error) => console.error("Błąd pobierania:", error));
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
    console.log("wgralem plik");
  };

  const uploadFile = () => {
    if (!selectedFile) {
      console.log("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    fetch("http://192.168.1.150:5001/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    take_protocol_info(id);
  }, [id]);

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
              {protocolData && (
                <tr>
                  <td>{protocolData.protocol.id}</td>
                  <td>{protocolData.laptop.company}</td>
                  <td>{protocolData.laptop.model}</td>
                  <td>{protocolData.laptop.serial_number}</td>
                  <td>{protocolData.protocol.last_name}</td>
                  <td>{protocolData.protocol.date}</td>
                </tr>
              )}
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
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
          />
          <button onClick={uploadFile} className="btn btn-outline-primary mt-2">
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
