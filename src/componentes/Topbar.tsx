// src/components/Topbar.tsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


export const Topbar: React.FC = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };


  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">SmartSeguro</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/dashboard/asegurados"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Asegurado
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/dashboard/polizas"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Póliza
              </NavLink>
            </li>
          </ul>

          <form className="d-flex" role="search">
            <button className="btn btn-outline-success" onClick={handleLogout}>
            Logout
          </button>
          </form>

        </div>
      </div>
    </nav>
  );
};
