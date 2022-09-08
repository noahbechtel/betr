const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  score: {
    type: Sequelize.INTEGER,
    defaultValue:1000
  }
})

module.exports = User
