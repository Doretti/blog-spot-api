const express = require('express')
const User = require('../models/user.model')
const router = express.Router()
require('dotenv').config()

router.get('/users/:id', async (req, res) => {
  try {
    const {
      id
    } = req.params

    const user = await User.findByPk(id, {
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