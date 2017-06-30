<?php
// Datos de conexion
$servername = "localhost";
$username   = "f8000508_admin";
$password   = "Turnos3237";
$dbname     = "f8000508_turnos";

// Crear conexion
$conn = new mysqli($servername, $username, $password, $dbname);

// Comprobar conexion
if ($conn->connect_error) {
    echo "Error al conectar: " . $conn->connect_error;
    $conn->close();
    die();
} 

// Obtenemos los valores del formulario
$on_centro      = $_POST['on_centro'];
$on_centro_desc = $_POST['on_centro_desc'];
$on_usr         = $_POST['on_usr'];
$on_pass        = $_POST['on_pass'];

// Solicitar Usuario y Password
$sql = "SELECT * FROM usuarios where on_estado='A' AND on_centro='$on_centro' AND on_usr='$on_usr' AND on_pass='$on_pass'";

$result = $conn->query($sql);

if ($result->num_rows == 0) {
	$conn->close();

	echo "Error de autenticacion";
	die();
}

$sql = "SELECT * FROM solicitudes where on_rta='P' AND on_centro='$on_centro_desc'";

$result = $conn->query($sql);

$conn->close();

//include 'tabla_completa.php';
?>


<div class="container">
  <p>Los turnos que piden los pacientes se ordenan en una tabla de acuerdo con la base de datos.</p>            
  <table class="table">
    <thead>
      <tr>
        <th>Consultorio</th>
        <th>Profesional</th>
        <th>Fecha</th>
        <th>Hora</th>
        <th>Nombre</th>
      </tr>
    </thead>
    <tbody>
      <tr>

<?php
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
      echo "<tr>";
      echo "<td>".$row["on_centro"]."</td>";
      echo "<td>".$row["on_pro"]."</td>";
      echo "<td>".$row["on_fecha"]."</td>";
      echo "<td>".$row["on_hora"]."</td>";
      echo "<td>".$row["on_pac"]."</td>";
      /*
      echo "<td>".$row["on_tel"]."</td>";
      echo "<td>".$row["on_dni"]."</td>";
      echo "<td>".$row["on_obra"]."</td>";
      */
      echo "</tr>";
    }
}
?>
      </tr>
    </tbody>
  </table>
