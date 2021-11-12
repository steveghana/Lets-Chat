import React from "react";
import { Button } from "@material-ui/core";
import { UserContext } from "../usercontext";
import {
  LinkOutlined,
  InsertEmoticonOutlined,
  SendOutlined,
} from "@material-ui/icons";
import "./chat.scss";
import { handleSubmit } from "../ExternalFunction.";
function MessageSubmit({
  messagesSent,
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
  const { darkMode, setdarkMode } = UserContext;
  const usertochat = JSON.parse(sessionStorage.getItem("newuser"));
  const toggleColor = darkMode ? "disabled" : "primary";
  const toggleStyle = {
    border: `1px solid ${darkMode ? "#525c6f" : "#4481eb"}`,
  };
  const handleChange = (e) => {
    socket.emit("typing", existinguser.userinfo.id);
    setmessagesSent({ ...messagesSent, [e.target.name]: e.target.value });
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
          <Button
            onClick={(e) => {
              handleSubmit(
                e,
                setrecievedmessages,
                existinguser,
                messagesSent,
                setsentmessage,
                sentmessage,
                socket,
                newuser,
                initialState,
                recievedmessages,
                setmessagesSent
              );
            }}
          >
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
    );
  else return null;
  //   }
}

export default MessageSubmit;
