const natural = require('natural');
const metaphone = new natural.Metaphone(); // Create an instance of the Metaphone class

function areWordsPhoneticallySimilar(word1, word2) {
    const phoneticCode1 = metaphone.process(word1);  // Process the first word
    const phoneticCode2 = metaphone.process(word2);  // Process the second word

    // Check if the phonetic codes are the same
    if (phoneticCode1 === phoneticCode2) {
        return true; // Words are phonetically similar
    } else {
        return false; // Words are not phonetically similar
    }
}

// Example usage
const word1 = "night";
const word2 = "nite";

if (areWordsPhoneticallySimilar(word1, word2)) {
    console.log(`The words "${word1}" and "${word2}" have similar pronunciations.`);
} else {
    console.log(`The words "${word1}" and "${word2}" do not have similar pronunciations.`);
}
