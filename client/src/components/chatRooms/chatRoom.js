import React, { useEffect, useState } from 'react';
import { FiMessageSquare } from 'react-icons/fi';
import axios from 'axios';

const ChatRoom = ({ chatRoom, currentUser, handleChatRoomSelect }) => {
    const [chatRoomName, setChatRoomName] = useState('')
    const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL

    useEffect(() => {
        const getChatRoomPartner = async () => {
                const response =  await axios.get(
                `${REACT_APP_API_BASE_URL}/api/user?userId=${chatRoom.creatorId}`
            )
            console.log({response})
            setChatRoomName(response.data.name)
            }
        if(chatRoom.members.length === 2){
            getChatRoomPartner()
        }
    }, [])

    return (
        <div 
            className="flex items-center p-3 hover:bg-gray-50 rounded-md cursor-pointer transition-colors"
            onClick={() => handleChatRoomSelect(chatRoom)}
        >
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <FiMessageSquare className="h-5 w-5 text-blue-600" />
            </div>
            <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                    {currentUser._id ===  chatRoom.creatorId || chatRoom.members.length > 2  ?   chatRoom.chatRoomName: chatRoomName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                    {chatRoom.members.length} members
                </p>
            </div>
        </div>
    );
};

export default ChatRoom;