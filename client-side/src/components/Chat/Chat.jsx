import React, { useContext, useEffect, useState } from "react";
import { userJoining, getusertyping, getmessages } from "../ExternalFunction.";

import io from "socket.io-client";
import Mobilenav from "../mobileNav/Mobilenav";
import ChatBox from "./ChatBox";
import { Typography, Grid } from "@material-ui/core";
import { UserContext } from "../usercontext";
import MessageSubmit from "./MessageSubmit";
import wall from "../assets/scattered-forcefields.svg";

import ChatAppbar from "./ChatAppbar";
import "./chat.scss";
let socket;
function Chat() {
  const {
    toggleMobileNav,
    darkMode,
    setsocketInstance,
    DBmessages,
    setDBmessages,
    newuser,
    userinput,
    welcomeMessage,
    setwelcomeMessage,
    recievedmessages,
    setrecievedmessages,
    setuserprofile,
  } = useContext(UserContext);
  const initialState = {
    message: "",
  };
  const [messagesSent, setmessagesSent] = useState(initialState);
  const [sentmessage, setsentmessage] = useState([]);
  const [userTyping, setuserTyping] = useState(null);
  const [showusertyping, setshowusertyping] = useState(false);
  const usertochat = JSON.parse(sessionStorage.getItem("newuser"));
  const existinguser = JSON.parse(sessionStorage.getItem(`userprofile`));
  const Img = JSON.parse(sessionStorage.getItem("wallpaper"));

  useEffect(() => {
    const existinguser = JSON.parse(sessionStorage.getItem(`userprofile`));
    const Enpoint = "http://localhost:5000";
    socket = io(Enpoint);
    setsocketInstance(socket);
    userJoining(
      usertochat,
      existinguser,
      setuserprofile,
      newuser,
      userinput,
      socket
    );
    return () => {
      socket.emit("userleft", existinguser.userinfo.id);
      socket.off();
    };
  }, [newuser]);

  useEffect(() => {
    socket.on("incomingAndOutgoingMessages", (message) => {
      setrecievedmessages([
        ...recievedmessages,
        {
          user: message.user,
          myuserId: message.otheruserId,
          otheruserId: message.userId,
          message: message.message,
          time: message.time,
        },
      ]);
    });
  }, [recievedmessages, setrecievedmessages]);

  useEffect(() => {
    socket.on("welcomingmessage", (message) => {
      const { userinfo } = message;
      sessionStorage.setItem(
        "userprofile",
        JSON.stringify({ userinfo, new: true })
      );
      setwelcomeMessage(message);
    });
    socket.on("incomingAndOutgoingMessages", (message) => {
      socket.emit("recievedmessages", message);
    });
    getmessages(setDBmessages);
    socket.on("theUserTyping", (user) => {
      getusertyping(user, setuserTyping, setshowusertyping);
    });
  }, []);

  return (
    <Grid item sm={11} md={7} xs={10} className="chat_container">
      <Mobilenav />
      <ChatAppbar userTyping={userTyping} showusertyping={showusertyping} />

      <div
        className="chat_box_wrapper"
        style={{
          filter: `blur(${toggleMobileNav ? "20px" : "0px"}  )`,
          pointerEvents: `${toggleMobileNav ? "none" : "all"}`,
        }}
      >
        <div className="chat_box_container" style={{ position: "relative" }}>
          <div className="bgimage">
            <img src={Img ? Img.img : wall} alt="" />
          </div>
          {welcomeMessage && welcomeMessage.user === "subscriber" ? (
            <div
              className="welcome"
              style={{ background: darkMode && "#232a39" }}
            >
              <Typography variant="caption">
                {welcomeMessage?.message}
              </Typography>
            </div>
          ) : (
            <div
              className="welcome user"
              style={{
                background: darkMode && "#232a39",
              }}
            >
              <Typography variant="caption">{welcomeMessage?.text}</Typography>
            </div>
          )}
          <ChatBox
            DBmessages={DBmessages}
            recievedmessages={recievedmessages}
          />
        </div>
        <MessageSubmit
          messagesSent={messagesSent}
          setrecievedmessages={setrecievedmessages}
          existinguser={existinguser}
          setsentmessage={setsentmessage}
          sentmessage={sentmessage}
          socket={socket}
          newuser={newuser}
          initialState={initialState}
          recievedmessages={recievedmessages}
          setmessagesSent={setmessagesSent}
        />
      </div>
    </Grid>
  );
}

export default Chat;
