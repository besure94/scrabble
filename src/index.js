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
    box.setAttribute("droppable", true);
    box.setAttribute("id", "box-" + i);
    if (i === 112) {
      box.setAttribute("id", "center-star");
      box.addEventListener("drop", dropTile);
      box.addEventListener("dragover", allowTileDrop);
      box.innerHTML = "*";
    }
    gameBoard.appendChild(box);
  }
}

function createTilesArray(playerOne, playerTwo) {
  const player1TilesDiv = document.getElementById("player-one-tiles");
  const player2TilesDiv = document.getElementById("player-two-tiles");
  const tilesPerPlayer = 7;
  let playerOneCurrentTiles = playerOne.tiles;
  let playerTwoCurrentTiles = playerTwo.tiles;

  for (let i = 0; i < tilesPerPlayer; i++) {
    let player1Tiles = document.createElement("div");
    let player2Tiles = document.createElement("div");
    player1Tiles.setAttribute("class", "tile");
    player1Tiles.setAttribute("draggable", true);
    player1Tiles.setAttribute("ondragstart", dragTile);
    player1Tiles.setAttribute("id", "tileSetA" + i);
    player1Tiles.addEventListener("drop", dropTile);
    player1Tiles.innerHTML = playerOneCurrentTiles.pop();
    player1TilesDiv.appendChild(player1Tiles);

    player2Tiles.setAttribute("class", "tile");
    player2Tiles.setAttribute("draggable", true);
    player2Tiles.setAttribute("ondragstart", dragTile);
    player2Tiles.setAttribute("id", "tileSetB" + i);
    player2Tiles.innerHTML = playerTwoCurrentTiles.pop();
    player2TilesDiv.appendChild(player2Tiles);
  }

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

function dragTile(event) {
  event.dataTransfer.setData("text", event.target.id);
  event.dataTransfer.effectAllowed = "move";
}

function dropTile(event) {
  event.preventDefault();
  let data = event.dataTransfer.getData("text");
  event.target.appendChild(document.getElementById(data));
  event.target.innerHTML = document.getElementById(data).innerHTML;
}

function allowTileDrop(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
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
    tileA.addEventListener("dragstart", dragTile);
    tileB.addEventListener("dragstart", dragTile);
  });
});