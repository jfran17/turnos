<?php
// Datos de conexion
$servername = "localhost";
$username   = "f8000508_turnos";
$password   = "";
$dbname     = "f8000508_turnos";

// Crear conexion
$conn = new mysqli($servername, $username, $password, $dbname);

// Comprobar conexion
if ($conn->connect_error) {
    die("Error al conectar: " . $conn->connect_error);
} 

$sql = "SELECT consultorio, profesional, fecha, hora, nombre, telefono, email FROM turnos";
$result = $conn->query($sql);

$conn->close();

include 'tabla_completa.php';
?>


