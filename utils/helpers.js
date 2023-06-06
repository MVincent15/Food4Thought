module.exports = {
    split_ingredients: (string) => {
    const sentences = string.split("\n");
    const filteredSentences = sentences.filter((sentence) => sentence.trim() !== "");
        return filteredSentences;
  },
    split_directions: (string) => {
        const sentences = string.split(".");
        const filteredSentences = sentences.filter((sentence) => sentence.trim() !== "");
        return filteredSentences;
      },
};

