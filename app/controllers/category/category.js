const Category = require("../../models/category");
const { isIDGood } = require("../../utils/isIDGood");

const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    if (category) {
      res.json({
        statusCode: 200,
        category,
        message: "Category Data Post Successfully",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

const getCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({
      statusCode: 200,
      category: categories,
      message: "Category Data Get Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const id = await isIDGood(req.params.id);
    const categories = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!categories) {
      return res.status(404).json({
        statusCode: 404,
        category: categories,
        message: "Not Found  Category`",
      });
    }
    res.status(200).json({
      statusCode: 200,
      category: categories,
      message: "Category Updated Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

module.exports = { createCategory, getCategory, updateCategory };
