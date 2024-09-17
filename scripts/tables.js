// Ruta al archivo JSON
const jsonFilePath = "path/to/tables.json";

// Cargar el estado de las mesas desde el archivo JSON
async function loadTableStatus() {
  const response = await fetch(jsonFilePath);
  const data = await response.json();
  return data.tables;
}

// Guardar el estado de las mesas en el archivo JSON
async function saveTableStatus(tables) {
  // Aquí debes implementar la lógica para guardar el estado en el archivo JSON
  // En un entorno de desarrollo local, esto normalmente se hace en el servidor
  // Por ejemplo, con Node.js podrías usar el módulo `fs` para escribir en el archivo
}

// Actualizar la UI de las mesas
function updateTableUI(tables) {
  const tableElements = document.querySelectorAll(".table");

  tableElements.forEach((table) => {
    const tableId = parseInt(table.getAttribute("data-table-id"));
    const tableStatus = tables.find((t) => t.id === tableId).status;

    if (tableStatus === "occupied") {
      table.classList.add("occupied");
      table.classList.remove("free");
    } else {
      table.classList.add("free");
      table.classList.remove("occupied");
    }
  });
}

// Cambiar el estado de la mesa al hacer clic
function setupTableClickListeners(tables) {
  const tableElements = document.querySelectorAll(".table");

  tableElements.forEach((table) => {
    table.addEventListener("click", () => {
      const tableId = parseInt(table.getAttribute("data-table-id"));
      const tableData = tables.find((t) => t.id === tableId);

      if (tableData.status === "free") {
        tableData.status = "occupied";
      } else {
        tableData.status = "free";
      }

      updateTableUI(tables);
      saveTableStatus(tables);
    });
  });
}

// Inicializar la aplicación
async function init() {
  const tables = await loadTableStatus();
  updateTableUI(tables);
  setupTableClickListeners(tables);
}

// Llamar a la función de inicialización cuando el documento esté listo
document.addEventListener("DOMContentLoaded", init);
