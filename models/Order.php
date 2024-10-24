<?php
class Order {
    private $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    // Obtener todas las órdenes
    public function getOrders() {
        $query = "SELECT * FROM orders";
        $result = $this->conexion->query($query);

        if ($result->num_rows > 0) {
            return $result->fetch_all(MYSQLI_ASSOC);
        } else {
            return [];
        }
    }

}
?>
