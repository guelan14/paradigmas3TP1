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
  const subtotalAmount = document.querySelector(".total-amount");
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
  subtotalAmount.textContent = `$${total.toFixed(2)}`;
}

// Cargar el carrito cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", loadCart);
