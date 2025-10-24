const inputs = document.querySelectorAll(".form-control input");

inputs.forEach((input) => {
  const label = input.nextElementSibling;

  // Animate each letter like before
  label.innerHTML = label.innerText
    .split("")
    .map(
      (letter, index) =>
        `<span style="transition-delay:${index * 20}ms">${letter}</span>`
    )
    .join("");

  // Events
  input.addEventListener("focus", () => updateLabelState(input, label, true));
  input.addEventListener("blur", () => updateLabelState(input, label, false));
  input.addEventListener("input", () => updateLabelState(input, label));

  // Initialize on page load
  updateLabelState(input, label);
});

function updateLabelState(input, label, isFocused = false) {
  const spans = label.querySelectorAll("span");

  if (isFocused || input.value.trim() !== "") {
    // Move label up
    spans.forEach((span) => {
      span.style.transform = "translateY(-30px)";
      span.style.color = "lightblue";
    });
  } else {
    // Move label down
    spans.forEach((span) => {
      span.style.transform = "translateY(0)";
      span.style.color = "white";
    });
  }
}
