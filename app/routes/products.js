const express = require("express");
const router = express.Router();
const trimRequest = require("trim-request");
const { requireAuth } = require("../middleware/requireAuth");

const {
  createProduct,
  getAllProducts,
  getProductByCategory,
  getProductById,
} = require("../controllers/allProducts");

// Products routes

// get all Products
router.get("/", requireAuth, getAllProducts);

// create a new Products
router.post("/", requireAuth, trimRequest.all, createProduct);

//get category wice products
router.get(
  "/getProductByCategory/:categoryName",
  requireAuth,
  getProductByCategory
);

// get _id wice products
router.get("/getProductById/:productId", requireAuth, getProductById);

module.exports = router;
