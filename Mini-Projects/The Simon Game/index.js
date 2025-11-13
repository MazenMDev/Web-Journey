const buttonColors = ["red", "green", "blue", "yellow"];

let level = 0;
let started = false;
let maxScore = 0;

let gamePattern = [];
let clickPattern = [];

document.addEventListener("keypress", function () {
  if (!started) {
    document.getElementById("level-title").textContent = `Level ${level}`;

    nextSequence();
    started = true;
  }
});

const buttons = document.querySelectorAll(".btn");
buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    let userClicked = button.getAttribute("id");
    clickPattern.push(userClicked);
    playSound(userClicked);
    animateButton(userClicked);
    checkAnswer(clickPattern.length - 1);
  });
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === clickPattern[currentLevel]) {
    if (gamePattern.length === clickPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    document.body.classList.add("game-over");
    setTimeout(function () {
      document.body.classList.remove("game-over");
    }, 200);
    document.getElementById("level-title").textContent =
      "Game Over, Press Any Key to Restart";
    startAgain();
  }
}

function nextSequence() {
  clickPattern = [];
  level++;
  document.getElementById("level-title").textContent = `Level ${level}`;
  document.getElementById("max-score").textContent = maxScore;
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  let button = document.getElementById(randomChosenColor);
  button.style.opacity = "0";
  setTimeout(() => {
    button.style.opacity = "1";
    setTimeout(() => {
      button.style.opacity = "0";
      setTimeout(() => {
        button.style.opacity = "1";
      }, 100);
    }, 100);
  }, 100);

  playSound(randomChosenColor);
}

function playSound(name) {
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function animateButton(currentColor) {
  let button = document.getElementById(currentColor);
  button.classList.add("pressed");
  setTimeout(() => {
    button.classList.remove("pressed");
  }, 100);
}

function startAgain() {
  if (level > maxScore) maxScore = level;
  document.getElementById("max-score").textContent = maxScore;
  level = 0;
  gamePattern = [];
  clickPattern = [];
  started = false;
}
