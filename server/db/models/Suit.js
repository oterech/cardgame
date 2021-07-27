const Sequelize = require('sequelize')
const db = require('../db')

const Suit = db.define('suit', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })
  
module.exports = Suit
  