'use strict'

var gBoard;


const EMPTY = ' ';
const MINE = '💣';
const FLAG = '🚩';
var currCell;


// gLevel = { SIZE: 4, MINES: 2 };

const gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 }


initGame()


function initGame(){

    gBoard = buildBoard()
    renderBoard(gBoard, '.board-container')
    // console.log(gBoard);
}




function buildBoard(){
    const size = 4
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = { minesAroundCount: setMinesNegsCount(), isShown: false, isMine: false, isMarked: true }
            currCell =  board[i][j]
            console.log(currCell);
            }
        }
        board[1][1].isMine = true
        board[3][3].isMine = true
    return board
}

// renderCell(gBoard[1][1].isShown, MINE)

// function locateBomb(){
//     if (gBoard[location][j].isShown === true){
//         renderCell(gBoard[i][j], MINE)
//     }

    // gBoard[location.i][location.j] =  MINE;

// }




function renderBoard(gBoard, selector) {

    var strHTML = '<table class="board" border="3" cellpadding="30"><tbody>'
    for (var i = 0; i < gBoard.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < gBoard[0].length; j++) {

       
            const className = `cell cell-${i}-${j}`
            var cell = gBoard[i][j]
            if (cell.isMine === true){
                cell = MINE
                // renderCell(cell, MINE)
            }
            strHTML += `<td class="${className}">${cell}</td>`

   
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    // console.log(gBoard);
    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML;
}


function renderCell(location, value) {
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}



console.log(setMinesNegsCount(0, 1,gBoard));

function setMinesNegsCount(cellI, cellJ, mat){
    
    var neighborsCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= mat[i].length) continue

            if (mat[i][j].isMine) 
            neighborsCount++
        }
    }

// console.log(neighborsCount);
    return neighborsCount
}



// function findEmptyCell(board) {
//     for (var i = 0; i < board.length; i++) {
//         for (var j = 0; j < board[0].length; j++) {
//            if (board[i][j].isMine=== true){
//            setMinesNegsCount(board[i],board[j], gBoard)
//            }
//             }
//         }
//     }



function cellClicked(elCell, i, j){}



function cellMarked(elCell){}



function checkGameOver(){}



function expandShown(board, elCell, i, j){}