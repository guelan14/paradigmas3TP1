<?php
class Order {
    private $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    // Obtener todas las órdenes
    public function getOrders() {
        $query = "SELECT * FROM orders";
        if ($result = $this->conexion->query($query)) {
            if ($result->num_rows > 0) {
                return $result->fetch_all(MYSQLI_ASSOC);
            } else {
                return []; // No hay órdenes
            }
        } else {
            // Manejo de error en caso de que la consulta falle
            error_log("Error en la consulta: " . $this->conexion->error); // Loguear el error
            return ["error" => "Error al obtener las órdenes."];
        }
    }

    // Actualizar el estado de una orden
    public function updateOrderStatus($orderId, $status) {
        $query = "UPDATE orders SET status = ? WHERE id = ?";
        $stmt = $this->conexion->prepare($query);

        if ($stmt) {
            $stmt->bind_param("si", $status, $orderId); 
            $stmt->execute();

            if ($stmt->affected_rows > 0) {
                return ["success" => true, "message" => "Estado del pedido actualizado a '$status'."];
            } else {
                return ["success" => false, "message" => "No se encontró el pedido o ya estaba en estado '$status'."];
            }

            $stmt->close(); // Cerrar la declaración
        } else {
            return ["success" => false, "message" => "Error al preparar la consulta."];
        }
    }
}
?>
