const INITIAL_STUDY_TIME = 25 * 60; // Defines the base duration for a study session (25 minutes) converted to seconds (25 * 60 = 1500 seconds).
let timeInSeconds = INITIAL_STUDY_TIME; // Tracks the current remaining time, initialized to the study duration.
let timerInterval = null; // Holds the ID returned by setInterval. This reference is crucial for stopping the timer with clearInterval.
let isRunning = false; // A Boolean flag to track the timer's operational state (true when counting down, false when paused/reset).

// --- DOM Element References ---
const timeDisplay = document.getElementById('time-display'); // Gets the HTML element where the time is shown (e.g., "25:00").
const startBtn = document.getElementById('start-btn'); // Gets the 'Start' button element.
const pauseBtn = document.getElementById('pause-btn'); // Gets the 'Pause' button element.
const resetBtn = document.getElementById('reset-btn'); // Gets the 'Reset' button element.
const modeButtons = document.querySelectorAll('.mode-btn'); // Gets a NodeList of all buttons used to select the timer mode (e.g., Study, Break).

// --- Helper Functions ---

function updateDisplay() { // Function responsible for calculating and displaying the formatted time.
    const minutes = Math.floor(timeInSeconds / 60); // Calculates whole minutes by dividing total seconds by 60 and rounding down.
    const seconds = timeInSeconds % 60; // Calculates remaining seconds using the modulo operator (remainder after division by 60).

    const formattedMinutes = String(minutes).padStart(2, '0'); // Converts minutes to a string and adds a leading '0' if the number is less than 10 (e.g., 5 -> "05").
    const formattedSeconds = String(seconds).padStart(2, '0'); // Converts seconds to a string and adds a leading '0' if the number is less than 10 (e.g., 9 -> "09").

    timeDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`; // Updates the main display element with the formatted time string.

    document.title = `${formattedMinutes}:${formattedSeconds} - Study Timer`; // Updates the text in the browser tab's title bar.
}


function countdown() { // The function executed repeatedly every second by setInterval.
    if (timeInSeconds > 0) { // Checks if there is still time remaining.
        timeInSeconds--; // Decrements the time by one second.
        updateDisplay(); // Calls the helper function to refresh the display with the new time.
    } else { // This block runs when timeInSeconds reaches 0.
        // Timer reached 0
        clearInterval(timerInterval); // Stops the repeated execution of the countdown function.
        isRunning = false; // Updates the state to show the timer is no longer running.
        timeDisplay.textContent = "DONE!"; // Changes the time display text.

        // Reset button states
        startBtn.disabled = true; // Disables the start button.
        pauseBtn.disabled = true; // Disables the pause button.

        // Optional: Trigger a notification or sound alert
        alert("Time is up! Take a break or start a new session."); // Triggers a browser alert pop-up.
    }
}


function setTimer(newTimeInMinutes) { // Function to set the timer to a specific duration in minutes.
    // Clear any running interval
    clearInterval(timerInterval); // Stops any active countdown immediately.
    isRunning = false; // Resets the running state.

    // Convert minutes to seconds
    timeInSeconds = newTimeInMinutes * 60; // Calculates the new total time in seconds.

    // Update button states
    startBtn.disabled = false; // Enables the Start button for a new session.
    pauseBtn.disabled = true; // Ensures the Pause button is disabled since the timer isn't running.

    updateDisplay(); // Updates the display immediately to show the new time.
}

// --- Event Handlers ---

function handleStart() { // Function executed when the Start or Continue button is clicked.
    if (!isRunning) { // Checks if the timer is currently paused or stopped.
        // Start the interval to run 'countdown' function every 1000ms (1 second)
        timerInterval = setInterval(countdown, 1000); // Starts the core countdown loop, calling `countdown` every 1000ms.
        isRunning = true; // Updates the state to show the timer is now running.

        // Update button states
        startBtn.textContent = 'Continue'; // Changes the button text for better user context after pausing.
        startBtn.disabled = true; // Disables the Start/Continue button while running to prevent multiple intervals.
        pauseBtn.disabled = false; // Enables the Pause button.
    }
}

function handlePause() { // Function executed when the Pause button is clicked.
    if (isRunning) { // Checks if the timer is currently running.
        clearInterval(timerInterval); // Stops the countdown loop, preserving the current `timeInSeconds`.
        isRunning = false; // Updates the state to show the timer is paused.

        // Update button states
        startBtn.disabled = false; // Enables the Start button (now 'Continue') so the user can resume.
        pauseBtn.disabled = true; // Disables the Pause button.
    }
}

function handleReset() { // Function executed when the Reset button is clicked.
    // Determine the current active time mode to reset to that value
    const activeMode = document.querySelector('.mode-btn.active'); // Finds the mode button that currently has the 'active' class.
    const resetTime = parseInt(activeMode.getAttribute('data-time')); // Reads the duration (in minutes) from the 'data-time' attribute of the active mode button.

    // Reset based on the active mode time
    setTimer(resetTime); // Calls setTimer to reset the clock to the active mode's duration.
    startBtn.textContent = 'Start'; // Changes the button text back to 'Start' since it's a full reset.
}

function handleModeChange(event) { // Function executed when any mode selection button is clicked.
    const clickedButton = event.currentTarget; // References the exact button that was clicked.
    const newTime = parseInt(clickedButton.getAttribute('data-time')); // Reads the new duration from the clicked button's data attribute.

    // 1. Reset timer to the new mode's time
    setTimer(newTime); // Calls setTimer to stop the current clock and set the new time.

    // 2. Update active class for styling
    modeButtons.forEach(btn => btn.classList.remove('active')); // Removes the 'active' class from ALL mode buttons.
    clickedButton.classList.add('active'); // Adds the 'active' class only to the button that was just clicked.
}


// --- Initialization ---

// 1. Assign listeners to the control buttons
startBtn.addEventListener('click', handleStart); // Attaches the handleStart function to the Start button's click event.
pauseBtn.addEventListener('click', handlePause); // Attaches the handlePause function to the Pause button's click event.
resetBtn.addEventListener('click', handleReset); // Attaches the handleReset function to the Reset button's click event.

// 2. Assign listeners to the mode buttons
modeButtons.forEach(btn => { // Loops through all elements found with the class '.mode-btn'.
    btn.addEventListener('click', handleModeChange); // Attaches the handleModeChange function to each mode button's click event.
});

// 3. Initialize the display with the default study time
updateDisplay(); // Calls updateDisplay once when the script loads to show the initial time ("25:00").