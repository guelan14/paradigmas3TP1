<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión del Menú - Administrador</title>
    <link rel="stylesheet" href="../css/admin.css">
</head>
<body>
    <header>
        <h1>Gestión del Menú</h1>
    </header>
    <main>
        <button id="add-menu-item-button">Agregar Nuevo Item</button>

        <!-- Modal para agregar un nuevo item del menú -->
        <div id="add-menu-item-modal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Agregar Nuevo Item del Menú</h2>
                <form id="add-menu-item-form">
                    <label for="name">Nombre:</label>
                    <input type="text" id="name" required>
                    
                    <label for="category">Categoría:</label>
                    <input type="text" id="category" required>
                    
                    <label for="price">Precio:</label>
                    <input type="number" id="price" step="0.01" required>
                    
                    <label for="description">Descripción:</label>
                    <textarea id="description" required></textarea>
                    
                    <button type="submit">Agregar</button>
                </form>
            </div>
        </div>

        <div id="menu-list">
            <h2>Items del Menú</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Descripción</th>
                        <th>Categoría</th>
                    </tr>
                </thead>
                <tbody id="menu-list-body">
                    <!-- Aquí se llenarán los items del menú -->
                </tbody>
            </table>
        </div>
    </main>

    <script src="../scripts/admin_menu.js"></script>
</body>
</html>
