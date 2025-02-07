// JustOne.js
const fs = require('fs');
const { getInput, getListInputs } = require('./getInputs'); 
const { phoneticallySimilar } = require('./wordManipulation');
const { generateSlug } = require("random-word-slugs");

class JustOne {
      constructor(nbPlayer) {
            this.nbPlayer = nbPlayer;
            this.activePlayer = -1;
            this.wordToGuess = [];
            this.clues = [];
            this.choice = 0;
            this.score = 0;
            this.nbCards = 13;
            this.round = 0;
      }
      
      
      static getWordCard = function() {
            let slugs = [];
            for (let i = 0; i < 5; i++) {
                  slugs.push(generateSlug(1, { format: "lower"}));
            }
            return slugs // Push the result of generateSlug() into the array
      }


      async getChoice() {
            console.log("Do you want to : ");
            console.log("1 : Guess");
            console.log("2 : Pass")
            this.choice = await this.safeGetInput("Enter your choice (1 or 2)", true)
      }

      static async sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
      }

      async initializeGame() {
            this.activePlayer += 1;  
            this.activePlayer = this.activePlayer % this.nbPlayer;
            this.wordsToGuess = JustOne.getWordCard();
            this.explainRules();
      }

      async chooseWordToGuess() {
            let i = 0;
            for (let word of this.wordsToGuess) {
                  console.log(`${i} : ${word}`);
                  i++;
            }
            console.log("Non active players, decide on which word to choose (give its index number) : ");
            let index = await this.safeGetInput("Give the index : ", true);
            this.wordToGuess = this.wordsToGuess[index]
      }

      async removeDuplicates() {
            // Count occurrences of each clue
            const counts = this.clues.reduce((acc, item) => {
                acc[item] = (acc[item] || 0) + 1;
                return acc;
            }, {});
            
            // Filter to keep only unique clues
            this.clues = this.clues.filter(item => counts[item] === 1);
      }
      
      async removeSameAsWord() {
            let current = []
            for (let clue of this.clues) {
                  if (phoneticallySimilar(clue, this.wordToGuess)) {
                        console.log(`the word ${clue} can be pronounced the same way as the word ${this.wordToGuess}`);
                  } else {
                        current.push(clue);
                  }
            }
            this.clues = current
      }

      async collectClues() {
            
            this.clues = await this.safeGetListInputs(this.nbPlayer, `Give a clue to the active player to make him guess ${this.wordToGuess} : `);
            this.logCluesToFile();
            this.removeSameAsWord();
            this.removeDuplicates();
      }

      logCluesToFile() {
            const logEntry = `Round ${this.round}:\nWord: ${this.wordToGuess}\nClues: ${this.clues.join(', ')}\n`;
            
            
            fs.appendFileSync("clues_log.txt", logEntry, "utf8");
      }

      logGuess(guess) {
            const logEntry = `Guess : ${guess}\n\n`;

            fs.appendFileSync("clues_log.txt", logEntry, "utf8");
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

      async safeGetInput(promptMessage, isNumber = false) {
            while (true) {
                  try {
                        let input = await getInput(promptMessage, isNumber);
                        return input; // Return valid input
                  } catch (error) {
                        console.log("Invalid input, please try again.");
                  }
            }
      }
        
      async safeGetListInputs(nbPlayers, promptMessage) {
            while (true) {
                  try {
                        let inputs = await getListInputs(nbPlayers, promptMessage);
                        return inputs; // Return valid input
                  } catch (error) {
                        console.log("Invalid input, please try again.");
                  }
            }
      }

      async startGame() {
            try {
                  fs.writeFileSync("clues_log.txt", "", "utf8");
                  console.log(this.activePlayer, this.nbPlayer);
                  while (this.nbCards > 0) {
                        this.round++;
                        await this.initializeGame();
                        await this.chooseWordToGuess();
                        await this.collectClues();

                        await JustOne.sleep(2000);
                        console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nAll clues have been sent. The active player can come back to try to guess!");
                        await this.displayClues();

                        await this.getChoice()
                        if (this.choice == 1) {
                              let guess = await this.safeGetInput("Your guess: ", false);
                              this.logGuess(guess);
                              if (phoneticallySimilar(guess, this.wordToGuess)) {
                                    console.log("Woow you won!!!");
                                    this.score++;
                              } else {
                                    console.log("Oh no! The word to guess was:", this.wordToGuess);
                                    this.nbCards--;
                              }
                        }
                        this.nbCards--;
                        console.log(`Your score is : ${this.score}, the number of cards remaining is : ${this.nbCards}`);
                        await JustOne.sleep(2000);
                  }
            } catch (error) {
                  console.error("Error:", error);
            }
      }
      

      async displayClues() {
            console.log("Guess Player (player number:", this.activePlayer, ") try to guess the word!!!");
            this.clues.forEach((clue, index) => console.log(`Clue number ${index}: ${clue}`));
      }
}


async function run() {
      let nbPlayer = await getInput("Enter the number of players : ")
      const game = new JustOne(nbPlayer);
      game.startGame();
}

run()