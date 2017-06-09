<?php
// Datos de conexion
$servername = "localhost";
$username   = "f8000508_admin";
$password   = "Turnos3237";
$dbname     = "f8000508_turnos";

// Conexion con el servidor
$link = mysqli_connect($servername, $username, $password, $dbname);

if (!$link) {
    die('No se pudo conectar: ' . mysqli_error($link));
}

// Seleccionar base de datos
$db = mysqli_select_db($link, $dbname);

if (!$db) {
	die('Error al seleccionar la base de datos: ' . mysqli_error($link));
}


// Obtenemos los valores del formulario
$on_centro = $_POST['on_centro'];
$on_pro    = $_POST['on_pro'];
$on_fecha  = $_POST['on_fecha'];
$on_hora   = $_POST['on_hora'];
$on_pac    = $_POST['on_pac'];
$on_dni    = $_POST['on_dni'];
$on_tel    = $_POST['on_tel'];
$on_obra   = $_POST['on_obra'];

$sql = "INSERT INTO solicitudes (on_centro, on_pro, on_fecha, on_hora, on_pac, on_dni, on_tel, on_obra) VALUES ('$on_centro', '$on_pro', '$on_fecha', '$on_hora', '$on_pac', '$on_dni', '$on_tel', '$on_obra')";

// Ingresar la información a la tabla de datos
$result = mysqli_query($link, $sql);

if (!$result) {
    die('Error en la consulta: ' . mysqli_error($link));
}

// Cerrar conxion con la base de datos
mysqli_close($link);
?>