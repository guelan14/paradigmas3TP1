<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PixFood</title>
    <link rel="stylesheet" href="../css/header.css" />
    <link rel="stylesheet" href="../css/menu.css" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
    />
  </head>
  <body class="bg-light-gray">
    <header>
      <nav class="navbar">
        <div class="navbar-container">
          <a href="../index.php" class="logo">PixFood</a>
        </div>
      </nav>
    </header>
    <div class="super-container">
      <form class="search-container">
        <input
          type="text"
          id="search-input"
          placeholder="Encuentra tu comida"
        />
        <i class="fa fa-search search-icon"></i>
      </form>
      <section class="container">
        <main class="menu-container">
          <nav class="menu-nav">
            <button class="tab color-white active" data-category="entradas">
              Entradas
            </button>
            <button
              class="tab bg-medium-gray color-dark-gray"
              data-category="principales"
            >
              Principales
            </button>
            <button
              class="tab bg-medium-gray color-dark-gray"
              data-category="bebidas"
            >
              Bebidas
            </button>
            <button
              class="tab bg-medium-gray color-dark-gray"
              data-category="postres"
            >
              Postres
            </button>
          </nav>
          <section class="menu-items"></section>
        </main>
        <aside class="order bg-white">
          <header class="order-header">
            <h1 class="color-dark-gray" id="order-title"></h1>
            <p id="table-info"></p>

            <div id="call-waiter-message" class="hidden">
              ¡Solicitud realizada!
            </div>
            <button id="call-waiter" class="call-waiter-btn none">
              Llamar al mozo
            </button>
          </header>
  <?php 
  include "../modelo/conexion.php";
  $sql = $conexion->query("SELECT * FROM menu_items");

  while ($datos = $sql->fetch_object()) { ?>
    <tr>
      <td><?php echo $datos->name; ?></td>
      <td><?php echo $datos->image; ?></td>


    </tr>
  <?php 
  }
  ?>
  
          <section id="cart">
            <div id="cart-items"></div>
          </section>

          <div id="cart-total">
            <ul>
              <li>SubTotal: <span class="total-amount"></span></li>
            </ul>
          </div>
          <div class="order-actions">
            <a href="cart.php" class="send-order"> Ir al Carrito </a>
          </div>
        </aside>
        <div class="notifications-container"></div>
      </section>
      <div class="subtotal-container">
        <div class="total">
          Subtotal del pedido: <span class="total-amount">$0.00</span>
        </div>
        <a href="cart.php" class="btn-cart">Ir al carrito</a>
      </div>
    </div>
    <script src="../scripts/cart.js"></script>
    <script src="../scripts/menu.js"></script>
  </body><?php
include "../modelo/conexion.php"; // Conectar a la base de datos
$sql = $conexion->query("SELECT * FROM menu_items"); // Consulta para obtener los datos

// Verificar si hay resultados
if ($sql->num_rows > 0) {
    echo '<div class="menu-items">';
    // Recorrer los resultados de la base de datos y generar HTML dinámicamente
    while ($datos = $sql->fetch_object()) {
        echo '
        <div class="menu-item">
            <div class="item-image">
                <img src="' . $datos->image . '" alt="' . $datos->name . '" />
            </div>
            <div class="item-info">
                <h2>' . $datos->name . '</h2>
                <div class="description">
                    <p>' . $datos->description . '</p>
                </div>
                <div class="button-container">
                    <p class="price">$' . $datos->price . '</p>
                    <button class="btn-minus">-</button>
                    <button class="btn-plus">+</button>
                </div>
            </div>
        </div>';
    }
    echo '</div>';
} else {
    echo '<p>No se encontraron elementos en el menú.</p>';
}
?>
</html>
