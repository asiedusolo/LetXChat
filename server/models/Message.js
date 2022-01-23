const mongoose = require('mongoose')


const MessageSchema = new mongoose.Schema({
    chatRoomId: {
        type: String,
        required: true
    },
    senderId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        requried: true
    },
    status: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
)


module.exports = mongoose.model('Message', MessageSchema)