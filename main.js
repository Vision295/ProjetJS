const { getInput, getListInputs } = require('./getInputs'); // Import the getInputs function


let wordToGuess = "Friend";

getActivePlayer = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

explainRules = function () {
      console.log("here are the rules")
}


async function run() {
      try {
            let nbPlayer = await getInput("Enter the number of player : ");
            explainRules();

            let clues = await getListInputs(nbPlayer, "Give a clue to the active player : ");

            console.log("All clues have been sent. The active player can come back to try to guess !");
      } catch (error) {
            console.error("Error : ", error)
      }
}

/*
const prompt = require("prompt-sync")({ sigint: true });

let nbPlayer = "haha";
do {
      nbPlayer = prompt("How many players ?\t");
      console.log(`There are : ${nbPlayer} players. \n`);
} while (!Number.isInteger(parseInt(nbPlayer))) 


let activePlayer = getactivePlayer(1, nbPlayer);

function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
}

let clues = [];
let currentGuess = "haha";


function filterClues(clues) {
      return clues
}


async function run() {
      console.log(`Let the game JUST ONE begin !!!! \n\t Active player (Player number : ${activePlayer}): stop looking at the screen !`);
      await sleep(2000);
      console.log("Everyone has to give one by one their clues to make the active player guess ... The word to guess is : ", wordToGuess);
      for (let i = 1; i < nbPlayer; i++) {
            currentGuess = prompt(`Player ${i} give your clue : \t`);
            clues.push(currentGuess);
      }
      console.log("Everyone has given their clues the active player can come back : ", nbPlayer);

      for (let clue of clues) {
            console.log(clue);
      }
      
      console.log("Try to guess now : ");
      let guess = prompt(`Active plyaer (Player number : ${activePlayer} try to guess the word : \t`);
      if (guess == wordToGuess) {
            console.log("You have won well done !!! ");
      } else {
            console.log("You have lost :( \nThe word you had to guess was : ", wordToGuess)
      }
}
*/

run()