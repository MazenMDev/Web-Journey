const panel = document.querySelectorAll(".panel");

panel.forEach((card) => {
  card.addEventListener("click", function () {
    const activeCard = card.classList.contains("active");
    panel.forEach((p) => {
      p.classList.remove("active");
    });
    if (!activeCard) card.classList.add("active");
  });
});
