const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.post('/login', async (req, res) => {
  try {
    const {
      username,
      email,
      password
    } = req.body

    if (!username || !email || !password) return res.status(400).send({error: 'Not enough data'})
  
    const user = (await User.findAll({
      where: {
        username,
        email
      },
      raw: true
    }))
  
    if (!user.length) {
      res.status(404).send({error: 'User not found'})
    }
  
    const pwdEq = bcrypt.compareSync(password, user[0].password)
  
    if (!pwdEq) {
      throw new Error()
    }
  
    payload = { "userId": user[0].id }
  
    const token = jwt.sign(payload, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: 60 * 60 })
  
    res.json({
      token,
      ...user[0]
    })
  } catch (error) {
    res.status(400).send({
      ...error
    })
  }
})

module.exports = router