const btn = document.querySelector(".btn");
const input = document.querySelector(".input");
const search = document.querySelector(".search");
const cards = document.querySelectorAll(".project-card");
const projects = document.querySelector("main.projects");

// Toggle search bar
btn.addEventListener("click", () => {
  search.classList.toggle("active");
  input.focus();
});

// Filter cards
function filterCards() {
  const text = input.value.toLowerCase().trim();
  let found = false;

  cards.forEach((card) => {
    const title =
      card.querySelector(".card-body h3")?.textContent.toLowerCase() || "";
    const desc =
      card.querySelector(".card-body p")?.textContent.toLowerCase() || "";
    const attr = card.getAttribute("data-title")?.toLowerCase() || "";

    if (
      text === "" ||
      title.includes(text) ||
      desc.includes(text) ||
      attr.includes(text)
    ) {
      card.style.display = "";
      found = true;
    } else {
      card.style.display = "none";
    }
  });

  // when there's a query, constrain visible results to a thinner layout
  if (input.value.trim() !== "") {
    projects.classList.add("search-active");
  } else {
    projects.classList.remove("search-active");
  }

  // Count visible cards and set a class when exactly one result exists.
  const visibleCards = Array.from(cards).filter(
    (c) => c.style.display !== "none"
  );

  if (visibleCards.length === 1 && input.value.trim() !== "") {
    projects.classList.add("single-result");
  } else {
    projects.classList.remove("single-result");
  }

  showMessage(!found);
}

// Show no-results message
function showMessage(show) {
  let msg = document.getElementById("no-results-msg");

  if (show) {
    if (!msg) {
      msg = document.createElement("div");
      msg.id = "no-results-msg";
      msg.textContent = "No projects match your search.";
      msg.style.textAlign = "center";
      msg.style.padding = "2rem";
      msg.style.color = "#777";
      projects.appendChild(msg);
    }
  } else {
    if (msg) msg.remove();
  }
}

input.addEventListener("input", filterCards);
