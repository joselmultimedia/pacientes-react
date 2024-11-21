<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000"); // Cambia según el origen de tu frontend
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Detener la ejecución si es una solicitud OPTIONS
    exit(0);
}

session_start();

// Datos de ejemplo para validación (puedes conectarte a una base de datos)
$users = [
    "admin" => "password123",
    "user" => "user123"
];

$data = json_decode(file_get_contents("php://input"), true);
$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

if (isset($users[$username]) && $users[$username] === $password) {
    $_SESSION['user'] = $username;
    echo json_encode(["success" => true, "message" => "Login exitoso", "user" => $username]);
} else {
    echo json_encode(["success" => false, "message" => "Credenciales incorrectas"]);
}
?>
