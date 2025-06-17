const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    employee_id: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    staff_email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    picture_avatar: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        required: true,
        min: 6

    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String
    },
    verificationTokenExpires: {
        type: Date
    },
    invitations: [{
        chatRoomId: String,
        inviterId: String,
        token: String,
        expiresAt: Date
    }]
},
{ timestamps: true }
    
)


module.exports = mongoose.model('User', UserSchema)