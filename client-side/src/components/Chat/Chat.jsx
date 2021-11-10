import React, { useContext, useEffect, useState, useRef } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";
import io from "socket.io-client";
import Mobilenav from "../mobileNav/Mobilenav";
import {
  Typography,
  Button,
  Grid,
  Switch,
  useMediaQuery,
} from "@material-ui/core";
import Message from "./message/Messages";
import { UserContext } from "../usercontext";
import DBmessage from "./message/DBmessages";
import wall from "../assets/Forbidden West Homepage (2).png";
import {
  StarOutline,
  LinkOutlined,
  InsertEmoticonOutlined,
  PhoneOutlined,
  CameraEnhanceOutlined,
  SendOutlined,
} from "@material-ui/icons";
import "./chat.scss";
let socket;
function Chat() {
  const {
    toggleMobileNav,
    wallpaper,
    darkMode,
    setdarkMode,
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
  const isMobile = useMediaQuery("(max-width:700px)");
  const [messagesSent, setmessagesSent] = useState(initialState);
  const [sentmessage, setsentmessage] = useState([]);
  const [userTyping, setuserTyping] = useState(null);
  const [showusertyping, setshowusertyping] = useState(false);
  const [Wallpaper, setWallpaper] = useState("");
  const Enpoint = "http://localhost:5000";
  const usertochat = JSON.parse(sessionStorage.getItem("newuser"));

  const Img = JSON.parse(sessionStorage.getItem("wallpaper"));

  useEffect(() => {
    const existinguser = JSON.parse(sessionStorage.getItem(`userprofile`));
    socket = io(Enpoint);
    setsocketInstance(socket);
    if (usertochat && existinguser) {
      setuserprofile(existinguser);
      socket.emit(
        "join",
        { existinguser, newuser: newuser ? newuser : usertochat },
        (error) => {
          console.log(error);
        }
      );
    }
    if (existinguser) {
      setuserprofile(existinguser);
      socket.emit("join", existinguser, (error) => {
        console.log(error);
      });
    } else {
      sessionStorage.clear();

      setuserprofile(userinput);
      socket.emit("join", userinput, (error) => {
        console.log(error);
      });
    }
    return () => {
      // socket.emit('disconnect')
      socket.off();
    };
  }, [newuser]);

  useEffect(() => {
    socket.on("welcomingmessage", (message) => {
      const { userinfo } = message;
      sessionStorage.setItem(
        "userprofile",
        JSON.stringify({ userinfo, new: true })
      );
      setwelcomeMessage(message);
    });
  }, []);

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
    socket.on("incomingAndOutgoingMessages", (message) => {
      socket.emit("recievedmessages", message);
    });
  }, []);
  const getmessages = async () => {
    const { data: userinfo } = await axios.get(
      "http://localhost:5000/usermessages"
    );
    setDBmessages(userinfo);
  };

  const getusertyping = (user) => {
    setuserTyping(user);
    setshowusertyping(true);
    setTimeout(() => {
      setshowusertyping(false);
    }, 7000);
  };

  useEffect(() => {
    getmessages();
    socket.on("theUserTyping", (user) => {
      getusertyping(user);
    });
  }, []);
  const handleChange = (e) => {
    const existinguser = JSON.parse(sessionStorage.getItem("userprofile"));
    socket.emit("typing", existinguser.userinfo.id);
    setmessagesSent({ ...messagesSent, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const time = new Date().toLocaleTimeString();
    const existinguser = JSON.parse(sessionStorage.getItem(`userprofile`));
    const usertochat = JSON.parse(sessionStorage.getItem("newuser"));
    setrecievedmessages([
      ...recievedmessages,
      {
        user: existinguser.userinfo.name,
        message: messagesSent.message,
        userid: existinguser.userinfo.id,
        time,
      },
    ]);
    setsentmessage([...sentmessage, messagesSent]);
    messagesSent &&
      socket.emit("sendMessage", {
        message: messagesSent.message,
        myinfo: existinguser.userinfo,
        id: existinguser.userinfo.id,
        otheruserId: newuser.id ? newuser.id : usertochat.id,
        time,
      });
    setmessagesSent(initialState);
  };
  const toggleStyle = {
    border: `1px solid ${darkMode ? "#525c6f" : "#4481eb"}`,
  };
  const toggleColor = darkMode ? "disabled" : "primary";
  const handleSwitch = () => setdarkMode((prev) => !prev);

  return (
    <Grid item sm={11} md={7} xs={10} className="chat_container">
      <Mobilenav />
      <div
        className="chat_appbar"
        style={{
          borderBottom: darkMode && "1px solid #525c6f",
        }}
      >
        <Typography
          variant="body2"
          style={{
            visibility: showusertyping ? "visible" : "hidden",
            transition: "400ms ease-in",
          }}
        >{`${userTyping?.name} is Typing ...`}</Typography>

        <div
          className="switch"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>{darkMode ? "DarkMode" : "LightMode"}</Typography>
          <Switch
            color="primary"
            value="Dark Mode"
            style={{ color: toggleColor }}
            onClick={handleSwitch}
          />
        </div>

        <div className="icons">
          <div className="icon" style={toggleStyle}>
            <StarOutline style={{ padding: ".10rem" }} color={toggleColor} />
          </div>
          <div className="icon" style={toggleStyle}>
            <PhoneOutlined color={toggleColor} />
          </div>
          <div className="icon" style={toggleStyle}>
            <CameraEnhanceOutlined color={toggleColor} />
          </div>
        </div>
      </div>

      <div
        className="chat_box_wrapper"
        style={{
          filter: `blur(${toggleMobileNav ? "20px" : "0px"}  )`,
          pointerEvents: `${toggleMobileNav ? "none" : "all"}`,
        }}
      >
        <div className="chat_box_container" style={{ position: "relative" }}>
          <div className="bgimage">
            {Img?.img && <img src={Img.img} alt="" />}
          </div>
          {welcomeMessage && welcomeMessage.user === "subscriber" ? (
            <div
              className="welcome"
              style={{
                background: darkMode && "#232a39",
              }}
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
          {/* <ScrollToBottom> */}
          <div className="chat_box" style={{ zIndex: "4" }}>
            {DBmessages &&
              DBmessages?.map((message, i) => (
                <div key={i} style={{ zIndex: "5" }}>
                  {" "}
                  <DBmessage message={message} />{" "}
                </div>
              ))}
            {recievedmessages?.map((message, i) => (
              <div style={{ zIndex: "5" }} key={i}>
                {" "}
                <Message messages={message} />
              </div>
            ))}
          </div>
          {/* </ScrollToBottom> */}
        </div>
        {usertochat && (
          <div className="message_input_container">
            <div className="message_box">
              <div className="anchor" style={toggleStyle}>
                <LinkOutlined color={toggleColor} />
              </div>
              <input
                value={messagesSent.message}
                name="message"
                type="text"
                placeholder="Type Your Message"
                autoComplete="off"
                onChange={handleChange}
              />
              <div className="emoji" style={toggleStyle}>
                <InsertEmoticonOutlined color={toggleColor} />
              </div>
              <Button onClick={handleSubmit}>
                <div
                  className="send_icon"
                  style={{
                    background: darkMode
                      ? "#18202f"
                      : "linear-gradient(-45deg, #4481eb 0%, #04befe 100%)",
                  }}
                >
                  <SendOutlined />
                </div>
              </Button>
            </div>
          </div>
        )}
      </div>
    </Grid>
  );
}

export default Chat;
