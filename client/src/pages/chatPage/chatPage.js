import Topbar from "../../components/topbar/topbar";
import ChatRoom from "../../components/chatRooms/chatRoom";
import Message from "../../components/message/message";
import ChatDetails from "../../components/chatDetails/chatDetails";
import { React, useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../contexts/auth/authcontext";
import axios from "axios";
import { io } from "socket.io-client";
import { FiSend, FiPaperclip, FiSearch, FiUserPlus } from "react-icons/fi";
import InviteModal from "../../components/inviteModal";


const ChatPage = () => {
  const { user } = useContext(AuthContext);
  const [chatRooms, setChatRooms] = useState([]);
  const [currentChatRoom, setCurrentChatRoom] = useState({});
  const [currentChatRoomMembers, setCurrentChatRoomMembers] = useState([]);
  const [currentChatRoomMessages, setCurrentChatRoomMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const scrollRef = useRef(null);
  const [fileData, setFileData] = useState();
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL
  const REACT_APP_ENV = process.env.REACT_APP_ENV

  useEffect(() => {
    window.onpopstate = () => {
      socket.current.emit(
        "leave-room",
        chatRooms.map((chatRoom) => chatRoom.chatRoomName)
      );
    };
  });
  
  useEffect(() => {
    console.log({socket_url: process.env.REACT_APP_SOCKET_BASE_URL})
    socket.current = io(process.env.REACT_APP_SOCKET_BASE_URL || "http://localhost:8900", {
      path: '/socket.io',
      transports: ['websocket']
    });
    socket.current.on("receiveMessage", (arrivingMessage) => {
      setArrivalMessage({
        chatRoomId: arrivingMessage.chatRoomId,
        senderId: arrivingMessage.senderId,
        senderUsername: arrivingMessage.senderUsername,
        text: arrivingMessage.text,
        status: false,
        createdAt: Date.now()
      });
    });
    chatRooms &&
      socket.current.emit(
        "join-room",
        chatRooms.map((chatRoom) => chatRoom.chatRoomName)
      );
  }, []);
  
  useEffect(() => {
    arrivalMessage &&
      user._id !== arrivalMessage.senderId &&
      currentChatRoom._id === arrivalMessage.chatRoomId &&
      setCurrentChatRoomMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChatRoom._id, user._id]);

  useEffect(() => {
    if (chatRooms.length > 0) {
      socket.current.emit("addChatRooms", user._id, chatRooms);
      socket.current.emit("sendCurrentUser", user._id);
      socket.current.on("getUsersChatRooms", (usersChatRooms) => { });
    }
  }, [chatRooms, user._id]);
  
  useEffect(() => {
    const getCurrentChatRoomMessages = async () => {
      const response = await axios.get(
        `${REACT_APP_API_BASE_URL}/api/messages/${currentChatRoom._id}`
      );
      setCurrentChatRoomMessages(response.data);
    };
    getCurrentChatRoomMessages();
  }, [currentChatRoom._id]);
  
  useEffect(() => {
    const getChatRooms = async () => {
      try {
        const response = await axios.get(
          `${REACT_APP_API_BASE_URL}/api/chatRooms/${user._id}`
        );
        console.log({userChatRooms: response})
        setChatRooms(response.data);
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
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [currentChatRoomMessages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage) {
      const message = {
        chatRoomId: currentChatRoom._id,
        senderId: user._id,
        senderUsername: user.username,
        text: newMessage
      };

      const socketNewMessage = {
        chatRoomId: currentChatRoom._id,
        chatRoomName: currentChatRoom.chatRoomName,
        senderId: user._id,
        senderUsername: user.username,
        text: newMessage
      };
      socket.current.emit("sendMessage", socketNewMessage);
      try {
        const messageSent = await axios.post(
          `${REACT_APP_API_BASE_URL}/api/messages`,
          message
        );
        setCurrentChatRoomMessages([
          ...currentChatRoomMessages,
          messageSent.data
        ]);
        setNewMessage("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fileChangeHandler = (e) => {
    setFileData(e.target.files[0]);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (fileData && currentChatRoom) {
      const data = new FormData();
      data.append("file", fileData);
      try {
        const response = await axios.post(
          `${REACT_APP_API_BASE_URL}/api/upload`,
          data
        );
        console.log({REACT_APP_ENV: REACT_APP_ENV})
        const textData = REACT_APP_ENV === 'development' ? response.data.filename : response.data.url
        console.log({textData})
        const messageBody = {
          chatRoomId: currentChatRoom._id,
          senderId: user._id,
          senderUsername: user.username,
          text: textData
        };
        const socketNewMessage = {
          chatRoomId: currentChatRoom._id,
          chatRoomName: currentChatRoom.chatRoomName,
          senderId: user._id,
          senderUsername: user.username,
          text: textData
        };
        socket.current.emit("sendMessage", socketNewMessage);
        try {
          const messageResponse = await axios.post(
            `${REACT_APP_API_BASE_URL}/api/messages`,
            messageBody
          );
          setCurrentChatRoomMessages([
            ...currentChatRoomMessages,
            messageResponse.data
          ]);
        } catch (error) {
          console.log(error);
          alert("File type not supported or file too big");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Topbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Chat Rooms Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                placeholder="Search rooms..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Your Chat Rooms
              </h3>
              <div className="mt-2 space-y-1">
                {chatRooms.map((chatRoom) => (
                  <ChatRoom
                    key={chatRoom._id}
                    chatRoom={chatRoom}
                    currentUser={user}
                    handleChatRoomSelect={handleChatRoomSelect}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {currentChatRoom._id ? (
            <>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="max-w-3xl mx-auto space-y-4">
                  {currentChatRoomMessages.map((message) => (
                    <div key={message._id} ref={scrollRef}>
                      <Message
                        {...message}
                        user={user}
                        ownMessage={user._id === message.senderId}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 p-4">
                <form onSubmit={onSubmitHandler} className="mb-2">
                  <div className="flex items-center">
                    <label className="cursor-pointer p-2 rounded-full hover:bg-gray-100">
                      <FiPaperclip className="h-5 w-5 text-gray-500" />
                      <input
                        type="file"
                        name="mediaFile"
                        onChange={fileChangeHandler}
                        className="hidden"
                        id="file-upload"
                      />
                    </label>
                    <button
                      type="submit"
                      className="ml-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                    >
                      Send File
                    </button>
                  </div>
                </form>
                <form onSubmit={sendMessage} className="flex">
                  <input
                    className="flex-1 border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <FiSend className="h-5 w-5" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900">
                  Select a chat room
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Choose a conversation from the sidebar to get started
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Chat Details Sidebar */}
        {currentChatRoom._id && (
          <div className="w-64 bg-white border-l border-gray-200 overflow-y-auto">
            <ChatDetails
              currentChatRoom={currentChatRoom}
              currentChatRoomMembers={currentChatRoomMembers}
            />
          </div>
        )}
      </div>

      <button
        onClick={() => setIsInviteModalOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
      >
        <FiUserPlus size={24} />
      </button>

      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        currentUser={user}
      />
    </div>
  );
};

export default ChatPage;
