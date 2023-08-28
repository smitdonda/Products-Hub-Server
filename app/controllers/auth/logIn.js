const User = require('../../models/users')
const { createToken, hashCompare } = require('../../utils/authHepler')

const logIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      const compare = await hashCompare(req.body.password, user.password)
      if (compare) {
        const token = await createToken(user._id)
        res.json({
          success: true,
          userInfo: { userName: user.username, email: user.email },
          token
        })
      } else {
        res.status(422).json({
          success: false,
          message: 'Wrong password'
        })
      }
    } else {
      res.status(404).json({
        success: false,
        message: 'User Not exist Please Register'
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}

module.exports = { logIn }
