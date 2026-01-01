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
const sessionsNumber = document.querySelector(".number-sessions span");
const progressBar = document.getElementById("progress-bar");
const lastWeekBtn = document.getElementById("last-week-stats");
const containerLastWeek = document.querySelector(".container-lastWeek");
const overlay = document.getElementById("overlay");
let clickSound = new Audio("./sounds/click.wav");

let timeLeft = 1500;
let state = "idle"; // idle, work, paused
let onBreak = false;

const Work_Time = 25 * 60;
const Break_Time = 5 * 60;

let countDown = null;

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

  if (state === "idle") {
    state = "work";
    timeLeft = Work_Time;
  }

  countDown = setInterval(updateTimer, 1);
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
  progressBar.style.width = progressPercent + "%";

  sessionsNumber.innerHTML = sessionsToday;
}

function handleEndSession() {
  if (onBreak) {
    saveTodaySession();
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
