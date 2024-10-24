// Función para cargar los items del menú
async function loadMenuItems() {
  try {
    const response = await fetch("../controllers/MenuController.php");
    const menuItems = await response.json();
    console.log(menuItems);

    const menuListBody = document.getElementById("menu-list-body");
    menuListBody.innerHTML = ""; // Limpiar la lista antes de cargar

    // Iterar sobre cada categoría de menú
    for (const category in menuItems) {
      const items = menuItems[category];
      items.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.description}</td> <!-- Cambiado para mostrar la categoría -->
                <td>${category}</td> <!-- Cambiado para mostrar la categoría -->
            `;
        menuListBody.appendChild(row);
      });
    }
  } catch (error) {
    console.error("Error cargando items del menú:", error);
  }
}

// Función para agregar un nuevo item del menú
async function addMenuItem(event) {
  event.preventDefault();

  const newItem = {
    name: document.getElementById("name").value,
    category: document.getElementById("category").value,
    price: parseFloat(document.getElementById("price").value),
    description: document.getElementById("description").value,
  };

  try {
    const response = await fetch("api/menu-items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });

    if (response.ok) {
      loadMenuItems(); // Recargar items después de agregar
      closeModal();
    } else {
      console.error("Error al agregar item:", response.statusText);
    }
  } catch (error) {
    console.error("Error al agregar item:", error);
  }
}

// Funciones para manejar el modal
function openModal() {
  document.getElementById("add-menu-item-modal").style.display = "block";
}

function closeModal() {
  document.getElementById("add-menu-item-modal").style.display = "none";
}

// Cargar items del menú al iniciar la página
document.addEventListener("DOMContentLoaded", loadMenuItems);

// Eventos para botones
document
  .getElementById("add-menu-item-button")
  .addEventListener("click", openModal);
document
  .getElementById("add-menu-item-form")
  .addEventListener("submit", addMenuItem);
document.querySelector(".close").addEventListener("click", closeModal);
