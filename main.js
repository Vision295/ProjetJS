import { JustOne } from './justOne.js';
const { getInput } = require('./getInputs'); 

const nbPlayer = getInput("Enter the number of players : ")
const game = new JustOne(nbPlayer);
game.startGame();
