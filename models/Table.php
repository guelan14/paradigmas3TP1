<?php
require_once '../database/conexion.php'; // Asegúrate de que la ruta sea correcta

class Table {
    private $conn; // Variable para la conexión

    public function __construct($conexion) {
        $this->conn = $conexion; // Recibe la conexión desde afuera
    }

    // Obtener todas las mesas
    public function getTables() {
        $query = "SELECT * FROM tables"; // Consulta para obtener las mesas
        $result = $this->conn->query($query);

        if ($result->num_rows > 0) {
            $tables = [];
            while ($row = $result->fetch_assoc()) {
                $tables[] = $row; // Guardar cada mesa en un array
            }
            return $tables;
        } else {
            return []; // Retorna un array vacío si no hay resultados
        }
    }

    // Cambiar el estado de una mesa
    public function updateTableStatus($id, $status) {
        $query = "UPDATE tables SET status = ? WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("si", $status, $id); // "si" indica tipos (string, integer)

        return $stmt->execute(); // Retorna true o false según el resultado
    }
}
?>
