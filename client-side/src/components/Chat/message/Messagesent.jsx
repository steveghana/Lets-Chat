import React from "react";
import { Typography, Avatar } from "@material-ui/core";
import "./message.scss";
const Messagesent = ({ messages, darkMode }) => {
  const existinguser = JSON.parse(sessionStorage.getItem("userprofile"));
  const { message, userid, time } = messages;
  const toggleDark = darkMode
    ? "linear-gradient(-45deg, #ffffff 0%, #bbbbbb 100%)"
    : "linear-gradient(-45deg, #ffffff 0%, #a6e7fd 100%)";
  return (
    existinguser.userinfo.id === userid && (
      <div className="message_sent_container">
        <div className="image-time">
          <Avatar src={existinguser.userinfo.imagUrl} alt="imagurl" />
        </div>
        <div
          className="message-box"
          style={{
            background: toggleDark,
          }}
        >
          <Typography>{message}</Typography>
          <Typography variant="caption">{time}</Typography>
        </div>
      </div>
    )
  );
};

export default Messagesent;
