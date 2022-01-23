const mongoose = require('mongoose');

const ChatRoomSchema = new mongoose.Schema({
    chatRoomName: {
        type: String,
        trim: true,
        requried: true, 
    },
    avatarUrl: {
        type: String,
        default: ""
    },
    creatorId: {
        type: String,
        trim: true,
        required: true
    },
    members: {
        type: Array,
        required: true
    }

}, { timestamps: true });


module.exports = mongoose.model('ChatRoom', ChatRoomSchema);