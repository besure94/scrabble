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
    // player1.turn = "true";
    // player2.turn = "false";
    return "player1";
  } else {
    // player1.turn = "false";
    // player2.turn = "true";
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

function createTilesArray() {
  // variable containing tiles for testing purposes
  const tilesArrayPlayer1 = ['a', 'p', 'r', 'i', 'c', 'o', 't'];
  const tilesArrayPlayer2 = ['m', 'o', 'n', 'k', 'e', 'y', 's'];
  console.log(tilesArrayPlayer1, tilesArrayPlayer2);
  const player1TilesDiv = document.getElementById("player-one-tiles");
  const player2TilesDiv = document.getElementById("player-two-tiles");
  const tilesPerPlayer = 7;

  for (let i = 0; i < tilesPerPlayer; i++) {
    let tile = document.createElement("div");
    tile.setAttribute("class", "tile");
    player1TilesDiv.appendChild(tile);
    // player2TilesDiv.appendChild(tile);
  }

  for (let i = 0; i < tilesPerPlayer; i++) {
    let tile = document.createElement("div");
    tile.setAttribute("class", "tile");
    // player1TilesDiv.appendChild(tile);
    player2TilesDiv.appendChild(tile);
  }

  console.log("Player 1 tiles: ", player1TilesDiv);
  console.log("Player 2 tiles: ", player2TilesDiv);

}

function placeTilesOnBoard() {
  determineTurnOrder();
  const player1Div = document.getElementById("player-one");
  const player2Div = document.getElementById("player-two");
  if (player1.turn === "true") {
    player2Div.setAttribute("class", "hidden");
  } else if (player1.turn === "false") {
    player1Div.setAttribute("class", "hidden");
  }
}

placeTilesOnBoard();

// function playFirstWordOfGame() {
//   const playedWord = document.getElementById("playedWord").value;
//   let playedWordArray = playedWord.split('');
//   let firstLetter = playedWordArray[0];
//   let centerStar = document.getElementById("center-star");
//   centerStar.innerHTML = firstLetter;
// }

window.addEventListener("load", function() {
  document.getElementById("start-game").addEventListener("click", function () {
    document.getElementById("start-game").setAttribute("class", "hidden");
    document.getElementById("game-div").removeAttribute("class", "hidden");
    createGameBoard();
    determineTurnOrder();
    let tileBag = new TileBag();
    const player1 = new Player(0, [], true, '');
    // const player2 = new Player();
    player1.drawTiles(tileBag);
    console.log(player1.tiles);
    document.getElementById("playButton").addEventListener("click", function (event) {
      event.preventDefault();
      playFirstWordOfGame();
      const playedWord = document.getElementById("playedWord").value;
      // console.log(player1.score);
      player1.scoreWord(playedWord);
      console.log(player1.score);
    });
  });
});