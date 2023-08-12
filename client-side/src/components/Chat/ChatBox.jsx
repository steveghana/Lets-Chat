import React, { useEffect, useRef } from "react";
import Message from "./message/Messages";
import DBmessage from "./message/DBmessages";
import "./chat.scss";
function ChatBox({ DBmessages, recievedmessages, darkmode }) {
  const scroll = useRef(null);
  useEffect(() => {
    scroll.current.scrollTop = scroll.current.scrollHeight;
  }, [recievedmessages]);

  return (
    <div ref={scroll} className="chat_box" style={{ zIndex: "4" }}>
      {
        DBmessages?.map((message, i) => (
          <div key={i} style={{ zIndex: "5" }}>
            <DBmessage message={message} darkmode={darkmode} />{" "}
          </div>
        ))}
      {recievedmessages?.map((message, i) => (
        <div style={{ zIndex: "5" }} key={i}>
          <Message messages={message} darkmode={darkmode} />
        </div>
      ))}
    </div>
  );
}

export default ChatBox;
