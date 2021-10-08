const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.post('/register', async (req, res) => {
  try {
    const {
      username,
      email,
      password
    } = req.body
  
    if (!username || !email || !password) return res.status(400).send({error: 'Not enough data'})

    const encpwd = bcrypt.hashSync(password, 10)
  
    const user = await User.create({
      username,
      email,
      password: encpwd
    })
  
    payload = { "userId": user.dataValues.id }
  
    const token = jwt.sign(payload, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: 60 * 60 })
  
    res.json({
      ...user.dataValues,
      token
    })
  } catch (error) {
    return res.json(error).status(400)
  }
})

module.exports = router