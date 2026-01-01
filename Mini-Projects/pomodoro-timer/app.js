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
const switchBtn = document.getElementById("switch-btn");
const reset = document.getElementById("reset");
let clickSound = new Audio("./sounds/click.wav");

let timeLeft = 1500;
let state = "idle"; // idle, work, paused
let onBreak = false;

const Work_Time = 25 * 60;
const Break_Time = 5 * 60;

let countDown = null;

switchBtn.addEventListener("click", () => {
  clickSound.play();

  if (state === "idle" || state === "paused") {
    startTimer();
    state = "work";
    setSwitchBtnUI("Pause");
  } else if (state === "work") {
    pauseTimer();
    state = "paused";
    setSwitchBtnUI("Start");
  }
});

reset.addEventListener("click", resetTimer);

function setSwitchBtnUI(text) {
  switchBtn.innerHTML = text;
  if (text === "Pause") {
    switchBtn.style.boxShadow = "none";
    switchBtn.style.transform = "translateY(0)";
  } else {
    switchBtn.style.boxShadow = "0 5px 5px var(--secondry)";
    switchBtn.style.transform = "translateY(-2px)";
  }
}

function startTimer() {
  if (countDown) return;

  if (state === "idle" || (state === "paused" && onBreak)) {
    state = "work";
    timeLeft = onBreak ? Break_Time : Work_Time;
  }

  countDown = setInterval(updateTimer, 1000);
  updateUI();
}

function updateTimer() {
  timeLeft--;

  if (timeLeft <= 0) {
    clearInterval(countDown);
    countDown = null;
    handleEndSession();
    return;
  }

  updateUI();
}

function pauseTimer() {
  if (!countDown) return;
  clearInterval(countDown);
  countDown = null;
  state = "paused";
}

function resetTimer() {
  clearInterval(countDown);
  countDown = null;

  state = "idle";
  onBreak = false;
  timeLeft = Work_Time;

  updateUI();
  setSwitchBtnUI("Start");
}

function updateUI() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  timer.textContent = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  let totalTime = onBreak ? Break_Time : Work_Time;
  let progressPercent = ((totalTime - timeLeft) / totalTime) * 100;
  document.getElementById("progress-bar").style.width = progressPercent + "%";
}

function handleEndSession() {
  if (onBreak) {
    onBreak = false;
    state = "idle";
    timeLeft = Work_Time;
  } else {
    onBreak = true;
    state = "paused";
    timeLeft = Break_Time;
  }

  updateUI();
  setSwitchBtnUI("Start");
}
