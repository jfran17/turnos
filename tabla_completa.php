<!DOCTYPE html>
<html lang="es">
  <head>
    <title>Consulta turnos</title>
    
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    
    <style>
      body{
        background: url(images/b4.jpg) no-repeat center top;
        background-size: cover;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        min-height: 747px;
        background-attachment:fixed;
      }
      
      .bg-agile {
        width: 65%;
        margin: 0 auto;
      }
    </style>
  </head>
  
  <body>
    <div class="container">
      <h2>Consulta turnos medicos</h2>
      <p>Los turnos que piden los pacientes se ordenan en una tabla de acuerdo con la base de datos.</p>            
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Consultorio</th>
            <th>Profesional</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Nombre</th>
            <th>Telefono</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
    
    <?php
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
          echo "<tr>";
          echo "<td>".$row["consultorio"]."</td>";
          echo "<td>".$row["profesional"]."</td>";
          echo "<td>".$row["fecha"]."</td>";
          echo "<td>".$row["hora"]."</td>";
          echo "<td>".$row["nombre"]."</td>";
          echo "<td>".$row["telefono"]."</td>";
          echo "<td>".$row["email"]."</td>";
          echo "</tr>";
        }
    }
    ?>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>
