const toDoList = document.querySelector(".todo-list");
const btn = document.getElementById("add-task-button");
const text = document.getElementById("new-task-input");

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

function addTaskToList(task) {
  const uniqueId = Date.now();
  const list = document.createElement("li");
  const inner = `
  <input type="checkbox" id="${uniqueId}" />
  <label for="${uniqueId}">${task}</label>
  `;
  list.innerHTML = inner;
  toDoList.appendChild(list);
}
