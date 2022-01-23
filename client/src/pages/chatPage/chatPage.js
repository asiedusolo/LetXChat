import React from "react";
import Topbar from "../../components/topbar/topbar";
import ChatRoom from "../../components/chatRooms/chatRoom";
import "./chatPage.css";

const ChatPage = () => {
  return (
    <div>
      <Topbar />
      <div className="chatPage">
        <div class="chatRooms">
          <div className="chatRoomsWrapper">
            <input placeholder="Search for Rooms" className="chatRoomsSearch" />
            <ChatRoom />
            <ChatRoom />
            <ChatRoom />
            <ChatRoom />
            <ChatRoom />
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="ChatBoxTop">
              
            </div>
            <div className="chatBoxBottom"></div>
          </div>
        </div>
        <div className="chatDetails">
          <div className="chatDetailsWrapper">ChatDetail</div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
