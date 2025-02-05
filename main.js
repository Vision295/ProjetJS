
let wordToGuess = "Friend"

const prompt = require("prompt-sync")({ sigint: true });

let nbPlayer = "haha"
do {
      nbPlayer = prompt("How many players ?\t");
      console.log(`There are : ${nbPlayer} players. \n`);
} while (!Number.isInteger(parseInt(nbPlayer))) 


getactivePlayer = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
}
let activePlayer = getactivePlayer(1, nbPlayer)

function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
      await sleep(2000);
      console.log(`Let the game JUST ONE begin !!!! \n\t Active player (Player number : ${activePlayer}): stop looking at the screen !`)
      console.log("")
}


run()