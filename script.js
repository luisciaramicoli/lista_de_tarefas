// Seleção de elementos
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const filterButtons = document.querySelectorAll(".filters button");

// Array para armazenar tarefas
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Função para renderizar as tarefas
function renderTasks(filter = "all") {
  taskList.innerHTML = "";

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true; // "all"
  });

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "task completed" : "task";
    li.innerHTML = `
      <span>${task.text}</span>
      <div class="actions">
        <button class="complete-btn" onclick="toggleComplete(${index})">✔</button>
        <button class="delete-btn" onclick="deleteTask(${index})">❌</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

// Adicionar nova tarefa
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const taskText = taskInput.value.trim();
  if (!taskText) return;

  tasks.push({ text: taskText, completed: false });
  saveTasks();
  renderTasks();
  taskInput.value = "";
});

// Alternar tarefa como completa
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Excluir tarefa
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Filtrar tarefas
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");
    renderTasks(filter);

    // Atualizar botão ativo
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

// Salvar tarefas no localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Renderizar tarefas ao carregar a página
renderTasks();
