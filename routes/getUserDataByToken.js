const express = require('express')
const User = require('../models/user.model')
const router = express.Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.get('/users', async (req, res) => {
  try {
    console.log(jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET));
    const tokenInfo = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET)
    console.log(tokenInfo);

    const user = await User.findByPk(tokenInfo.userId, {
      raw: true
    })

    if (!user?.email) {
      res.status(400).send({
        error: 'User not found'
      })
    }

    return res.json({
      ...user
    })

  } catch (error) {
    return res.status(400).send({
      error: error
    })
  }

})

module.exports = router