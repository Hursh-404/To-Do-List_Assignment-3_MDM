const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");
const emptyState = document.getElementById("empty-state");
const submitButton = document.getElementById("submit-button");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editingId = null;

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function(task) {
    const item = document.createElement("li");
    item.className = "task-item" + (task.completed ? " completed" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", "Mark task complete");
    checkbox.addEventListener("change", function() {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const title = document.createElement("span");
    title.className = "task-title";
    title.textContent = task.title;

    const actions = document.createElement("div");
    actions.className = "actions";

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function() {
      taskInput.value = task.title;
      editingId = task.id;
      submitButton.textContent = "Update task";
      taskInput.focus();
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete";
    deleteButton.addEventListener("click", function() {
      tasks = tasks.filter(function(item) {
        return item.id !== task.id;
      });
      saveTasks();
      renderTasks();
    });

    actions.append(editButton, deleteButton);
    item.append(checkbox, title, actions);
    taskList.appendChild(item);
  });

  const remaining = tasks.filter(function(task) {
    return !task.completed;
  }).length;
  taskCount.textContent = remaining + " remaining / " + tasks.length + " total";
  emptyState.hidden = tasks.length > 0;
}

taskForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const title = taskInput.value.trim();

  if (!title) return;

  if (editingId !== null) {
    const task = tasks.find(function(item) {
      return item.id === editingId;
    });
    if (task) task.title = title;
    editingId = null;
    submitButton.textContent = "Add task";
  } else {
    const newTask = {
      id: Date.now(),
      title: title,
      completed: false
    };
    tasks.push(newTask);
  }

  saveTasks();
  renderTasks();
  taskForm.reset();
  taskInput.focus();
});

renderTasks();
