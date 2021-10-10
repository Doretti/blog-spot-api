import { Router } from 'express'
const router = Router()
import bcj from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodeFetch from 'node-fetch'
import dotenv from 'dotenv'
import validator from 'validator'
dotenv.config()

const hasuraCommit = async (query) => await (await nodeFetch('https://blog-spo.hasura.app/v1/graphql', {
  method: 'POST',
  body: JSON.stringify({query}),
  headers: {
    'content-type': 'application/json',
    'x-hasura-admin-secret': process.env.HASURA_SECRET
  }
})).json()

const createUser = (username, password, email) => `
mutation MyMutation {
  insert_users_one(object: {username: "${username}", email: "${email}", password_hash: "${password}"}) {
    avatarId
    createdAt
    email
    headerId
    id
    password_hash
    role
    username
  }
}

`

router.post('/register', async (req, res) => {
  const {
    username,
    email,
    password
  } = req.body.input

  if (!validator.isEmail(email)) {
    return res.send({
      response: 'Email is not correct'
    })
  }

  const encpwd = bcj.hashSync(password, 10)

  const user = (await hasuraCommit(createUser(username, encpwd, email))).data.insert_users_one
  
  const payload = { "userId": user.id }

  const token = jwt.sign(payload, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: 60 * 60 })

  return res.json({
    username: user.username,
    email: user.email,
    token,
    response: 'OK'
  })
})

export default router