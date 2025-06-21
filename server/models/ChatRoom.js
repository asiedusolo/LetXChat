const mongoose = require('mongoose');

const ChatRoomSchema = new mongoose.Schema({
    chatRoomName: {
        type: String,
        trim: true,
        required: true,
        unique: true,
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
        type: [String],
        required: true
    }

}, { timestamps: true });


module.exports = mongoose.model('ChatRoom', ChatRoomSchema);