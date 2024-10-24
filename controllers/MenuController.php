<?php
include_once "../models/Menu.php";

class MenuController {
    public function getAllMenuItems() {
        $menuModel = new Menu();
        $menuItems = $menuModel->getMenuItems();
        
        // Devolver el resultado como JSON
        header('Content-Type: application/json');
        echo json_encode($menuItems);
    }

    public function addMenuItem($data) {
        $menuModel = new Menu();
        
        // Llamar al método en el modelo para agregar el ítem
        if ($menuModel->insertMenuItem($data)) {
            // Responder con éxito
            header('Content-Type: application/json');
            echo json_encode(['message' => 'Ítem agregado correctamente.']);
        } else {
            // Responder con error
            http_response_code(400);
            echo json_encode(['message' => 'Error al agregar el ítem.']);
        }
    }

}

// Verificar si es una llamada para listar items del menú
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $controller = new MenuController();
    $controller->getAllMenuItems();
}

// Verificar si es una llamada para agregar un nuevo ítem
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $controller = new MenuController();
    // Leer el cuerpo de la solicitud
    $data = json_decode(file_get_contents("php://input"), true);
    $controller->addMenuItem($data);
}