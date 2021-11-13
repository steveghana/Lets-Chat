const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const mongoose = require("mongoose");
const app = express();
const router = require("./routes/routes");
const cors = require("cors");
const server = http.createServer(app);
const {
  postOtherUsersMessagesOffline,
  getUserOnline,
  getUserFromDB,
  addUser,
  getUser,
  getmessages,
  getOtherUsersMessages,
  setusersOffline,
  getuserTyping,
  clearChat,
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
      const userAlreadyActive = userNowActive.find(
        (info) => info.id === user.id
      );
      if (!userAlreadyActive) userNowActive.push(user);
      if (otherUser && user.id === otherUser.id) socket.join(user.phone);
      if (!otherUser) otherUser = users.newuser;
      const existinguser = getUserFromDB(users.newuser.id);
      getUserOnline(users.existinguser.userinfo.id);
      socketid = user.id;
      room = existinguser.phone;
      socket.join(existinguser.phone); //
    } else if (users.new) {
      const existinguser = getUserFromDB(users.userinfo.id);
      socketid = users.userinfo.id;
      room = existinguser.phone;
      socket.join(existinguser.phone); //
    } else if (!users.new && !users.newuser) {
      socketid = socket.id;
      const { isuser, err } = await addUser({ id: socket.id }, users);
      if (err) return (errorhandler = err);
      socket.emit("welcomingmessage", {
        user: "admin",
        text: `welcome ${isuser.name}`,
        userinfo: isuser,
      });
      // socket.to(isuser.phone).emit("notification", {
      //   user: "subscriber",
      //   message: `${isuser.name} has just joined`,
      //   userinfo: isuser,
      // });
      room = isuser.phone;
      socket.join(isuser.phone);
    }
  });
  //
  socket.on("userhasArrived", (activeuser) => {
    getUserOnline(activeuser.userinfo.id);
  });
  //
  socket.on("typing", (id) => {
    const { onlineuser } = getuserTyping(id);
    socket.to(room).emit("theUserTyping", onlineuser);
  });
  //
  socket.on("userleft", (userid) => {
    setusersOffline(userid);
  });
  //
  socket.on("clearchat", (id) => {
    clearChat(id).then((data) => {
      socket.emit("chatcleared", data);
    });
  });
  socket.on("sendMessage", (messages) => {
    const { message, otheruserId, id, time } = messages;
    const myinfo = getUser(id);
    if (!myinfo) return;
    postOtherUsersMessagesOffline(otheruserId, messages);
    getmessages(myinfo.id, message, myinfo, otheruserId, time);
    socket.to(room).emit("incomingAndOutgoingMessages", {
      user: myinfo.name,
      userId: myinfo.id,
      message,
      otheruserId,
      time,
    });
  });
  socket.on("recievedmessages", (messageRecieved) => {
    if (messageRecieved) {
      const { otheruserId } = messageRecieved;
      const existinguser = getUser(socketid);

      if (otheruserId === existinguser.id) {
        getOtherUsersMessages(existinguser.id, messageRecieved);
      }
    }
  });
  socket.on("disconnect", (id) => {
    console.log("user left");
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
