import React, { useEffect, useRef } from "react";
import Message from "./message/Messages";
import DBmessage from "./message/DBmessages";
import "./chat.scss";
function ChatBox({ DBmessages, recievedmessages, darkMode }) {
  const scroll = useRef(null);
  useEffect(() => {
    scroll.current.scrollTop = scroll.current.scrollHeight;
  }, [recievedmessages]);
  return (
    <div ref={scroll} className="chat_box" style={{ zIndex: "4" }}>
      {DBmessages &&
        DBmessages?.map((message, i) => (
          <div key={i} style={{ zIndex: "5" }}>
            <DBmessage message={message} darkMode={darkMode} />{" "}
          </div>
        ))}
      {recievedmessages?.map((message, i) => (
        <div style={{ zIndex: "5" }} key={i}>
          <Message messages={message} darkMode={darkMode} />
        </div>
      ))}
    </div>
  );
}

export default ChatBox;
