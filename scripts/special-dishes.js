document.addEventListener("DOMContentLoaded", function () {
  //Crear Dinamicamente las especialidades
  function loadSpecialItemsMenu() {
    fetch("../special-dishes.json")
      .then((response) => response.json())
      .then((data) => {
        const menuContainer = document.querySelector(".menu-container");

        data.forEach((dish) => {
          // Crear el contenedor del menú
          const menuItem = document.createElement("div");
          menuItem.className = "menu-item";

          // Crear y agregar la imagen
          const img = document.createElement("img");
          img.src = dish.image;
          img.alt = dish.alt;

          // Crear y agregar el nombre del plato
          const name = document.createElement("h3");
          name.textContent = dish.name;

          // Crear y agregar la descripción del plato
          const description = document.createElement("p");
          description.textContent = "Click para más info";

          // Añadir la imagen, nombre y descripción al contenedor del menú
          menuItem.appendChild(img);
          menuItem.appendChild(name);
          menuItem.appendChild(description);

          // Añadir un manejador de eventos de clic al plato
          menuItem.addEventListener("click", () => showPopup(dish));

          // Añadir el contenedor del menú a la sección
          menuContainer.appendChild(menuItem);
        });
      })
      .catch((error) => console.error("Error loading JSON:", error));
  }

  function showPopup(dish) {
    // Crear el pop-up dinámicamente
    const popup = document.createElement("div");
    popup.className = "dish-popup";
    popup.innerHTML = `
      <div class="popup-content">
        <span class="close-popup">&times;</span>
        <img src="${dish.image}" alt="${dish.alt}" />
        <h2>${dish.name}</h2>
        <p>${dish.description}</p>
        <p><strong>Ingredientes:</strong></p>
        <ul>
          ${dish.ingredients
            .map((ingredient) => `<li>${ingredient}</li>`)
            .join("")}
        </ul>
        <p><strong>Categoría:</strong> ${dish.category}</p>
        <p><strong>Preparación:</strong><a href="${
          dish.youtubeLink
        }" target="_blank"> YouTube</a> </p>
      </div>
    `;

    // Añadir el pop-up al cuerpo del documento
    document.body.appendChild(popup);

    // Mostrar el pop-up
    popup.style.display = "flex";

    // Cerrar el pop-up cuando se haga clic en el botón de cerrar
    popup.querySelector(".close-popup").addEventListener("click", () => {
      document.body.removeChild(popup); // Eliminar el pop-up del DOM
    });

    // Cerrar el pop-up cuando se haga clic fuera del contenido
    window.addEventListener("click", (event) => {
      if (event.target === popup) {
        document.body.removeChild(popup); // Eliminar el pop-up del DOM
      }
    });
  }

  loadSpecialItemsMenu();
});
