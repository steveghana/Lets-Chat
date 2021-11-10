const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const mongoose = require("mongoose");
const app = express();
const router = require("./routes/routes");
const cors = require("cors");
const server = http.createServer(app);
const {
  getOtherUsersMessagesOffline,
  getUserOnline,
  getUserFromDB,
  addUser,
  getUser,
  getmessages,
  getOtherUsersMessages,
  setusersOffline,
  getuserTyping,
} = require("./utilities/utilis");
const io = socketio(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});
const mongourl = "mongodb://localhost:27017/message";
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/usermessages", router);
io.on("connection", (socket) => {
  let socketid;
  let room;
  let userNowActive = [];
  let otherUser;
  socket.on("join", async (users, errorhandler) => {
    if (users.newuser) {
      const user = getUser(users.existinguser.userinfo.id);
      const oldUser = userNowActive.find((info) => info.id === user.id);
      if (!oldUser) userNowActive.push(user);
      if (otherUser && user.id === otherUser.id) socket.join(user.phone);
      if (!otherUser) otherUser = users.newuser;
      const existinguser = getUserFromDB(users.newuser.id);
      socketid = user.id;
      room = existinguser.phone;
      socket.join(existinguser.phone);
    } else if (users.new) {
      const existinguser = getUserFromDB(users.userinfo.id);
      socketid = users.userinfo.id;
      room = existinguser.phone;
      socket.join(existinguser.phone);
    } else if (!users.new && !users.newuser) {
      socketid = socket.id;
      const { isuser, err } = await addUser({ id: socket.id }, users);
      if (err) return (errorhandler = err);
      socket.emit("welcomingmessage", {
        user: "admin",
        text: `${isuser.name} welcome to room ${isuser.phone}`,
        userinfo: isuser,
      });
      socket.to(isuser.phone).emit("notification", {
        user: "subscriber",
        message: `${isuser.name} has just joined in room ${isuser.phone}`,
        userinfo: isuser,
      });
      room = isuser.phone;
      socket.join(isuser.phone);
    }
  });
  socket.on("userhasArrived", (activeuser) => {
    getUserOnline(activeuser.userinfo.id);
  });
  socket.on("typing", (id) => {
    const { onlineuser } = getuserTyping(id);
    socket.to(room).emit("theUserTyping", onlineuser);
  });
  // socket.on("deleteUserFromHistory", (id)=>{

  // });
  socket.on("sendMessage", (messages) => {
    const { myphone, message, otheruserId, id, time } = messages;
    const user = getUser(id);
    !user && console.log("no user was found");
    getOtherUsersMessagesOffline(otheruserId, messages);
    getmessages(user.id, message, user, otheruserId, time);
    socket.to(room).emit("incomingAndOutgoingMessages", {
      user: user.name,
      userId: user.id,
      message,
      otheruserId,
      time,
    });
  });
  socket.on("recievedmessages", (messageRecieved) => {
    if (messageRecieved) {
      const { otheruserId, message, userId, user } = messageRecieved;
      const existinguser = getUser(socketid);

      if (userId !== existinguser.id) {
        getOtherUsersMessages(existinguser.id, messageRecieved);
      }
    }
  });
  socket.on("disconnect", () => {
    setusersOffline(socketid);
    console.log("user has left");
  });
});
mongoose.connect(
  mongourl,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => {
    server.listen(
      PORT,
      console.log(`server is listening on localhost:${PORT}`)
    );
  }
);
