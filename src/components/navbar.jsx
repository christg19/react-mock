import React from 'react';
import '../styles/navbar.css'; // Asegúrate de ajustar la ruta al archivo de estilos

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-logo">Logo</div>
        <ul className="navbar-links">
          <li><a href="/home">Inicio</a></li>
          <li><a href="/client">Clientes</a></li>
          <li><a href="/profile">Perfiles</a></li>
          <li><a href="/product">Productos</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;