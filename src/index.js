const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
const score = document.querySelector('#score');
const timerDisplay = document.querySelector('#timer');

const audioHit = new Audio("https://github.com/gabrielsanchez/erddiagram/blob/main/hit.mp3?raw=true");
const song = new Audio("https://github.com/gabrielsanchez/erddiagram/blob/main/molesong.mp3?raw=true");
function playAudio(audioObject) {
  audioObject.play();
}
function loopAudio(audioObject) {
  audioObject.loop = true;
  playAudio(audioObject);
}
function stopAudio(audioObject) {
  audioObject.pause();
}
function play(){
  playAudio(song);
}

let time = 0;
let timer;
let lastHole = -1;
let points = 0;
let difficulty = "easy";


let testMode = true;

let whacked = false;
let whackable = null;


function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Sets the time delay given a difficulty parameter.
 
 *
 */
function setDelay(difficulty) {
  if ( difficulty === 'hard' ) {
    return randomInteger(600,1200);
  }
  if ( difficulty === 'normal') {
    return 1000;
  }
  return 1500;  
}

/**
 * Chooses a random hole from a list of holes.

 *

 */
function chooseHole(holes) {
  let max = holes.length-1;
  if ( lastHole != -1 ) {
    max--;
  }
  let anotherHole = randomInteger(0,max);
  
  if ( lastHole != -1 && ( anotherHole >= lastHole )) {
    anotherHole++;
    
  }
  lastHole = anotherHole;
  
  return holes[ anotherHole ];
}




/**
*
* Calls the showUp function if time > 0 and stops the game if time = 0.
*
* The purpose of this function is simply to determine if the game should
* continue or stop. The game continues if there is still time `if(time > 0)`.
* 
*
*/
function gameOver() {
  if(time > 0){
   let timeoutId = showUp();
    return timeoutId;
  } else {
    let gameStopped = stopGame();
    return gameStopped;
  }
}


function showUp() {
  let delay = setDelay(difficulty);
  // delay=2000;
  const hole = chooseHole(holes);
  return showAndHide(hole, delay);
}


function showAndHide(hole, delay){
  toggleVisibility(hole);

  const timeoutID = setTimeout(() => {
    toggleVisibility(hole);

    gameOver();

  }, delay);
  return timeoutID;
}
/**
*
* Adds or removes the 'show' class that is defined in styles.css to 
* a given hole. It returns the hole.
*
*/
function toggleVisibility(hole){
  hole.classList.toggle('show');
  return hole;
}


function updateScore() {
  points++;
  score.textContent = points;
  return points;
}

/**
*
* This function clears the score by setting `points = 0`. It also updates
* the board using `score.textContent = points`. The function should return
* the points.
*
*/
function clearScore() {
  points = 0;
  score.textContent = points;
  return points;
}


function updateTimer() {
  if ( time > 0 ) time--;
  timerDisplay.textContent = time;
  return time;
}

/**
*
* Starts the timer using setInterval. For each 1000ms (1 second)
* the updateTimer function get called. This function is already implemented
*
*/
function startTimer() {
  timer = setInterval(updateTimer, 1000);
  return timer;
}


function whack(event) {
  if ( testMode ||
       (( event.target.id.substr(4) === whackable ) && !whacked )) {
    whacked = true;
    playAudio(audioHit);
    updateScore();
  }
  return points;
}

/**
*
* Adds the 'click' event listeners to the moles. See the instructions
* for an example on how to set event listeners using a for loop.
*/
function setEventListeners(){
  for ( let mole of moles ) {
    mole.addEventListener('click',whack);
  }
  return moles;
}

/**
*
* This function sets the duration of the game. The time limit, in seconds,
* that a player has to click on the sprites.
*
*/
function setDuration(duration) {
  time = duration;
  timerDisplay.textContent = time;
  return time;
}

/**
*
* This function is called when the game is stopped. It clears the
* timer using clearInterval. Returns "game stopped".
*
*/
function stopGame(){
  stopAudio(song);
  clearInterval(timer);
  return "game stopped";
}

/**
*
* This is the function that starts the game
*
*/
let done = false;
function startGame(){
  if ( testMode && !done ) {
    setEventListeners();
    done = true;
  }
  if ( testMode || ( time == 0 )) {
    clearScore();
    setDuration(10);
    startTimer();
    lastHole = -1;
    showUp();
    play();
    return "game started";
  }
  return "game already running"
}

startButton.addEventListener("click", startGame);
if ( !testMode ) setEventListeners();

// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;
