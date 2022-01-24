import React from "react";
import Topbar from "../../components/topbar/topbar";
import ChatRoom from "../../components/chatRooms/chatRoom";
import Message from "../../components/message/message";
import ChatDetails from "../../components/chatDetails/chatDetails";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/auth/authcontext";
import axios from "axios";
import "./chatPage.css";

const ChatPage = () => {
  const { user } = useContext(AuthContext);
  const [chatRooms, setChatRooms] = useState([]);
  const [currentChatRoom, setCurrentChatRoom] = useState({});
  const [currentChatRoomMembers, setCurrentChatRoomMembers] = useState([]);


  useEffect(() => {
    const getChatRooms = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/chatRooms/${user._id}`
        );
        setChatRooms(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getChatRooms();
  }, [user._id]);
  const handleChatRoomSelect = (chatRoom) => {
    setCurrentChatRoom(chatRoom);
    setCurrentChatRoomMembers(chatRoom.members);
  };
  return (
    <div>
      <Topbar />
      <div className="chatPage">
        <div class="chatRooms">
          <div className="chatRoomsWrapper">
            <input placeholder="Search for Rooms" className="chatRoomsSearch" />
            {chatRooms.map((chatRoom) => {
              return (
                <div key={chatRoom._id}>
                  <ChatRoom
                    {...chatRoom}
                    chatRoom={chatRoom}
                    handleChatRoomSelect={handleChatRoomSelect}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message />
              <Message />
              <Message ownMessage={true} />
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
              <textarea
                className="chatMessageInput"
                placeholder="Type your message here"
              ></textarea>
              <button className="chatSubmitButton">Send</button>
            </div>
          </div>
        </div>
        <div className="chatDetails">
          <div className="chatDetailsWrapper">
            <ChatDetails currentChatRoom={currentChatRoom} currentChatRoomMembers={currentChatRoomMembers}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
