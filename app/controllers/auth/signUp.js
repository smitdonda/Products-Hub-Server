const User = require("../../models/users");
const { hashPassword } = require("../../utils/authHepler");

const signUp = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(422).json({
        success: false,
        message: "User Already Exists Please Login",
      });
    } else {
      const hashedPassword = await hashPassword(
        req.body.password,
        req.body.cpassword
      );
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
      await newUser.save();
      res.json({
        success: true,
        message: "User SignUp Successful",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { signUp };
