const Sequelize = require('sequelize')
const db = require('../db')

const Message = db.define('message', {
  email: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false
  },
  message: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true
  }
})

module.exports = Message
