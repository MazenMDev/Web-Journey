const input = document.querySelector(".input");
const btn = document.querySelector(".btn");
const search = document.querySelector(".search");
const spanNumber = document.querySelector("h2 span");
const projects = document.querySelector(".projects");
const cards = document.querySelectorAll(".project-card");
const suggest = document.querySelector(".autocomplete-container");

spanNumber.textContent = cards.length;

btn.addEventListener("click", toggleSearch);
input.addEventListener(
  "input",
  debounce(() => {
    handleSearch();
    showSuggestions(input.value.toLowerCase().trim());
  }, 300)
);

function toggleSearch() {
  search.classList.toggle("active");
  suggest.classList.toggle("active");
  input.focus();
}

function handleSearch() {
  const searchText = input.value.toLowerCase().trim();
  let found = false;

  cards.forEach((card) => {
    const title = getText(card, "h3");
    const description = getText(card, "p");

    const matches =
      searchText === "" ||
      title.includes(searchText) ||
      description.includes(searchText);

    card.classList.toggle("hidden", !matches);
    if (matches) found = true;
  });

  const visibleCards = Array.from(cards).filter(
    (card) => !card.classList.contains("hidden")
  );
  spanNumber.textContent = `Showing ${visibleCards.length} from ${cards.length}`;

  if (visibleCards.length == 1) projects.classList.add("single-result");
  else projects.classList.remove("single-result");

  toggleNoResultsMessage(found, searchText);
}

function toggleNoResultsMessage(found, searchText) {
  let mes = document.getElementById("no-results-msg");
  if (!found && searchText !== "") {
    if (!mes) {
      mes = document.createElement("div");
      mes.id = "no-results-msg";
      mes.textContent = "No Results Found";
      projects.appendChild(mes);
    }
  } else {
    if (mes) mes.remove();
  }
}

function getText(card, selector) {
  return card.querySelector(`${selector}`).textContent.toLowerCase();
}

function debounce(func, delay) {
  let timeOut;
  return function (...args) {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function showSuggestions(searchText) {
  suggest.innerHTML = "";

  if (searchText === "") return;

  cards.forEach((card) => {
    const title = getText(card, "h3");
    const description = getText(card, "p");

    if (title.includes(searchText) || description.includes(searchText)) {
      const suggestion = document.createElement("div");
      suggestion.className = "suggestion";
      suggestion.textContent = card.querySelector("h3").textContent;

      suggestion.addEventListener("click", () => {
        input.value = suggestion.textContent;
        handleSearch();
        suggest.innerHTML = "";
      });

      suggest.appendChild(suggestion);
    }
  });
}
