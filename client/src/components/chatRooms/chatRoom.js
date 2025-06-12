import React from 'react';
import { FiMessageSquare } from 'react-icons/fi';

const ChatRoom = ({ chatRoom, handleChatRoomSelect }) => {
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
                    {chatRoom.chatRoomName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                    {chatRoom.members.length} members
                </p>
            </div>
        </div>
    );
};

export default ChatRoom;