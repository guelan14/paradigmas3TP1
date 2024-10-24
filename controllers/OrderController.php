<?php
header("Content-Type: application/json");

include_once "../database/conexion.php"; // Incluye tu archivo de conexión
include_once "../models/Order.php"; // Incluye el modelo

$conexion = new mysqli("localhost", "root", "1234", "pixfood"); // Cambia esto si es necesario

// Verificar la conexión
if ($conexion->connect_error) {
    die("Error en la conexión: " . $conexion->connect_error);
}

// Instanciar el modelo
$orderModel = new Order($conexion);

// Procesar la solicitud
$orders = $orderModel->getOrders();
echo json_encode($orders);

// Cerrar la conexión
$conexion->close();
?>
