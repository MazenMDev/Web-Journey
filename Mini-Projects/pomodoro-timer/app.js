// Buttons
const lastWeekBtn = document.getElementById("last-week-stats");
const switchBtn = document.getElementById("switch-btn");
const saveBtn = document.getElementById("save-customization");
const closeBtn = document.getElementById("close-customization");
const editBtn = document.getElementById("customize-btn");
// Containers
const containerLastWeek = document.querySelector(".container-lastWeek");
const containerCustomize = document.querySelector(".customization-container");
// Inputs
const workInput = document.getElementById("work-duration");
const breakInput = document.getElementById("break-duration");
// Sounds
const clickSound = new Audio("./sounds/click.wav");
const endWorkSound = new Audio("./sounds/end_work.wav");
const endSessionSound = new Audio("./sounds/end_session.mp3");
// Other elements
const timer = document.getElementById("timer");
const overlay = document.getElementById("overlay");
const reset = document.getElementById("reset");
const sessionsNumber = document.querySelector(".number-sessions span");
const progressBar = document.getElementById("progress-bar");
const title = document.querySelector("title");

// Timer variables
let Work_Time = 25 * 60;
let Break_Time = 5 * 60;
let timeLeft = Work_Time;
let state = "idle"; // idle, work, paused
let onBreak = false;

// Timer interval
let countDown = null;
let endTime = null;

// Stats variables
let stats = {};
let today = getTodayDate();
let sessionsToday = 0;

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
lastWeekBtn.addEventListener("click", getLastWeekStats);
editBtn.addEventListener("click", customizeSession);

function customizeSession() {
  containerCustomize.classList.add("show");
  overlay.style.display = "block";
  workInput.focus();

  saveBtn.addEventListener("click", () => {
    const workDuration = parseInt(workInput.value);
    const breakDuration = parseInt(breakInput.value);
    if (workDuration > 0) {
      Work_Time = workDuration * 60;
    }
    if (breakDuration > 0) {
      Break_Time = breakDuration * 60;
    }
    resetTimer();
    containerCustomize.classList.remove("show");
    overlay.style.display = "none";
    localStorage.setItem("customWorkTime", Work_Time);
    localStorage.setItem("customBreakTime", Break_Time);
    alert("Customization Saved!");
  });

  closeBtn.addEventListener("click", () => {
    containerCustomize.classList.remove("show");
    overlay.style.display = "none";
  });

  overlay.addEventListener("click", () => {
    containerCustomize.classList.remove("show");
    overlay.style.display = "none";
  });
}

function setSwitchBtnUI(text) {
  switchBtn.innerHTML = text;
  if (text === "Pause") {
    switchBtn.style.boxShadow = "none";
    switchBtn.style.transform = "translateY(0)";
  } else if (text === "Start" && !onBreak) {
    switchBtn.style.boxShadow = "0 5px 5px var(--secondry)";
    switchBtn.style.transform = "translateY(-6px)";
  } else {
    switchBtn.style.boxShadow = "0 5px 5px var(--accent)";
    switchBtn.style.transform = "translateY(-6px)";
  }
}

function startTimer() {
  if (countDown) return;
  endTime = Date.now() + timeLeft * 1000;

  if (state === "idle") {
    state = "work";
    timeLeft = Work_Time;
  }

  countDown = setInterval(updateTimer, 1000);
  updateUI();
}

function updateTimer() {
  timeLeft = Math.round((endTime - Date.now()) / 1000);
  title.textContent = `(${Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0")}:${(timeLeft % 60)
    .toString()
    .padStart(2, "0")}) Pomodoro Timer`;

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
  timeLeft = Math.round((endTime - Date.now()) / 1000);
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
  progressBar.style.width = progressPercent + "%";

  sessionsNumber.innerHTML = sessionsToday;
}

function handleEndSession() {
  if (onBreak) {
    saveTodaySession();
    onBreak = false;
    state = "idle";
    timeLeft = Work_Time;
    endSessionSound.play();
    document.body.classList.remove("break-mode");
  } else {
    onBreak = true;
    state = "paused";
    timeLeft = Break_Time;
    endWorkSound.play();
    document.body.classList.add("break-mode");
  }

  updateUI();
  setSwitchBtnUI("Start");
}

function saveTodaySession() {
  if (!stats[today]) {
    stats[today] = {
      sessions: 0,
      workMinutes: 0,
    };
  }
  stats[today].sessions++;
  stats[today].workMinutes += Work_Time / 60;
  sessionsToday++;
  saveStatsToLocalStorage();
}

function saveStatsToLocalStorage() {
  localStorage.setItem("pomodoroStats", JSON.stringify(stats));
}

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

document.addEventListener("DOMContentLoaded", () => {
  const savedStats = localStorage.getItem("pomodoroStats");
  const customWorkTime = localStorage.getItem("customWorkTime");
  const customBreakTime = localStorage.getItem("customBreakTime");
  if (savedStats) {
    stats = JSON.parse(savedStats);
  }
  if (customWorkTime) {
    Work_Time = parseInt(customWorkTime);
    timeLeft = Work_Time;
  }
  if (customBreakTime) {
    Break_Time = parseInt(customBreakTime);
  }
  today = getTodayDate();
  if (stats[today]) {
    sessionsToday = stats[today].sessions;
  } else {
    stats[today] = {
      sessions: 0,
      workMinutes: 0,
    };
  }

  updateUI();
});

function getLastWeekStats() {
  const todayDate = new Date();
  let lastWeekStats = [];

  for (let i = 6; i >= 0; i--) {
    let date = new Date(todayDate);
    date.setDate(todayDate.getDate() - i);
    let dateString = date.toISOString().split("T")[0];
    if (stats[dateString]) {
      lastWeekStats.push({
        date: dateString,
        sessions: stats[dateString].sessions,
        workMinutes: stats[dateString].workMinutes,
      });
    } else {
      lastWeekStats.push({
        date: dateString,
        sessions: 0,
        workMinutes: 0,
      });
    }
  }
  console.log("Last Week Stats:", lastWeekStats);
  showLastWeekStats(lastWeekStats);
}

function showLastWeekStats(lastWeekStats) {
  let html = `
    <h2 class = "last-week-stats-title">Last Week Stats</h2>
    <ul class = "last-week-stats-list">
      ${lastWeekStats
        .map(
          (dayStat) => `
        <li>
          <strong>${dayStat.date}:</strong> ${dayStat.sessions} sessions, ${dayStat.workMinutes} minutes worked
        </li>
      `
        )
        .join("")}
    </ul>
    <span class="best-day">Best Day: 
      ${
        lastWeekStats.reduce((best, current) =>
          current.sessions > best.sessions ? current : best
        ).date
      }
    </span>
  `;
  containerLastWeek.style.display = "block";
  containerLastWeek.innerHTML = html;
  overlay.style.display = "block";

  overlay.addEventListener("click", () => {
    containerLastWeek.style.display = "none";
    overlay.style.display = "none";
  });
}
