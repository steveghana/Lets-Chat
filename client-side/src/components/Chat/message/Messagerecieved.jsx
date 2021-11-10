import React from "react";
import { Typography, Avatar } from "@material-ui/core";
import "./message.scss";

const Messagerecieved = ({ messages }) => {
  console.log(messages);
  const existinguser = JSON.parse(sessionStorage.getItem(`userprofile`));
  const userToChat = JSON.parse(sessionStorage.getItem("newuser"));
  const { message, time, otheruserId } = messages;
  console.log(userToChat.id);
  return (
    userToChat.id === otheruserId && (
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
