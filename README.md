<h1> Minesweeper Game</h1> 
This is a Minesweeper game developed in JavaScript. The objective of this project was to create an engaging game that challenges players' problem-solving skills while familiarizing myself with the intricacies of JavaScript. The game features a dynamic table built using matrix, which enable randomized mine placement.

<h2>Table of Contents</h2>

- [Link](#link)
- [How to Play](#how-to-play)
- [Technologies Used](#technologies-used)
- [Acknowledgements](#acknowledgements)

## Link

https://liorgeni.github.io/mineSweeper/

## How to Play

The objective of the game is to clear the minefield without detonating any mines. The player can click on a square to reveal its contents, which will be one of the following:
<li>A number indicating how many mines are adjacent to the square.</li>
<li>An empty square, which means that there are no mines adjacent to the square.</li>
<li>A mine, which means that the game is over (In this version of the game, the player has 3 lives).</li>

If the player clicks on a square that contains a number, it will reveal that number and the game will continue. If the player clicks on a square that contains an empty square, it will reveal all adjacent empty squares and the game will continue. If the player clicks on a square that contains a mine, the player loses 1 life (Maximun of 3 lives).

The player can flag a square that they suspect contains a mine by right-clicking on it. The game is won when all squares that do not contain mines are revealed.


## Technologies Used

<li> JavaScript</li>
<li>HTML</li>
<li>CSS</li>

## Acknowledgements

This project was developed as part of my studies at Coding Acadeny Bootcamp.

