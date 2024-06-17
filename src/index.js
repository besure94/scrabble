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
      console.log(box);
      box.innerHTML = "*";
    }
  }
}

function endGame(player1, player2) {
  const subtractedPlayer1Score = player1.subtractRemainingLetters();
  const subtractedPlayer2Score = player2.subtractRemainingLetters();
  if (player1.tiles.length === 0) {
    player1.score += subtractedPlayer2Score;
  } else if (player2.tiles.length === 0) {
    player2.score += subtractedPlayer1Score;
  }
  document.querySelector("form").remove();
  document.getElementById("turn").setAttribute("class", "hidden");
  if (player1.score > player2.score) {
    document.getElementById("tiles").innerText = "Player 1 wins";
  }
  else if (player2.score > player1.score) {
    document.getElementById("tiles").innerText = "Player 2 wins";
  }
  else {
    document.getElementById("tiles").innerText = "Draw";
  }
}

function playFirstWordOfGame() {
  const playedWord = document.getElementById("playedWord").value;
  let playedWordArray = playedWord.split('');
  let firstLetter = playedWordArray[0];
  let centerStar = document.getElementById("center-star");
  centerStar.innerHTML = firstLetter;
}

window.addEventListener("load", function() {
  document.getElementById("start-game").addEventListener("click", function () {
    document.getElementById("start-game").setAttribute("class", "hidden");
    document.getElementById("game-div").removeAttribute("class", "hidden");
    createGameBoard();
    let currentTurn = determineTurnOrder();
    let tileBag = new TileBag();
    const player1 = new Player(0, [], true, '');
    const player2 = new Player(0, [], true, '');
    tileBag = player1.drawTiles(tileBag);
    tileBag = player2.drawTiles(tileBag);
    document.getElementById("turn").innerText = `${currentTurn}'s turn`;
    if (currentTurn === "player1") {
      document.getElementById("tiles").innerText = `${player1.tiles.toString()}`;
    }
    else {
      document.getElementById("tiles").innerText = `${player2.tiles.toString()}`;
    }
    document.getElementById("playButton").addEventListener("click", function (event) {
      event.preventDefault();
      playFirstWordOfGame();
      const playedWord = document.getElementById("playedWord").value;
      if (currentTurn === "player1") {
        player1.scoreWord(playedWord);
        tileBag = player1.drawTiles(tileBag);
        currentTurn = "player2";
      }
      else {
        player2.scoreWord(playedWord);
        tileBag = player2.drawTiles(tileBag);
        currentTurn = "player1";
      }
      document.getElementById("turn").innerText = `${currentTurn}'s turn`;
      if (currentTurn === "player1") {
        document.getElementById("tiles").innerText = `${player1.tiles.toString()}`;
      }
      else {
        document.getElementById("tiles").innerText = `${player2.tiles.toString()}`;
      }
      console.log(player1.score);
      console.log(player2.score);
    });
    document.getElementById("exchangeButton").addEventListener("click", function (event) {
      event.preventDefault();
      const playedWord = document.getElementById("playedWord").value;
      if (currentTurn === "player1") {
        player1.exchangeWord(playedWord);
        tileBag = player1.drawTiles(tileBag);
        currentTurn = "player2";
      }
      else {
        player2.exchangeWord(playedWord);
        tileBag = player2.drawTiles(tileBag);
        currentTurn = "player1";
      }
      document.getElementById("turn").innerText = `${currentTurn}'s turn`;
      if (currentTurn === "player1") {
        document.getElementById("tiles").innerText = `${player1.tiles.toString()}`;
      }
      else {
        document.getElementById("tiles").innerText = `${player2.tiles.toString()}`;
      }
      console.log(player1.score);
      console.log(player2.score);
    });
    document.getElementById("passButton").addEventListener("click", function (event) {
      event.preventDefault();
      if (currentTurn === "player1") {
        player1.choice = 'pass';
        currentTurn = "player2";
      }
      else {
        player2.choice = 'pass';
        currentTurn = "player1";
      }
      if (player1.choice === "pass" && player2.choice === "pass") {
        endGame(player1, player2);
      }
      else {
        document.getElementById("turn").innerText = `${currentTurn}'s turn`;
        if (currentTurn === "player1") {
          document.getElementById("tiles").innerText = `${player1.tiles.toString()}`;
        }
        else {
          document.getElementById("tiles").innerText = `${player2.tiles.toString()}`;
        }
      }
      console.log(player1.score);
      console.log(player2.score);
    });
  });
});