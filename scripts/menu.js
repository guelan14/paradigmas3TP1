document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab");
  const menuItemsContainer = document.querySelector(".menu-items");
  const callWaiterButton = document.getElementById("call-waiter");
  const callWaiterMessage = document.getElementById("call-waiter-message");

  let menuData = {}; // Variable para almacenar los datos del menú

  // Obtener los parámetros de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const mode = urlParams.get("mode"); // 'local' o 'delivery'
  const tableNumber = urlParams.get("table"); // Número de mesa si está disponible

  // Obtener los elementos donde se mostrará el título, el número de mesa
  const orderTitle = document.querySelector(".order-header h1");
  const tableInfo = document.querySelector("#table-info");

  // Actualizar la interfaz según el modo seleccionado
  if (mode === "local") {
    orderTitle.textContent = "Local";
    callWaiterButton.classList.remove("hidden");
    callWaiterButton.addEventListener("click", () => {
      const isConfirmed = confirm(
        "¿Estás seguro de que deseas llamar al mozo?"
      );
      if (isConfirmed) {
        callWaiterMessage.classList.remove("hidden");
        setTimeout(() => {
          callWaiterMessage.classList.add("hidden");
        }, 80000);
      }
    });
    tableInfo.textContent = tableNumber ? `Mesa: ${tableNumber}` : "";
  } else if (mode === "delivery") {
    orderTitle.textContent = "Delivery";
    tableInfo.textContent = "";
  }

  // Cargar datos del menú
  function loadMenu() {
    fetch("../menu.json")
      .then((response) => response.json())
      .then((data) => {
        menuData = data;
        filterMenu("entradas");
      })
      .catch((error) => console.error("Error loading menu:", error));
  }

  // Filtrar menú por categoría
  function filterMenu(category) {
    menuItemsContainer.innerHTML = "";
    if (menuData[category]) {
      menuData[category].forEach((item) => {
        const menuItem = document.createElement("div");
        menuItem.className = `menu-item ${category}`;
        menuItem.innerHTML = `
          <div class="item-image"><img src="${item.image}" alt="${item.name}" /></div>
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

        const plusButton = menuItem.querySelector(".btn-plus");
        const minusButton = menuItem.querySelector(".btn-minus");

        plusButton.addEventListener("click", () => addToCart(item));
        minusButton.addEventListener("click", () => removeFromCart(item));
      });
    }
  }

  // Añadir evento a tabs
  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      tabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
      const category = this.getAttribute("data-category");
      filterMenu(category);
    });
  });

  // Cargar menú
  loadMenu();
});
