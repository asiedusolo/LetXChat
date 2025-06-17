const express = require('express');
const router = express.Router();
const ChatRoom = require('../models/ChatRoom')
const Invitation = require('../models/Invitation')


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
            { $push: { members: userId } }, { new: true, upsert: true })
        res.status(200).json(chatRoom)
    } catch (error) {
        res.status(500).json(error)
    }
})


// router.post('/:chatRoomId/invite/:inviterId', async (req, res) => {
//     try {
//         const { email } = req.body
//         const { chatRoomId, inviterId } = req.params

//         const inviter = await User.findById(inviterId)
//         const chatRoom = await ChatRoom.findById(chatRoomId)

//         if (!inviter || !chatRoom) {
//             return res.status(404).json({ msg: "Invalid inviter or chat room " })
//         }

//         const existingUser = await User.findOne({ staff_email: email })

//         const invitationToken = crypto.randomBytes(20).toString('hex')
//         const expiresAt = new Date()
//         expiresAt.setDate(expiresAt.getDate() + 7)

//         if (existingUser) {

//             if (!existingUser.isVerified) {
//                 return res.status(400).json({ msg: "User exists but email is not verified " })
//             }

//             await ChatRoom.findByIdAndUpdate(chatRoomId, {
//                 $addToSet: { members: existingUser._id }
//             })

//             return res.status(200).json({ msg: "User added to chat room " })

//         } else {
//             const newInvitation = new Invitation({
//                 email,
//                 token: invitationToken,
//                 inviterId,
//                 ChatRoomId,
//                 expiresAt,
//                 status: 'pending'
//             })

//             await newInvitation.save()

//             const emailSent = await sendInvitationEmail(email, inviter.name, invitationToken)

//             if (!emailSent) {
//                 await Invitation.deleteOne({ token: invitationToken })
//                 return res.status(500).json({ msg: "Failed to send invitation email" })
//             }

//             return res.status(200).json({
//                 msg: "Invitation sent successfully",
//                 invitationId: newInvitation._id
//             })
//         }

//     } catch (error) {
//         res.status(500).json(error)
//     }
// })



module.exports = router