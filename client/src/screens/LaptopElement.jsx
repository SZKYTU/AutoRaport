import classes from "./Home.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ConfirmationModal } from "../components/ConfirmationModal.jsx";
export const LaptopElement = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isUtilizationModalOpen, setIsUtilizationModalOpen] = useState(false);
  useEffect(() => {
    // fetch(`http://localhost:5000/laptops/${id}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setData(data);
    //   });
    setData({
      id,
      sn: "123",
      model: "asus",
      company: "tel",
      status: "status",
    });
  }, [id]);
  return (
    <div className="container">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          Zarządzanie Laptopem ID: {data.id}
        </div>
        <div className="card-body">
          <h5 className="card-title mb-4">Dane Laptopa</h5>
          <div className="mb-3">
            <label className="form-label">
              <strong>Numer seryjny:</strong>
            </label>
            <p className="form-control bg-light">{data.sn}</p>
          </div>
          <div className="mb-3">
            <label className="form-label">
              <strong>Model:</strong>
            </label>
            <p className="form-control bg-light">{data.model}</p>
          </div>
          <div className="mb-3">
            <label className="form-label">
              <strong>Spółka:</strong>
            </label>
            <p className="form-control bg-light">{data.company}</p>
          </div>
          <div className="mb-3">
            <label className="form-label">
              <strong>Aktualny Stan:</strong>
            </label>
            <p className="form-control bg-light">{data.status}</p>
          </div>

          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <button className="btn btn-secondary" type="button">
              Zmień Spółkę
            </button>
            <button
              className="btn btn-danger me-md-2"
              type="button"
              onClick={() => setIsUtilizationModalOpen(true)}
            >
              Utylizacja Laptopa
            </button>
            <button className="btn btn-danger me-md-2" type="button">
              Przypisz do pracownika
            </button>
          </div>
        </div>
      </div>
      <ConfirmationModal
        title={"Utylizacja laptopa"}
        description={"Czy chesz zutylizowac tego laptopa?"}
        onConfirm={() => {
          fetch(`http://localhost:5000/laptops/${id}`, {
            method: "DELETE",
          }).then(() => {
            setIsUtilizationModalOpen(false);
          });
        }}
        isOpen={isUtilizationModalOpen}
        onCancel={() => setIsUtilizationModalOpen(false)}
        toggleOpen={() => setIsUtilizationModalOpen(!isUtilizationModalOpen)}
      />
    </div>
  );
};
