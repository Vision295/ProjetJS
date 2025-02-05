const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

(async function() {
  let name = await askQuestion("Enter your name: ");
  let age = await askQuestion("Enter your age: ");
  console.log(`Hello ${name}, you are ${age} years old.`);
  rl.close();
})();


