const Sequelize = require('sequelize')
const db = require('../db')

const Card = db.define('card', {
    rank: {
      type: Sequelize.STRING,
      allowNull: false
    },
    value: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    order: {
      type: Sequelize.INTEGER
    },
    imageUrl: {
      type: Sequelize.STRING,
    }
  })

  
  module.exports = Card
  