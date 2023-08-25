const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    collection: "category",
    versionKey: false,
  }
);

module.exports = mongoose.model("category", categorySchema);
