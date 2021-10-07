const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.post('/auth', async (req, res) => {
  const {
    username,
    email,
    password
  } = req.body

  const user = (await User.findAll({
    where: {
      username,
      email
    },
    raw: true
  }))[0]

  const pwdEq = bcrypt.compareSync(password, user.password)

  if (!pwdEq) {
    return res.json({
      data: 'Password not correct'
    }).status(400)
  }

  payload = { "userId": user.id }

  const token = jwt.sign(payload, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: 60 * 60 })

  res.json({
    token
  })
})

module.exports = router