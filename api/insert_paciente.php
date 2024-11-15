<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$servername = "localhost"; // Cambia esto si tienes otro servidor
$username = "root";        // Cambia esto si tienes otro usuario de la base de datos
$password = "";            // Cambia esto si tienes una contraseña
$dbname = "website_kinedb"; // Cambia esto al nombre de tu base de datos

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);

$nombre = $data['nombre'];
$apellido = $data['apellido'];
$celular = $data['celular'];
$mail = $data['mail'];
$dni = $data['dni'];
$fecha_ingreso = $data['fecha_ingreso'];
$tratamiento = $data['tratamiento'];
$valor_sesion = $data['valor_sesion'];
$observacion = $data['observacion'];

$sql = "INSERT INTO pacientes (nombre, apellido, celular, mail, dni, fecha_ingreso, tratamiento, valor_sesion, observacion) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssssis", $nombre, $apellido, $celular, $mail, $dni, $fecha_ingreso, $tratamiento, $valor_sesion, $observacion);

if ($stmt->execute()) {
    echo json_encode(["message" => "Paciente agregado correctamente"]);
} else {
    echo json_encode(["error" => "Error al insertar paciente"]);
}

$stmt->close();
$conn->close();
?>
