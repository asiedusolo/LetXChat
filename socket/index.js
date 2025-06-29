const { instrument } = require("@socket.io/admin-ui");
require("dotenv").config();


const io = require("socket.io")(8900, {
  // alternate between http://localhost:3000 and http://localhost for local
  // docker
  cors: {
    origin: [`${process.env.CORS_ORIGIN || 'http://localhost:3000'}`]
  }
});

require("dotenv").config();


let allConnectedChatRooms = [];

const addUserChatRooms = (userId, socketId, chatRooms) => {
  !allConnectedChatRooms.some(
    (userChatRoom) => userChatRoom.userId === userId
  ) &&
    allConnectedChatRooms.push({
      userId: userId,
      socketId: socketId,
      chatRooms: chatRooms
    });
};

const removeUser = (socketID) => {
  allConnectedChatRooms = allConnectedChatRooms.filter(
    (userChatRoom) => userChatRoom.socketId !== socketID
  );
};
io.on("connection", (socket) => {
  console.log("User connected:  " + socket.id);
  socket.on("addChatRooms", (userId, chatRooms) => {
    addUserChatRooms(userId, socket.id, chatRooms);
    io.emit("getUsersChatRooms", allConnectedChatRooms);
  });

  socket.on("join-room", (chatRooms) => {
    socket.join(chatRooms);
    console.log(socket.rooms);
  });

  socket.on("sendCurrentUser", (userId) => {
    //join user with current socketId to his or chatRooms
    let userConnectedChatRoom = allConnectedChatRooms.filter(
      (userChatRoom) => userChatRoom.userId === userId
    );
    // console.log(userConnectedChatRoom[0].chatRooms);
    userConnectedChatRoom[0].chatRooms.forEach((chatRoom) => {
      socket.join(chatRoom.chatRoomName);
    });
  });

  socket.on("leave-room", (chatRooms) => {
    socket.leave(chatRooms);
  });

  //send a message to other members in chat room
  socket.on(
    "sendMessage",
    ({ senderId, senderUsername, chatRoomId, chatRoomName, text }) => {
      socket.to(chatRoomName).emit("receiveMessage", {
        senderId,
        senderUsername,
        chatRoomId,
        chatRoomName,
        text
      });
    }
  );

   socket.on('call-initiated', ({ offer, roomId, caller }) => {
    socket.to(roomId).emit('call-initiated', { offer, caller });
  });

  socket.on('call-answered', ({ answer, roomId, callee }) => {
    socket.to(roomId).emit('call-answered', { answer, callee });
  });

  socket.on('ice-candidate', ({ candidate, roomId }) => {
    socket.to(roomId).emit('ice-candidate', { candidate });
  });

  socket.on('call-ended', ({ roomId }) => {
    socket.to(roomId).emit('call-ended');
  });

  socket.on("disconnect", () => {
    removeUser(socket.id)
    console.log("user disconnected");
  });
});
