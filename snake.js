//setTimeout, setInterval or anything allowing asynchronous callbacks in code NOT ALLOWED
// key s is snake w is wall, o is obsticle f is food.

const wall = 'w';
const snake = 's';
const food = 'f';
const obs = 'o'; 
const empty = 'e'; 


// Setting up the game board empty
var board = [];
let boardWidth = 50;
for (let i = 0; i < boardWidth; i++) {
  let row = [];
  for( let j = 0; j < boardWidth; j++) {
    if ( i == 0 || i == boardWidth - 1 || j == 0 || j == boardWidth - 1) {
      row.push(wall);
    } else {
      row.push(empty);
    }
  }
}

function getRandLoc(boardWidth) {
  let min = 1;
  let max = boardWidth - 1;
  let notFound == true;
  let row = Math.floor(Math.random()*(max-min+1)+min
  let col = Math.floor(Math.random()*(max-min+1)+min
  while(notFound) {
    if (board[row][col] != 'e') {
      row = Math.floor(Math.random()*(max-min+1)+min
      col = Math.floor(Math.random()*(max-min+1)+min
    } else {
      notFound = false;
    }

    
  }
}

var events = [];
var inputs = [];
var itemsForRender = [];
var form = document.getElementById('event-form');

function validateForm() {
  elapsedTime = performance.now()
  let name = document.getElementById('name').value;
  let interval = document.getElementById('interval').value;
  let numTimes = document.getElementById('numTimes').value;
  let newEvent;
  newEvent = {
    name: name,
    interval: interval,
    numTimes: numTimes,
    elapsedTime: elapsedTime,
  }
  events.push(newEvent);
  console.log(newEvent);
  form.reset();
}

function gameLoop(elapsedTime) {
  update(elapsedTime);
  render();
  requestAnimationFrame(gameLoop);
}

performance.now();
gameLoop();

function update(elapsedTime) {
  for (let i = 0; i < events.length; i++) {
    if (elapsedTime - events[i].elapsedTime >= events[i].interval && events[i].numTimes > 0) {
      itemsForRender.push("Event: " + events[i].name + " (" + events[i].numTimes + " remaining)");
      events[i].elapsedTime = elapsedTime;
      events[i].numTimes--;
      if (events[i].numTimes ==0 ) {
        events.splice(i, 1);
      }
    }
  }
}

function render() {
  for (let i = 0; i < itemsForRender.length; i++) {
    let item = itemsForRender.pop();
    let output = document.getElementById('output');
    let outputItem = document.createElement('div');
    outputItem.textContent = item;
    output.appendChild(outputItem);
  }
}

