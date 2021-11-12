import React from "react";
import Message from "./message/Messages";
import DBmessage from "./message/DBmessages";
import "./chat.scss";
function ChatBox({ DBmessages, recievedmessages }) {
  return (
    <div className="chat_box" style={{ zIndex: "4" }}>
      {DBmessages &&
        DBmessages?.map((message, i) => (
          <div key={i} style={{ zIndex: "5" }}>
            <DBmessage message={message} />{" "}
          </div>
        ))}
      {recievedmessages?.map((message, i) => (
        <div style={{ zIndex: "5" }} key={i}>
          <Message messages={message} />
        </div>
      ))}
    </div>
  );
}

export default ChatBox;
