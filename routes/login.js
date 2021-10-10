import { Router } from 'express'
const router = Router()
import bcj from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

router.post('/login', async (req, res) => {
  try {
    const {
      username,
      email,
      password
    } = req.body

    if (!username || !email || !password) return res.status(400).send({error: 'Not enough data'})
  
    if (!user.length) {
      res.status(404).send({error: 'User not found'})
    }
  
    const pwdEq = bcj.compareSync(password, user[0].password)
  
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

export default router