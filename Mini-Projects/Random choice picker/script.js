const choices = [];
const textarea = document.getElementById("choices");
const container = document.querySelector(".choice-container");

textarea.addEventListener("keyup", (e) => {
  generateChoice(e.target.value);
  console.log(choices);
  if (e.key === "Enter") {
    textarea.value = "";
    randomSelect();
  }
});

function generateChoice(value) {
  const trimmedChoices = value
    .split(",")
    .filter((choice) => choice.trim() !== "")
    .map((choice) => choice.trim());

  choices.length = 0; // Clear existing choices
  choices.push(...trimmedChoices); // Add new choices
  container.innerHTML = "";

  trimmedChoices.forEach((choice) => {
    const choiceElement = document.createElement("span");
    choiceElement.className = "choice";
    choiceElement.innerText = choice;
    container.appendChild(choiceElement);
  });

  // value.split(",").forEach((choice) => {
  //   const trimmedChoice = choice.trim();
  //   if (trimmedChoice && !choices.includes(trimmedChoice)) {
  //     choices.push(trimmedChoice);

  //     const choiceElement = document.createElement("span");
  //     choiceElement.className = "choice";
  //     choiceElement.textContent = trimmedChoice;
  //     container.appendChild(choiceElement);
  //   }
  // });
}

function randomSelect() {
  const times = 30;
  let counter = 0;

  const interval = setInterval(() => {
    const randomChoiceElement = getRandomChoice();
    highlightChoice(randomChoiceElement);

    setTimeout(() => {
      unhighlightChoice(randomChoiceElement);
    }, 100);

    counter++;
    if (counter >= times) {
      clearInterval(interval);
      setTimeout(() => {
        const finalChoice = getRandomChoice();
        highlightChoice(finalChoice);
      }, 100);
    }
  }, 100);
}

function getRandomChoice() {
  const choiceElements = document.querySelectorAll(".choice");
  if (choiceElements.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * choiceElements.length);
  return choiceElements[randomIndex];
}

function highlightChoice(choiceElement) {
  if (choiceElement) {
    choiceElement.classList.add("highlight");
  }
}

function unhighlightChoice(choiceElement) {
  if (choiceElement) {
    choiceElement.classList.remove("highlight");
  }
}
