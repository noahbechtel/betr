const router = require('express').Router()
const Message = require('../db/models/message')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const { email, name, message } = req.body
    await Message.create({ email, name, message })
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
  }
})
