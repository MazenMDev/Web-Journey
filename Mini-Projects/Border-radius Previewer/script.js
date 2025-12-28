// intialize variables
const topLeft = document.getElementById("top-left");
const topRight = document.getElementById("top-right");
const bottomRight = document.getElementById("bottom-right");
const bottomLeft = document.getElementById("bottom-left");
const code = document.getElementById("code");
const copyBtn = document.querySelector(".copy-btn");

copyBtn.addEventListener("click", () => {
  copyCode();
  alert("Code Copied!");
});
function copyCode() {}

let radius = [
  { x: 100, y: 0 },
  { x: 0, y: 100 },
  { x: 100, y: 0 },
  { x: 0, y: 100 },
];

window.onload = () => {
  updateBorderRadius();
};

// Flag for dragging
let isDragging = false;

topLeft.addEventListener("mousedown", () => {
  isDragging = true;
  document.body.style.userSelect = "none";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  console.log(e.clientX, e.clientY); 
  const parent = document.querySelector(".generator");
  const rect = parent.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;

  // Constrain x and y within the parent box
  x = Math.max(0, Math.min(x, rect.width));
  y = Math.max(0, Math.min(y, rect.height));

  topLeft.style.left = `${x - topLeft.offsetWidth / 2}px`;
  topLeft.style.top = `${y - topLeft.offsetHeight / 2}px`;
});


document.addEventListener("mouseup", () => {
  isDragging = false;
  document.body.style.userSelect = "";
});
