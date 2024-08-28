/*stars.forEach((star) => {
  star.addEventListener("click", () => {
    const rating = star.getAttribute("data-value");
    ratingValue.textContent = rating;

    // Quitar la clase 'selected' de todas las estrellas
    stars.forEach((s) => s.classList.remove("selected"));

    // Agregar la clase 'selected' a las estrellas seleccionadas y anteriores
    star.classList.add("selected");
    let previousSibling = star.previousElementSibling;
    while (previousSibling) {
      previousSibling.classList.add("selected");
      previousSibling = previousSibling.previousElementSibling;
    }
  });
});
*/
