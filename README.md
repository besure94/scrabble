# Template Repository

#### Use this template repository for starting new projects. Update with new technologies and packages when necessary.

#### By (Your Name Here)

## Technologies Used

* HTML
* CSS
* Bootstrap
* JavaScript
* Webpack
* Node Package Manager
* Jest

## Description

## Setup/Installation Requirements

* Select the green "Use this template" button and select "create a new repository".
* In the terminal, go to your project folder and run the command `$ npm install` to install node_modules.
* Run the command `$ npm run build` to bundle together JS files.
* Enter the command `$ npm run start` to start a live development server.
* Enter the command `$ npm run lint` to check for errors.

## Known Bugs

* _Any known issues_
* _should go here_

## License

--------------------------------------------------------------------------------------------------------------------

### Outline for MVP

* 2 player game
  
* Build basic game board
    * Grid that is 15 cells high and 15 cells wide.
    * Horizontal cells go from A - O, left to right.
    * Vertical cells go from 1 - 15, top to bottom.
  
* Logic to determine who goes first
  * Each player draws a tile.
  * Player with tile closest to "A" begins the game.
  * If player draws a blank tile, they automatically go first.
  * Each initial drawn tile goes back into the tiles object (bag).

* Player turn logic
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

First Word Score:

  * First player puts their word on the cell in the center of the board.
  * Each player has to build their words off of this word.
  * Need logic that allows players to only place tiles/words that are centered around another word.
    
    
* Have an object for tiles that are to be picked
  * Object will contain 100 tiles.
  * 98 will be letters with different point values.
  * 2 will be empty, which can take the place of any letter.
    
  Tiles will be distributed as:
    2 blank tiles (scoring 0 points)
    1 point: E ×12, A ×9, I ×9, O ×8, N ×6, R ×6, T ×6, L ×4, S ×4, U ×4
    2 points: D ×4, G ×3
    3 points: B ×2, C ×2, M ×2, P ×2
    4 points: F ×2, H ×2, V ×2, W ×2, Y ×2
    5 points: K ×1
    8 points: J ×1, X ×1
    10 points: Q ×1, Z ×1
  
* Have an object for each player
  
* Determine scoring logic
  


