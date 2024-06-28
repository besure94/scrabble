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
    box.addEventListener("drop", dropTile);
    box.addEventListener("dragover", allowTileDrop);
    if (i === 112) {
      box.setAttribute("id", "center-star");
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
    if (typeof playerOneCurrentTiles[i] === 'undefined') {
      break;
    }
    let player1Tiles = document.createElement("div");
    player1Tiles.setAttribute("class", "tile");
    player1Tiles.setAttribute("draggable", true);
    player1Tiles.setAttribute("ondragstart", dragTile);
    player1Tiles.setAttribute("id", "tileSetA" + i);
    player1Tiles.innerHTML = playerOneCurrentTiles[i];
    player1TilesDiv.appendChild(player1Tiles);
  }
  
  for (let i = 0; i < tilesPerPlayer; i++) {
    if (typeof playerTwoCurrentTiles[i] === 'undefined') {
      break;
    }
    let player2Tiles = document.createElement("div");
    player2Tiles.setAttribute("class", "tile");
    player2Tiles.setAttribute("draggable", true);
    player2Tiles.setAttribute("ondragstart", dragTile);
    player2Tiles.setAttribute("id", "tileSetB" + i);
    player2Tiles.innerHTML = playerTwoCurrentTiles[i];
    player2TilesDiv.appendChild(player2Tiles);
  }
  makeTilesDraggable();
}

function deleteTilesArray() {
  const player1TilesDiv = document.getElementById("player-one-tiles");
  const player2TilesDiv = document.getElementById("player-two-tiles");
  if (player1TilesDiv != null) {
    player1TilesDiv.innerHTML = '';
  }
  if (player2TilesDiv != null) {
    player2TilesDiv.innerHTML = '';
  }
}

function placeTilesOnBoard(playerTurn) {
  const player1Div = document.getElementById("player-one");
  const player2Div = document.getElementById("player-two");
  if (playerTurn === "player1") {
    player2Div.setAttribute("class", "hidden");
    player1Div.removeAttribute("class");
  } else if (playerTurn === "player2") {
    player1Div.setAttribute("class", "hidden");
    player2Div.removeAttribute("class");
  }
}

function makeTilesDraggable() {
  let arrayOfTiles = Array.from(document.querySelectorAll("div.tile"));
  arrayOfTiles.forEach(function(element) {
    element.addEventListener("dragstart", dragTile);
  });
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
  event.target.classList.add("played-this-turn");
  event.target.setAttribute("value", event.target.innerHTML);
}

function allowTileDrop(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

function submitWords() {
  let currentTurnTiles = "";
  let arrayOfGameBoardBoxes = Array.from(document.querySelectorAll("div.box"));
  
  for (let i = 0; i <= arrayOfGameBoardBoxes.length - 1; i++) {
    if (arrayOfGameBoardBoxes[i].className === "box played-this-turn") {
      currentTurnTiles += arrayOfGameBoardBoxes[i].innerHTML;
      arrayOfGameBoardBoxes[i].setAttribute("class", "box");
    }
  }

  return currentTurnTiles;
}

function changeTurn(playerTurn) {
  if (playerTurn === 'player1') {
    playerTurn = 'player2';
  } else {
    playerTurn = 'player1';
  }
  return playerTurn;
}

function endGame(player1, player2) {
  const subtractedPlayer1Score = player1.subtractRemainingLetters();
  const subtractedPlayer2Score = player2.subtractRemainingLetters();
  if (player1.tiles.length === 0) {
    player1.score += subtractedPlayer2Score;
  } else if (player2.tiles.length === 0) {
    player2.score += subtractedPlayer1Score;
  }
  document.getElementById("player-one").remove();
  document.getElementById("player-two").remove();
  document.getElementById("p1-score").innerHTML = player1.score;
  document.getElementById("p2-score").innerHTML = player2.score;
  if (player1.score > player2.score) {
    document.getElementById("winner").innerText = "Player 1 wins";
  } else if (player2.score > player1.score) {
    document.getElementById("winner").innerText = "Player 2 wins";
  } else {
    document.getElementById("winner").innerText = "Draw";
  }
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
    document.querySelector('#player-one-tiles')
      .addEventListener('click', event => {
        let target = event.target;
        if (target.matches('.tile')) {
          let value = target.innerHTML;
          document.querySelector('#player-one-exchanged-word').value += value;
        }
      });
    document.querySelector('#player-two-tiles')
      .addEventListener('click', event => {
        let target = event.target;
        if (target.matches('.tile')) {
          let value = target.innerHTML;
          document.querySelector('#player-two-exchanged-word').value += value;
        }
      });
    document.getElementById("p1-play-word").addEventListener("click", function() {
      player1.choice = 'play';
      player1.scoreWord(submitWords());
      document.getElementById("p1-score").innerHTML = player1.score;
      playerTurn = changeTurn(playerTurn);
      placeTilesOnBoard(playerTurn);
      if (player1.tiles.length === 0 && player2.tiles.length === 0) {
        endGame(player1, player2);
      } else {
        tileBag = player1.drawTiles(tileBag);
        deleteTilesArray();
        createTilesArray(player1, player2);
      }
    });
    document.getElementById("p2-play-word").addEventListener("click", function() {
      player2.choice = 'play';
      player2.scoreWord(submitWords());
      document.getElementById("p2-score").innerHTML = player2.score;
      playerTurn = changeTurn(playerTurn);
      placeTilesOnBoard(playerTurn);
      if (player1.tiles.length === 0 && player2.tiles.length === 0) {
        endGame(player1, player2);
      } else {
        tileBag = player2.drawTiles(tileBag);
        deleteTilesArray();
        createTilesArray(player1, player2);
      }
    });
    const passButtons = document.querySelectorAll('.pass');
    passButtons.forEach(function(currentBtn){
      currentBtn.addEventListener('click', function(event) {
        event.preventDefault();
        if (playerTurn === "player1") {
          player1.choice = 'pass';
          playerTurn = "player2";
        } else {
          player2.choice = 'pass';
          playerTurn = "player1";
        }
        if (player1.choice === "pass" && player2.choice === "pass") {
          endGame(player1, player2);
        } else {
          placeTilesOnBoard(playerTurn);
        }
      });
    });
    const exchangeButtons = document.querySelectorAll('.exchange');
    exchangeButtons.forEach(function(currentBtn){
      currentBtn.addEventListener('click', function(event) {
        event.preventDefault();
        if (playerTurn === "player1") {
          player1.choice = 'exchange';
          const exchangedTiles = document.getElementById("player-one-exchanged-word").value;
          tileBag = player1.exchangeTiles(exchangedTiles, tileBag);
          tileBag = player1.drawTiles(tileBag);
          playerTurn = "player2";
          document.getElementById("player-one-exchanged-word").value = '';
        } else {
          player2.choice = 'exchange';
          const exchangedTiles = document.getElementById("player-two-exchanged-word").value;
          tileBag = player2.exchangeTiles(exchangedTiles, tileBag);
          tileBag = player2.drawTiles(tileBag);
          playerTurn = "player1";
          document.getElementById("player-two-exchanged-word").value = '';
        }
        deleteTilesArray();
        createTilesArray(player1, player2);
        placeTilesOnBoard(playerTurn);
      });
    });
  });
