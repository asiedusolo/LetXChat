import React from "react";
import Topbar from "../../components/topbar/topbar";
import ChatRoom from "../../components/chatRooms/chatRoom";
import Message from "../../components/message/message";
import ChatDetails from "../../components/chatDetails/chatDetails";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../contexts/auth/authcontext";
import axios from "axios";
import "./chatPage.css";

const ChatPage = () => {
  const { user } = useContext(AuthContext);
  const [chatRooms, setChatRooms] = useState([]);
  const [currentChatRoom, setCurrentChatRoom] = useState({});
  const [currentChatRoomMembers, setCurrentChatRoomMembers] = useState([]);
  const [currentChatRoomMessages, setCurrentChatRoomMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef(null)

  console.log(currentChatRoom._id);

  useEffect(() => {
    const getCurrentChatRoomMessages = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/messages/${currentChatRoom._id}`
      );
      setCurrentChatRoomMessages(response.data);
      console.log("CRM", response.data);
    };
    getCurrentChatRoomMessages();
  }, [currentChatRoom._id]);
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

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behaviour: "smooth"})
  }, [currentChatRoomMessages])

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage) {
      const message = {
        chatRoomId: currentChatRoom._id,
        senderId: user._id,
        senderUsername: user.username,
        text: newMessage,
      };

      try {
        const messageSent = await axios.post(
          "http://localhost:5000/api/messages",
          message
        );
        setCurrentChatRoomMessages([
          ...currentChatRoomMessages,
          messageSent.data,
        ]);
        setNewMessage("");
      } catch (error) {
        console.log(error);
      }
    }
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
              {currentChatRoomMessages.map((message) => {
                return (
                  <div key={message._id} ref={scrollRef}>
                    <Message
                      {...message}
                      user={user}
                      ownMessage={user._id === message.senderId}
                    />
                  </div>
                );
              })}
            </div>
            <div className="chatBoxBottom">
              <button className="chatAttatchment">Attachment</button>
              <textarea
                className="chatMessageInput"
                placeholder="Type your message here"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              ></textarea>
              <button className="chatSubmitButton" onClick={sendMessage}>
                Send
              </button>
            </div>
          </div>
        </div>
        <div className="chatDetails">
          <div className="chatDetailsWrapper">
            <ChatDetails
              currentChatRoom={currentChatRoom}
              currentChatRoomMembers={currentChatRoomMembers}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
