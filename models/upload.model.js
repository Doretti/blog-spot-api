const sequelize = require('../sequelize')
const Sequelize = require('sequelize')

const Upload = sequelize.define('uploads', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  mimetype: {
    type: Sequelize.STRING,
    allowNull: false
  },
  size: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  path: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  freezeTableName: false
})

module.exports = Upload