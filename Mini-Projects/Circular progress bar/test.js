const setNumber = document.getElementById("input");
const setBtn = document.getElementById("btn");
const pNumber = document.querySelector(".number");
const circle = document.querySelector("circle");

const CIRCUMFERENCE = 2 * Math.PI * 70; // 439.82

let animationInterval = null;

circle.style.strokeDasharray = CIRCUMFERENCE;
circle.style.strokeDashoffset = CIRCUMFERENCE;

document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    setBtn.click();
  }
});

setBtn.addEventListener("click", () => {
  let val = parseInt(setNumber.value, 10);
  if (val > 0 && val <= 100) {
    animateProgress(val);
  } else {
    alert("Please enter a number between 1 and 100.");
  }
});

function animateProgress(target) {
  clearInterval(animationInterval);
  let counter = 0;
  pNumber.innerHTML = "0%";
  circle.style.strokeDashoffset = CIRCUMFERENCE;

  animationInterval = setInterval(() => {
    if (counter >= target) {
      clearInterval(animationInterval);
    } else {
      counter++;
      pNumber.innerHTML = counter + "%";
      circle.style.strokeDashoffset =
        CIRCUMFERENCE - (CIRCUMFERENCE * counter) / 100;
    }
  }, 20);
}
