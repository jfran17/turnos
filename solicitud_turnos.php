<?php
// Datos de conexion
$servername = "localhost";
$username   = "f8000508_turnos";
$password   = "";
$dbname     = "f8000508_turnos";

// Conexion con el servidor
$link = mysqli_connect($servername, $username, $password, $dbname) or die ("No se encuentra el servidor");
$db = mysqli_select_db($link, $dbname) or die ("Error de conexión");

// Obtenemos los valores del formulario
$on_centro = $_POST['on_centro'];
$on_pro    = $_POST['on_pro'];
$on_fecha  = $_POST['on_fecha'];
$on_hora   = $_POST['on_hora'];
$on_pac    = $_POST['on_pac'];
$on_dni    = $_POST['on_dni'];
$on_tel    = $_POST['on_tel'];
$on_obra   = $_POST['on_obra'];

$sql = "INSERT INTO solicitudes (on_centro, on_pro, on_fecha, on_hora, on_pac, on_dni, on_tel, on_obra)
        VALUES ('$on_centro', '$on_pro', '$on_fecha', '$on_hora', '$on_pac', '$on_dni', '$on_tel', '$on_obra')";

// Ingresar la información a la tabla de datos
mysqli_query($link, $sql) or die ("Error de envío");
