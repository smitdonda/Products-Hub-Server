const AllProducts = require("../../models/allProducts");

const getProductByCategory = async (req, res) => {
  try {
    const { categoryName } = req.params;
    const result = await AllProducts.find({ categoryName });

    if (!result) {
      return res.status(404).json({
        statusCode: 500,
        message: "Not Found Product By Category",
      });
    }
    res.json({
      statusCode: 200,
      products: result,
      message: "Get Product By Category Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

module.exports = { getProductByCategory };
