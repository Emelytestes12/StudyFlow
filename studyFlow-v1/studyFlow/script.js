// =====================
// FUNÇÃO DE NAVEGAÇÃO
// =====================
function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

// =====================
// TO-DO LIST
// =====================
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  let list = document.getElementById('taskList');
  list.innerHTML = "";
  tasks.forEach((t, i) => {
    list.innerHTML += `<li>
      <input type="checkbox" ${t.done ? "checked" : ""} onclick="toggleTask(${i})">
      ${t.text} <button onclick="deleteTask(${i})">X</button>
    </li>`;
  });
  updateProgress();
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  let input = document.getElementById('taskInput');
  if(input.value.trim() !== "") {
    tasks.push({ text: input.value, done: false });
    input.value = "";
    renderTasks();
  }
}

function toggleTask(i) {
  tasks[i].done = !tasks[i].done;
  renderTasks();
}

function deleteTask(i) {
  tasks.splice(i, 1);
  renderTasks();
}

renderTasks();

// =====================
// TIMER POMODORO
// =====================
let time = 25*60, timerInterval, running = false;

function updateTimer() {
  let min = Math.floor(time/60), sec = time%60;
  document.getElementById("timer").innerText = `${min}:${sec<10?"0":""}${sec}`;
}

function startTimer() {
  if(!running){
    running = true;
    timerInterval = setInterval(()=>{
      if(time > 0){ time--; updateTimer(); }
    }, 1000);
  }
}

function pauseTimer(){
  clearInterval(timerInterval);
  running = false;
}

function resetTimer(){
  clearInterval(timerInterval);
  time = 25*60;
  updateTimer();
  running = false;
}

updateTimer();

// =====================
// NOTAS RÁPIDAS
// =====================
let noteArea = document.getElementById("noteArea");
noteArea.value = localStorage.getItem("note") || "";

function saveNote(){
  localStorage.setItem("note", noteArea.value);
  alert("Nota salva!");
}

// =====================
// PROGRESSO
// =====================
function updateProgress() {
  let done = tasks.filter(t=>t.done).length;
  let total = tasks.length;
  document.getElementById("progressText").innerText =
    total === 0 ? "Nenhuma tarefa adicionada." : `Você concluiu ${done} de ${total} tarefas.`;
}
