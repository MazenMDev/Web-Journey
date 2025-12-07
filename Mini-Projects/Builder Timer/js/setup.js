const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const days = document.getElementById("days").value;
  const hours = document.getElementById("hours").value;
  const minutes = document.getElementById("minutes").value;
  const task = document.getElementById("task").value;

  localStorage.setItem("timer_days", days);
  localStorage.setItem("timer_hours", hours);
  localStorage.setItem("timer_minutes", minutes);
  localStorage.setItem("timer_task", task);

  const now = Date.now();
  const totalSeconds = days * 86400 + hours * 3600 + minutes * 60;
  const endTime = now + totalSeconds * 1000;
  localStorage.setItem("timer_endTime", endTime);

  window.location.href = "./timer.html";
});
