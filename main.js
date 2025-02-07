// main.js

import JustOne from './justOne.js';
const { getInput } = require('./getInputs'); 

let nbPlayer = getInput("Enter the number of players : ")
const game = new JustOne(nbPlayer);
game.startGame();
