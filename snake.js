const numObs = 15;
const boardWidth = 50;
const rectWidth = 10;
const snakeGrowth = 3;
const wall = 'w';
const food = 'f';
const obs = 'o'; 
const empty = 'e'; 

const emptyColor = 'rgba(120, 43, 13, 1)';
const wallColor = 'rgba(66, 66, 66, 1)';
const snakeColor = 'rgba(46, 93, 40, 1)';
const foodColor = 'rgba(158, 0, 0, 1)';
const obsColor = 'rgba(110, 91, 48, 1)';

var gameOver = false;
var board = [];
var nextInput;
var currentDir = null;
var input = [];
var moveRate = 150;
var lastMoveStamp = 0;
var snakeLength = 1;

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
  gameOver = false;
  board = [];
  snakeLength = 1;
  currentDir = null;
  nextInput = null;
  input = [];
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
  board[coords['row']][coords['col']] = 0;
  coords = getRandLoc();
  board[coords['row']][coords['col']] = food;
}

populateBoard();

var canvas = document.getElementById('gameBoard');
var context = canvas.getContext('2d');

CanvasRenderingContext2D.prototype.clear = function() {
  this.clearRect(0, 0, canvas.width, canvas.height);
}

function gameLoop(elapsedTime) {
  if (gameOver === false) {
    processInput(elapsedTime);
    update(elapsedTime);
  }
    render();
    requestAnimationFrame(gameLoop);
}

performance.now();
gameLoop();

function processInput(elapsedTime) {
    nextInput = input.pop();
    input = []
    input.push(nextInput);
}
function update(elapsedTime) {
  if(elapsedTime - lastMoveStamp >= moveRate){
    lastMoveStamp = elapsedTime
    let obj = findNextDir();
    let row = obj.nextRow;
    let col = obj.nextCol;
    let prevCol = obj.prevCol;
    let prevRow = obj.prevRow;
    let nextDir = obj.nextDir;
    if (board[row][col] != empty &&
        board[row][col] != food  &&
        board[row][col] !== 0
    ) {
      // game over
      gameOver = true;
    } else if (board[row][col] == food) {
      // move the snake
      // move the tails 
      // replace the food
      for(let i = 0; i < snakeGrowth; i++) {
        snakeLength++;
      }
      inchSnake(row, col);
      let newFood = getRandLoc();
      currentDir = nextDir;
      board[newFood.row][newFood.col] = food;
    } else if (board[row][col] == empty){
      // move the snake
      inchSnake(row, col);
      currentDir = nextDir;
    }
    }
}

function findNextDir() {
  for (let i = 0; i < boardWidth; i++) {
    for(let j = 0; j < boardWidth; j++) {
      if(board[i][j] === 0) {
        let row;
        let col;
        let nextDir;
        if (nextInput == 'up') {
          if (currentDir == 'down') {
            nextDir = currentDir
            row = 1 + i;
            col = j;
          } else {
            nextDir = nextInput
            row = i - 1;
            col = j;
          }
        } else if (nextInput == 'down') {
          if (currentDir == 'up') {
            nextDir = currentDir
            row = i - 1;
            col = j;
          } else {
            nextDir = nextInput
            row = 1 + i;
            col = j;
          }
        } else if (nextInput == 'left') {
          if (currentDir == 'right') {
            nextDir = currentDir
            row = i;
            col = 1 + j ;
          } else {
            nextDir = nextInput
            row = i;
            col = j - 1;
          }
        } else if (nextInput == 'right') {
          if (currentDir == 'left') {
            nextDir = currentDir
            row = i;
            col = j - 1;
          } else {
            nextDir = nextInput
            row = i;
            col = 1 + j ;
          }
        } else if (currentDir == null) {
          row = i;
          col = j;
        }
        return {
                nextDir: nextDir,
                nextRow: row,
                nextCol: col,
                prevRow: i,
                prevCol: j,
               }
      }
    }
  }
}

function render() {
  context.clear();
  for (let i = 0; i < boardWidth; i++) {
    for(let j = 0; j < boardWidth; j++) {
      if(board[i][j] == empty) {
        paintRect(i, j, emptyColor);
      } else if(board[i][j] == wall) {
        paintRect(i, j, wallColor); 
      } else if(typeof board[i][j] == "number") {
        paintRect(i, j, snakeColor); 
      } else if(board[i][j] == obs) {
        paintRect(i, j, obsColor); 
      } else if(board[i][j] == food) {
        paintRect(i, j, foodColor); 
      }
    }
  }
  let score = document.getElementById('score');
  score.textContent = snakeLength;
}

function paintRect(yCoord, xCoord, color) {
        context.fillStyle = color;
        context.fillRect(xCoord * rectWidth, yCoord * rectWidth, rectWidth, rectWidth )
}

function checkInput (e) {
  e = e || window.event;
  if ( e.keyCode == '38') {
    input.push('up');
  } else if ( e.keyCode == '40') {
    input.push('down');
  } else if ( e.keyCode == '37') {
    input.push('left');
  } else if ( e.keyCode == '39') {
    input.push('right');
  }

}

document.onkeypress = checkInput;

function inchSnake(row, col) {
  board[row][col] = -1;
  for(let i = 0; i < boardWidth; i++) {
    for(let j = 0; j < boardWidth; j++) {
      if(typeof board[i][j] === "number") {
        board[i][j]++;
        if(board[i][j] >= snakeLength) {
          board[i][j] = empty;
        }
      }
    }
  }
}

function paintRect(yCoord, xCoord, color) {
        context.fillStyle = color;
        context.fillRect(xCoord * rectWidth, yCoord * rectWidth, rectWidth, rectWidth )
        if (color == snakeColor || color == obsColor || color == foodColor) {
          context.strokeStyle = "#000000";
          context.strokeRect(xCoord * rectWidth, yCoord * rectWidth, rectWidth, rectWidth )
        }
}

function checkInput (e) {
  e = e || window.event;
  if ( e.keyCode == '38') {
    input.push('up');
  } else if ( e.keyCode == '40') {
    input.push('down');
  } else if ( e.keyCode == '37') {
    input.push('left');
  } else if ( e.keyCode == '39') {
    input.push('right');
  }
}

document.onkeypress = checkInput;
