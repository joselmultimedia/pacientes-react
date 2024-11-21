import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Hook para redirigir

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita la recarga de la página
        setError(""); // Limpia errores previos
        try {
            const response = await axios.post(
                "http://localhost/pacientes/kinesiomv/api/login.php",
                { username, password },
                { headers: { "Content-Type": "application/json" } }
            );
            if (response.data.success) {
                onLogin(response.data.user); // Actualiza el estado del usuario
                navigate("/formulario"); // Redirige al formulario de pacientes
            } else {
                setError(response.data.message); // Muestra error en caso de fallo
            }
        } catch (error) {
            setError("Error al conectar con el servidor");
        }
    };

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>Usuario:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label>Contraseña:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
}

export default Login;
