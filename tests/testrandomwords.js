const { generateSlug } = require("random-word-slugs");

// Get a single word
const word = generateSlug(1, { format: "lower" });
console.log(word);