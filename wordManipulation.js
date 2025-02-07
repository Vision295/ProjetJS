const natural = require('natural');


function phoneticallySimilar(word1, word2) {
      const metaphone = new natural.Metaphone();
      return metaphone.process(word1) === metaphone.process(word2);
}


module.exports = { phoneticallySimilar };