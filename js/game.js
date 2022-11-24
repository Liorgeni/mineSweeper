"use strict";
const EMPTY = " ";
const MINE = "💣";
const FLAG = "🚩";

var gBoard;
var gCell;
var gSize;
var firstClick = true;
var gMines;
// gLevel = { SIZE: 4, MINES: 2 };
var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 };

function initGame() {
  gSize = 4;
  gMines = 2;
  firstClick = true;
  gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 };
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

function renderBoard(board) {
  const elBoard = document.querySelector(".board-container");
  var strHTML = '<table class="board" border="4" cellpadding="40" ><tbody>';
  for (var i = 0; i < board.length; i++) {
    strHTML += "<tr>";
    for (var j = 0; j < board[0].length; j++) {
      const className = `cell cell-${i}-${j}`;
      const cell = board[i][j];
      var cellToShow;
      if (cell.isMine && cell.isShown) {
        cellToShow = MINE;
      } else if (cell.isMarked && !cell.isShown) {
        cellToShow = FLAG;
      } else if (cell.isShown && cell.minesAroundCount > 0) {
        cellToShow = cell.minesAroundCount;
      } else {
        cellToShow = EMPTY;
      }
      strHTML += `<td oncontextmenu="cellMarked(this,${i},${j})" onclick="cellClicked(this,${i},${j})" class="${className}">${cellToShow}</td>`;
    }
    strHTML += "</tr>";
  }
  strHTML += "</tbody></table>";
  elBoard.innerHTML = strHTML;
  console.table("board", gBoard);
}

function setMinesNegsCount(cellI, cellJ, board) {
  var neighborsCount = 0;
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= board.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (i === cellI && j === cellJ) continue;
      if (j < 0 || j >= board[i].length) continue;
      if (board[i][j].isMine) {
        neighborsCount++;
      }
    }
  }
  return neighborsCount;
}

function findEmptyCell(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      if (!board[i][j].isMine) {
        var currNeighbours = setMinesNegsCount(i, j, board);
        board[i][j].minesAroundCount = currNeighbours;
      }
    }
  }
  return currNeighbours;
}

function cellClicked(elCell, i, j) {
  if (firstClick) {
    gGame.isOn = true;
    firstClick = false;
    setMines({ i, j });
    findEmptyCell(gBoard);
  }

  if (gGame.isOn === false) return;
  if (gBoard[i][j].isMarked) return;

  gBoard[i][j].isShown = true;

  renderBoard(gBoard);
  checkGameOver(i, j);
}

function cellMarked(elCell, i, j) {
  if (!gGame.isOn) return;

  if (gBoard[i][j].isMarked) {
    gBoard[i][j].isMarked = false;
    renderBoard(gBoard);
  } else {
    gBoard[i][j].isMarked = true;
    renderBoard(gBoard);
  }
}

function checkGameOver(i, j) {
  console.log(i, j);
  if (gBoard[i][j].isMine) {
    console.log("GameOVER");
    console.log(i, j);
    gGame.isOn = false;
  }
}

function expandShown(board, elCell, i, j) {}

function setMines(forbiddenCell) {
  var index = 0;
  while (index < gMines) {
    const i = getRandomInt(0, gSize - 1);
    const j = getRandomInt(0, gSize - 1);
    if (forbiddenCell.i !== i && forbiddenCell.j != j) {
      gBoard[i][j].isMine = true;
      index++;
    }
  }
}

// שואוקאונט - כל לחיצה שהופך לטרו לעשות תנאי בתחילת הפונקציה לדעת אם השואו טרו רטון
// כל לחיצה לקדם את השואו טרו
// או שנגמר הלוח - אם השואו קאונט שווה לסייז כפול סייז והשאוו קאונט צריך להיות פלוס המארקסלס
// אם מסמן דגל צריך לעלות את הקאונר של המארקסלסאם המארק שווה לשואו אז סיימת את המשחק
