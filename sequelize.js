const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.PG_URI, {
  dialectOptions: {
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
  }
})

module.exports = sequelize