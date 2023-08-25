const mongoose = require("mongoose");

const isIDGood = async (id = "") => {
  return new Promise((resolve, reject) => {
    const goodID = mongoose.Types.ObjectId.isValid(id);
    return goodID
      ? resolve(id)
      : reject({ success: false, message: "Invalid Id" });
  });
};

module.exports = { isIDGood };
