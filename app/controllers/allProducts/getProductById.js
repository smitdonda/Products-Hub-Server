const AllProducts = require('../../models/allProducts')
const { isIDGood } = require('../../utils/isIDGood')

const getProductById = async (req, res) => {
  try {
    const id = await isIDGood(req.params.productId)
    const result = await AllProducts.findById(id)

    if (!result) {
      return res.status(404).json({
        statusCode: 500,
        message: 'Not Found Category'
      })
    }
    res.json({
      statusCode: 200,
      product: result,
      message: 'Get Product By Category Successfully'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error'
    })
  }
}

module.exports = { getProductById }
