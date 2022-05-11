var express = require("express");
const { ObjectId } = require("mongodb");
var router = express.Router();
var { mongodb, MongoClient, dburl } = require("../dbSchema");
var {
  hashPassword,
  hashCompare,
  createToken,
  verifyToken,
} = require("../auth");

// --------------------------------------------------
// signup
router.post("/signup", async (req, res) => {
  const client = await MongoClient.connect(dburl);
  try {
    let db = await client.db("producthub");
    let user = await db.collection("users").find({ email: req.body.email });
    if (user.length > 0) {
      res.json({
        statusCode: 400,
        message: "User Already Exists",
      });
    } else {
      let hashedPassword = await hashPassword(
        req.body.password,
        req.body.cpassword
      );
      req.body.password = hashedPassword;
      req.body.cpassword = hashedPassword;
      let users = await db.collection("users").insertOne(req.body);
      res.json({
        statusCode: 200,
        message: "User SignUp Successfull",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  } finally {
    client.close();
  }
});

// Login

router.post("/login", async (req, res) => {
  const client = await MongoClient.connect(dburl);
  try {
    let db = await client.db("producthub");
    let user = await db.collection("users").findOne({ email: req.body.email });
    if (user) {
      let compare = await hashCompare(req.body.password, user.password);
      if (compare) {
        let token = await createToken(user.email, user.username);
        res.json({
          statusCode: 200,
          email: user.email,
          username: user.username,
          token,
        });
      } else {
        res.json({
          statusCode: 400,
          message: "Invalid Password",
        });
      }
    } else {
      res.json({
        statusCode: 404,
        message: "User Not Found",
      });
    }
  } catch (error) {
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  } finally {
    client.close();
  }
});
// varify token
router.post("/auth", verifyToken, async (req, res) => {
  res.json({
    statusCode: 200,
    message: req.body.purpose,
  });
});

//post category -----------------------------------------------------------------------------------------------
router.post("/postcategory", async (req, res) => {
  const client = await MongoClient.connect(dburl);
  try {
    let db = await client.db("producthub");
    let category = await db.collection("category").insertMany(req.body);
    if (category) {
      res.json({
        statusCode: 200,
        category,
        message: "Category Data Post Successfully",
      });
    }
  } catch {
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});
// get category
router.get("/getcategory", async (req, res) => {
  const client = await MongoClient.connect(dburl);
  try {
    let db = await client.db("producthub");
    let user = await db.collection("category");
    if (user) {
      let category = await db.collection("category").find().toArray();
      res.json({
        statusCode: 200,
        category,
        message: "Category Data Get Successfully",
      });
    }
  } catch {
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

// post method (all Feshion Product) -------------------------------------------------------------------------------
router.post("/postallfeshionproduct", async (req, res) => {
  const client = await MongoClient.connect(dburl);
  try {
    let db = await client.db("producthub");
    let allProducts = await db
      .collection("allfeshionproduct")
      .insertMany(req.body);
    if (allProducts) {
      res.json({
        statusCode: 200,
        allProducts,
        message: "Category Data Post Successfully",
      });
    }
  } catch {
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

// get method (all Feshion Product)
router.get("/getallfeshionproduct/", async (req, res) => {
  const client = await MongoClient.connect(dburl);
  try {
    let db = await client.db("producthub");
    let user = await db.collection("allfeshionproduct");
    if (user) {
      let allProducts = await db
        .collection("allfeshionproduct")
        .find()
        .toArray();
      res.json({
        statusCode: 200,
        allProducts,
        message: "Category Data Get Successfully",
      });
    }
  } catch (e) {
    console.log(e);
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});


// get method (all Feshion Product) (find the category Name)
router.get("/getProductByCategory/:categoryName", async (req, res) => {
  const client = await MongoClient.connect(dburl);
  try {
    let db = await client.db("producthub");
    let user = await db.collection("allfeshionproduct");
    if (user) {
      let query = {};
      if (req.params.categoryName) {
        query = { categoryName: req.params.categoryName };
      }
      let allProducts = await db
        .collection("allfeshionproduct")
        .find(query)
        .toArray();
      res.json({
        statusCode: 200,
        allProducts,
        message: "Category Data Get Successfully",
      });
    }
  } catch (e) {
    console.log(e);
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

// get method (find the Products Id )
router.get("/getProductById/:productId", async (req, res) => {
  const client = await MongoClient.connect(dburl);
  try {
    let db = await client.db("producthub");
    let user = await db.collection("allfeshionproduct");
    if (user) {
      if (req.params.productId) {
       var query = { _id : ObjectId(req.params.productId) };
      }
      let products = await db
        .collection("allfeshionproduct")
        .find(query)
        .toArray();
      res.json({
        statusCode: 200,
        products,
        message: "Category Data Get Successfully",
      });
    }
  } catch (e) {
    console.log(e);
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
