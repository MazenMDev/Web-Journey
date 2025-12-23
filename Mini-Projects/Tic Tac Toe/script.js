const container = document.querySelector(".container");
const boxes = document.querySelectorAll(".box");
const spans = document.querySelectorAll(".box span");
const btn = document.querySelector(".btn");
const header = document.querySelector("h1");

let board = Array(9).fill("");
let currentPlayer = "X";
let gameOver = false;


function renderMove(index, player) {
  const span = boxes[index].querySelector("span");
  span.innerHTML = player;
}

function renderResult(result) {
  if (result === "X" || result === "O") {
    header.innerHTML = `${result} is the winner`;
    gameOver = true;
  } else if (result === "draw") {
    header.innerHTML = "Draw";
    gameOver = true;
  }
}

function resetUI() {
  spans.forEach((span) => (span.innerHTML = ""));
  header.innerHTML = "Tic Tac Toe Game";
}

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
      return board[a]; 
    }
  }

  if (!board.includes("")) return "draw";

  return null;
}

btn.addEventListener("click", () => {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameOver = false;
  resetUI();
});
