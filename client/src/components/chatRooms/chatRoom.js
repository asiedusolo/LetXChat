import React from 'react'
import './chatRoom.css'

const ChatRoom = ({chatRoomName, avatarUrl}) => {
    return (
        <div className="chatRoom">
            <img src={avatarUrl === "" ? `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3KNxefYnky1ecrnryOJUJ6Gjun5IN7rHZoA&usqp=CAU`: avatarUrl} alt="" className="chatRoomImg" />
            <span className="chatRoomName">{chatRoomName}</span>
        </div>
    )
}


export default ChatRoom