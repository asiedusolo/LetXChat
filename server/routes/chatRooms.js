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

// get all chatrooms user belong to 
router.get('/:userId', async (req, res) => {
    try {
        const userChatRooms = await ChatRoom.find({
            members: { $in: [req.params.userId] },
        })
        res.status(200).json(userChatRooms)
    } catch (error) {
        res.status(200).json(error)
    }
})

// join a chatroom

router.put('/:chatRoomId/:userId', async (req, res) => {
    const { chatRoomId, userId } = req.params
    try {
        const chatRoom = await ChatRoom.findOneAndUpdate({ _id: chatRoomId },
            { $push: { members: userId } }, {new: true, upsert: true})
        res.status(200).json(chatRoom)
    } catch (error) {
        res.status(500).json(error)
    }
})



module.exports = router