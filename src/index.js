import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// import TileBag from './js/game-classes/tile-bag';
import Player from './js/game-classes/player';

// let tileBag = new TileBag();
let player1 = new Player();
let player2 = new Player();

function determineTurnOrder() {
  let player1Roll = Math.floor(Math.random() * 27);
  let player2Roll = Math.floor(Math.random() * 27);
  while (player1Roll === player2Roll) {
    player1Roll = Math.floor(Math.random() * 27);
    player2Roll = Math.floor(Math.random() * 27);
  }
  if (player1Roll > player2Roll) {
    player1.turn = "true";
    player2.turn = "false";
    return "player1";
  } else {
    player1.turn = "false";
    player2.turn = "true";
    return "player2";
  }
}

window.addEventListener("load", function() {
  document.getElementById("start-game").addEventListener("click", function () {
    document.getElementById("start-game").setAttribute("class", "hidden");
    document.getElementById("game-div").removeAttribute("class", "hidden");
    determineTurnOrder();
  });
  document.getElementById("playButton").addEventListener("click", function () {
    event.preventDefault();
    const playedWord = document.getElementById("playedWord").value;
    const player1 = new Player(0, ['w', 'o', 'r', 'd', 'e', 'e', 'e'], true, '');
    console.log(player1.score);
    console.log(player1.scoreWord(playedWord));
    console.log(player1.score);
  });
});