const sequelize = require('../sequelize')
const Sequelize = require('sequelize')

const Post = sequelize.define('posts', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  text: {
    type: Sequelize.STRING
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  freezeTableName: false
})

module.exports = Post