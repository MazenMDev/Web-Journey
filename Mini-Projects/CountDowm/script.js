// declare the time
const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const countdownContainer = document.querySelector(".countdown-container");
let timerInterval = null;
let messageTimeout = null;

/*
we need to get the end time and current time then subtract it and 
get the time in seconds or ms
then we intialize days, hours, minutes, seconds 
*/

window.addEventListener("DOMContentLoaded", timerLoop);

function timerLoop() {
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
}

function pad(num) {
  return num.toString().padStart(2, "0");
}

function updateTimer() {
  // get current time in ms
  const now = new Date();
  // get newYear time in ms
  const nextYear = now.getFullYear() + 1;
  const newYearDate = new Date(`January 1, ${nextYear} 00:00:00`);
  const newYearTime = newYearDate.getTime();
  // get the remainTime
  const remainTime = newYearTime - now;

  if (remainTime <= 0) {
    clearInterval(timerInterval);
    days.innerHTML = "00";
    hours.innerHTML = "00";
    minutes.innerHTML = "00";
    seconds.innerHTML = "00";
    showNewYearMessage();
    // Show message for 24 hours, then restart countdown for next year
    messageTimeout = setTimeout(() => {
      removeNewYearMessage();
      timerLoop();
    }, 24 * 60 * 60 * 1000); // 24 hours in ms
    return;
  }

  days.innerHTML = pad(Math.floor(remainTime / (1000 * 60 * 60 * 24)));
  hours.innerHTML = pad(Math.floor((remainTime / (1000 * 60 * 60)) % 24));
  minutes.innerHTML = pad(Math.floor((remainTime / (1000 * 60)) % 60));
  seconds.innerHTML = pad(Math.floor((remainTime / 1000) % 60));
}

function showNewYearMessage() {
  // Remove any existing message first
  removeNewYearMessage();
  const message = document.createElement("div");
  message.id = "new-year-message";
  message.style.fontSize = "2rem";
  message.style.marginTop = "30px";
  message.style.color = "#2e8b57";
  message.textContent = "Happy New Year!";
  countdownContainer.appendChild(message);
}

function removeNewYearMessage() {
  const existing = document.getElementById("new-year-message");
  if (existing) {
    existing.remove();
  }
  if (messageTimeout) {
    clearTimeout(messageTimeout);
    messageTimeout = null;
  }
}
