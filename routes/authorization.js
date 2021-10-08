const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.post('/auth', async (req, res) => {
  try {
    const {
      username,
      email,
      password
    } = req.body

    if (!username || !email || !password) {
      res.status(400)
    }
  
    const user = (await User.findAll({
      where: {
        username,
        email
      },
      raw: true
    }))
  
    if (!user.length) {
      res.json({mesage: 'User not found'}).status(400)
    }
  
    const pwdEq = bcrypt.compareSync(password, user[0].password)
  
    if (!pwdEq) {
      return res.json({
        data: 'Password not correct'
      }).status(400)
    }
  
    payload = { "userId": user[0].id }
  
    const token = jwt.sign(payload, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: 60 * 60 })
  
    res.json({
      token
    })
  } catch (error) {
    console.log(error);
    res.json(error).status(400)
  }
})

module.exports = router