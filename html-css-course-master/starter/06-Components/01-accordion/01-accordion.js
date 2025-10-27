const items = document.querySelectorAll(".item");
items.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.classList.contains("open")) {
      item.classList.remove("open");
      return;
    }
    items.forEach((otherItem) => {
      if (otherItem !== item) otherItem.classList.remove("open");
    });
    setTimeout(() => {
      item.classList.add("open");
    }, 200);
  });
});
