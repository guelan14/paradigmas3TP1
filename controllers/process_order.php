<?php
header("Content-Type: application/json");

// Conectar a la base de datos
include_once "../database/conexion.php"; // Asegúrate de que esta ruta sea correcta
global $conexion; // Usa la variable de conexión

// Obtener datos de la solicitud
$data = json_decode(file_get_contents('php://input'), true);

// Verificar que los datos sean válidos
if (!isset($data['items']) || !isset($data['deliveryMode'])) {
    echo json_encode(['error' => 'Datos incompletos.']);
    exit();
}

// Iniciar la transacción
mysqli_begin_transaction($conexion);
try {
    // Crear una nueva orden
    $table_id = null; // Asigna el ID de la mesa si es necesario
    $type = $data['deliveryMode']; // 'delivery' o 'local'
    error_log("deliveryMode: " . $data['deliveryMode']);

    
    // Preparar la consulta para crear una nueva orden
    $order_query = "INSERT INTO orders (table_id, type, status) VALUES (?, ?, 'pending')";
    $stmt = $conexion->prepare($order_query); // Usa $conexion en lugar 
    $stmt->bind_param("is", $table_id, $type);
    $stmt->execute();
    
    // Obtener el ID de la orden recién creada
    $order_id = $stmt->insert_id;

    // Insertar los artículos del pedido
    foreach ($data['items'] as $item) {
        $food_id = $item['id']; 
        $quantity = $item['quantity'];

        // Preparar la consulta para insertar los artículos
        $order_item_query = "INSERT INTO order_items (order_id, food_id, quantity) VALUES (?, ?, ?)";
        $item_stmt = $conexion->prepare($order_item_query); // Usa $conexion
        $item_stmt->bind_param("iii", $order_id, $food_id, $quantity);
        $item_stmt->execute();
    }

    // Confirmar la transacción
    mysqli_commit($conexion); // Usa $conexion
    
    // Devolver el ID de la orden
    echo json_encode(['orderId' => $order_id]);
} catch (Exception $e) {
    // Si hay un error, revertir la transacción
    mysqli_rollback($conexion); // Usa $conexion
    echo json_encode(['error' => $e->getMessage()]);
} finally {
    // Cerrar las declaraciones
    $stmt->close();
    if (isset($item_stmt)) {
        $item_stmt->close(); // Cerrar el statement del item
    }
    $conexion->close(); // Cerrar la conexión
}
?>
