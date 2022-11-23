'use strict'


function boardNums(difficulty) {
    const nums = []
    for (var i = 1; i <= difficulty; i++) {
        nums.push(i)
    }
    return nums
}

function drawNum() {
    var randIdx = getRandomInt(0, gBoard.length)
    var num = gBoard[randIdx]
    gBoard.splice(randIdx, 1)
    return num
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

function createMat(ROWS, COLS) {
    const mat = []
    for (var i = 0; i < ROWS; i++) {
        const row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}

function countNeighbors(cellI, cellJ, mat) {
    var neighborsCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= mat[i].length) continue

            if (mat[i][j] === LIFE || mat[i][j] === SUPER_LIFE) neighborsCount++
        }
    }
    return neighborsCount
}



function countNeighbors(cellI, cellJ, board) {
    var neighborsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
      for (var j = cellJ - 1; j <= cellJ + 1; j++) {
        if (board[i][j].gameElement === BALL) {
          neighborsCount++;
        }
      }
      nearBallsDisplay.innerHTML = neighborsCount;
    }
    return neighborsCount;
  }
  

var gNums = [1, 2, 3, 4, 5, 6, 7]
// console.log('gNums', gNums)
// shuffle(gNums)
// console.log('gNums', gNums)

// var num = drawNum();
// console.log('num:', num);
// console.log('gNums:', gNums);

// num = drawNum();
// console.log('num:', num);
// console.log('gNums:', gNums);

function drawNum2() {
    return gNums.pop()
}


function shuffle(items) {
    var randIdx, keep;
    for (var i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, items.length);
        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}

///////////////////////////////////////////////////////////////////////////////

// var gNums2 = [1, 2, 3, 4, 5, 6, 7]
// console.log('gNums2', gNums2)

// var num = drawNum2()
// console.log('num', num)
// console.log('gNums2', gNums2)

// num = drawNum2()
// console.log('num', num)
// console.log('gNums2', gNums2)

function drawNum() {
    var randIdx = getRandomInt(0, gNums2.length)
    var num = gNums2[randIdx]
    gNums2.splice(randIdx, 1)
    return num
}


/////////////////////////////////////////////////////////////////////////////////


function renderBoard(mat, selector) {

    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {

            const cell = mat[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}


////////////////////////////////////////////////

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

////////////////////////////////////////////////

function findEmptyCell(board) {
    const emptyCells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j].gameElement === null && board[i][j].type === FLOOR) {
                emptyCells.push({ i, j })
            }
        }
    }
    const randomNumIdx = getRandomInt(0, emptyCells.length)
    const randomNum = emptyCells[randomNumIdx]
    return randomNum
}