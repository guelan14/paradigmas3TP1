let cart = {};
let deliveryCost = 0; // Inicializa el costo de entrega en 0
let serviceFee = 1.0;
let cartHeader;

// Ir atrás en el carrito
function goBack() {
  window.history.back();
}

// Añadir item al carrito
function addToCart(item) {
  if (cart[item.id]) {
    // Cambiar item.name por item.id
    cart[item.id].quantity += 1; // Aumenta la cantidad
  } else {
    cart[item.id] = { ...item, quantity: 1 }; // Usa el id como clave
  }
  updateCartUI();
  saveCart();
  showNotification(`${item.name} agregado al carrito`, "added");
}

// Quitar item del carrito
function removeFromCart(item) {
  if (cart[item.id]) {
    // Cambiar item.name por item.id
    if (cart[item.id].quantity > 1) {
      cart[item.id].quantity -= 1;
    } else {
      delete cart[item.id]; // Eliminar el artículo si la cantidad es 1
    }
    updateCartUI();
    saveCart();
    showNotification(`${item.name} eliminado del carrito`, "removed");
  }
}

// Función para vaciar el carrito
function clearCart() {
  cart = {};
  updateCartUI();
}

// Guardar carrito en Local Storage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Mostrar notificación
function showNotification(message, type) {
  const notification = document.createElement("div");
  notification.className = `notification ${type} show`;
  notification.textContent = message;
  document.querySelector(".notifications-container").appendChild(notification);

  setTimeout(() => {
    notification.classList.add("hidden");
    setTimeout(() => notification.remove(), 500);
  }, 2000);
}

document.addEventListener("DOMContentLoaded", function () {
  const checkoutButton = document.getElementById("checkout");
  const sendOrderButton = document.getElementById("send-order");
  let deliveryButton, pickupButton;

  // Verificar la URL para decidir si estamos en la página del carrito
  if (window.location.pathname.includes("cart.php")) {
    deliveryButton = document.getElementById("delivery");
    pickupButton = document.getElementById("pickup");
    cartHeader = document.querySelector(".cart-header");

    // Solo se definen los eventos si los botones están presentes
    if (deliveryButton && pickupButton) {
      deliveryButton.addEventListener("click", () => {
        deliveryButton.classList.add("active");
        pickupButton.classList.remove("active");
        deliveryCost = 2; // Costo de entrega
        localStorage.setItem("deliveryMode", "delivery"); // Guarda el modo en localStorage
        updateCartUI(); // Actualiza la interfaz del carrito
      });

      pickupButton.addEventListener("click", () => {
        pickupButton.classList.add("active");
        deliveryButton.classList.remove("active");
        deliveryCost = 0; // Sin costo de entrega
        localStorage.setItem("deliveryMode", "pickup"); // Guarda el modo en localStorage
        updateCartUI(); // Actualiza la interfaz del carrito
      });
    }
    // Función para manejar el modo según la URL
    function handleMode() {
      const urlParams = new URLSearchParams(window.location.search);
      const mode = urlParams.get("mode");

      if (mode === "local") {
        console.log("Modo Local Activado");
        cartHeader.classList.add("hidden");
        checkoutButton.classList.add("hidden");
        sendOrderButton.classList.remove("hidden");
        sendOrderButton.style.display = "inline-flex";
      } else {
        cartHeader.classList.remove("hidden");
        checkoutButton.classList.remove("hidden");
        checkoutButton.style.display = "inline-flex";
        sendOrderButton.classList.add("hidden");
      }

      // Cargar el modo de entrega desde localStorage
      const storedDeliveryMode = localStorage.getItem("deliveryMode");
      if (storedDeliveryMode === "delivery") {
        deliveryCost = 2; // Costo de entrega
        deliveryButton.classList.add("active");
        pickupButton.classList.remove("active");
      } else {
        deliveryCost = 0; // Sin costo de entrega
        pickupButton.classList.add("active");
        deliveryButton.classList.remove("active");
      }
      updateCartUI(); // Actualiza la interfaz del carrito al cargar
    }

    // Llama a la función para manejar el modo
    handleMode();
  }
});

// Función para cargar el carrito desde Local Storage
function loadCart() {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart); // Usamos la variable global 'cart'
    updateCartUI();
  }
}

// Actualizar la interfaz del carrito
function updateCartUI() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalAmount = document.getElementById("cart-total-amount");
  const subtotalElements = document.querySelectorAll(".total-amount");
  const shippingCostDisplay = document.getElementById("shipping-cost");
  const serviceFeeDisplay = document.getElementById("service-fee");

  cartItemsContainer.innerHTML = "";

  let total = 0;
  for (const [name, item] of Object.entries(cart)) {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
        <p>${item.name}  - $${item.price.toFixed(2)}</p>
        <div class="item-controls">
          <button class="btn-minus">-</button>
          <span class="item-quantity">${item.quantity}</span>
          <button class="btn-plus">+</button>
        </div>
      `;

    cartItemsContainer.appendChild(cartItem);
    total += item.price * item.quantity;

    // Añadir eventos a los botones
    const plusButton = cartItem.querySelector(".btn-plus");
    const minusButton = cartItem.querySelector(".btn-minus");

    plusButton.addEventListener("click", () => addToCart(item));
    minusButton.addEventListener("click", () => removeFromCart(item));
  }

  // Validar antes de actualizar para evitar errores si no existen esos elementos
  if (shippingCostDisplay) {
    shippingCostDisplay.textContent = `$${deliveryCost.toFixed(2)}`; // Actualiza el costo de envío
  }

  if (serviceFeeDisplay) {
    serviceFeeDisplay.textContent = `$${serviceFee.toFixed(2)}`; // Actualiza la tarifa de servicio
  }

  // Calcular el total incluyendo el costo de envío y la tarifa de servicio
  const totalWithShippingAndService = total + deliveryCost + serviceFee;

  // Validar si el elemento de total existe antes de actualizar
  if (cartTotalAmount) {
    cartTotalAmount.textContent = `$${totalWithShippingAndService.toFixed(2)}`; // Muestra el total
  }

  // Actualizar el subtotal en todas las instancias donde se use la clase "total-amount"
  subtotalElements.forEach((subtotalElement) => {
    subtotalElement.textContent = `$${total.toFixed(2)}`;
  });
}

// Cargar el carrito cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", loadCart);
