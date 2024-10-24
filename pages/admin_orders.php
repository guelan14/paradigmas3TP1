<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Órdenes de Pedido - Administrador</title>
    <link rel="stylesheet" href="../css/admin.css">
</head>
<body>
    <header>
        <h1>Órdenes de Pedido</h1>
    </header>
    <main>
        <table>
            <thead>
                <tr>
                    <th>ID de Orden</th>
                    <th>ID de Mesa</th>
                    <th>Tipo</th>
                    <th>Fecha de Creación</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody id="order-list">
                <!-- Aquí se llenarán las órdenes desde el servidor -->
            </tbody>
        </table>


    </main>

    <script src="../scripts/admin_orders.js"></script>
</body>
</html>
