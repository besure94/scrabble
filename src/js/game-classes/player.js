export default class Player {
  constructor(score, tiles, choice) {
    this.score = score,
    this.tiles = tiles,
    this.choice = choice;
  }

  scoreWord(playedWord) {
    const word = playedWord.toLowerCase();
    const wordArray = word.split('');
    const tiles = this.tiles.slice();
    console.log(this.tiles);
    console.log(word);
    wordArray.forEach(letter => {
      if (!this.tiles.includes(letter)) {
        this.tiles = tiles.slice();
        throw new Error('not a valid word');
      }
      else {
        const index = this.tiles.indexOf(letter);
        this.tiles.splice(index, 1);
      }
    });
    wordArray.forEach(letter => {
      switch (letter) {
      case 'd': 
      case 'g':
        this.score += 2;
        break;
      case 'b': 
      case 'c':
      case 'm':
      case 'p':
        this.score += 3;
        break;
      case 'f': 
      case 'h': 
      case 'v':
      case 'w':
      case 'y':
        this.score += 4;
        break;
      case 'k':
        this.score += 5;
        break;
      case 'j': 
      case 'x':
        this.score += 8;
        break;
      case 'q': 
      case 'z':
        this.score += 10;
        break;
      default:
        this.score += 1;
      }
      this.turn = false;
    });
  }

  drawTiles(tileBag) {
    while (this.tiles.length < 7) {
      const randomTileIndex = Math.floor(Math.random() * tileBag.tiles.length);
      this.tiles.push(tileBag.tiles[randomTileIndex]);
      tileBag.tiles.splice(randomTileIndex, 1);
    }
    return tileBag;
  }
}