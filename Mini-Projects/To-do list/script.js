const toDoList = document.querySelector(".todo-list");
const btn = document.getElementById("add-task-button");
const text = document.getElementById("new-task-input");

let tasks = [];

text.addEventListener("keypress", (e) => {
  if (e.key === "Enter") btn.click();
});

btn.addEventListener("click", () => {
  let task = text.value;
  task = task.trim();
  if (task === "") return;

  addTaskToList(task);
  text.value = "";
});

toDoList.addEventListener("click", (e) => {
  if (e.target.type !== "checkbox") return;

  const id = Number(e.target.dataset.id);
  const task = tasks.find((t) => t.id === id);

  task.completed = e.target.checked;
  saveTasks();

  e.target.closest("li").classList.toggle("completed", task.completed);
});

function addTaskToList(task) {
  tasks.push({
    id: Date.now(),
    title: task,
    completed: false,
  });

  console.log(tasks);
  saveTasks();
  renderTasks();
}

function renderTasks() {
  toDoList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <input type="checkbox" id="${task.id}" data-id="${task.id}" ${
      task.completed ? "checked" : ""
    } />
    <label for="${task.id}">${task.title}</label>
    `;
    toDoList.appendChild(li);
  });
  console.log(tasks);
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  console.log(localStorage);
}

function loadTasks() {
  const stored = localStorage.getItem("tasks");
  if (stored) {
    tasks = JSON.parse(stored);
    renderTasks();
  }
}

loadTasks();
