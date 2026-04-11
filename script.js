// ================= CLOCK =================
function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent =
    now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// ================= ALARM =================
let alarms = JSON.parse(localStorage.getItem("alarms")) || [];

function saveAlarms() {
  localStorage.setItem("alarms", JSON.stringify(alarms));
}

function renderAlarms() {
  const list = document.getElementById("alarmList");
  list.innerHTML = "";

  alarms.forEach((alarm, index) => {
    const li = document.createElement("li");
    li.textContent = alarm.time;

    // delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => {
      alarms.splice(index, 1);
      saveAlarms();
      renderAlarms();
    };

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

function addAlarm() {
  const time = document.getElementById("alarmTime").value;

  if (!time) {
    alert("Select time first");
    return;
  }

  alarms.push({
    time: time,
    triggered: false
  });

  saveAlarms();
  renderAlarms();
}

function clearAllAlarms() {
  alarms = [];
  saveAlarms();
  renderAlarms();
}

// check alarms
setInterval(() => {
  const now = new Date();

  const currentTime =
    now.getHours().toString().padStart(2, "0") + ":" +
    now.getMinutes().toString().padStart(2, "0");

  alarms.forEach(alarm => {
    if (alarm.time === currentTime && !alarm.triggered) {
      document.getElementById("alarmSound").play();
      alarm.triggered = true;
    }
  });

  saveAlarms();
}, 1000);

renderAlarms();

// ================= STOPWATCH =================
let sw = 0, swInterval;

function startSW() {
  if (swInterval) return;

  swInterval = setInterval(() => {
    sw++;
    displaySW();
  }, 1000);
}

function stopSW() {
  clearInterval(swInterval);
  swInterval = null;
}

function resetSW() {
  stopSW();
  sw = 0;
  document.getElementById("laps").innerHTML = "";
  displaySW();
}

function displaySW() {
  let h = String(Math.floor(sw / 3600)).padStart(2, "0");
  let m = String(Math.floor((sw % 3600) / 60)).padStart(2, "0");
  let s = String(sw % 60).padStart(2, "0");

  document.getElementById("stopwatch").textContent =
    `${h}:${m}:${s}`;
}

function lap() {
  const li = document.createElement("li");
  li.textContent =
    document.getElementById("stopwatch").textContent;

  document.getElementById("laps").appendChild(li);
}

// ================= TIMER =================
let timerInterval;

function startTimer() {
  let time = parseInt(document.getElementById("timerInput").value);
  const display = document.getElementById("timerText");

  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    if (time <= -1) {
      clearInterval(timerInterval);
      alert("Time's up!");
      return;
    }

    display.textContent = time;
    time--;
  }, 1000);
}
