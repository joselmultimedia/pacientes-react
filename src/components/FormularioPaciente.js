// src/FormularioPaciente.js
import React, { useState } from "react";
import axios from "axios";
import './FormularioPaciente.css';

function FormularioPaciente() {
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        celular: "",
        mail: "",
        dni: "",
        fecha_ingreso: "",
        tratamiento: "",
        valor_sesion: "",
        observacion: "",
    });

    const [showSearch, setShowSearch] = useState(false); // Estado para controlar la visibilidad del campo de búsqueda
    const [searchTerm, setSearchTerm] = useState("");    // Estado para almacenar el valor de búsqueda
    const [searchResults, setSearchResults] = useState([]); // Estado para almacenar los resultados de búsqueda
    const [loading, setLoading] = useState(false); // Estado para indicar carga durante la búsqueda

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log("Campo modificado:", e.target.name, "Nuevo valor:", e.target.value); // Depuración
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        console.log("Término de búsqueda actualizado:", e.target.value); // Depuración
    };

    const handleSearchClick = () => {
        setShowSearch(!showSearch); // Alterna la visibilidad del campo de búsqueda
        console.log("Campo de búsqueda visible:", !showSearch); // Depuración
    };

    // Función para manejar la búsqueda
    const handleSearch = async () => {
        console.log("Iniciando búsqueda con término:", searchTerm); // Depuración
        setLoading(true); // Activar estado de carga
        try {
            const response = await axios.get(`http://localhost:5000/api/pacientes?search=${searchTerm}`);
            if (response.data) {
                console.log("Respuesta de búsqueda recibida:", response.data); // Depuración
                setSearchResults(response.data);
            } else {
                console.warn("No se recibieron resultados de búsqueda.");
            }
        } catch (error) {
            console.error("Error al buscar pacientes:", error);
            alert("Error al realizar la búsqueda");
        } finally {
            setLoading(false); // Desactivar estado de carga
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Datos del formulario enviados:", formData); // Depuración
        try {
            const response = await axios.post("http://localhost:5000/api/pacientes", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 200) {
                console.log("Respuesta al agregar paciente:", response.data); // Depuración
                alert(response.data.message);
            } else {
                console.warn("La solicitud fue completada, pero la respuesta no fue exitosa.");
            }
        } catch (error) {
            console.error("Error al agregar paciente:", error);
            alert("Error al agregar el paciente");
        }
    };

    return (
        <div>
            <h2>Agregar Paciente</h2>
            
            {/* Ícono de lupa para mostrar el campo de búsqueda */}
            <div className="search-container">
                <button onClick={handleSearchClick} className="search-icon">
                    🔍 {/* Puedes reemplazar este emoji con un ícono o imagen */}
                </button>
                {showSearch && (
                    <div>
                        <input 
                            type="text" 
                            placeholder="Buscar por nombre, apellido o DNI"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="search-input"
                        />
                        <button onClick={handleSearch} disabled={loading}>
                            {loading ? "Buscando..." : "Buscar"}
                        </button>
                    </div>
                )}
            </div>

            {/* Listado de resultados de búsqueda */}
            {searchResults.length > 0 && (
                <div className="search-results">
                    <h3>Resultados de búsqueda:</h3>
                    <ul>
                        {searchResults.map((paciente) => (
                            <li key={paciente.id}>
                                {paciente.nombre} {paciente.apellido} - DNI: {paciente.dni}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <label>Nombre:</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

                <label>Apellido:</label>
                <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} required />

                <label>Celular:</label>
                <input type="text" name="celular" value={formData.celular} onChange={handleChange} required />

                <label>Mail:</label>
                <input type="email" name="mail" value={formData.mail} onChange={handleChange} required />

                <label>DNI:</label>
                <input type="text" name="dni" value={formData.dni} onChange={handleChange} required />

                <label>Fecha de Ingreso:</label>
                <input type="date" name="fecha_ingreso" value={formData.fecha_ingreso} onChange={handleChange} required />

                <label>Tratamiento:</label>
                <textarea name="tratamiento" value={formData.tratamiento} onChange={handleChange} />

                <label>Valor de la Sesión:</label>
                <input type="number" name="valor_sesion" value={formData.valor_sesion} onChange={handleChange} required />

                <label>Observación:</label>
                <textarea name="observacion" value={formData.observacion} onChange={handleChange} />

                <button type="submit">Agregar Paciente</button>
            </form>
        </div>
    );
}

export default FormularioPaciente;
