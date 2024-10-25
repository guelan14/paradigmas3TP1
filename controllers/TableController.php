<?php
require_once '../models/Table.php'; // Importar la clase
require_once '../database/conexion.php'; // Importar la conexión

class TableController {
    private $table;

    public function __construct($conexion) {
        $this->table = new Table($conexion); // Pasar la conexión a la clase Table
    }

    // Obtener todas las mesas y devolver en formato JSON
    public function obtenerMesas() {
        $mesas = $this->table->getTables();
        echo json_encode($mesas);
    }

    // Cambiar el estado de una mesa
    public function cambiarEstadoMesa($id, $status) {
        if ($this->table->updateTableStatus($id, $status)) {
            echo json_encode(["message" => "Estado actualizado correctamente."]);
        } else {
            echo json_encode(["message" => "Error al actualizar el estado."]);
        }
    }
}

// Verificar si la solicitud es para obtener mesas
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $controller = new TableController($conexion); // Crear el controlador
    $controller->obtenerMesas(); // Llamar al método correspondiente
}

