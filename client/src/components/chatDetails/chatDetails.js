import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiUsers, FiCalendar, FiUser } from "react-icons/fi";

const ChatDetails = ({ currentChatRoom, currentChatRoomMembers }) => {
  const [chatCreator, setChatCreator] = useState("");
  const [usersInfo, setUsersInfo] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL

  useEffect(() => {
    axios
      .all(
        currentChatRoomMembers.map((member) =>
          axios.get(`${REACT_APP_API_BASE_URL}/api/user?userId=${member}`)
        )
      )
      .then((response) => setUsersInfo(response.map((d) => d.data)));
  }, [currentChatRoomMembers]);

  useEffect(() => {
    const getChatCreator = async () => {
      const response = await axios.get(
        `${REACT_APP_API_BASE_URL}/api/user?userId=${currentChatRoom.creatorId}`
      );
      setChatCreator(response.data);
    };
    getChatCreator();
  }, [currentChatRoom.creatorId]);

  return (
    <div className="h-full flex flex-col">
      {/* Chat Room Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {currentChatRoom.chatRoomName}
        </h2>
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <FiUser className="mr-2 text-gray-400" />
            <span>Created by: <span className="font-medium">{chatCreator.name}</span></span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FiCalendar className="mr-2 text-gray-400" />
            <span>Created on: <span className="font-medium">20th Jan, 2022</span></span>
          </div>
        </div>
      </div>

      {/* Members List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex items-center text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
          <FiUsers className="mr-2" />
          <span>Members ({usersInfo.length})</span>
        </div>
        <ul className="space-y-3">
          {usersInfo.map((member) => (
            <li key={member._id} className="flex items-center">
              <img
                className="w-8 h-8 rounded-full object-cover mr-3"
                src={
                  member.picture_avatar
                    ? process.env.REACT_APP_ENV == 'development' ? PF + member.picture_avatar : member.picture_avatar
                    : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                }
                alt={member.name}
              />
              <span className="text-sm font-medium text-gray-900">
                {member.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatDetails;
