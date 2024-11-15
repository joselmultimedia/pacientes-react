// backend/index.js
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = 5000;

// Configurar CORS
app.use(cors({ origin: "http://localhost:3000" }));

// Middleware para manejar JSON en solicitudes
app.use(express.json());

// Prueba de conexión
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

    const sql = "INSERT INTO pacientes (nombre, apellido, celular, mail, dni, fecha_ingreso, tratamiento, valor_sesion, observacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    db.query(sql, [nombre, apellido, celular, mail, dni, fecha_ingreso, tratamiento, valor_sesion, observacion], (err, result) => {
        if (err) {
            console.error("Error al insertar paciente en la base de datos:", err.message);
            return res.status(500).json({ error: "Error al insertar paciente en la base de datos." });
        }
        res.json({ message: "Paciente agregado correctamente" });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
