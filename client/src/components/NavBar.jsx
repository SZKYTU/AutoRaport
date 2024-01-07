import React from "react";

export const NavBar = () => {
  return (
    <nav className="navbar navbar-dark bg-light navbar-left text-center mb-5">
      <a href="/" className="btn btn-custom">
        Strona startowa &#x1F3E0;
      </a>
      <span className="text-dark">|</span>
      <a href="/laptop" className="btn btn-custom">
        Dodaj laptopa &#x1F4BB;
      </a>
      <span className="text-dark">|</span>
      <a href="/protocol" className="btn btn-custom">
        Utwórz wpis &#x270D;
      </a>
      <span className="text-dark">|</span>
      <a href="/protocol/list" className="btn btn-custom">
        Lista protokołów &#x1F4DA;
      </a>
    </nav>
  );
};
