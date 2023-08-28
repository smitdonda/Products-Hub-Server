const { createProduct } = require('./createProduct')
const { getAllProducts } = require('./getAllProducts')
const { getProductByCategory } = require('./getProductByCategory')
const { getProductById } = require('./getProductById')

module.exports = {
  createProduct,
  getAllProducts,
  getProductByCategory,
  getProductById
}
