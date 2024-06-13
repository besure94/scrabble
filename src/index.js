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