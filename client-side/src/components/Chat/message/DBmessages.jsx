import React from "react";
import { Avatar, Typography } from "@material-ui/core";
import "./message.scss";
function DBmessage({ message }) {
  const existinguser = JSON.parse(sessionStorage.getItem(`userprofile`));
  const userTochat = JSON.parse(sessionStorage.getItem("newuser"));
  const trimedId = existinguser?.userinfo.id.trim();
  if (!userTochat) return null;
  return (
    message.id === trimedId &&
    message?.messages?.map((userinfo, i) =>
      userinfo?.user?.FromMe === trimedId ? (
        <div
          className="message_sent_container"
          key={userinfo?.user?.FromMe + i}
        >
          <div className="image-time">
            <Avatar src={message?.imagUrl} alt="imagurl" />
            <Typography variant="caption">{userinfo.createdAt}</Typography>
          </div>
          <div className="message-box">
            <Typography>{userinfo?.message}</Typography>
          </div>
        </div>
      ) : (
        userinfo?.user?.FromSomeone === userTochat.id && (
          <div className="message_recieved_container" key={userTochat.id + i}>
            <div className="image-time">
              <Avatar src={userTochat?.imagUrl} alt="imagurl" />
              <Typography variant="caption">{userinfo.createdAt}</Typography>
            </div>
            <div className="message-box">
              <Typography>{userinfo?.message}</Typography>
            </div>
          </div>
        )
      )
    )
  );
}

export default DBmessage;
