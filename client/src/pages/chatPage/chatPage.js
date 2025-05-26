import Topbar from "../../components/topbar/topbar";
import ChatRoom from "../../components/chatRooms/chatRoom";
import Message from "../../components/message/message";
import ChatDetails from "../../components/chatDetails/chatDetails";
import { React, useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../contexts/auth/authcontext";
import axios from "axios";
import "./chatPage.css";
import { io } from "socket.io-client";

// const ChatPage = () => {
//   const { user } = useContext(AuthContext);
//   const [chatRooms, setChatRooms] = useState([]);
//   const [currentChatRoom, setCurrentChatRoom] = useState({});
//   const [currentChatRoomMembers, setCurrentChatRoomMembers] = useState([]);
//   const [currentChatRoomMessages, setCurrentChatRoomMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [arrivalMessage, setArrivalMessage] = useState(null);
//   const socket = useRef();
//   const scrollRef = useRef(null);
//   const [fileData, setFileData] = useState();

//   useEffect(() => {
//     window.onpopstate = () => {
//       socket.current.emit(
//         "leave-room",
//         chatRooms.map((chatRoom) => chatRoom.chatRoomName)
//       );
//     };
//   });
//   useEffect(() => {
//     socket.current = io("http://localhost:8900", {
//       path: '/socket.io',
//       transports: ['websocket']
//     });
//     socket.current.on("receiveMessage", (arrivingMessage) => {
//       setArrivalMessage({
//         chatRoomId: arrivingMessage.chatRoomId,
//         senderId: arrivingMessage.senderId,
//         senderUsername: arrivingMessage.senderUsername,
//         text: arrivingMessage.text,
//         status: false,
//         createdAt: Date.now()
//       });
//     });
//     chatRooms &&
//       socket.current.emit(
//         "join-room",
//         chatRooms.map((chatRoom) => chatRoom.chatRoomName)
//       );
//   }, []);
//   useEffect(() => {
//     arrivalMessage &&
//       user._id !== arrivalMessage.senderId &&
//       currentChatRoom._id === arrivalMessage.chatRoomId &&
//       setCurrentChatRoomMessages((prev) => [...prev, arrivalMessage]);
//   }, [arrivalMessage, currentChatRoom._id, user._id]);

//   useEffect(() => {
//     if (chatRooms.length > 0) {
//       socket.current.emit("addChatRooms", user._id, chatRooms);
//       socket.current.emit("sendCurrentUser", user._id);
//       socket.current.on("getUsersChatRooms", (usersChatRooms) => { });
//     }
//   }, [chatRooms, user._id]);
//   useEffect(() => {
//     const getCurrentChatRoomMessages = async () => {
//       const response = await axios.get(
//         `/api/messages/${currentChatRoom._id}`
//       );
//       setCurrentChatRoomMessages(response.data);
//     };
//     getCurrentChatRoomMessages();
//   }, [currentChatRoom._id]);
//   useEffect(() => {
//     const getChatRooms = async () => {
//       try {
//         const response = await axios.get(
//           `/api/chatRooms/${user._id}`
//         );
//         setChatRooms(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getChatRooms();
//   }, [user._id]);
//   const handleChatRoomSelect = (chatRoom) => {
//     setCurrentChatRoom(chatRoom);
//     setCurrentChatRoomMembers(chatRoom.members);
//   };

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
//   }, [currentChatRoomMessages]);

//   const sendMessage = async (e) => {
//     e.preventDefault();
//     if (newMessage) {
//       const message = {
//         chatRoomId: currentChatRoom._id,
//         senderId: user._id,
//         senderUsername: user.username,
//         text: newMessage
//       };

//       const socketNewMessage = {
//         chatRoomId: currentChatRoom._id,
//         chatRoomName: currentChatRoom.chatRoomName,
//         senderId: user._id,
//         senderUsername: user.username,
//         text: newMessage
//       };
//       socket.current.emit("sendMessage", socketNewMessage);
//       try {
//         const messageSent = await axios.post(
//           "/api/messages",
//           message
//         );
//         setCurrentChatRoomMessages([
//           ...currentChatRoomMessages,
//           messageSent.data
//         ]);

//         setNewMessage("");
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   const fileChangeHandler = (e) => {
//     setFileData(e.target.files[0]);
//   };

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     if (fileData && currentChatRoom) {
//       const data = new FormData();
//       data.append("file", fileData);
//       try {
//         const response = await axios.post(
//           "/api/upload",
//           data
//         );
//         const messageBody = {
//           chatRoomId: currentChatRoom._id,
//           senderId: user._id,
//           senderUsername: user.username,
//           text: response.data.filename
//         };
//         const socketNewMessage = {
//           chatRoomId: currentChatRoom._id,
//           chatRoomName: currentChatRoom.chatRoomName,
//           senderId: user._id,
//           senderUsername: user.username,
//           text: response.data.filename
//         };
//         socket.current.emit("sendMessage", socketNewMessage);
//         try {
//           const messageResponse = await axios.post(
//             "/api/messages",
//             messageBody
//           );
//           setCurrentChatRoomMessages([
//             ...currentChatRoomMessages,
//             messageResponse.data
//           ]);
//         } catch (error) {
//           console.log(error);
//           alert("File type not supported or file too big");
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };
//   return (
//     <div>
//       <Topbar />
//       <div className="chatPage">
//         <div className="chatRooms">
//           <div className="chatRoomsWrapper">
//             <input placeholder="Search for Rooms" className="chatRoomsSearch" />
//             {chatRooms.map((chatRoom) => {
//               return (
//                 <div key={chatRoom._id}>
//                   <ChatRoom
//                     {...chatRoom}
//                     chatRoom={chatRoom}
//                     handleChatRoomSelect={handleChatRoomSelect}
//                   />
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//         <div className="chatBox">
//           <div className="chatBoxWrapper">
//             <div className="chatBoxTop">
//               {currentChatRoomMessages.length > 0 ? (
//                 currentChatRoomMessages.map((message) => {
//                   return (
//                     <div key={message._id} ref={scrollRef}>
//                       <Message
//                         {...message}
//                         user={user}
//                         ownMessage={user._id === message.senderId}
//                       />
//                     </div>
//                   );
//                 })
//               ) : (
//                 <span className="noMessages">
//                   Open a chat room to access chat messages
//                 </span>
//               )}
//             </div>
//             <div className="chatBoxBottom">
//               <form onSubmit={onSubmitHandler} className="sendMediaForm">
//                 <input
//                   type="file"
//                   name="mediaFile"
//                   onChange={fileChangeHandler}
//                   className="chatAttatchment"
//                 />
//                 <button type="submit" className="chatAttatchment">
//                   Send Media
//                 </button>
//               </form>
//               <textarea
//                 className="chatMessageInput"
//                 placeholder="Type your message here"
//                 value={newMessage}
//                 style={{ height: 18 }}
//                 onChange={(e) => setNewMessage(e.target.value)}
//               ></textarea>
//               <button className="chatSubmitButton" onClick={sendMessage}>
//                 Send
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="chatDetails">
//           <div className="chatDetailsWrapper">
//             {currentChatRoom.chatRoomName ? (
//               <ChatDetails
//                 currentChatRoom={currentChatRoom}
//                 currentChatRoomMembers={currentChatRoomMembers}
//               />
//             ) : (
//               <div className="noCurrentChat">
//                 Click on a chat room to display chat messages
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

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
  const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL


  useEffect(() => {
    window.onpopstate = () => {
      socket.current.emit(
        "leave-room",
        chatRooms.map((chatRoom) => chatRoom.chatRoomName)
      );
    };
  });
  
  useEffect(() => {
    socket.current = io("http://localhost:8900", {
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
        `/api/messages/${currentChatRoom._id}`
      );
      setCurrentChatRoomMessages(response.data);
    };
    getCurrentChatRoomMessages();
  }, [currentChatRoom._id]);
  
  useEffect(() => {
    const getChatRooms = async () => {
      try {
        const response = await axios.get(
          `/api/chatRooms/${user._id}`
        );
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
          "/api/messages",
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
          "/api/upload",
          data
        );
        const messageBody = {
          chatRoomId: currentChatRoom._id,
          senderId: user._id,
          senderUsername: user.username,
          text: response.data.filename
        };
        const socketNewMessage = {
          chatRoomId: currentChatRoom._id,
          chatRoomName: currentChatRoom.chatRoomName,
          senderId: user._id,
          senderUsername: user.username,
          text: response.data.filename
        };
        socket.current.emit("sendMessage", socketNewMessage);
        try {
          const messageResponse = await axios.post(
            "/api/messages",
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
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-500 to-teal-400">
      <Topbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Chat Rooms Sidebar */}
        <div className="w-1/4 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border-r border-white border-opacity-30 overflow-y-auto">
          <div className="p-4">
            <input 
              placeholder="Search for Rooms" 
              className="w-full p-2 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <div className="mt-4 space-y-2">
              {chatRooms.map((chatRoom) => (
                <div key={chatRoom._id}>
                  <ChatRoom
                    {...chatRoom}
                    chatRoom={chatRoom}
                    handleChatRoomSelect={handleChatRoomSelect}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm">
          <div className="flex-1 overflow-y-auto p-4">
            {currentChatRoomMessages.length > 0 ? (
              currentChatRoomMessages.map((message) => (
                <div key={message._id} ref={scrollRef}>
                  <Message
                    {...message}
                    user={user}
                    ownMessage={user._id === message.senderId}
                  />
                </div>
              ))
            ) : (
              <div className="h-full flex items-center justify-center">
                <span className="text-xl text-white opacity-70">
                  Open a chat room to access chat messages
                </span>
              </div>
            )}
          </div>

          {/* Message Input Area */}
          <div className="p-4 border-t border-white border-opacity-20">
            <form onSubmit={onSubmitHandler} className="flex items-center gap-2 mb-2">
              <input
                type="file"
                name="mediaFile"
                onChange={fileChangeHandler}
                className="hidden"
                id="file-upload"
              />
              <label 
                htmlFor="file-upload"
                className="bg-white text-teal-600 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition"
              >
                Attach
              </label>
              <button 
                type="submit"
                className="bg-white text-teal-600 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Send Media
              </button>
            </form>
            <div className="flex gap-2">
              <textarea
                className="flex-1 p-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 resize-none"
                placeholder="Type your message here"
                value={newMessage}
                rows={3}
                onChange={(e) => setNewMessage(e.target.value)}
              ></textarea>
              <button 
                onClick={sendMessage}
                className="bg-white text-teal-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition self-end"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Chat Details Sidebar */}
        <div className="w-1/4 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border-l border-white border-opacity-30 overflow-y-auto">
          <div className="p-4">
            {currentChatRoom.chatRoomName ? (
              <ChatDetails
                currentChatRoom={currentChatRoom}
                currentChatRoomMembers={currentChatRoomMembers}
              />
            ) : (
              <div className="h-full flex items-center justify-center">
                <span className="text-xl text-white opacity-70">
                  Click on a chat room to display details
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
