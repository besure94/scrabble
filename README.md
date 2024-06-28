# Word Game

#### A two-player game similar to Scrabble, where users take turns spelling words to get the highest possible score.

#### By Aidan Williams, Brian Scherner, India Lyon-Myrick

## Technologies Used

* HTML
* CSS
* Bootstrap
* JavaScript
* Webpack
* Node Package Manager

## Description

A user selects `Start Game`, which loads the game board. The first player's turn is randomly determined. They have the option to `Play`, `Pass`, or `Exchange`. To `Play`, they drag and drop their tiles onto individual boxes on the game board. When they are happy with their decision, they select `Play`, which calculates their score for that round. Selecting `Pass` will forfeit their current turn. The user exchanges tiles by clicking on the tile(s) they wish to exchange, and then clicking `Exchange`. The turn will then switch to the other player after one of these three actions is chosen.

If both users select `Pass` for their turns, the game ends. Each player's remaining tiles are calculated, and this score is deducted from their final score. The game also ends if there are no remaining tiles. The player with the highest score wins.

## Setup/Installation Requirements

* Select the green `Code` button and clone this repository to your desktop.
* In your terminal, go to your project folder and run the command `$ npm install` to install node_modules.
* Run the command `$ npm run build` to bundle together JS files.
* Enter the command `$ npm run start` to start a live development server.
* Enter the command `$ npm run lint` to check for errors.

## Known Bugs

* There is no functionality to control which direction users can spell their words. For example, a user can place tiles diagonally or to the left.
* A user can place tiles wherever they want, without placing their tiles side by side to spell a proper word.
* A user can drop a tile on top of an existing tile.
* If a user drops a tile in a place that they want to change, they can't move it somewhere else.
* A user can select `Play` without putting any tiles down.
* There is no functionality to validate a word.

## License

MIT

Copyright(c) 2024 Aidan Williams, Brian Scherner, India Lyon-Myrick