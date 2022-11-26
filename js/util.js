"use strict";

function renderBoard(board) {
  const elBoard = document.querySelector(".board-container");
  var strHTML = '<table class="board" border="4" cellpadding="10" ><tbody>';
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
      strHTML += `<td oncontextmenu="cellMarked(event,this,${i},${j})" onclick="cellClicked(this,${i},${j})" class="${className}">${cellToShow}</td>`;
    }
    strHTML += "</tr>";
  }
  strHTML += "</tbody></table>";
  elBoard.innerHTML = strHTML;
  // console.table("board", gBoard);
}

function renderCell(location, value) {
  const elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
  elCell.innerHTML = value;
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

/////////////////////////////////////////////
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
