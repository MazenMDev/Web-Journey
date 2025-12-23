const container = document.querySelector(".container");
const boxes = document.querySelectorAll(".box");
const spans = document.querySelectorAll(".box span");
const btn = document.querySelector(".btn");
const headerOne = document.querySelector("h1");
const headerTwo = document.querySelector("h2");

let board = Array(9).fill("");
let currentPlayer = "X";
let gameOver = false;
let saveCon = null;
let lastLoser = null;

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (gameOver) return;
    if (board[index] !== "") return;

    board[index] = currentPlayer;
    renderMove(index, currentPlayer);

    const result = getGameResult();
    if (result) renderResult(result);

    currentPlayer = currentPlayer === "X" ? "O" : "X";
  });
});

function renderMove(index, player) {
  const span = boxes[index].querySelector("span");
  span.innerHTML = player;
}

function renderResult(result) {
  if (result === "X" || result === "O") {
    renderWinner(result);
    lastLoser = result === "X" ? "O" : "X";
    gameOver = true;
  } else if (result === "draw") {
    headerOne.innerHTML = "Draw";
    gameOver = true;
  }
}

function renderWinner(winner) {
  headerOne.innerHTML = `${winner} is the winner`;
  const [a, b, c] = saveCon;
  boxes[a].style.backgroundColor = "var(--win-color)";
  boxes[b].style.backgroundColor = "var(--win-color)";
  boxes[c].style.backgroundColor = "var(--win-color)";
}

function resetUI() {
  spans.forEach((span) => (span.innerHTML = ""));
  boxes.forEach((box) => {
    box.style.backgroundColor = "var(--primary-color)";
  });
  headerOne.innerHTML = "Tic Tac Toe Game";
  headerTwo.innerHTML = `${lastLoser} Turn`;
}

function getGameResult() {
  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let win of wins) {
    const [a, b, c] = win;
    if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
      saveCon = win;
      return board[a];
    }
  }

  if (!board.includes("")) return "draw";

  return null;
}

btn.addEventListener("click", () => {
  board = Array(9).fill("");
  currentPlayer = lastLoser;
  gameOver = false;
  saveCon = null;
  resetUI();
});
