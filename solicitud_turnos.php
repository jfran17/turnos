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

$id_consulta = $_POST['id_consulta'];

switch($id_consulta) {
	case 'on_centro':
		$sql = "SELECT id_centro, cen_desc FROM centros";

		// Ingresar la información a la tabla de datos
		$result = mysqli_query($link, $sql);

		// Parsear resultado
		$resultados = "";
		while($row = $result->fetch_assoc()) {
			$resultados .= $row[id_centro] . "|" . $row[cen_desc] . "|";
		}

		break;

	case 'on_espe':
		$data = $_POST['data'];
		$sql = "SELECT id_espe, id_desc FROM especialidades WHERE id_centro like '$data'";

		// Ingresar la información a la tabla de datos
		$result = mysqli_query($link, $sql);

		// Parsear resultado
		$resultados = "";
		while($row = $result->fetch_assoc()) {
			$resultados .= $row[id_espe] . "|" . $row[id_desc] . "|";
		}

		break;

	case 'on_pro':
		$data_recived = json_decode($_POST['data'], true);

		$sql = "SELECT id_med, med_desc FROM medicos WHERE med_centro=" . $data_recived['on_centro'] . " AND med_esp=" . $data_recived['on_espe'];

		// Ingresar la información a la tabla de datos
		$result = mysqli_query($link, $sql);

		if($result) {
			$aux = $result->fetch_all(MYSQLI_ASSOC);

			// Parsear resultado
			$resultados = json_encode($aux, JSON_FORCE_OBJECT);//json_encode($aux);
		}

		break;

	case 'on_obra':
		$data = $_POST['data'];
		$sql = "SELECT id_obra, obra_desc FROM obras WHERE obra_centro like '$data'";

		// Ingresar la información a la tabla de datos
		$result = mysqli_query($link, $sql);

		// Parsear resultado
		$resultados = "";
		while($row = $result->fetch_assoc()) {
			$resultados .= $row[id_obra] . "|" . $row[obra_desc] . "|";
		}

		break;

	case 'on_solicitud':
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

		break;

	default:
		echo 'Error';
		break;
}

if (!$result) {
    die('Error en la consulta: ' . mysqli_error($link));
}

// Cerrar conexion con la base de datos
mysqli_close($link);

echo $resultados;
?>