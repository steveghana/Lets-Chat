import React from "react";
import { Typography, Avatar } from "@material-ui/core";
import "./message.scss";
const Messagesent = ({ messages }) => {
  const existinguser = JSON.parse(sessionStorage.getItem("userprofile"));
  const { message, userid, time } = messages;

  return (
    existinguser.userinfo.id === userid && (
      <div className="message_sent_container">
        <div className="image-time">
          <Avatar src={existinguser.userinfo.imagUrl} alt="imagurl" />
          <Typography variant="caption">{time}</Typography>
        </div>
        <div className="message-box">
          <Typography>{message}</Typography>
        </div>
      </div>
    )
  );
};

export default Messagesent;
