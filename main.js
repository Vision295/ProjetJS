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

explainRules = function (nbPlayer, activePlayer, wordToGuess) {
      console.log("Welcome to the game JUST ONE!");
      console.log("\nGame Rules:");
      console.log("1. There are", nbPlayer, "players. One of them is randomly chosen as the active player.");
      console.log("2. The active player must guess the secret word. ");
      console.log("3. The other players each provide a one-word clue to help the active player guess the word.");
      console.log("4. If multiple players give the same clue, those clues are eliminated.");
      console.log("5. The remaining clues are then given to the active player, who must guess the word!");
      console.log("6. If the active player guesses correctly, they win! Otherwise, they lose, and the word is revealed.");
      console.log("\nLet’s begin! Active Player (Player", activePlayer, "), look away while clues are being given!");
}

getWordToGuess = function() {
      return generateSlug(1, { format: "lower" });
}

getWordCard = function() {
      let slugs = [];
      for (let i = 0; i < 5; i++) {
            slugs.push(generateSlug(1, { format: "lower"}));
            console.log(i,":",slugs[i]) 
      }
      return slugs // Push the result of generateSlug() into the array

}



function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
}

function removeDuplicates(arr) {
      let counts = arr.reduce((acc, item) => {
          acc[item] = (acc[item] || 0) + 1;
          return acc;
      }, {});
  
      return arr.filter(item => counts[item] === 1);
}
  
async function run() {
      try {
            const nbPlayer = await getInput("Enter the number of player : ", true);
            let nbPoints = 13;
            //let activePlayer = getActivePlayer(1, nbPlayer);
            for (let activePlayer = 1; activePlayer <= nbPlayer; activePlayer++) {      
                  //let activePlayer = getActivePlayer(1, nbPlayer);
                  let wordCard = getWordCard();
                  let wordIndex = await getInput("Which word do you want (specify index)? ", true)
                  let wordToGuess = wordCard[wordIndex];
                  explainRules(nbPlayer, activePlayer, wordToGuess);

                  await sleep(5000);

                  //console.log("The word you should make him guess is : ", wordToGuess);

                  let clues = await getListInputs(nbPlayer, `The word is \"${wordToGuess}\" \n Give a clue to the active player : `);

                  let realclues = []
                  for (clue of clues) {
                        if (areWordsPhoneticallySimilar(clue, wordToGuess)) {
                              console.log(`the word ${clue} can be pronounced the same way as the word ${wordToGuess}`);
                        } else {
                              realclues.push(clue);
                        }
                  }
                  
                  realclues = removeDuplicates(clues)
                  await sleep(2000)
                  console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n")


                  console.log("All the remaining", realclues.length ," clues have been sent. The active player can come back to try to guess ! with the following clues : ");
                  let i = 0;
                  for (clue of realclues) {
                        console.log(`Clue number ${i} : ${clue}`)
                        i++;
                  }
                  console.log("Do you want to : ");
                  console.log("1 : Guess");
                  console.log("2 : Pass")
                  let choice = await getInput("Enter your choice (1 or 2)", true)
                  if (choice === 1){
                        console.log("Guess Player (player number : ", activePlayer, ") try to guess the word !!!")

                        let guess = await getInput("Your guess : ", false)
                        if (areWordsPhoneticallySimilar(guess, wordToGuess)) {
                              console.log("Woow you won !!!")
                        } else {
                              console.log("Oh no the word to guess was : ", wordToGuess)
                        }
                  }
            }
      } catch (error) {
            console.error("Error : ", error)
      }
}


run()