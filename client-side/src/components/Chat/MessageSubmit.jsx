import React from "react";
import { Button } from "@material-ui/core";
import {
  LinkOutlined,
  InsertEmoticonOutlined,
  SendOutlined,
} from "@material-ui/icons";
import "./chat.scss";
function MessageSubmit({
  messagesSent,
  darkmode,
  setrecievedmessages,
  existinguser,
  setsentmessage,
  sentmessage,
  socket,
  newuser,
  initialState,
  recievedmessages,
  setmessagesSent,
}) {
  // const {darkmode} = darkmode
  const usertochat = JSON.parse(sessionStorage.getItem("newuser"));
  const toggleColor = darkmode.darkmode ? "disabled" : "primary";
  const toggleStyle = {
    border: `1px solid ${darkmode.darkmode ? "#525c6f" : "#4481eb"}`,
  };
  const handleChange = (e) => {
    socket.emit("typing", existinguser.userinfo.id);
    setmessagesSent({ ...messagesSent, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const time = new Date().toLocaleTimeString();

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
        otheruserId: usertochat.id,
        time,
      });
    setmessagesSent(initialState);
  };
  if (usertochat)
    return (
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
                background: darkmode.darkmode
                  ? "#18202f"
                  : "linear-gradient(-45deg, #4481eb 0%, #04befe 100%)",
              }}
            >
              <SendOutlined />
            </div>
          </Button>
        </div>
      </div>
    );
  else return null;
  //   }
}

export default MessageSubmit;
