```javascript
let timer;
let isPaused = false;
let isBreak = false;
let workTime = 25 * 60;
let breakTime = 5 * 60;

const timerDisplay = document.getElementById('timerDisplay');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');

function startTimer(duration, display) {
    timer = setInterval(() => {
        let minutes = parseInt(duration / 60, 10);
        let seconds = parseInt(duration % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--duration < 0) {
            clearInterval(timer);
            isBreak = !isBreak;
            sendNotification(isBreak ? 'Break time!' : 'Work time!');
            startTimer(isBreak ? breakTime : workTime, display);
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    isPaused = true;
}

function resetTimer() {
    clearInterval(timer);
    timerDisplay.textContent = '25:00';
    isPaused = false;
    isBreak = false;
}

function sendNotification(message) {
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        new Notification(message);
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                new Notification(message);
            }
        });
    }
}

startButton.addEventListener('click', () => {
    if (!isPaused) {
        startTimer(workTime, timerDisplay);
    }
});

pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
```