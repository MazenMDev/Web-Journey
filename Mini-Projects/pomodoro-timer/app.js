const timer = document.getElementById("timer");
const switchBtn = document.getElementById("switch-btn");
const reset = document.getElementById("reset");
const sessionsNumber = document.querySelector(".number-sessions span");
const progressBar = document.getElementById("progress-bar");
const lastWeekBtn = document.getElementById("last-week-stats");
const containerLastWeek = document.querySelector(".container-lastWeek");
const editBtn = document.getElementById("customize-btn");
const overlay = document.getElementById("overlay");
const containerCustomize = document.querySelector(".customization-container");
const saveBtn = document.getElementById("save-customization");
const closeBtn = document.getElementById("close-customization");
const clickSound = new Audio("./sounds/click.wav");
const endWorkSound = new Audio("./sounds/end_work.wav");
const endSessionSound = new Audio("./sounds/end_session.mp3");

let timeLeft = 1500;
let state = "idle"; // idle, work, paused
let onBreak = false;

let Work_Time = 25 * 60;
let Break_Time = 5 * 60;

let countDown = null;
let endTime = null;

let sessionsToday = 0;
let stats = {};
let today = getTodayDate();

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

  saveBtn.addEventListener("click", () => {
    const workInput = document.getElementById("work-duration").value;
    const breakInput = document.getElementById("break-duration").value;
    if (workInput > 0) {
      Work_Time = workInput * 60;
    }
    if (breakInput > 0) {
      Break_Time = breakInput * 60;
    }
    resetTimer();
    containerCustomize.classList.remove("show");
    overlay.style.display = "none";
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
  } else {
    switchBtn.style.boxShadow = "0 5px 5px var(--secondry)";
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
  } else {
    onBreak = true;
    state = "paused";
    timeLeft = Break_Time;
    endWorkSound.play();
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
  if (savedStats) {
    stats = JSON.parse(savedStats);
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
