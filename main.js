// main.js

const { getInput, getListInputs } = require('./getInputs'); 
const natural = require('natural');
const { generateSlug } = require("random-word-slugs");




const metaphone = new natural.Metaphone(); 
function areWordsPhoneticallySimilar(word1, word2) {
      const phoneticCode1 = metaphone.process(word1); 
      const phoneticCode2 = metaphone.process(word2);  

      if (phoneticCode1 === phoneticCode2) {
            return true; 
      } else {
            return false;
      }
}

getActivePlayer = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

explainRules = function () {
      console.log("here are the rules");
}

getWordToGuess = function() {
      return generateSlug(1, { format: "lower" });
}

function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
      try {
            let nbPlayer = await getInput("Enter the number of player : ", true);
            explainRules();
            let activePlayer = getActivePlayer(1, nbPlayer);
            let wordToGuess = getWordToGuess();

            let clues = await getListInputs(nbPlayer, "Give a clue to the active player : ");

            let realclues = []
            for (clue of clues) {
                  if (areWordsPhoneticallySimilar(clue, wordToGuess)) {
                        console.log(`the word ${clue} can be pronounced the same way as the word ${wordToGuess}`);
                  } else {
                        realclues.push(clue);
                  }
            }
            
            await sleep(2000)
            console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n")

            console.log("All clues have been sent. The active player can come back to try to guess ! with the following clues : ");
            let i = 0;
            for (clue of realclues) {
                  console.log(`Clue number ${i} : ${clue}`)
                  i++;
            }
            console.log("Guess Player (player number : ", activePlayer, ") try to guess the word !!!")

            let guess = await getInput("Your guess : ", false)
            if (areWordsPhoneticallySimilar(guess, wordToGuess)) {
                  console.log("Woow you won !!!")
            } else {
                  console.log("Oh no the word to guess was : ", wordToGuess)
            }
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