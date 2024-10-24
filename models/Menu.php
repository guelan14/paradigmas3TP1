<?php
include_once "../database/conexion.php";

class Menu {
    private $imagePath = '../images/'; // Definir la ruta base para las imágenes

    public function getMenuItems() {
        global $conexion;

        $sql = $conexion->query("SELECT * FROM menu_items");
        $menuItems = [
            'entradas' => [],
            'principales' => [],
            'bebidas' => [],
            'postres' => []
        ];

        while ($datos = $sql->fetch_object()) {
            // Agrupar por categoría
            $category = strtolower($datos->category); // categoría en minúsculas
            if (array_key_exists($category, $menuItems)) {
                $menuItems[$category][] = [
                    'id' => $datos->id,
                    'name' => $datos->name,
                    'image' => $this->imagePath . $datos->image,
                    'description' => $datos->description,
                    'price' =>floatval($datos->price)
                ];
            }
        }
        return $menuItems;
    }
    public function insertMenuItem($data) {
        global $conexion;

        // Preparar la consulta para insertar un nuevo ítem
        $sql = "INSERT INTO menu_items (name, image, category, price, description) VALUES (?, ?, ?, ?, ?)";
        $stmt = $conexion->prepare($sql);

        // Asignar los parámetros
        $stmt->bind_param("ssssd", $data['name'], $data['image'], $data['category'], $data['price'], $data['description']);
        
        // Ejecutar la consulta
        return $stmt->execute();
    }
}