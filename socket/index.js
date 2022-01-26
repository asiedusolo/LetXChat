const {instrument} = require('@socket.io/admin-ui')

const io = require("socket.io")(8900, {
  cors: {
    orgin: ["http://localhost:3000", "https://admin.socket.io/#/"],
  },
});

let allConnectedChatRooms = [];

const addUserChatRooms = (userId, socketId, chatRooms) => {
  !allConnectedChatRooms.some(
    (userChatRoom) => userChatRoom.userId === userId
  ) &&
    allConnectedChatRooms.push({
      userId: userId,
      socketId: socketId,
      chatRooms: chatRooms,
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

  socket.on("sendCurrentUser", (userId) => {
    console.log(userId);
    //join user with current socketId to his or chatRooms
    let userConnectedChatRoom = allConnectedChatRooms.filter(
      (userChatRoom) => userChatRoom.userId === userId
    );
      console.log(userConnectedChatRoom[0].chatRooms);
      userConnectedChatRoom[0].chatRooms.forEach((chatRoom) => {
          socket.join(chatRoom.chatRoomName)
      })
      
  });

//   socket.on("disconnect", () => {
//     // console.log("user disconnected")
//     removeUser(socket.id);
//     io.emit("getUsersChatRooms", allConnectedChatRooms);
//   });
});



instrument(io, {auth: false})
