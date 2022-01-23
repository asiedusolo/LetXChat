const express = require('express');
const router = express.Router()
const Message = require('../models/Message')


router.post('/', async (req, res) => {    
    const newMessage = new Message(req.body)
    try {
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    } catch (error) {
        res.status(500).json(error)
    }
})




module.exports = router