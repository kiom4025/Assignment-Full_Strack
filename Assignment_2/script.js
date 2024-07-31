let timer; // variable to store our intervalID
let running = false; // Initially the timer will be all not running
let elapsedTime = 0; // Since the timer is off, the time passed by the stopwatch is zero
var display_time, lapCount = 0; //Creating global variable - display_time: to store time, lapCount: to store lap button press count.

// Obtaining button and display id from HTML
const display = document.getElementById('display');
const start_stopButton = document.getElementById('start_stop');
const lapButton = document.getElementById('lap');
const resetButton = document.getElementById('reset');

// Initializing onClick Event Listener for all HTML Buttons
start_stopButton.addEventListener('click', start_stop);
lapButton.addEventListener('click', lap);
resetButton.addEventListener('click', reset);

updateDisplay();


///////////////////////////////////////////////
// Functions ////////////////////////
//////////////

/**
 * - milliseconds to hours - divide the time value by 3600000
 * - milliseconds to minutes - divide the time value by 60000
 * - milliseconds to seconds - divide the time value by 1000
 * 
 * - padStart function example : let str = "5"; str = str.padStart(3, "0"); console.log(str); // Output: "005"
 * - Modulus (%): Returns the remainder after division. For example, 10 % 3 yields 1.
 * - The Math.floor() method rounds a number DOWN to the nearest integer.
 */
function updateDisplay() {
    const hours = Math.floor(elapsedTime / 3600000).toString().padStart(2, '0');
    const minutes = Math.floor((elapsedTime % 3600000) / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((elapsedTime % 60000) / 1000).toString().padStart(2, '0');
    const milliseconds = (elapsedTime % 1000).toString().padStart(3, '0');
    display_time = `${hours}:${minutes}:${seconds}:${milliseconds}`;
    display.textContent = display_time;
}

//////////////////////////////////////////////////////////////////////

/**
 * - Date.now() returns the number of milliseconds since January 1, 1970.
 * - setInterval(function, delay)
 *    > Function to be executed every delay (milliseconds). The first execution happens after delay (milliseconds).
 *    > returns intervalID
 * - clearInterval() method cancels a timed, repeating action which was previously established by a call to setInterval()
 */
function start_stop() {
    if (!running) {
        // Executing Start action and changing the button to Stop
        buttonChange("Stop", "stop");
        running = true;
        const startTime = Date.now() - elapsedTime;
        timer = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 1);
    } else {
        // Executing stop action and chaging the button to start
        buttonChange("Start", "start");
        stop();
    }
}

//////////////////////////////////////////////////////////////////////

/**
 * 
 * @param {string} innertext Inner HTML text
 * @param {string} classname class name to change
 */
function buttonChange(innertext, classname) {
    start_stopButton.textContent = innertext;
    start_stopButton.className = classname;
}

//////////////////////////////////////////////////////////////////////

function reset() {
    stop();
    elapsedTime = 0;
    updateDisplay();

    for(i=0;i<=lapCount;i++){
        // Remove an element from the DOM
        let elementToRemove = document.getElementById(("lap_" + i)); // Get the element with the id
        if (elementToRemove) elementToRemove.parentNode.removeChild(elementToRemove); // Remove the element from its parent
    }
    document.getElementById("lapSection").style.display = "none"; //Hiding the lap section after reset
    lapCount = 0; //resetting the count of lap count after reset
}

//////////////////////////////////////////////////////////////////////

function stop() {
    running = false;
    clearInterval(timer);
}

//////////////////////////////////////////////////////////////////////

function lap() {
    document.getElementById("lapSection").style.display = "block";
    lapCount += 1; // Whenever the lap button is pressed the lapCount variable is incremented by 1
    
    // Checking output in console
    // console.log("#" + lapCount + " >> " + display_time); 
    
    let newrow = document.createElement('tr'); // creating a new row in the existing HTML Table
    newrow.setAttribute("id",("lap_" + lapCount)) // Providing a unique id to the row tag based on the number of press
    let newcount = document.createElement('td'); // creating a new data tag inside the row tag.
    newcount.innerText = lapCount; // assigning lap button press count to the inner HTML
    let newlap = document.createElement('td'); // creating a new data tag inside the row tag.
    newlap.innerText = display_time; // assigning time from the "updateDisplay()" function to the inner HTML

    // Append created HTML row & data tag to the existing HTML table
    document.getElementById("lapData").appendChild(newrow).appendChild(newcount); 
    document.getElementById(("lap_" + lapCount)).appendChild(newlap);
}
