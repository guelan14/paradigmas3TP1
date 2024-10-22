// Mostrar detalles del carrito y método de entrega
function goBack() {
  window.history.back(); // Regresa a la página anterior
}

function loadConfirmation() {
  const storedCart = localStorage.getItem("cart");
  const storedDeliveryMode = localStorage.getItem("deliveryMode");

  let subtotal = 0; // Inicializa el subtotal
  const shippingCost = storedDeliveryMode === "delivery" ? 2 : 0; // Costo de envío
  const serviceFee = 1.0; // Tarifa de servicio

  // Cargar detalles del carrito
  if (storedCart) {
    const cart = JSON.parse(storedCart);
    const cartDetails = document.getElementById("cart-details");
    let details = "<ul>";

    for (const [name, item] of Object.entries(cart)) {
      details += `<li>${item.name} - Cantidad: ${item.quantity}</li>`;
      subtotal += item.price * item.quantity; // Calcula el subtotal
    }
    details += "</ul>";
    cartDetails.innerHTML = details;
  }

  // Mostrar método de entrega
  const deliveryMethod = document.getElementById("delivery-method");
  if (storedDeliveryMode) {
    deliveryMethod.innerHTML = `<h3>Método de entrega: ${
      storedDeliveryMode === "delivery" ? "Delivery" : "Retiro"
    }</h3>`;
  } else {
    deliveryMethod.innerHTML = "<h3>Método de entrega: No especificado</h3>";
  }

  // Mostrar los costos en el resumen
  document.querySelector(
    ".total .total-amount"
  ).innerText = `$${subtotal.toFixed(2)}`;
  document.getElementById("shipping-cost").innerText = `$${shippingCost.toFixed(
    2
  )}`;
  document.getElementById("service-fee").innerText = `$${serviceFee.toFixed(
    2
  )}`;

  // Calcular y mostrar el total
  const total = subtotal + shippingCost + serviceFee;
  document.getElementById("cart-total-amount").innerText = `$${total.toFixed(
    2
  )}`;
}

const checkoutButton = document.getElementById("checkout");
if (checkoutButton) {
  checkoutButton.addEventListener("click", async (event) => {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace

    const storedCart = localStorage.getItem("cart");
    const storedDeliveryMode = localStorage.getItem("deliveryMode");

    if (storedCart) {
      const cart = JSON.parse(storedCart);
      const orderData = {
        items: cart,
        deliveryMode: storedDeliveryMode,
      };

      try {
        // Enviar datos a PHP
        const response = await fetch("../controllers/process_order.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });

        if (response.ok) {
          const result = await response.json();
          if (result.orderId) {
            alert(
              "Orden procesada exitosamente! ID de orden: " + result.orderId
            );
            localStorage.removeItem("cart"); // Opcional: vaciar el carrito
            localStorage.removeItem("deliveryMode");
            // Redireccionar a la página de confirmación o a la página de inicio
            window.location.href = "menu.php"; // página de confirmación
          } else {
            alert(
              "Error al procesar la orden: " +
                (result.error || "No se pudo obtener el ID de la orden.")
            );
          }
        } else {
          const errorResponse = await response.json();
          alert("Error al procesar la orden: " + errorResponse.error);
        }
      } catch (error) {
        alert("Error en la conexión: " + error.message);
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", loadConfirmation);
