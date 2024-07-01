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
      case ' ':
        this.score += 0;
        break;
      default:
        this.score += 1;
      }
    });
    if (wordArray.length === 7) {
      this.score += 50;
    }
  }

  subtractRemainingLetters() {
    let subtractedScore = 0;
    this.tiles.forEach(letter => {
      switch (letter) {
      case 'd': 
      case 'g':
        this.score -= 2;
        subtractedScore += 2;
        break;
      case 'b': 
      case 'c':
      case 'm':
      case 'p':
        this.score -= 3;
        subtractedScore += 3;
        break;
      case 'f': 
      case 'h': 
      case 'v':
      case 'w':
      case 'y':
        this.score -= 4;
        subtractedScore += 4;
        break;
      case 'k':
        this.score -= 5;
        subtractedScore += 5;
        break;
      case 'j': 
      case 'x':
        this.score -= 8;
        subtractedScore += 8;
        break;
      case 'q': 
      case 'z':
        this.score -= 10;
        subtractedScore += 10;
        break;
      default:
        this.score -= 1;
        subtractedScore += 1;
      }
    });
    return subtractedScore;
  }

  exchangeTiles(exchangedLetters, tileBag) {
    const word = exchangedLetters.toLowerCase();
    const wordArray = word.split('');
    wordArray.forEach(letter => {
      const index = this.tiles.indexOf(letter);
      if (index != -1) {
        this.tiles.splice(index, 1);
        tileBag.tiles.push(letter); 
      }
    });
    return tileBag;
  }

  drawTiles(tileBag) {
    while (this.tiles.length < 7) {
      if (tileBag.tiles.length === 0) {
        break;
      }
      const randomTileIndex = Math.floor(Math.random() * tileBag.tiles.length);
      this.tiles.push(tileBag.tiles[randomTileIndex]);
      tileBag.tiles.splice(randomTileIndex, 1);
    }
    return tileBag;
  }
}