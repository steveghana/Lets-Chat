const express = require("express");
const dotenv = require("dotenv");
const socketio = require("socket.io");
const http = require("http");
const mongoose = require("mongoose");
const router = require("./routes/routes");
const cors = require("cors");
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
const incomingMessage = require("./models/model");
const app = express();
const server = http.createServer(app);
dotenv.config();
const PORT = process.env.PORT || 5000;
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    // "https://letschat115.netlify.app",
    methods: ["GET", "POST"],
  },
});
const ConnectionUrl =
  "mongodb://localhost:27017/userMessages"; /* || process.env.MONGO_URL */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/userMessages", router);
// app.get("/", (req, res) => {
//   res.send("hello heroku");
// });
io.on("connection", (socket) => {
  // console.log( 'connected')
  let socketid;
  let room;
  let userNowActive = [];
  let otherUser;
  socket.on("join", async (users, errorhandler) => {
    // console.log(users, 'from join')
    //when user to chat with is selected
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
      // when a user refreshes or login
    } else if (users.new) {
      const existinguser = getUserFromDB(users.userinfo.id);
      socketid = users.userinfo.id;
      room = existinguser.phone;
      socket.join(existinguser.phone); //
      //For adding new users
    } else if (!users.new && !users.newuser) {
      socketid = socket.id;
      const { isuser, err } = await addUser({ id: socket.id }, users);
      // console.log(isuser);
      if (err) return (errorhandler = err);
      socket.emit("welcomingmessage", {
        user: "admin",
        text: `welcome ${isuser.firstname} ${isuser.secondname}`,
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
      user: myinfo.firstname,
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
  socket.on("disconnection", (id) => {
    setusersOffline(id);
    console.log("user left");
  });
});
mongoose
  .connect(ConnectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // const newUser = incomingMessage.create({
    //   username: "john_doe",
    //   email: "john@example.com",
    //   phone: "22345354545454",
    //   secondname: "john",
    //   firstname: "doe",
    // })   .then(() => {
    //   console.log("User saved");
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
    // const newUser = new User({
    //   username: 'john_doe',
    //   email: 'john@example.com',
    // });

    
   

    server.listen(
      PORT,
      console.log(`server is listening on localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.log(err.message);
  });

mongoose.set("useFindAndModify", false);
