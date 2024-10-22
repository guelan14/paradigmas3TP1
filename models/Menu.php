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
            $category = strtolower($datos->category); // Asegúrate de que la categoría esté en minúsculas
            if (array_key_exists($category, $menuItems)) {
                $menuItems[$category][] = [
                    'name' => $datos->name,
                    'image' => $this->imagePath . $datos->image,
                    'description' => $datos->description,
                    'price' => $datos->price
                ];
            }
        }
        return $menuItems;
    }
}