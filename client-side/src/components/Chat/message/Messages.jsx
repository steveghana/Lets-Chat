import React from "react";

import Messagerecieved from "./Messagerecieved";
import Messagesent from "./Messagesent";
import "./message.scss";
function Message({ messages }) {
  let isSendbyUser = false;
  const existinguser = JSON.parse(sessionStorage.getItem(`userprofile`));
  if (existinguser.userinfo.id.trim() === messages.userinfo.id.trim())
    isSendbyUser = true;
  return isSendbyUser ? (
    <Messagesent messages={messages} />
  ) : (
    <Messagerecieved messages={messages} />
  );
}

export default Message;
