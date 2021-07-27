const router = require('express').Router()
const { models: { User, Card, Suit }} = require('../db')
module.exports = router

//all suits
router.get('/', async(req, res, next) => {
  try {
    const suits = await Suit.findAll()
    res.send(suits)
  } catch (err) {
    next(err)
  }
})

//this route gets a suit by its ID, including all the cards in that suit

router.get('/:id', async (req, res, next) => {
  try {
    const suit = await Suit.findOne({
        where: {
            id: req.params.id
        },
        include: Card,
        order: [
        [Card,'order', 'ASC']
    ]
    })
    res.send(suit)
  } catch (err) {
    next(err)
  }
})