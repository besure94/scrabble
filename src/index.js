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
    let player1Tiles = document.createElement("div");
    let player2Tiles = document.createElement("div");
    player1Tiles.setAttribute("class", "tile");
    player1Tiles.setAttribute("draggable", true);
    player1Tiles.setAttribute("ondragstart", dragTile);
    player1Tiles.setAttribute("id", "tileSetA" + i);
    player1Tiles.innerHTML = playerOneCurrentTiles[i];
    player1TilesDiv.appendChild(player1Tiles);

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
  if (player1.score > player2.score) {
    document.getElementById("winner").innerText = "Player 1 wins";
  }
  else if (player2.score > player1.score) {
    document.getElementById("winner").innerText = "Player 2 wins";
  }
  else {
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
    document.getElementById("p1-play-word").addEventListener("click", function() {
      player1.scoreWord(submitWords());
      document.getElementById("p1-score").innerHTML = player1.score;
      playerTurn = changeTurn(playerTurn);
      placeTilesOnBoard(playerTurn);
      if (player1.tiles.length === 0 && player2.tiles.length === 0) {
        endGame(player1, player2);
      }
      tileBag = player1.drawTiles(tileBag);
      deleteTilesArray();
      createTilesArray(player1, player2);
    });
    document.getElementById("p2-play-word").addEventListener("click", function() {
      player2.scoreWord(submitWords());
      document.getElementById("p2-score").innerHTML = player2.score;
      playerTurn = changeTurn(playerTurn);
      placeTilesOnBoard(playerTurn);
      if (player1.tiles.length === 0 && player2.tiles.length === 0) {
        endGame(player1, player2);
      }
      tileBag = player2.drawTiles(tileBag);
      deleteTilesArray();
      createTilesArray(player1, player2);
    });
  });
});

// Known Bugs: 
// - a player can drop their tiles over tiles that have already been placed, thus replacing them.
// - submitWords() only works for the first word that is spelled out on the board. 


// to-do: account for directions of tiles played -- connect business logic to board -- remove placed tile and place back in hand

// mvp: functional scoring for individual words and turn switching -- exchanging tiles and passing turns



// function endGame(player1, player2) {
//   const subtractedPlayer1Score = player1.subtractRemainingLetters();
//   const subtractedPlayer2Score = player2.subtractRemainingLetters();
//   if (player1.tiles.length === 0) {
//     player1.score += subtractedPlayer2Score;
//   } else if (player2.tiles.length === 0) {
//     player2.score += subtractedPlayer1Score;
//   }
//   document.querySelector("form").remove();
//   document.getElementById("turn").setAttribute("class", "hidden");
//   if (player1.score > player2.score) {
//     document.getElementById("tiles").innerText = "Player 1 wins";
//   }
//   else if (player2.score > player1.score) {
//     document.getElementById("tiles").innerText = "Player 2 wins";
//   }
//   else {
//     document.getElementById("tiles").innerText = "Draw";
//   }
// }

// document.getElementById("playButton").addEventListener("click", function (event) {
//   event.preventDefault();
//   playFirstWordOfGame();
//   const playedWord = document.getElementById("playedWord").value;
//   if (currentTurn === "player1") {
//     player1.scoreWord(playedWord);
//     tileBag = player1.drawTiles(tileBag);
//     currentTurn = "player2";
//   }
//   else {
//     player2.scoreWord(playedWord);
//     tileBag = player2.drawTiles(tileBag);
//     currentTurn = "player1";
//   }
//   document.getElementById("turn").innerText = `${currentTurn}'s turn`;
//   if (currentTurn === "player1") {
//     document.getElementById("tiles").innerText = `${player1.tiles.toString()}`;
//   }
//   else {
//     document.getElementById("tiles").innerText = `${player2.tiles.toString()}`;
//   }
//   if (player1.tiles.length === 0 && player2.tiles.length === 0) {
//     endGame(player1, player2);
//   }
//   console.log(player1.score);
//   console.log(player2.score);
// });
// document.getElementById("exchangeButton").addEventListener("click", function (event) {
//   event.preventDefault();
//   const playedWord = document.getElementById("playedWord").value;
//   if (currentTurn === "player1") {
//     player1.exchangeWord(playedWord);
//     tileBag = player1.drawTiles(tileBag);
//     currentTurn = "player2";
//   }
//   else {
//     player2.exchangeWord(playedWord);
//     tileBag = player2.drawTiles(tileBag);
//     currentTurn = "player1";
//   }
//   document.getElementById("turn").innerText = `${currentTurn}'s turn`;
//   if (currentTurn === "player1") {
//     document.getElementById("tiles").innerText = `${player1.tiles.toString()}`;
//   }
//   else {
//     document.getElementById("tiles").innerText = `${player2.tiles.toString()}`;
//   }
//   console.log(player1.score);
//   console.log(player2.score);
// });
// document.getElementById("passButton").addEventListener("click", function (event) {
//   event.preventDefault();
//   if (currentTurn === "player1") {
//     player1.choice = 'pass';
//     currentTurn = "player2";
//   }
//   else {
//     player2.choice = 'pass';
//     currentTurn = "player1";
//   }
//   if (player1.choice === "pass" && player2.choice === "pass") {
//     endGame(player1, player2);
//   }
//   else {
//     document.getElementById("turn").innerText = `${currentTurn}'s turn`;
//     if (currentTurn === "player1") {
//       document.getElementById("tiles").innerText = `${player1.tiles.toString()}`;
//     }
//     else {
//       document.getElementById("tiles").innerText = `${player2.tiles.toString()}`;
//     }
//   }
//   console.log(player1.score);
//   console.log(player2.score);
// });