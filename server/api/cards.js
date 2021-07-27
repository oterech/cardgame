const router = require('express').Router()
const { models: { User, Card, Suit }} = require('../db')
module.exports = router


//this route gets all 52 cards for the game
router.get('/', async (req, res, next) => {
  try {
    const cards = await Card.findAll({
        include: Suit
    })
    console.log(cards.length)

    res.send(cards)
  } catch (err) {
    next(err)
  }
})

// this route gets all of the cards in a rank (aces, kings, 2, 3)
router.get("/:rank", async (req,res,next)=>{
  try {
    const cards = await Card.findAll({
        where: {
          rank: req.params.rank
        }
    })
    res.send(cards)
  } catch (err) {
    next(err)
  }
})