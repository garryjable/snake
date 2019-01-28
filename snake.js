//setTimeout, setInterval or anything allowing asynchronous callbacks in code NOT ALLOWED
// key s is snake w is wall, o is obsticle f is food.

const wall = 'w';
const snake = 's';
const food = 'f';
const obs = 'o'; 
const empty = 'e'; 
var board = [];
const boardWidth = 50;
const numObs = 15;
const rectWidth = 10;

const emptyColor = 'rgba(120, 43, 13, 1)';
const wallColor = 'rgba(66, 66, 66, 1)';
const snakeColor = 'rgba(46, 93, 40, 1)';
const foodColor = 'rgba(158, 0, 0, 1)';
const obsColor = 'rgba(110, 91, 48, 1)';

// Setting up the game board empty

function getRandLoc() {
  let min = 1;
  let max = boardWidth - 1;
  let notFound = true;
  let row = Math.floor(Math.random()*(max-min+1)+min)
  let col = Math.floor(Math.random()*(max-min+1)+min)
  while(notFound) {
    if (board[row][col] != empty) {
      row = Math.floor(Math.random()*(max-min+1)+min)
      col = Math.floor(Math.random()*(max-min+1)+min)
    } else {
      notFound = false;
    }
  }
  return {
          row: row,
          col: col
         }
}

function populateBoard() {
  for (let i = 0; i < boardWidth; i++) {
    let row = [];
    for( let j = 0; j < boardWidth; j++) {
      if ( i == 0 || i == boardWidth - 1 || j == 0 || j == boardWidth - 1) {
        row.push(wall);
      } else {
        row.push(empty);
      }
    }
    board.push(row);
  }
  for (let i = 0; i < numObs; i++) {
    let coords = getRandLoc();
    board[coords['row']][coords['col']] = obs;
  }
  let coords = getRandLoc();
  board[coords['row']][coords['col']] = snake;
  coords = getRandLoc();
  board[coords['row']][coords['col']] = food;
}

populateBoard();

var canvas = document.getElementById('gameBoard');
var context = canvas.getContext('2d');

CanvasRenderingContext2D.prototype.clear = function() {
  this.clearRect(0, 0, canvas.width, canvas.height);
}

// now iterate the board and draw all the rects
//
render();

function render() {
  for (let i = 0; i < boardWidth; i++) {
    for(let j = 0; j < boardWidth; j++) {
      if(board[i][j] == empty) {
        paintRect(i, j, emptyColor);
      } else if(board[i][j] == wall) {
        paintRect(i, j, wallColor); 
      } else if(board[i][j] == snake) {
        paintRect(i, j, snakeColor); 
      } else if(board[i][j] == obs) {
        paintRect(i, j, obsColor); 
      } else if(board[i][j] == food) {
        paintRect(i, j, foodColor); 
      }
    }
  }
}

function paintRect(yCoord, xCoord, color) {
        //context.strokeStyle = color;
        //context.lineWidth = 2;
        context.fillStyle = color;
        //context.fill();
        context.fillRect(xCoord * rectWidth, yCoord * rectWidth, rectWidth, rectWidth )
}

//var events = [];
//var inputs = [];
//var itemsForRender = [];
//var form = document.getElementById('event-form');
//
//function validateForm() {
//  elapsedTime = performance.now()
//  let name = document.getElementById('name').value;
//  let interval = document.getElementById('interval').value;
//  let numTimes = document.getElementById('numTimes').value;
//  let newEvent;
//  newEvent = {
//    name: name,
//    interval: interval,
//    numTimes: numTimes,
//    elapsedTime: elapsedTime,
//  }
//  events.push(newEvent);
//  console.log(newEvent);
//  form.reset();
//}
//
//function gameLoop(elapsedTime) {
//  update(elapsedTime);
//  render();
//  requestAnimationFrame(gameLoop);
//}
//
//performance.now();
//gameLoop();
//
//function update(elapsedTime) {
//  for (let i = 0; i < events.length; i++) {
//    if (elapsedTime - events[i].elapsedTime >= events[i].interval && events[i].numTimes > 0) {
//      itemsForRender.push("Event: " + events[i].name + " (" + events[i].numTimes + " remaining)");
//      events[i].elapsedTime = elapsedTime;
//      events[i].numTimes--;
//      if (events[i].numTimes ==0 ) {
//        events.splice(i, 1);
//      }
//    }
//  }
//}
//
//function render() {
//  for (let i = 0; i < itemsForRender.length; i++) {
//    let item = itemsForRender.pop();
//    let output = document.getElementById('output');
//    let outputItem = document.createElement('div');
//    outputItem.textContent = item;
//    output.appendChild(outputItem);
//  }
//}
//
