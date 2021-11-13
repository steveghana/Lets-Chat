import React from "react";
import { Avatar, Typography } from "@material-ui/core";
import "./message.scss";
function DBmessage({ message, darkMode }) {
  const existinguser = JSON.parse(sessionStorage.getItem(`userprofile`));
  const userTochat = JSON.parse(sessionStorage.getItem("newuser"));
  const toggleDark = darkMode
    ? "linear-gradient(-45deg, #ffffff 0%, #bbbbbb 100%)"
    : "linear-gradient(-45deg, #ffffff 0%, #a6e7fd 100%)";
  const myid = existinguser?.userinfo.id;
  if (!userTochat) return null;
  return (
    message.id === myid &&
    message?.messages?.map((userinfo, i) =>
      userinfo?.user?.FromMe === myid &&
      userinfo.user.Reciever === userTochat.id ? (
        <div
          className="message_sent_container"
          key={userinfo?.user?.FromMe + i}
        >
          <div className="image-time">
            <Avatar src={message?.imagUrl} alt="imagurl" />
          </div>
          <div className="message-box" style={{ background: toggleDark }}>
            <Typography>{userinfo?.message}</Typography>
            <Typography variant="caption">{userinfo.createdAt}</Typography>
          </div>
        </div>
      ) : (
        userinfo?.user?.Sender === userTochat.id && (
          <div className="message_recieved_container" key={userTochat.id + i}>
            <div className="image-time">
              <Avatar src={userTochat?.imagUrl} alt="imagurl" />
            </div>
            <div className="message-box">
              <Typography>{userinfo?.message}</Typography>
              <Typography variant="caption">{userinfo.createdAt}</Typography>
            </div>
          </div>
        )
      )
    )
  );
}

export default DBmessage;
