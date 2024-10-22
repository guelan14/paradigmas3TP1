<?php
header("Content-Type: application/json");

// Conectar a la base de datos
include_once "../database/conexion.php";

// Obtener datos de la solicitud
$data = json_decode(file_get_contents('php://input'), true);

// Validar que se haya recibido la información necesaria
if (!isset($data['deliveryMode']) || empty($data['deliveryMode'])) {
    echo json_encode(['error' => 'El modo de entrega es obligatorio.']);
    exit;
}

$deliveryMode = $data['deliveryMode'];
$tableId = null; // Asigna un valor si usas mesas, de lo contrario puede ser null

// Insertar orden
$sql = "INSERT INTO orders (table_id, type, status) VALUES (?, ?, 'pending')";
$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param("is", $tableId, $deliveryMode);

    if ($stmt->execute()) {
        $orderId = $stmt->insert_id; // Obtener el ID de la orden insertada

        // Inserta los artículos del pedido
        if (isset($data['items']) && is_array($data['items'])) {
            $insertItemSql = "INSERT INTO order_items (order_id, food_id, quantity) VALUES (?, ?, ?)";
            $itemStmt = $conn->prepare($insertItemSql);

            foreach ($data['items'] as $item) {
                $foodId = $item['id']; // Asegúrate de que tu carrito tenga esta información
                $quantity = $item['quantity'];
                
                $itemStmt->bind_param("iii", $orderId, $foodId, $quantity);
                $itemStmt->execute();
            }
            $itemStmt->close();
        }

        echo json_encode(['orderId' => $orderId]); // Devolver el ID de la orden
    } else {
        echo json_encode(['error' => 'Error al insertar la orden: ' . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(['error' => 'Error en la preparación de la consulta: ' . $conn->error]);
}

$conn->close();
?>
