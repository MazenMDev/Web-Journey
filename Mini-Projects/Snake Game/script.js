const board = document.querySelector(".board");
const reset = document.querySelector(".reset");
const scoreSpan = document.querySelector(".score span");
const bestScoreSpan = document.querySelector(".best-score span");
const svgSoundOn = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6"><path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" /><path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" /></svg>`;
const svgSoundOff = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6"><path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L20.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72-1.72-1.72Z" /></svg>`;
const gameOverSound = new Audio("sounds/gameOver.wav");
const resetSound = new Audio("sounds/reset.wav");

const muteBtn = document.createElement("button");
muteBtn.className = "mute-btn";

muteBtn.innerHTML = svgSoundOn;
document.body.appendChild(muteBtn);

let isMuted = false;

function updateMuteState() {
  gameOverSound.muted = isMuted;
  resetSound.muted = isMuted;
  muteBtn.innerHTML = isMuted ? svgSoundOff : svgSoundOn;
}

muteBtn.addEventListener("click", () => {
  isMuted = !isMuted;
  updateMuteState();
});

updateMuteState();

let bestScore = localStorage.getItem("bestScore") || 0;
bestScoreSpan.innerHTML = bestScore;
reset.style.display = "none";

let snake = [
  { x: 5, y: 5 },
  { x: 4, y: 5 },
  { x: 3, y: 5 },
];

let randomX = Math.floor(Math.random() * 20);
let randomY = Math.floor(Math.random() * 20);
console.log(randomX, randomY);
let fruit = { x: randomX, y: randomY };

let direction = "Right";
let lastDirection = "Left";
let requestedDirection = direction;
let count = 0;
let gameOver = false;

for (let i = 0; i < 400; i++) {
  const box = document.createElement("div");
  box.classList.add("box");
  box.style.height = "40px";
  box.style.width = "40px";
  box.style.backgroundColor = "black";
  board.appendChild(box);
}
const boxes = document.querySelectorAll(".box");

document.addEventListener("keydown", (e) => {
  if (e.key.startsWith("Arrow")) {
    requestedDirection = e.key.replace("Arrow", "");
  }
});

function renderSnake() {
  boxes.forEach((box) => {
    box.style.backgroundColor = "black";
  });

  snake.forEach((segment, index) => {
    const indexOnBoard = segment.y * 20 + segment.x;

    const factor = index / snake.length;

    const r = Math.floor(0 + factor * 0);
    const g = Math.floor(255 - factor * 150);
    const b = Math.floor(0 + factor * 0);

    boxes[indexOnBoard].style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  });

  const fruitIndex = fruit.y * 20 + fruit.x;
  boxes[fruitIndex].style.backgroundColor = "red";
}

function moveSnake(press) {
  if (
    (lastDirection === "Right" && requestedDirection !== "Left") ||
    (lastDirection === "Left" && requestedDirection !== "Right") ||
    (lastDirection === "Up" && requestedDirection !== "Down") ||
    (lastDirection === "Down" && requestedDirection !== "Up")
  ) {
    direction = requestedDirection;
  }

  const head = { ...snake[0] };

  if (direction === "Up") head.y--;
  if (direction === "Down") head.y++;
  if (direction === "Right") head.x++;
  if (direction === "Left") head.x--;

  snake.unshift(head);

  checkGameOver(head.x, head.y);

  const ateFruit = isFruitEaten(head.x, head.y);

  if (!ateFruit) {
    snake.pop();
  }

  console.log("head", head);

  lastDirection = direction;
}

function checkGameOver(x, y) {
  if (x < 0 || x >= 20 || y < 0 || y >= 20) gameOver = true;
  snake.forEach((segment, index) => {
    if (index === 0) return;
    if (x === segment.x && y === segment.y) {
      gameOver = true;
    }
  });
  if (!gameOver) return;
  clearInterval(gameLoop);
  reset.style.display = "block";
  board.classList.add("blurred");
  activeEatSounds.forEach((s) => {
    s.pause();
    s.currentTime = 0;
  });
  activeEatSounds = [];
  gameOverSound.play();
}

let activeEatSounds = [];

function isFruitEaten(x, y) {
  if (x !== fruit.x || y !== fruit.y) return false;

  const eat = new Audio("sounds/eat.wav");
  eat.muted = isMuted;
  eat.currentTime = 0;
  eat.play();
  activeEatSounds.push(eat);
  setTimeout(() => {
    eat.pause();
    activeEatSounds = activeEatSounds.filter((s) => s !== eat);
  }, 1000);
  let validPosition = false;
  while (!validPosition) {
    randomX = Math.floor(Math.random() * 20);
    randomY = Math.floor(Math.random() * 20);

    validPosition = true;
    for (let segment of snake) {
      if (randomX === segment.x && randomY === segment.y) {
        validPosition = false;
        break;
      }
    }
  }
  console.log(randomX, randomY);
  fruit = { x: randomX, y: randomY };
  updateScore();
  return true;
}

function updateScore() {
  scoreSpan.innerHTML = ++count;
  if (count > bestScore) {
    bestScore = count;
    bestScoreSpan.innerHTML = bestScore;
    localStorage.setItem("bestScore", bestScore);
  }
}

window.gameLoop = setInterval(() => {
  moveSnake();
  renderSnake();
}, 150);

reset.addEventListener("click", () => {
  resetSound.play();
  snake = [
    { x: 5, y: 5 },
    { x: 4, y: 5 },
    { x: 3, y: 5 },
  ];

  gameOver = false;

  randomX = Math.floor(Math.random() * 20);
  randomY = Math.floor(Math.random() * 20);
  console.log(randomX, randomY);
  fruit = { x: randomX, y: randomY };

  direction = "Right";
  lastDirection = "Left";
  requestedDirection = direction;
  reset.style.display = "none";
  board.classList.remove("blurred");
  count = 0;
  scoreSpan.innerHTML = 0;

  activeEatSounds.forEach((s) => {
    s.pause();
    s.currentTime = 0;
  });
  activeEatSounds = [];

  if (window.gameLoop) {
    clearInterval(window.gameLoop);
  }
  window.gameLoop = setInterval(() => {
    moveSnake();
    renderSnake();
  }, 150);
});
