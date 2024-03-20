let taskId = 0;
let timerIntervals = {};

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskName = taskInput.value.trim();
    if (taskName === "") return;

    taskId++;
    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");
    li.className = "task";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    checkbox.addEventListener("change", function () {
        if (this.checked) {
            clearInterval(timerIntervals[taskId]);
        } else {
            startTimer(taskId);
        }
    });
    const taskText = document.createElement("span");
    taskText.textContent = taskName;
    const timerSpan = document.createElement("span");
    timerSpan.id = `timer${taskId}`;
    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(timerSpan);
    taskList.appendChild(li);

    taskInput.value = "";
    startTimer(taskId);
}

function startTimer(id) {
    const timerSpan = document.getElementById(`timer${id}`);
    let timeLeft = 3600; // 1 hour in seconds
    updateTimerDisplay(timerSpan, timeLeft);
    timerIntervals[id] = setInterval(() => {
        timeLeft--;
        updateTimerDisplay(timerSpan, timeLeft);
        if (timeLeft === 0) {
            clearInterval(timerIntervals[id]);
        }
    }, 1000);
}

function updateTimerDisplay(timerSpan, timeLeft) {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    timerSpan.textContent = ` (${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")})`;
}
