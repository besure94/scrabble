export default class Player {
  constructor(score, tiles, turn, choice) {
    this.score = score,
    this.tiles = tiles,
    this.turn = turn,
    this.choice = choice;
  }

  scoreWord(playedWord) {
    const word = playedWord.toLowerCase();
    const wordArray = word.split('');
    wordArray.forEach(letter => {
      if (!this.tiles.includes(letter)) {
        throw new Error('not a valid word');
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
    });
  }
}