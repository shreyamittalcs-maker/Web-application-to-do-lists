const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

window.onload = () => {
  loadTasks();
};

function addTask() {

  if (taskInput.value.trim() === "") {
    alert("Please enter a task");
    return;
  }

  const task = {
    text: taskInput.value,
    completed: false
  };

  createTaskElement(task);

  saveTask(task);

  taskInput.value = "";
}

function createTaskElement(task) {

  const li = document.createElement("li");

  if (task.completed) {
    li.classList.add("completed");
  }

  li.innerHTML = `
    <span>${task.text}</span>

    <div class="task-buttons">

      <button class="complete-btn">
        ✓
      </button>

      <button class="delete-btn">
        ✕
      </button>

    </div>
  `;

  const completeBtn = li.querySelector(".complete-btn");
  const deleteBtn = li.querySelector(".delete-btn");

  completeBtn.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateLocalStorage();
  });

  deleteBtn.addEventListener("click", () => {
    li.remove();
    updateLocalStorage();
  });

  taskList.appendChild(li);
}

function saveTask(task) {

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.push(task);

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );
}

function loadTasks() {

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(task => {
    createTaskElement(task);
  });
}

function updateLocalStorage() {

  const tasks = [];

  document.querySelectorAll("#taskList li").forEach(li => {

    tasks.push({
      text: li.querySelector("span").innerText,
      completed: li.classList.contains("completed")
    });

  });

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );
}