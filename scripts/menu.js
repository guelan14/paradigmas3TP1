document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab");
  const menuItemsContainer = document.querySelector(".menu-items");
  const callWaiterButton = document.getElementById("call-waiter");
  const callWaiterMessage = document.getElementById("call-waiter-message");

  let menuData = {}; // Variable para almacenar los datos del menú
  let cart = {};

  // Verificar si entro en modo local o delivery
  // Obtener los parámetros de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const mode = urlParams.get("mode"); // 'local' o 'delivery'
  const tableNumber = urlParams.get("table"); // Número de mesa si está disponible

  // Obtener los elementos donde se mostrará el título, el número de mesa
  const orderTitle = document.querySelector(".order-header h1");
  const tableInfo = document.querySelector("#table-info"); // Asegúrate de que el HTML tenga un elemento con id 'table-info'

  // Actualizar la interfaz según el modo seleccionado
  if (mode === "local") {
    // Cambiar el título para 'local'
    orderTitle.textContent = "Local";

    //Mostrar boton para llamar al mozo
    callWaiterButton.classList.remove("hidden"); // Elimina la clase 'hidden'

    callWaiterButton.addEventListener("click", () => {
      // Mostrar ventana de confirmación
      const isConfirmed = confirm(
        "¿Estás seguro de que deseas llamar al mozo?"
      );

      if (isConfirmed) {
        // Mostrar el aviso de confirmación
        callWaiterMessage.classList.remove("hidden");

        // Ocultar el aviso después de unos segundos
        setTimeout(() => {
          callWaiterMessage.classList.add("hidden");
        }, 80000); // Ocultar después de 3 segundos
      }
    });

    // Mostrar el número de mesa si está disponible
    if (tableNumber) {
      tableInfo.textContent = `Mesa: ${tableNumber}`;
    } else {
      tableInfo.textContent = ""; // Ocultar el número de mesa si no está disponible
    }
  } else if (mode === "delivery") {
    // Cambiar el título para 'delivery'
    orderTitle.textContent = "Delivery";
    // Ocultar el número de mesa ya que no aplica para 'delivery'
    tableInfo.textContent = "";
  }

  // Función para cargar los datos del archivo JSON
  function loadMenu() {
    fetch("../menu.json")
      .then((response) => response.json())
      .then((data) => {
        menuData = data;
        filterMenu("entradas"); // Carga la categoría inicial
      })
      .catch((error) => console.error("Error loading menu:", error));
  }

  // Función para filtrar y mostrar elementos del menú según la categoría
  function filterMenu(category) {
    menuItemsContainer.innerHTML = ""; // Limpia el contenedor de items

    if (menuData[category]) {
      menuData[category].forEach((item) => {
        const menuItem = document.createElement("div");
        menuItem.className = `menu-item ${category}`;
        menuItem.innerHTML = `
              <div class="item-image">
              <img src="${item.image}" alt="${item.name}" />
              </div>
              <div class="item-info">
                <h2>${item.name}</h2>
                <div class="description"><p>${item.description}<p/></div> 
                <div class="button-container">
                <p class="price">$${item.price}</p>
                  <button class="btn-minus">-</button>
                  <button class="btn-plus">+</button>
                </div>
              </div>
            `;
        menuItemsContainer.appendChild(menuItem);

        // Añadir event listeners a los botones
        const plusButton = menuItem.querySelector(".btn-plus");
        const minusButton = menuItem.querySelector(".btn-minus");

        plusButton.addEventListener("click", () => addToCart(item));
        minusButton.addEventListener("click", () => removeFromCart(item));
      });
    }
  }

  // Función para vaciar el carrito
  function clearCart() {
    for (const key in cart) {
      delete cart[key]; // Elimina cada propiedad del carrito
    }
    updateCartUI(); // Actualiza la interfaz del carrito
  }

  // Agrega un event listener al botón de cancelar
  document
    .querySelector(".cancel-order")
    .addEventListener("click", function () {
      // Mostrar un mensaje de confirmación
      const isConfirmed = confirm(
        "¿Estás seguro de que deseas cancelar? Todos los items del carrito se perderán."
      );

      // Si el usuario confirma, llamar a la función clearCart
      if (isConfirmed) {
        clearCart();
      }
    });

  // Agrega un event listener al botón de cancelar
  document.querySelector(".cancel-order").addEventListener("click", clearCart);

  // Función para añadir un item al carrito
  function addToCart(item) {
    if (cart[item.name]) {
      cart[item.name].quantity += 1;
    } else {
      cart[item.name] = { ...item, quantity: 1 };
    }
    updateCartUI();
  }

  // Función para quitar un item del carrito
  function removeFromCart(item) {
    if (cart[item.name]) {
      if (cart[item.name].quantity > 1) {
        cart[item.name].quantity -= 1;
      } else {
        delete cart[item.name];
      }
      updateCartUI();
    }
  }

  // Función para actualizar la interfaz del carrito
  function updateCartUI() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalAmount = document.getElementById("cart-total-amount");

    cartItemsContainer.innerHTML = ""; // Limpia el contenedor de items del carrito

    let total = 0;

    // Agrega los items del carrito al contenedor
    for (const [name, item] of Object.entries(cart)) {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
      <p>${item.name} (x${item.quantity}) - ${item.price}</p>
    `;
      cartItemsContainer.appendChild(cartItem);

      // Suma el precio total
      total += item.price * item.quantity;
    }

    // Actualiza el total del carrito
    cartTotalAmount.textContent = `$${total.toFixed(2)}`;
  }

  // Añade un evento de clic a cada botón de categoría
  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      tabs.forEach((t) => t.classList.remove("active")); // Quita la clase 'active' de todos los botones
      this.classList.add("active"); // Añade la clase 'active' al botón clicado

      const category = this.getAttribute("data-category");
      filterMenu(category); // Filtra y muestra los elementos de la categoría clicada
    });
  });

  document.querySelectorAll(".menu-item").forEach((item, index) => {
    item.addEventListener("click", () => {
      showPopup(dishes[index]);
    });
  });

  // Llama a la función para cargar los datos cuando el documento esté listo
  loadMenu();
});
