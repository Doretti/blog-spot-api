const express = require('express')
const User = require('../models/user.model')
const router = express.Router()
require('dotenv').config()

router.get('/users', async (req, res) => {
  try {
    const tokenInfo = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET)
    console.log(tokenInfo);

    const user = await User.findByPk(tokenInfo.userId, {
      raw: true
    })

    if (!user.email) {
      return res.json({
        message: 'User not found'
      }).status(400)
    }

    return res.json({
      ...user
    })

  } catch (error) {
    return res.json(error).status(400)
  }

})

module.exports = router