const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  item.classList.remove("active");
  item.addEventListener("click", () => {
    faqItems.forEach((i) => i !== item && i.classList.remove("active"));
    item.classList.toggle("active");
  });
  console.log(item);
});
