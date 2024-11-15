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

    const [showSearch, setShowSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchClick = () => {
        setShowSearch(!showSearch);
    };

    // Función para manejar la búsqueda
    const handleSearch = async () => {
        console.log("Iniciando búsqueda con término:", searchTerm); // Depuración
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost/pacientes/kinesiomv/api/buscar_paciente.php?search=${searchTerm}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error("Error al buscar pacientes:", error);
            alert("Error al realizar la búsqueda");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Datos del formulario enviados:", formData); // Depuración
        try {
            const response = await axios.post("http://localhost/pacientes/kinesiomv/api/insert_paciente.php", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            alert(response.data.message || "Paciente agregado correctamente");
        } catch (error) {
            console.error("Error al agregar paciente:", error);
            alert("Error al agregar el paciente");
        }
    };

    return (
        <div>
            <h2>Agregar Paciente</h2>
            <div className="search-container">
                <button onClick={handleSearchClick} className="search-icon">🔍</button>
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
