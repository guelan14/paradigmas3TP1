<?php 
//$conexion = new mysqli("fra1.clusters.zeabur.com", "root", "O4xs8S0uzJ59Z2TeMEkU7o6bQlgfL3X1", "zeabur", 31420);
$conexion = new mysqli("localhost", "root", "", "pixfood");



// Verificar la conexión
if ($conexion->connect_error) {
    die("Error en la conexión: " . $conexion->connect_error);
}

$conexion->set_charset("utf8");
?>