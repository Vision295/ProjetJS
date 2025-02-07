// main.js

const { getInput, getListInputs } = require('./getInputs'); 
const { phoneticallySimilar } = require('./wordManipulation');
const { generateSlug } = require("random-word-slugs");

class JustOne {
      constructor(nbPlayer) {
            this.nbPlayer = nbPlayer;
            this.activePlayer = -1;
            this.wordToGuess = [];
            this.clues = [];
      }

      static getActivePlayer(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      static async sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
      }

      async initializeGame() {
            this.activePlayer += 1;  
            this.wordsToGuess = generateSlug(5, { format: "lower" });
            this.explainRules();
      }

      async chooseWordToGuess() {
            
      }

      async collectClues() {
            this.clues = await getListInputs(this.nbPlayer, "Give a clue to the active player: ");
            this.clues = this.clues.filter(clue => phoneticallySimilar(clue, this.wordToGuess));
      }

      explainRules() {
            console.log("Welcome to the game JUST ONE!");
            console.log("\nGame Rules:");
            console.log("1. There are", this.nbPlayer, "players. One of them is randomly chosen as the active player.");
            console.log("2. These players must choose one word among a list of five words to make a guess on. ")
            console.log("3. The active player must guess the secret word. ");
            console.log("4. The other players each provide a one-word clue to help the active player guess the word.");
            console.log("5. If multiple players give the same clue, those clues are eliminated.");
            console.log("6. The remaining clues are then given to the active player, who must guess the word!");
            console.log("7. If the active player guesses correctly, they win! Otherwise, they lose, and the word is revealed.");
            console.log("\nLet’s begin! Active Player (Player", this.activePlayer, "), look away while clues are being given!");
      }

      async startGame() {
            try {
                  await this.initializeGame();
                  await this.chooseWordToGuess();
                  await this.collectClues();

                  await JustOne.sleep(2000);
                  console.log("\n\n\n\n\nAll clues have been sent. The active player can come back to try to guess!");
                  this.displayClues();

                  let guess = await getInput("Your guess: ", false);
                  if (phoneticallySimilar(guess, this.wordToGuess)) {
                        console.log("Woow you won!!!");
                  } else {
                        console.log("Oh no! The word to guess was:", this.wordToGuess);
                  }
            } catch (error) {
                  console.error("Error:", error);
            }
      }
      

      displayClues() {
            console.log("Guess Player (player number:", this.activePlayer, ") try to guess the word!!!");
            this.clues.forEach((clue, index) => console.log(`Clue number ${index}: ${clue}`));
      }
}

