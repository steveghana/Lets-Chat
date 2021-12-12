import React from "react";

import Messagerecieved from "./Messagerecieved";
import Messagesent from "./Messagesent";
import "./message.scss";
function Message({ messages, darkmode }) {
  let isSendbyUser = false;
  const existinguser = JSON.parse(localStorage.getItem(`userprofile`));
  if (messages.userid && existinguser.userinfo.id === messages.userid)
    isSendbyUser = true;
  return isSendbyUser ? (
    <Messagesent messages={messages} darkmode={darkmode} />
  ) : (
    <Messagerecieved messages={messages} />
  );
}

export default Message;
