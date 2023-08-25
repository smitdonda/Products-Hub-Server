const AllProducts = require("../../models/allProducts");

const getAllProducts = async (req, res) => {
  try {
    const products = await AllProducts.find({});
    if (products) {
      res.json({
        statusCode: 200,
        products,
        message: "Get All Products Successfully",
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

module.exports = { getAllProducts };
