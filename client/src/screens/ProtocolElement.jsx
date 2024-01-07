import classes from "./Home.module.css";
import { useParams } from "react-router-dom";
export const ProtocolElement = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Protokół nr. {id}</h1>
      <table id="protocolTable" className="table table-striped text-center">
        <thead className="thead-dark">
          <tr>
            <th>Company</th>
            <th>Model</th>
            <th>Serial Number</th>
            <th>Last Name</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>

      <div>
        <button
          className="btn btn-primary"
          onclick="window.location.href = '/protocol/gen/{{ protocol_id }}/receiving'"
        >
          Generuj protokół odbiorczy
        </button>
      </div>

      <div>
        <button
          className="btn btn-primary"
          onclick="window.location.href = '/protocol/gen/{{ protocol_id }}/delivery'"
        >
          Generuj protokół zdawczy
        </button>
      </div>

      <div>
        <button
          className="btn btn-primary"
          onclick="showModalWithOptions('{{ protocol_id }}')"
        >
          Podglad protokołów
        </button>
      </div>

      <div className="container">
        <div className="upload-form">
          <form
            action="/protocol/upload/{{ protocol_id }}/receiving/9"
            method="post"
            enctype="multipart/form-data"
          >
            <div className="input-group mb-3">
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="receiving-file"
                  name="file"
                  onchange="updateFileNameLabel('receiving-file')"
                />
                <label className="custom-file-label" for="receiving-file">
                  Wgraj protokol odbiorczy
                </label>
              </div>
              <div className="input-group-append">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Upload"
                />
              </div>
            </div>
          </form>
        </div>

        <div className="upload-form">
          <form
            id="uploadForm"
            method="post"
            enctype="multipart/form-data"
            onsubmit="return beforeSubmit(event)"
          >
            <div className="input-group mb-3">
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="delivery-file"
                  name="file"
                  onchange="updateFileNameLabel('delivery-file')"
                />
                <label className="custom-file-label" for="delivery-file">
                  Wgraj protokol dostawczy
                </label>
              </div>
              <div className="input-group-append">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Upload"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
