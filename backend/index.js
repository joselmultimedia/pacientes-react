// backend/index.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");

const app = express();
const PORT = 5000;

// Configurar CORS para todas las solicitudes sin encabezados de autorización
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type"
}));

// Middleware para manejar JSON en solicitudes
app.use(express.json());

// Prueba de conexión a la base de datos
db.query("SELECT 1", (err, result) => {
    if (err) {
        console.error("Error en la conexión a la base de datos:", err);
        return;
    }
    console.log("Conexión a la base de datos establecida correctamente.");
});

// Ruta para agregar un paciente sin imagen
app.post("/api/pacientes", (req, res) => {
    const { nombre, apellido, celular, mail, dni, fecha_ingreso, tratamiento, valor_sesion, observacion } = req.body;

    console.log("Datos recibidos para insertar paciente:", req.body); // Depuración

    const sql = "INSERT INTO pacientes (nombre, apellido, celular, mail, dni, fecha_ingreso, tratamiento, valor_sesion, observacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    db.query(sql, [nombre, apellido, celular, mail, dni, fecha_ingreso, tratamiento, valor_sesion, observacion], (err, result) => {
        if (err) {
            console.error("Error al insertar paciente en la base de datos:", err.message);
            return res.status(500).json({ error: "Error al insertar paciente en la base de datos." });
        }
        
        console.log("Paciente agregado correctamente:", result.insertId); // Depuración
        res.json({ message: "Paciente agregado correctamente" });
    });
});

// Ruta para buscar pacientes
app.get("/api/pacientes", (req, res) => {
    const search = req.query.search;

    console.log("Término de búsqueda recibido:", search); // Depuración

    if (!search) {
        console.log("Error: No se envió un término de búsqueda");
        return res.status(400).json({ error: "Se requiere un término de búsqueda" });
    }

    const sql = `
        SELECT * FROM pacientes
        WHERE nombre LIKE ? OR apellido LIKE ? OR dni LIKE ?
    `;
    const searchTerm = `%${search}%`;

    console.log("Ejecutando consulta SQL:", sql); // Depuración
    console.log("Parámetros de búsqueda:", [searchTerm, searchTerm, searchTerm]); // Depuración

    db.query(sql, [searchTerm, searchTerm, searchTerm], (err, results) => {
        if (err) {
            console.error("Error al realizar la búsqueda en la base de datos:", err.message);
            return res.status(500).json({ error: "Error al realizar la búsqueda en la base de datos" });
        }
        
        console.log("Resultados de la búsqueda:", results); // Depuración
        res.json(results);
    });
});

// Sirve los archivos estáticos de la aplicación React
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Ruta para manejar cualquier otro request no definido
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
