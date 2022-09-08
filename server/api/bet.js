const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

let pot = 0;
let minimumBet = 0;
let betStarted = false;

router.get('/startBet/:id', async (req, res, next) => {
  try {
    pot = 0;
    minimumBet = req.params.id;
    betStarted = true;
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})
router.get('/getBetInfo', async (req, res, next) => {
  try {
      const currentBet={min:minimumBet,started:betStarted}
      res.json(currentBet)    
  } catch (err) {
    next(err)
  }
})
router.get('/joinBet/:user', async (req, res, next) => {
  try {
    console.log(req.params.user)
    let user = await User.findOne({ where: { name: req.params.user } })
    if (user.score-= minimumBet < 0) {
      res.json({error:"Insufficient Funds"})
    } else {
      user.score = user.score -= minimumBet;
      pot += minimumBet;
       res.json({ message: "Joined" })
    }
   
     
  } catch (err) {
    next(err)
  }
})
router.get('/addUser/:user', async (req, res, next) => {
  try {
    console.log(req.params.user)
    let user = await User.findOrCreate({ name: req.params.user })
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})
router.get('/info/:user', async (req, res, next) => {
  try {
       let user = await User.findOne({ where: { name: req.params.user } })
    res.json({minimumBet, pot, betStarted, score: user.score })
  } catch (err) {
    next(err)
  }
})
router.get('/winBet/:user', async (req, res, next) => {
  try {
    let user = await User.findOne({ where: { name: req.params.user } })
    user.score = user.score += pot;
    betStarted = false;
    minimumBet = 0;
  } catch (err) {
    next(err)
  }
})