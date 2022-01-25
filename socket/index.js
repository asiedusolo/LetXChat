const io = require('socket.io')(8000, {
    cors: {
        orgin: "http://localhost:3000"
    }
})


io.on("connection", (socket) => { 
    console.log('User connected with id' +socket.id)

})