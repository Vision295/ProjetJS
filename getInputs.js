// getInputs.js

const input = require("input");



function getInput(msg, isNum) {
      return new Promise(async (resolve, reject) => {
            try {
                  let numInputs = await input.text(msg);

                  if (isNum) {
                        if (isNaN(numInputs) || numInputs < 0) {
                              console.log("Please enter a valid number greater than or equal to 0.");
                              reject("Invalid input number");
                              return;
                        }
                        resolve(parseInt(numInputs))
                  }
                  resolve(numInputs)
            } catch (error) {
                  reject(error)
            }
      })
}


function getListInputs(numInputs, msgPerInput) {
      return new Promise(async (resolve, reject) => {
            try {
                  numInputs = parseInt(numInputs);
                  const inputs = [];

                  for (let i = 1; i < numInputs; i++) {
                        let inputValue = await input.text(msgPerInput + String(i));
                        inputs.push(inputValue);
                        console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n")
                  }

                  resolve(inputs); // Resolve with the collected inputs
            } catch (error) {
                  reject(error); // Reject if there is any error
            }
      });
}

// Export the getInputs function so it can be used in another file
module.exports = { getInput, getListInputs };
