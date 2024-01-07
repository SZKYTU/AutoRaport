import classes from "./Home.module.css";
import { ConfirmationModal } from "../components/ConfirmationModal.jsx";
export const Home = () => {
  return (
    <div className={classes.container}>
      <h1 className="mb-4">Protokoły</h1>
      <ConfirmationModal />
      <div className="d-flex flex-column align-items-center">
        <a href="/laptop" className={`btn btn-primary ${classes.btn}`}>
          Dodaj laptopa
        </a>
        <a href="/laptop/list" className={`btn btn-primary ${classes.btn}`}>
          Baza sprzętu
        </a>
        <a href="/protocol" className={`btn btn-primary ${classes.btn}`}>
          Utwórz wpis
        </a>
        <a href="/protocols/list" className={`btn btn-primary ${classes.btn}`}>
          Lista protokołów
        </a>
      </div>
    </div>
  );
};
