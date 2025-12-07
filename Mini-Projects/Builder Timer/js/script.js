const timerDisplay = document.querySelector(".timer");
const box = document.querySelector(".box");
const task = document.querySelector(".task");

task.textContent = localStorage.getItem("timer_task") || "No task set";

const originalTotal =
  parseInt(localStorage.getItem("timer_days")) * 86400 +
  parseInt(localStorage.getItem("timer_hours")) * 3600 +
  parseInt(localStorage.getItem("timer_minutes")) * 60;

const endTime = parseInt(localStorage.getItem("timer_endTime")); // in milliseconds

const interval = setInterval(() => {
  const now = Date.now(); // in milliseconds
  let remainingSeconds = Math.floor((endTime - now) / 1000); // in seconds

  if (remainingSeconds <= 0) {
    remainingSeconds = 0;
    clearInterval(interval);
    timerDisplay.textContent = "Time's up!";
    box.style.width = "100%";
  } else {
    const d = Math.floor(remainingSeconds / 86400);
    const h = Math.floor((remainingSeconds % 86400) / 3600);
    const m = Math.floor((remainingSeconds % 3600) / 60);
    const s = remainingSeconds % 60;
    if (h >= 1) {
      timerDisplay.textContent = `${d}d ${h}h ${m}m`;
    } else {
      timerDisplay.textContent = `${d}d ${h}h ${m}m ${s}s`;
    }

    const progress = (originalTotal - remainingSeconds) / originalTotal;
    box.style.width = `${progress * 100}%`;
  }
}, 1000);

const button = document.querySelector("button");
button.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "./finish.html";
});
