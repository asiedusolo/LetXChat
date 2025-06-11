import React from 'react'
// import './chatRoom.css'


const ChatRoom = ({ chatRoomName, chatRoom, avatarUrl, handleChatRoomSelect }) => {
    return (
        <div 
            className="flex items-center p-3 my-2 rounded-lg transition-colors duration-200 hover:bg-white hover:bg-opacity-20 cursor-pointer"
            onClick={() => handleChatRoomSelect(chatRoom)}
        >
            <img 
                src={avatarUrl === "" ? 
                    `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3KNxefYnky1ecrnryOJUJ6Gjun5IN7rHZoA&usqp=CAU` : 
                    avatarUrl} 
                alt={chatRoomName}
                className="w-10 h-10 rounded-full object-cover mr-4 border border-white border-opacity-30"
            />
            <span className="text-white font-medium">{chatRoomName}</span>
        </div>
    )
}


export default ChatRoom