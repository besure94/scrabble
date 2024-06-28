### Outline for MVP

#### 2 player game

#### Build basic game board
  * Grid that is 15 cells high and 15 cells wide.
  * Horizontal cells go from A - O, left to right.
  * Vertical cells go from 1 - 15, top to bottom.

#### Logic to determine who goes first
  * Each player draws a tile.
  * Player with tile closest to "A" begins the game.
  * If player draws a blank tile, they automatically go first.
  * Each initial drawn tile goes back into the tiles object (bag).

#### Player turn logic
  * Each player initially draws 7 tiles.
  * Player can use up to 7 tiles for a turn.
  * Player then replaces the amount of tiles they used from the bag.

  Player has three options for their turn:
    1. Place a word.
    2. Exchange tiles.
    3. Pass.

  Exchange process:
    * Can exchange one or all of their tiles.
    * Turn ends after the exchange.

  Pass process:
    * Forfeits turn.
    * 2 consecutive passes ends game, and the highest score wins.

#### First Word Score:

  * First player puts their word on the star spin (center cell) in the center of the board.

#### Replacing Tiles:

  * After each player places tiles on the board, they will draw tiles to replace the amount they placed.
  * Players always have 7 tiles.
  * Tiles are drawn without looking.

#### Game End:

  * Once all tiles from the bag are gone, and no players have any tiles remaining, the game ends.
  * Player with highest score wins.

#### Tile Bag and Point Values

  * Store as object that contains 100 tiles.
  * 98 will be letters with different point values.
  * 2 will be empty, which can take the place of any letter when placed by player.

  Tiles will be distributed as:
    * 2 blank tiles (scoring 0 points)
    * 1 point:
      - E ×12
      - A ×9
      - I ×9
      - O ×8
      - N ×6
      - R ×6
      - T ×6
      - L ×4
      - S ×4
      - U ×4
    * 2 points:
      - D ×4
      - G ×3
    * 3 points:
      - B ×2
      - C ×2
      - M ×2
      - P ×2
    * 4 points:
      - F ×2
      - H ×2
      - V ×2
      - W ×2
      - Y ×2
    * 5 points:
      - K ×1
    * 8 points:
      - J ×1
      - X ×1
    * 10 points:
      - Q ×1
      - Z ×1

#### Player Objects

  * have property for player's score
  * property for player's number of tiles
  * property for player choice, since they can choose to place tiles, exchange, or pass

### Stretch Goals

#### Score Modifying Tiles

* Certain cells will have score enhancements. There are 4 total:
  * Double letter: score value of tile(s), multiply by 2
  * Triple letter: score value of tile(s), multiply by 3
  * Double word: score value of word, multiply by 2
  * Triple word: score value of word, multiply by 3
      
* Each player has to build their words off of the first played word.
* Need logic that allows players to only place tiles/words that are centered around another word.
* If a player creates a word with all 7 of their tiles, they receive 50 points in addition to their score from the word.
* Only applies to 7 letter words.
* Have an array of valid words hard coded into app.
* Array could have 100 words to start.

* When game ends, each player counts the points from their remaining tiles that they haven't placed.
  * Deduct this amount from their final score.
  * A player who ended game with no remaining tiles receives the score from the other player's remaining tiles.
  * Highest score wins.

* Expand game to allow 3 or 4 players.
* CSS Animations