const AllProducts = require('../../models/allProducts')

const getAllProducts = async (req, res) => {
  try {
    const products = await AllProducts.find({}).select({
      name: 1,
      images: 1,
      price: 1
    })
    if (products) {
      res.json({
        statusCode: 200,
        products,
        message: 'Get All Products Successfully'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error'
    })
  }
}

module.exports = { getAllProducts }
