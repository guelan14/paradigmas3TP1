let cart = {};

//Ir atras en el carrito
function goBack() {
  window.history.back();
}

// Añadir item al carrito
function addToCart(item) {
  if (cart[item.name]) {
    cart[item.name].quantity += 1;
  } else {
    cart[item.name] = { ...item, quantity: 1 };
  }
  updateCartUI();
  saveCart();
  showNotification(`${item.name} agregado al carrito`, "added");
}

// Quitar item del carrito
function removeFromCart(item) {
  if (cart[item.name]) {
    if (cart[item.name].quantity > 1) {
      cart[item.name].quantity -= 1;
    } else {
      delete cart[item.name];
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

// Cargar carrito desde Local Storage
function loadCart() {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
    updateCartUI();
  }
}

// Actualizar la interfaz del carrito
function updateCartUI() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalAmount = document.getElementById("cart-total-amount");
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

  cartTotalAmount.textContent = `$${total.toFixed(2)}`;
}

// Cargar carrito cuando el documento esté listo
document.addEventListener("DOMContentLoaded", loadCart);

// Event listener para cancelar la orden
document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector(".cancel-order")
    .addEventListener("click", function () {
      if (confirm("¿Estás seguro de que deseas cancelar?")) {
        clearCart();
      }
    });
});
