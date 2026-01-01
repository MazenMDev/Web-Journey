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
const btns = document.querySelectorAll(".btn");
const start = document.getElementById("start");
const pause = document.getElementById("pause");
const reset = document.getElementById("reset");

let workTime = 1500;
let minNumber = 25;
let secNumber = 0;
let breakTime = 300;
let work = true;

let countDown = null;

start.addEventListener("click", () => {
  if (countDown !== null) return;
  countDown = setInterval(() => {
    if (secNumber === 0) {
      if (minNumber === 0) {
        clearInterval(countDown);
        countDown = null;
        changeState();
        work = work ? false : true;
      } else {
        minNumber--;
        secNumber = 59;
      }
    } else {
      secNumber--;
    }
    updateUI();
  }, 1000);
  resetButtons();
  start.style.cursor = "not-allowed";
  start.style.boxShadow = "none";
});

pause.addEventListener("click", () => {
  clearInterval(countDown);
  countDown = null;
  resetButtons();
  pause.style.cursor = "not-allowed";
  pause.style.boxShadow = "none";
});

reset.addEventListener("click", () => {
  clearInterval(countDown);
  countDown = null;
  if (work) {
    minNumber = 25;
    secNumber = 0;
  } else {
    minNumber = 5;
    secNumber = 0;
  }
  updateUI();
  resetButtons();
});

function resetButtons() {
  start.style.cursor = "pointer";
  start.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.3)";
  pause.style.cursor = "pointer";
  pause.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.3)";
  reset.style.cursor = "pointer";
  reset.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.3)";
}

function updateUI() {
  const minStr = minNumber.toString().padStart(2, "0");
  const secStr = secNumber.toString().padStart(2, "0");
  timer.innerHTML = `${minStr}:${secStr}`;
}

function changeState() {
  if (work) {
    minNumber = 5;
    secNumber = 59;
  } else {
    minNumber = 25;
    secNumber = 59;
  }
  updateUI();
  start.click();
}
