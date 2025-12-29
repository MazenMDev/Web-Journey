// intialize variables
const topLeft = document.getElementById("top-left");
const topRight = document.getElementById("top-right");
const bottomRight = document.getElementById("bottom-right");
const bottomLeft = document.getElementById("bottom-left");
const code = document.getElementById("code");
const copyBtn = document.querySelector(".copy-btn");
const shape = document.getElementById("shape");
const parent = shape.parentElement;

let borderRadius = [0, 0, 0, 0];
let isDragging = false;
let draggingHandleIndex = null;

copyBtn.addEventListener("click", copyCode);

function copyCode() {
  const textarea = document.createElement("textarea");
  textarea.value = code.textContent;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  copyBtn.textContent = "Copied!";
}

copyBtn.addEventListener("mouseleave", () => {
  setTimeout(() => {
    copyBtn.textContent = "Copy";
  }, 1000);
});

// function to update border-radius
function updateBorderRadius() {
  shape.style.borderRadius = `${borderRadius[0]}% ${borderRadius[1]}% ${borderRadius[2]}% ${borderRadius[3]}%`;
  code.textContent = `${borderRadius[0]}% ${borderRadius[1]}% ${borderRadius[2]}% ${borderRadius[3]}%;`;
}

function handleMouse(index) {
  isDragging = true;
  draggingHandleIndex = index;
  document.body.style.userSelect = "none";
}

topLeft.addEventListener("mousedown", () => handleMouse(0));
topRight.addEventListener("mousedown", () => handleMouse(1));
bottomRight.addEventListener("mousedown", () => handleMouse(2));
bottomLeft.addEventListener("mousedown", () => handleMouse(3));

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const parentRect = parent.getBoundingClientRect();
  let x = e.clientX - parentRect.left;
  let y = e.clientY - parentRect.top;
  x = Math.max(0, Math.min(x, parentRect.width));
  y = Math.max(0, Math.min(y, parentRect.height));
  console.log("Mouse Move:");
  console.log(x, y);
  console.log(parentRect.top, parentRect.left);
  let percent = 0;
  let handle;

  switch (draggingHandleIndex) {
    case 0:
      percent =
        (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) /
          Math.sqrt(
            Math.pow(parentRect.width, 2) + Math.pow(parentRect.height, 2)
          )) *
        100;
      borderRadius[0] = percent.toFixed(2);
      handle = topLeft;
      break;

    case 1:
      let xRight = parentRect.width - x;
      percent =
        (Math.sqrt(Math.pow(xRight, 2) + Math.pow(y, 2)) /
          Math.sqrt(
            Math.pow(parentRect.width, 2) + Math.pow(parentRect.height, 2)
          )) *
        100;
      borderRadius[1] = percent.toFixed(2);
      handle = topRight;
      break;

    case 2:
      let xRight2 = parentRect.width - x;
      let yBottom2 = parentRect.height - y;
      percent =
        (Math.sqrt(Math.pow(xRight2, 2) + Math.pow(yBottom2, 2)) /
          Math.sqrt(
            Math.pow(parentRect.width, 2) + Math.pow(parentRect.height, 2)
          )) *
        100;
      borderRadius[2] = percent.toFixed(2);
      handle = bottomRight;
      break;

    case 3:
      let yBottom = parentRect.height - y;
      percent =
        (Math.sqrt(Math.pow(x, 2) + Math.pow(yBottom, 2)) /
          Math.sqrt(
            Math.pow(parentRect.width, 2) + Math.pow(parentRect.height, 2)
          )) *
        100;
      borderRadius[3] = percent.toFixed(2);
      handle = bottomLeft;
      break;
  }

  // update the handle position
  handle.style.left = `${x - handle.offsetWidth / 2}px`;
  handle.style.top = `${y - handle.offsetHeight / 2}px`;
  updateBorderRadius();
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  document.body.style.userSelect = "";
});
