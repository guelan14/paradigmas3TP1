<?php 
$conexion = new mysqli("localhost", "root", "", "pixfood");

// Verificar la conexión
if ($conexion->connect_error) {
    die("Error en la conexión: " . $conexion->connect_error);
}

$conexion->set_charset("utf8");
?>