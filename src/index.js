import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import TileBag from './js/game-classes/tile-bag';
import Player from './js/game-classes/player';

function determineTurnOrder() {
  let player1Roll = Math.floor(Math.random() * 27);
  let player2Roll = Math.floor(Math.random() * 27);
  while (player1Roll === player2Roll) {
    player1Roll = Math.floor(Math.random() * 27);
    player2Roll = Math.floor(Math.random() * 27);
  }
  if (player1Roll > player2Roll) {
    return "player1";
  } else {
    return "player2";
  }
}

function createGameBoard() {
  const boxesPerRow = 15;
  const boxesPerColumn = 15;
  const totalBoxes = boxesPerRow * boxesPerColumn;
  const gameBoard = document.getElementById("gameBoard");

  for (let i = 0; i < totalBoxes; i++) {
    let box = document.createElement("div");
    box.setAttribute("class", "box");
    gameBoard.appendChild(box);
    if (i === 112) {
      box.setAttribute("id", "center-star");
      box.innerHTML = "*";
    }
  }
}

function createTilesArray(playerOne, playerTwo) {
  const player1TilesDiv = document.getElementById("player-one-tiles");
  const player2TilesDiv = document.getElementById("player-two-tiles");
  const tilesPerPlayer = 7;
  let playerOneCurrentTiles = playerOne.tiles;
  let playerTwoCurrentTiles = playerTwo.tiles;
  console.log(playerOneCurrentTiles);
  console.log(playerTwoCurrentTiles);

  for (let i = 0; i < tilesPerPlayer; i++) {
    let tile = document.createElement("div");
    tile.setAttribute("class", "tile");
    tile.setAttribute("draggable", true);
    tile.setAttribute("id", "tileSetA" + i);
    tile.innerHTML = playerOneCurrentTiles;
    player1TilesDiv.appendChild(tile);
  }
  console.log(player1TilesDiv);

  for (let i = 0; i <= playerOneCurrentTiles; i++) {
    document.getElementsByClassName("tile").innerHTML = playerOneCurrentTiles[i];
  }
  
  for (let i = 0; i < tilesPerPlayer; i++) {
    let tile = document.createElement("div");
    tile.setAttribute("class", "tile");
    tile.setAttribute("draggable", true);
    tile.setAttribute("id", "tileSetB" + i);
    player2TilesDiv.appendChild(tile);
  }
  console.log(player2TilesDiv);

}

function placeTilesOnBoard(playerTurn) {
  const player1Div = document.getElementById("player-one");
  const player2Div = document.getElementById("player-two");
  if (playerTurn === "player1") {
    player2Div.setAttribute("class", "hidden");
  } else if (playerTurn === "player2") {
    player1Div.setAttribute("class", "hidden");
  }
}

// trying to add functionality to drag a tile and place it on a cell in the board.

function dragstartHandler(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}

window.addEventListener("load", function() {
  document.getElementById("start-game").addEventListener("click", function () {
    document.getElementById("start-game").setAttribute("class", "hidden");
    document.getElementById("game-div").removeAttribute("class", "hidden");
    createGameBoard();
    let playerTurn = determineTurnOrder();
    placeTilesOnBoard(playerTurn);
    let tileBag = new TileBag();
    const player1 = new Player(0, [], '');
    const player2 = new Player(0, [], '');
    player1.drawTiles(tileBag);
    player2.drawTiles(tileBag);
    createTilesArray(player1, player2);
    const tileA = document.getElementById("tileSetA0");
    const tileB = document.getElementById("tileSetB0");
    tileA.addEventListener("dragstart", dragstartHandler());
    tileB.addEventListener("dragstart", dragstartHandler());
  });
});

// function playFirstWordOfGame() {
//   const playedWord = document.getElementById("playedWord").value;
//   let playedWordArray = playedWord.split('');
//   let firstLetter = playedWordArray[0];
//   let centerStar = document.getElementById("center-star");
//   centerStar.innerHTML = firstLetter;
// }

// function populateTiles(currentPlayer) {
//   let currentTiles = currentPlayer.tiles;
//   // console.log(currentDiv);
//   // currentDiv.forEach(function(element, index) {
//   //   element.append(currentTiles[index]);
//   // });
//   console.log(currentTiles);
// }

// document.getElementById("playButton").addEventListener("click", function (event) {
//   event.preventDefault();
//   // playFirstWordOfGame();
//   const playedWord = document.getElementById("playedWord").value;
//   // console.log(player1.score);
//   player1.scoreWord(playedWord);
//   console.log(player1.score);
// });