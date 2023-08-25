const mongoose = require("mongoose");

const allfeshionproductSchema = new mongoose.Schema(
  {
    categoryName: { type: String },
    name: { type: String },
    images: [String],
    price: { type: String },
    specifications: [String],
    size: [String],
    description: { type: String },
    material: { type: String },
  },
  {
    collection: "allfeshionproduct",
    versionKey: false,
  }
);

module.exports = mongoose.model("allfeshionproduct", allfeshionproductSchema);
