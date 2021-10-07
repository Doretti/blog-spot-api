const sequelize = require('../sequelize')
const Sequelize = require('sequelize')

const LikeHistory = sequelize.define('like-history', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  like: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  }
}, {
  freezeTableName: false
})

module.exports = LikeHistory