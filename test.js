const input = require("input");

async function getInputs() {
      // Ask for the number of inputs
      let numInputs = await input.text("Enter the number of inputs you will provide:");

      // Validate if the number is valid
      if (isNaN(numInputs) || numInputs <= 0) {
            console.log("Please enter a valid number greater than 0.");
            return;
      }

      // Convert the string to a number
      numInputs = parseInt(numInputs);

      // Ask for the inputs based on the number provided
      const inputs = [];
      for (let i = 1; i <= numInputs; i++) {
            let inputValue = await input.text(`Enter input ${i}:`);
            inputs.push(inputValue);
      }

      // Output the collected inputs
      console.log("All inputs collected:", inputs);
}

// Start the process
getInputs();
