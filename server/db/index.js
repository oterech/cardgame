//this is the access point for all things database related!
const db = require('./db')
const Card = require('./models/Card')
const Suit = require('./models/Suit')
const User = require('./models/User')

//associations could go here!

Card.belongsTo(Suit)
Suit.hasMany(Card)


module.exports = {
  db,
  models: {
    User,
    Card,
    Suit,
  },
}
