// Función para cargar las órdenes desde la base de datos
async function loadOrders() {
  try {
    const response = await fetch("api/orders"); // Cambia esta URL según tu configuración
    const orders = await response.json();

    const orderList = document.getElementById("order-list");
    orderList.innerHTML = ""; // Limpiar la lista antes de cargar
    orders.forEach((order) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.table_id}</td>
                <td>${order.type}</td>
                <td>${new Date(order.created_at).toLocaleString()}</td>
                <td>${order.status}</td>
            `;
      orderList.appendChild(row);
    });
  } catch (error) {
    console.error("Error cargando órdenes:", error);
  }
}

// Cargar órdenes al iniciar la página
document.addEventListener("DOMContentLoaded", loadOrders);
