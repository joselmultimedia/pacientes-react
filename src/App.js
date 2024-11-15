// App.js
import React from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import FormularioPaciente from './components/FormularioPaciente';
import Principal from './components/Principal';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav className="nav-bar">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">Principal</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/formulario" className="nav-link">Formulario Paciente</NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/formulario" element={<FormularioPaciente />} />
      </Routes>
    </div>
  );
}

export default App;
