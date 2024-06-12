import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

window.addEventListener("load", function() {
  document.getElementById("start-game").addEventListener("click", function () {
    document.getElementById("start-game").setAttribute("class", "hidden");
    document.getElementById("game-div").removeAttribute("class", "hidden");
    // need function that removes two tiles from tile-bag obj, compares both tiles to "A", and determines who plays first.
    // need form so that user can submit what word they want to play.
  });
  document.getElementById("playButton").addEventListener("click", function () {
    event.preventDefault();
    const playedWord = document.getElementById("playedWord").value;
    console.log(playedWord);
  });
});