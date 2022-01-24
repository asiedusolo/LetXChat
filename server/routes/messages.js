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

router.get('/', async (req, res) => {
    try {
        const allMessages = await Message.find({})
        res.status(200).json(allMessages)
    } catch (error) {
        res.status(500).json(error)        
    }
})

router.get('/:chatRoomId', async (req, res) => {
    try {
        const messages = await Message.find({
            chatRoomId: req.params.chatRoomId
        })
        res.status(200).send(messages)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router