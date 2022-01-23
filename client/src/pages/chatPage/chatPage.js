import React from "react";
import Topbar from "../../components/topbar/topbar";
import ChatRoom from "../../components/chatRooms/chatRoom";
import Message from '../../components/message/message'
import ChatDetails from "../../components/chatDetails/chatDetails"
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
            <div className="chatBoxTop">
              <Message />
              <Message />
              <Message ownMessage={true}/>
              <Message />
              <Message ownMessage={true} />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              
            </div>
            <div className="chatBoxBottom">
              <button className="chatAttatchment">Attachment</button>
              <textarea className="chatMessageInput" placeholder="Type your message here"></textarea>
              <button className="chatSubmitButton">Send</button>
            </div>
          </div>
        </div>
        <div className="chatDetails">
          <div className="chatDetailsWrapper">
              <ChatDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
