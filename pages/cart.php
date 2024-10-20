<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Carrito de Compra</title>
    <link rel="stylesheet" href="../css/cart.css" />
    <link rel="stylesheet" href="../css/cart-header.css" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
    />
  </head>

  <body>
    <header>
      <nav class="navbar">
        <div class="navbar-container">
          <a href="javascript:void(0);" class="back-arrow" onclick="goBack()">
            <i class="fas fa-arrow-left"></i>
          </a>
        </div>
      </nav>
    </header>

    <section class="cart-info">
      <div class="cart-page">
        <header class="cart-header">
          <button id="delivery" class="mode-btn">Delivery</button>
          <button id="pickup" class="mode-btn active">Retiro</button>
        </header>

        <section id="cart">
          <div id="cart-items"></div>
        </section>

        <div class="back-to-menu">
          <h2>Necesitas algo más?</h2>
          <a href="javascript:void(0);" class="back-arrow" onclick="goBack()"
            >Volver al menú</a
          >
        </div>

        <section class="cart-summary">
          <h2>Resumen</h2>
          <div class="total">
            <ul>
              <li>SubTotal: <span class="total-amount"></span></li>
              <li class="shipping-fee">
                Envío: <span id="shipping-cost"></span>
              </li>
              <li class="service-fee">
                Tarifa de Servicio: <span id="service-fee">$1.00</span>
              </li>
              <li>Total: <span id="cart-total-amount"></span></li>
            </ul>
          </div>
          <a href="confirmation.php" id="checkout" class="checkout-btn"
            >Ir a Pagar</a
          >
          <!-- Botón de enviar orden (oculto por defecto) -->
          <a
            href="javascript:void(0);"
            id="send-order"
            class="checkout-btn hidden"
            >Enviar Orden</a
          >
          <div class="notifications-container"></div>
        </section>
      </div>
    </section>
    <script src="../scripts/cart.js"></script>
  </body>
</html>
