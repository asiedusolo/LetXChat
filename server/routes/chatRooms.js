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


// create a new chatRoom
router.post('/', async (req, res) => {
    const newChatRoom = new ChatRoom({
        chatRoomName: req.body.chatRoomName,
        avatarUrl: req.body.avatarUrl,
        creatorId: req.body.creatorId,
        members: [req.body.creatorId]
    })

    const savedChatRoom = await newChatRoom.save()
    res.status(200).json(savedChatRoom)
})




module.exports = router