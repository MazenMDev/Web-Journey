// what we need is
/*  
  work state -> ends -> break state -> ends -> work .... -> END of the session.
  timeline for 25min work and 5min break.
  count during one day how many end sessions -> save in array show best day in this week.
  how many hours spend per day and per week.
  sounds -> (for click, notification when finish work or break, for end of the session).
  User customization for timer, sessions.

  expand later
*/

const timer = document.getElementById("timer");
const start = document.getElementById("start");
const pause = document.getElementById("pause");
const reset = document.getElementById("reset");

let timeLeft = 1500;
let state = "idle";

const Work_Time = 25 * 60;
const Break_Time = 5 * 60;

let countDown = null;

start.addEventListener("click", startTimer);
pause.addEventListener("click", pauseTimer);
reset.addEventListener("click", resetTimer);

function startTimer() {
  if (countDown) return;

  if (state === "idle") {
    state = "work";
    timeLeft = Work_Time;
  }

  countDown = setInterval(updateTimer, 1000);
  updateUI();
  updateButtons();
}

function updateTimer() {
  timeLeft--;

  if (timeLeft <= 0) {
    clearInterval(countDown);
    countDown = null;
    changeState();
    return;
  }

  updateUI();
}

function pauseTimer() {
  if (!countDown) return;

  clearInterval(countDown);
  countDown = null;
  state = "paused";

  updateButtons();
}

function resetTimer() {
  clearInterval(countDown);
  countDown = null;

  state = "idle";
  timeLeft = Work_Time;

  updateUI();
  updateButtons();
}

function updateButtons() {
  if (state === "idle") {
    start.disabled = false;
    pause.disabled = true;
  } else if (state === "work" || state === "break") {
    start.disabled = true;
    pause.disabled = false;
  } else if (state === "paused") {
    start.disabled = false;
    pause.disabled = true;
  }

  start.style.cursor = start.disabled ? "not-allowed" : "pointer";
  pause.style.cursor = pause.disabled ? "not-allowed" : "pointer";

  start.style.boxShadow = start.disabled ? "none" : "0 2px 5px rgba(0,0,0,0.3)";
  pause.style.boxShadow = pause.disabled ? "none" : "0 2px 5px rgba(0,0,0,0.3)";
}

function updateUI() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  timer.textContent = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
}

function changeState() {
  if (state === "work") {
    state = "break";
    timeLeft = Break_Time;
  } else if (state === "break") {
    state = "work";
    timeLeft = Work_Time;
  }

  updateUI();
  updateButtons();
}
