async function loadTables() {
  try {
    const response = await fetch("../tables.json");
    const data = await response.json();
    renderTables(data.tables);
  } catch (error) {
    console.error("Error loading tables:", error);
  }
}

function renderTables(tables) {
  const tablesContainer = document.querySelector(".tables-container");
  tablesContainer.innerHTML = ""; // Limpiar el contenedor

  tables.forEach((table) => {
    const tableLink = document.createElement("a");
    tableLink.href = `menu.html?mode=local&table=${table.id}`;
    tableLink.className = `table ${table.status}`;

    const img = document.createElement("img");
    img.src = `../imagenes/${
      table.status === "free" ? "freeTable.svg" : "occupiedTable.svg"
    }`;
    img.alt = table.status === "free" ? "Mesa Libre" : "Mesa Ocupada";

    const tableNumber = document.createElement("span");
    tableNumber.className = "table-number";
    tableNumber.textContent = `Mesa ${table.id}`;

    tableLink.appendChild(img);
    tableLink.appendChild(tableNumber);

    // Agregar el evento de clic para cambiar el estado de la mesa
    tableLink.addEventListener("click", (event) => {
      if (table.status === "free") {
        // Cambiar el estado a "occupied"
        table.status = "occupied";
      } else {
        event.preventDefault(); // Evitar el enlace si la mesa está ocupada
        alert(`Mesa ${table.id} ya está ocupada.`); // Mostrar un mensaje de alerta
      }
      renderTables(tables); // Volver a renderizar las mesas
    });

    tablesContainer.appendChild(tableLink);
  });
}

// Cargar las mesas cuando se carga el documento
document.addEventListener("DOMContentLoaded", loadTables);
