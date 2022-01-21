import React from "react";
import Topbar from "../../components/topbar/topbar";
import './chatPage.css'

const ChatPage = () => {
  return (
    <div>
      <Topbar />
      <div className="chatPage">
        <div class="chatRooms">
                  <div className="chatRoomsWrapper">
                      Chatroom
          </div>
        </div>
        <div className="chatBox">
                  <div className="chatBoxWrapper">
                      ChatBox
          </div>
        </div>
        <div className="chatDetails">
                  <div className="chatDetailsWrapper">
                      ChatDetail
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
