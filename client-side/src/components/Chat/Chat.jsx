import React, { useContext, useEffect, useState } from "react";
import { userJoining, getusertyping, getmessages } from "../ExternalFunction.";
import io from "socket.io-client";
import Mobilenav from "../mobileNav/Mobilenav";
import ChatBox from "./ChatBox";
import { Typography, Grid, useMediaQuery } from "@material-ui/core";
import { UserContext } from "../usercontext";
import MessageSubmit from "./MessageSubmit";
import SVG from "./SVG";
import ChatAppbar from "./ChatAppbar";
import "./chat.scss";
let socket;
function Chat() {
  const {
    setdarkMode,
    wallpaper,
    toggleMobileNav,
    darkmode,
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
  const usertochat = JSON.parse(localStorage.getItem("newuser"));
  const existinguser = JSON.parse(localStorage.getItem(`userprofile`));
  const [Img, setImg] = useState("");
  const isMobile = useMediaQuery("(max-width:700px)");
  useEffect(() => {
    const existinguser = JSON.parse(localStorage.getItem(`userprofile`));
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
      existinguser && socket.emit("disconnection", existinguser?.userinfo.id);
      socket.off();
    };
  }, [newuser]);

  useEffect(() => {
    const img = JSON.parse(localStorage.getItem("wallpaper"));
    setImg(img);
  }, [wallpaper]);

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
      localStorage.setItem(
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
      <ChatAppbar
        userTyping={userTyping}
        showusertyping={showusertyping}
        darkmode={darkmode}
        setdarkMode={setdarkMode}
      />

      <div
        className="chat_box_wrapper"
        style={{
          filter: `blur(${toggleMobileNav && isMobile ? "20px" : "0px"}  )`,
          pointerEvents: `${toggleMobileNav && isMobile ? "none" : "all"}`,
        }}
      >
        <div className="chat_box_container" style={{ position: "relative" }}>
          <div className="bgimage">
            {Img ? (
              <img src={Img.img} alt="CustomImage" />
            ) : (
              <SVG darkmode={darkmode} />
            )}
          </div>
          {welcomeMessage && welcomeMessage.user === "subscriber" ? (
            <div
              className="welcome"
              style={{ background: darkmode && "#232a39" }}
            >
              <Typography variant="caption">
                {welcomeMessage?.message}
              </Typography>
            </div>
          ) : (
            <div
              className="welcome user"
              style={{
                background: darkmode && "#232a39",
              }}
            >
              <Typography variant="caption">{welcomeMessage?.text}</Typography>
            </div>
          )}
          <ChatBox
            DBmessages={DBmessages}
            recievedmessages={recievedmessages}
            darkmode={darkmode}
          />
        </div>
        <MessageSubmit
          messagesSent={messagesSent}
          setrecievedmessages={setrecievedmessages}
          existinguser={existinguser}
          darkmode={{ darkmode }}
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
