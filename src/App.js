import React, { useState } from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import FormularioPaciente from "./components/FormularioPaciente";
import Login from "./components/Login";
import Principal from "./components/Principal";
import "./App.css";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Controla si el usuario está autenticado
    const [user, setUser] = useState(null); // Guarda el nombre del usuario

    const handleLogin = (username) => {
        setIsAuthenticated(true); // Marca al usuario como autenticado
        setUser(username); // Guarda el nombre del usuario
    };

    const handleLogout = () => {
        setIsAuthenticated(false); // Marca al usuario como no autenticado
        setUser(null); // Limpia el nombre del usuario
    };

    return (
        <div className="App">
            <nav className="nav-bar">
                <ul className="nav-list">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link">Principal</NavLink>
                    </li>
                    {!isAuthenticated ? (
                        <li className="nav-item">
                            <NavLink to="/login" className="nav-link">Iniciar Sesión</NavLink>
                        </li>
                    ) : (
                        <>
                            <li className="nav-item">
                                <NavLink to="/formulario" className="nav-link">Formulario Paciente</NavLink>
                            </li>
                            <li className="nav-item">
                                <button onClick={handleLogout} className="nav-link logout-btn">Cerrar Sesión</button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Principal />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route
                    path="/formulario"
                    element={
                        isAuthenticated ? (
                            <FormularioPaciente />
                        ) : (
                            <div>No autorizado. Por favor, inicia sesión.</div>
                        )
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
