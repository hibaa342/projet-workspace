const INITIAL_STUDY_TIME = 25 * 60; 
let timeInSeconds = INITIAL_STUDY_TIME;
let timerInterval = null; // Holds the reference to the setInterval call
let isRunning = false;

// --- DOM Element References ---
const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const modeButtons = document.querySelectorAll('.mode-btn');

// --- Helper Functions ---

function updateDisplay() {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    timeDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;
    
    document.title = `${formattedMinutes}:${formattedSeconds} - Study Timer`;
}


function countdown() {
    if (timeInSeconds > 0) {
        timeInSeconds--;
        updateDisplay();
    } else {
        // Timer reached 0
        clearInterval(timerInterval);
        isRunning = false;
        timeDisplay.textContent = "DONE!";
        
        // Reset button states
        startBtn.disabled = true;
        pauseBtn.disabled = true;
        
        // Optional: Trigger a notification or sound alert
        alert("Time is up! Take a break or start a new session.");
    }
}

/**
 * Resets the timer to a new duration and updates the display.
 * @param {number} newTimeInMinutes - The new duration in minutes.
 */
function setTimer(newTimeInMinutes) {
    // Clear any running interval
    clearInterval(timerInterval);
    isRunning = false;
    
    // Convert minutes to seconds
    timeInSeconds = newTimeInMinutes * 60;
    
    // Update button states
    startBtn.disabled = false;
    pauseBtn.disabled = true;

    updateDisplay();
}

// --- Event Handlers ---

function handleStart() {
    if (!isRunning) {
        // Start the interval to run 'countdown' function every 1000ms (1 second)
        timerInterval = setInterval(countdown, 1000);
        isRunning = true;
        
        // Update button states
        startBtn.textContent = 'Continue';
        startBtn.disabled = true;
        pauseBtn.disabled = false;
    }
}

function handlePause() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        
        // Update button states
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    }
}

function handleReset() {
    // Determine the current active time mode to reset to that value
    const activeMode = document.querySelector('.mode-btn.active');
    const resetTime = parseInt(activeMode.getAttribute('data-time'));
    
    // Reset based on the active mode time
    setTimer(resetTime);
    startBtn.textContent = 'Start'; // Change back to "Start" after full reset
}

function handleModeChange(event) {
    const clickedButton = event.currentTarget;
    const newTime = parseInt(clickedButton.getAttribute('data-time'));

    // 1. Reset timer to the new mode's time
    setTimer(newTime); 

    // 2. Update active class for styling
    modeButtons.forEach(btn => btn.classList.remove('active'));
    clickedButton.classList.add('active');
}


// --- Initialization ---

// 1. Assign listeners to the control buttons
startBtn.addEventListener('click', handleStart);
pauseBtn.addEventListener('click', handlePause);
resetBtn.addEventListener('click', handleReset);

// 2. Assign listeners to the mode buttons
modeButtons.forEach(btn => {
    btn.addEventListener('click', handleModeChange);
});

// 3. Initialize the display with the default study time
updateDisplay();