const toDoList = document.querySelector(".todo-list");
const btn = document.getElementById("add-task-button");
const text = document.getElementById("new-task-input");
const clearBtn = document.getElementById("clear-tasks-button");
const modal = document.getElementById("clear-modal");
const confirmBtn = document.getElementById("confirm-clear-button");
const cancelBtn = document.getElementById("cancel-clear-button");
let tasks = [];

clearBtn.addEventListener("click", () => {
  modal.style.opacity = "1";
  modal.style.visibility = "visible";
});

confirmBtn.addEventListener("click", () => {
  tasks = [];
  saveTasks();
  renderTasks();
  modal.style.opacity = "0";
  modal.style.visibility = "hidden";
});

cancelBtn.addEventListener("click", () => {
  modal.style.opacity = "0";
  modal.style.visibility = "hidden";
});

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

toDoList.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete-task");
  if (!deleteBtn) return;

  const id = Number(deleteBtn.dataset.id);
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
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
    <button class="delete-task" data-id="${task.id}"><span>x</span></button>
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
