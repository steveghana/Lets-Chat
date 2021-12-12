import React from "react";
import { Typography, Avatar } from "@material-ui/core";
import "./message.scss";

const Messagerecieved = ({ messages }) => {

  const existinguser = JSON.parse(localStorage.getItem(`userprofile`));
  const userToChat = JSON.parse(localStorage.getItem("newuser"));
  const { message, time, otheruserId, myuserId } = messages;

  return (
    userToChat?.id === otheruserId &&
    existinguser.userinfo.id === myuserId && (
      <div className="message_recieved_container">
        <div className="image-time">
          <Avatar src={userToChat.imagUrl} alt="imagurl" />
        </div>
        <div className="message-box">
          <Typography>{message}</Typography>
          <Typography variant="caption">{time}</Typography>
        </div>
      </div>
    )
  );
};

export default Messagerecieved;
