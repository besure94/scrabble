import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

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
  });
  document.getElementById("playButton").addEventListener("click", function (event) {
    event.preventDefault();
    playFirstWordOfGame();
  });
});