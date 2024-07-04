timport React, { useState, useEffect } from "react";
import { InfoModal } from "../components/InfoModal.jsx";
import classes from "./Home.module.css";

export const Protocol = () => {
  const [query, setQuery] = useState('');
  const [user, setUser] = useState([]);
  const [laptopCompany, setLaptopCompany] = useState('None');
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [laptopLoading, setLaptopLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedLaptopId, setSelectedLaptopId] = useState(null);
  const [charger, setCharger] = useState(true);
  const [mouseKeyboard, setMouseKeyboard] = useState(true);
  const [laptopBag, setLaptopBag] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    if (query.length >= 4) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await fetch(`http://localhost:5001/protocol/users?domain_login=${query}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();
          setUser(result);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setUser([]);
    }
  }, [query]);

  useEffect(() => {
    if (laptopCompany !== 'None') {
      const fetchLaptops = async () => {
        setLaptopLoading(true);
        try {
          const response = await fetch(`http://localhost:5001/protocol/laptops?company=${laptopCompany}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();
          setLaptops(result);
        } catch (error) {
          console.error('Error fetching laptops:', error);
        } finally {
          setLaptopLoading(false);
        }
      };

      fetchLaptops();
    } else {
      setLaptops([]);
    }
  }, [laptopCompany]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleCompanyChange = (e) => {
    setLaptopCompany(e.target.value);
  };

  const handleUserSelection = (userId) => {
    setSelectedUserId(userId);
  };

  const handleLaptopSelection = (laptopId) => {
    setSelectedLaptopId(laptopId);
  };

  const handleChargerChange = () => {
    setCharger(!charger);
  };

  const handleMouseKeyboardChange = () => {
    setMouseKeyboard(!mouseKeyboard);
  };

  const handleLaptopBagChange = () => {
    setLaptopBag(!laptopBag);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const protocolData = {
    user_id: selectedUserId,
    laptop_id: selectedLaptopId,
    charger: charger,
    mouse_keyboard_status: mouseKeyboard,
    laptop_bag_status: laptopBag
  };

  try {
    const response = await fetch('http://localhost:5001/protocol/return', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(protocolData)
    });

    const data = await response.json();
    if (response.ok) {
      console.log('Success:', data);
      setModalShow(true)
      // window.location.reload()
    } else {
      console.error('Error Response:', data);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

  return (
    <div className="container">
      <h1 className="my-5">Protokół</h1>
      <h2>Użytkownicy</h2>
      <form id="user-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="domain_login">Login domenowy:</label>
          <input
            type="text"
            className="form-control"
            id="domain_login"
            name="domain_login"
            value={query}
            onChange={handleInputChange}
            placeholder="Type to search..."
          />
        </div>
      </form>

      {loading && <p>Loading...</p>}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Login domenowy</th>
            <th>Firma</th>
            <th> </th>
          </tr>
        </thead>
        <tbody id="user-table-body">
          {!loading && user.length > 0 && user.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.l_name}</td>
              <td>{item.domain_login}</td>
              <td>{item.company}</td>
              <td>
                <input 
                  type="radio" 
                  name="selectedUser" 
                  onChange={() => handleUserSelection(item.id)} 
                  checked={selectedUserId === item.id} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Laptopy</h2>
      <form id="laptop-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="laptop-company">Firma:</label>
          <select
            className="form-control"
            id="laptop-company"
            name="laptop-company"
            value={laptopCompany}
            onChange={handleCompanyChange}
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

      {laptopLoading && <p>Loading...</p>}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Numer seryjny</th>
            <th>Model</th>
            <th>Komentarz</th>
            <th>Firma</th>
            <th> </th>
          </tr>
        </thead>
        <tbody id="laptop-table-body">
          {!laptopLoading && laptops.length > 0 && laptops.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.serialNumber}</td>
              <td>{item.model}</td>
              <td>{item.comment}</td>
              <td>{item.company}</td>
              <td>
                <input 
                  type="radio" 
                  name="selectedLaptop" 
                  onChange={() => handleLaptopSelection(item.id)} 
                  checked={selectedLaptopId === item.id} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="form-group form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="charger"
          name="charger"
          checked={charger}
          onChange={handleChargerChange}
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
          checked={mouseKeyboard}
          onChange={handleMouseKeyboardChange}
        />
        <label className="form-check-label" htmlFor="mouse_keyboard_status">
          Mysz i klawiatura
        </label>
      </div>

      <div className="form-group form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="laptop_bag_status"
          name="laptop_bag_status"
          checked={laptopBag}
          onChange={handleLaptopBagChange}
        />
        <label className="form-check-label" htmlFor="laptop_bag_status">
          Torba na laptopa
        </label>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <button id="generate" className="btn btn-primary" onClick={handleSubmit}>
          Generuj
        </button>
      </div>
    </div>
  );
};
