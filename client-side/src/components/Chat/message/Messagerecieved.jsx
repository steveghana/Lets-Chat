import React from "react";
import { Typography, Avatar } from "@material-ui/core";
import "./message.scss";

const Messagerecieved = ({ messages }) => {
  const existinguser = JSON.parse(sessionStorage.getItem(`userprofile`));
  const userToChat = JSON.parse(sessionStorage.getItem("newuser"));
  const { message, userinfo, time, otheruser } = messages;
  return (
    existinguser.userinfo.id === otheruser.id &&
    userToChat.id === userinfo.id && (
      <div className="message_recieved_container">
        <div className="image-time">
          <Avatar src={userToChat.imagUrl} alt="imagurl" />
          <Typography variant="caption">{time}</Typography>
        </div>
        <div className="message-box">
          <Typography>{message}</Typography>
        </div>
      </div>
    )
  );
};

export default Messagerecieved;
