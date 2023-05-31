module.exports = {
    split_ingredients: (string) => {
    const sentences = string.split(",");
    return sentences;
  },
    split_directions: (string) => {
        const sentences = string.split(".");
        return sentences;
      },
};

