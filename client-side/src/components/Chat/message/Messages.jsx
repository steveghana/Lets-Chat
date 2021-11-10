import React from "react";

import Messagerecieved from "./Messagerecieved";
import Messagesent from "./Messagesent";
import "./message.scss";
function Message({ messages }) {
  let isSendbyUser = false;
  const existinguser = JSON.parse(sessionStorage.getItem(`userprofile`));
  if (messages.userid && existinguser.userinfo.id === messages.userid)
    isSendbyUser = true;
  return isSendbyUser ? (
    <Messagesent messages={messages} />
  ) : (
    <Messagerecieved messages={messages} />
  );
}

export default Message;
