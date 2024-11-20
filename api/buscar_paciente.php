<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "website_kinedb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$search = $_GET['search'];
$searchTerm = "%" . $search . "%";

$sql = "SELECT * FROM pacientes WHERE nombre LIKE ? OR apellido LIKE ? OR dni LIKE ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $searchTerm, $searchTerm, $searchTerm);
$stmt->execute();

$result = $stmt->get_result();
$pacientes = [];

while ($row = $result->fetch_assoc()) {
    $pacientes[] = $row;
}

echo json_encode($pacientes);

$stmt->close();
$conn->close();
?>
