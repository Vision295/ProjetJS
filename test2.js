// main.js
const { getInput, getListInputs } = require('./getInputs'); // Import the getInputs function

let inputs = []; // Variable to store the inputs

async function handleInputsAndEvent() {
      try {
            let inputNum = await getInput("Enter your input : ");
            inputs = await getListInputs(inputNum, "Inputs for : ");

            console.log("Data has been collected. Sending data...");
            sendData(inputs); 
      } catch (error) {
            console.error("Error:", error);
      }
}

function sendData(data) {
      console.log("Sending the following data:", data);
}

handleInputsAndEvent();
