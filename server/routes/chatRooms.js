const express = require('express');
const router = express.Router();
const ChatRoom = require('../models/ChatRoom')


// get all chatRooms available

router.get('/', async (req, res) => {
    try {
        const allChats = await ChatRoom.find({})
        res.status(200).json(allChats)
    } catch (error) {
        res.status(500).json(err)
    }
})





module.exports = router