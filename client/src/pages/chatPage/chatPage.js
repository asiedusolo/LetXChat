import Topbar from "../../components/topbar/topbar";
import ChatRoom from "../../components/chatRooms/chatRoom";
import Message from "../../components/message/message";
import ChatDetails from "../../components/chatDetails/chatDetails";
import { React, useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../contexts/auth/authcontext";
import axios from "axios";
import { io } from "socket.io-client";
import { FiSend, FiPaperclip, FiSearch, FiUserPlus, FiMic, FiVideo } from "react-icons/fi";
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
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const [fileData, setFileData] = useState();
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioURL, setAudioURL] = useState('');
  const [isInCall, setIsInCall] = useState(false);
  const [callStatus, setCallStatus] = useState('idle');
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL
  const REACT_APP_ENV = process.env.REACT_APP_ENV


  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob);
        setAudioURL(audioUrl);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };


  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const sendAudio = async () => {
    if (audioBlob) {
      const audioFile = new File([audioBlob], 'audio-recording.wav', {
        type: 'audio/wav',
        lastModified: Date.now()
      });
      const data = new FormData();
      data.append("file", audioFile);
      try {
        const response = await axios.post(
          `${REACT_APP_API_BASE_URL}/api/upload`,
          data
        );

        const textData = REACT_APP_ENV === 'development' ? response.data.filename : response.data.url;

        const messageBody = {
          chatRoomId: currentChatRoom._id,
          senderId: user._id,
          senderUsername: user.username,
          text: textData,
        };

        const socketNewMessage = {
          chatRoomId: currentChatRoom._id,
          chatRoomName: currentChatRoom.chatRoomName,
          senderId: user._id,
          senderUsername: user.username,
          text: textData,
        };

        socket.current.emit("sendMessage", socketNewMessage);

        const messageResponse = await axios.post(
          `${REACT_APP_API_BASE_URL}/api/messages`,
          messageBody
        );

        setCurrentChatRoomMessages([
          ...currentChatRoomMessages,
          messageResponse.data
        ]);
        setAudioBlob(null);
        setAudioURL('');
      } catch (error) {
        console.error('Error sending audio:', error);
      }
    }
  }

  const createPeerConnection = () => {
  const configuration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      // Add your TURN servers if needed
    ]
  };

  const pc = new RTCPeerConnection(configuration);
  
  // ICE candidate handling
  pc.onicecandidate = (event) => {
    if (event.candidate) {
      socket.current.emit('ice-candidate', {
        candidate: event.candidate,
        roomId: currentChatRoom._id
      });
    }
  };

  // Handle remote stream
  pc.ontrack = (event) => {
    setRemoteStream(event.streams[0]);
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = event.streams[0];
    }
    setCallStatus('in_call');
  };

  return pc;
};

  const startCall = async () => {
    try {
      setCallStatus('calling');

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      setLocalStream(stream);

      await new Promise(resolve => setTimeout(resolve, 3000));

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      } else {
        console.error('Local video ref still not ready');
        return;
      }

      peerConnectionRef.current = createPeerConnection();
      const pc = peerConnectionRef.current; // Create local reference

      stream.getTracks().forEach(track => pc.addTrack(track, stream));

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      socket.current.emit('call-initiated', {
        offer,
        roomId: currentChatRoom._id,
        caller: user._id
      });

    } catch (err) {
      console.error('Error starting call:', err);
      setCallStatus('idle');
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    }
  };

  const endCall = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }

    if (remoteVideoRef.current?.srcObject) {
      remoteVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
      remoteVideoRef.current.srcObject = null;
    }

    setCallStatus('idle');
    socket.current.emit('call-ended', { roomId: currentChatRoom._id });
  };

  useEffect(() => {
    return () => {
      endCall();
    };
  }, []);

  // Socket listeners for video call
  useEffect(() => {
    if (!socket.current) return;

    socket.current.on('call-initiated', async ({ offer, caller }) => {
      if (user._id === caller) return; // Don't respond to our own call

      try {
        pc.ontrack = (event) => {
          remoteVideoRef.current.srcObject = event.streams[0];
          setIsInCall(true);
          setCallStatus('in_call');
        };

        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        socket.current.emit('call-answered', {
          answer,
          roomId: currentChatRoom._id,
          callee: user._id
        });
      } catch (err) {
        console.error('Error answering call:', err);
      }
    });

    socket.current.on('call-answered', async ({ answer }) => {
      if (peerConnectionRef.current) {
        await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
        setIsInCall(true);
        setCallStatus('in_call');
      }
    });

    socket.current.on('ice-candidate', async ({ candidate }) => {
      if (peerConnectionRef.current) {
        try {
          await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (err) {
          console.error('Error adding ICE candidate:', err);
        }
      }
    });

    socket.current.on('call-ended', () => {
      endCall();
    });

    return () => {
      if (socket.current) {
        socket.current.off('call-initiated');
        socket.current.off('call-answered');
        socket.current.off('ice-candidate');
        socket.current.off('call-ended');
      }
    };
  }, [currentChatRoom._id, user._id]);

  useEffect(() => {
    window.onpopstate = () => {
      socket.current.emit(
        "leave-room",
        chatRooms.map((chatRoom) => chatRoom.chatRoomName)
      );
    };
  });

  useEffect(() => {
    console.log({ socket_url: process.env.REACT_APP_SOCKET_BASE_URL })
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
        console.log({ userChatRooms: response })
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
      console.log({ fileData })
      try {
        const response = await axios.post(
          `${REACT_APP_API_BASE_URL}/api/upload`,
          data
        );
        console.log({ REACT_APP_ENV: REACT_APP_ENV })
        const textData = REACT_APP_ENV === 'development' ? response.data.filename : response.data.url
        console.log({ textData })
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
              {/* Video Call UI */}
              {
                callStatus !== 'idle' && (
                  <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex flex-col items-center justify-center p-4">
                    <div className="flex w-full max-w-4xl h-full">
                      {localStream && (
                        <div className="absolute bottom-4 right-4 w-1/4 max-w-xs">
                          <video
                            ref={localVideoRef}
                            autoPlay
                            muted
                            playsInline
                            className="w-full rounded-lg shadow-lg"
                          />
                        </div>
                      )}

                      {/* Remote Video or Status */}
                      <div className="flex-1 flex items-center justify-center bg-gray-900 rounded-lg">
                        {callStatus === 'in_call' ? (
                          <video
                            ref={remoteVideoRef}
                            autoPlay
                            playsInline
                            className="h-full max-h-screen object-contain"
                          />
                        ) : (
                          <div className="text-white text-center p-8">
                            <p className="text-xl mb-4">
                              {callStatus === 'calling' ? 'Calling...' : 'Connecting...'}
                            </p>
                            <div className="animate-pulse">
                              <FiVideo className="h-12 w-12 mx-auto" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4">
                      <button
                        onClick={endCall}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full flex items-center"
                      >
                        <FiVideo className="mr-2" />
                        End Call
                      </button>
                    </div>
                  </div>
                )
              }

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

              {/* Audio Recording UI */}
              {audioURL && (
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <audio src={audioURL} controls className="flex-1" />
                    <button
                      onClick={sendAudio}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                      Send
                    </button>
                    <button
                      onClick={() => setAudioURL('')}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
                    >
                      Discard
                    </button>
                  </div>
                </div>
              )}

              <div className="border-t border-gray-200 p-4">
                <div className="flex space-x-2 mb-2">
                  {/* Audio Recording Button */}
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`p-2 rounded-full ${isRecording ? 'bg-red-100 text-red-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    <FiMic className="h-5 w-5" />
                  </button>

                  {/* Video Call Button */}
                  <button
                    onClick={startCall}
                    className={`p-2 rounded-full ${callStatus !== 'idle' ? 'bg-green-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                    disabled={callStatus !== 'idle'}
                  >
                    <FiVideo className="h-5 w-5" />
                  </button>


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
