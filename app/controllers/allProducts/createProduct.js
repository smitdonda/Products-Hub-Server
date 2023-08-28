const AllProducts = require('../../models/allProducts')

const createProduct = async (req, res) => {
  try {
    const allProducts = await AllProducts.create(req.body)
    if (allProducts) {
      res.json({
        statusCode: 200,
        products,
        message: 'Products created Successfully'
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

module.exports = { createProduct }
