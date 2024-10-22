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
}

// Verificar si es una llamada AJAX para listar items del menú
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $controller = new MenuController();
    $controller->getAllMenuItems();
}