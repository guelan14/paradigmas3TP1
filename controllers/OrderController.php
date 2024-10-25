<?php
header("Content-Type: application/json");
include_once "../database/conexion.php"; // Incluye tu archivo de conexión
include_once "../models/Order.php"; // Incluye el modelo

global $conexion;

// Verificar la conexión
if ($conexion->connect_error) {
    die("Error en la conexión: " . $conexion->connect_error);
}

// Instanciar el modelo
$orderModel = new Order($conexion);

// Procesar la solicitud
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Obtener todas las órdenes
    $orders = $orderModel->getOrders();
    echo json_encode($orders);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Actualizar el estado de una orden
    $data = json_decode(file_get_contents('php://input'), true); // Obtener datos enviados en JSON

    if (isset($data['orderId'])) {
        $orderId = $data['orderId'];
        $response = $orderModel->updateOrderStatus($orderId, 'paid'); // Llama a la función para actualizar el estado
        echo json_encode($response);
    } else {
        echo json_encode(["success" => false, "message" => "No se proporcionó orderId."]);
    }
}

// Cerrar la conexión
$conexion->close();
?>
