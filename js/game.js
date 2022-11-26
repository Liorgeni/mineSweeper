"use strict";
const EMPTY = " ";
const MINE = "💣";
const FLAG = "🚩";
const HEALTHY = "😀";
const INJURED = "🤕";
const DEAD = "😵";
const WINNER = "😎";

var gBoard;
var gCell;
var gSize;
var firstClick = true;
var gMines;
var gInterval;
var gStartTime;
var lives;
var bombsCount;
var bombsToFindDisplay = document.querySelector(".bombsNum span");
var condition = document.querySelector(".emoji");
var lifeDisplay = document.querySelector(".lives span");
var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 };

function initGame(level = 4, mines = 2) {
  if (gInterval) clearInterval(gInterval);
  gSize = level;
  gMines = mines;
  lives = 3;
  lifeDisplay.innerHTML = lives;
  firstClick = true;
  condition.innerHTML = HEALTHY;
  gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 };
  bombsCount = mines;
  bombsToFindDisplay.innerHTML = bombsCount;
  gBoard = buildBoard();
  renderBoard(gBoard);
}

function buildBoard() {
  const board = [];
  for (var i = 0; i < gSize; i++) {
    board.push([]);
    for (var j = 0; j < gSize; j++) {
      board[i][j] = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
      };
    }
  }
  return board;
}

function cellClicked(elCell, i, j) {
  var cell = gBoard[i][j];
  var cellToShow;

  if (firstClick) {
    gGame.shownCount++;
    gGame.isOn = true;
    firstClick = false;
    startTimer();
    setMines({ i, j });
    findEmptyCell(gBoard);
    // console.table(gBoard);
  }

  if (!gGame.isOn) return;
  if (cell.isMarked) return;
  if (cell.isShown) return;

  cell.isShown = true;

  if (cell.isShown && !cell.isMine) {
    gGame.shownCount++;
  }

  if (cell.isMine && cell.isShown) {
    cellToShow = MINE;
  } else if (cell.isShown && cell.minesAroundCount > 0) {
    cellToShow = cell.minesAroundCount;
  } else {
    cellToShow = EMPTY;
  }

  if (gGame.shownCount + gMines === gSize * gSize + 1) {
    winModal();
    revealBombs(gBoard);
    revealNums(gBoard);
  }

  if (cell.isMine) {
    bombsCount--;
    bombsToFindDisplay.innerHTML = bombsCount;

    elCell.classList.add("bomb");
    useLives();
  }

  if (bombsCount === 0) {
    revealNums(gBoard);
    winModal();
  }

  if (lives === 0) {
    revealBombs(gBoard);
    gameOver();
  }

  if (gBoard[i][j].minesAroundCount === 0 && !gBoard[i][j].isMine) {
    expandShown(i, j);
  }
  elCell.classList.add("dark");
  renderCell({ i, j }, cellToShow);
}

function cellMarked(event, elCell, i, j) {
  event.preventDefault();
  var cell = gBoard[i][j];

  gGame.markedCount++;

  if (firstClick) {
    gGame.isOn = true;
    firstClick = false;
    startTimer();
    setMines({ i, j });
    findEmptyCell(gBoard);
  }

  if (!gGame.isOn) return;
  if (cell.isShown) return;

  if (cell.isMarked) {
    renderCell({ i, j }, EMPTY);
    cell.isMarked = false;
    bombsCount++;
    bombsToFindDisplay.innerHTML = bombsCount;
  } else {
    cell.isMarked = true;
    bombsCount--;
    bombsToFindDisplay.innerHTML = bombsCount;
    renderCell({ i, j }, FLAG);
  }
}

function gameOver() {
  clearInterval(gInterval);
  condition.innerHTML = DEAD;
  gGame.isOn = false;
}

function expandShown(cellI, cellJ) {
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= gBoard.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (i === cellI && j === cellJ) continue;
      if (j < 0 || j >= gBoard[i].length) continue;
      if (!gBoard[i][j].isMine) {
        const elCell = document.querySelector(`.cell-${i}-${j}`);
        cellClicked(elCell, i, j);
      }
    }
  }
}

function setMines(forbiddenCell) {
  var index = 0;
  while (index < gMines) {
    const i = getRandomInt(0, gSize - 1);
    const j = getRandomInt(0, gSize - 1);
    if (
      forbiddenCell.i !== i &&
      forbiddenCell.j !== j &&
      !gBoard[i][j].isMine
    ) {
      gBoard[i][j].isMine = true;
      index++;
    }
  }
}

function changeLevel(level) {
  if (level === "easy") {
    gSize = 4;
    gMines = 2;
  }
  if (level === "medium") {
    gSize = 8;
    gMines = 14;
  }
  if (level === "hard") {
    gSize = 12;
    gMines = 32;
  }
  initGame(gSize, gMines);
}

function winModal() {
  condition.innerHTML = WINNER;
  gGame.isOn = false;
  clearInterval(gInterval);
}

function useLives() {
  lifeDisplay.innerHTML = --lives;
  condition.innerHTML = "🤕";
}

function revealBombs(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      var cell = board[i][j];
      if (cell.isMine) {
        cell.isShown = true;
        renderCell({ i, j }, MINE);
      }
    }
  }
}

function revealNums(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      var cell = board[i][j];
      if (!cell.isMine) {
        cell.isShown = true;
        renderCell(
          { i, j },
          cell.minesAroundCount === 0 ? EMPTY : cell.minesAroundCount
        );
      }
    }
  }
}

function startTimer() {
  gStartTime = Date.now();
  gInterval = setInterval(() => {
    const seconds = (Date.now() - gStartTime) / 1000;
    var elTimeSpan = document.querySelector(".time span");
    elTimeSpan.innerText = seconds.toFixed(3);
  }, 1);
}
