import React, { useEffect, useRef, useContext, useState } from "react";
import { UserContext } from "../usercontext";
import { Typography } from "@material-ui/core";
function TemporalMsgPopUp() {
  const popup = useRef(null);
  const existinguser = JSON.parse(localStorage.getItem("userprofile"));
  const [popMessage, setpopMessage] = useState("");
  const userTochat = JSON.parse(localStorage.getItem("newuser"));
  const { darkmode, recievedmessages } = useContext(UserContext);
  useEffect(() => {
    popup.current.style.transform = "translateY(-120%)";
    const filteredPopup = recievedmessages.filter(
      (message) =>
        message?.otheruserId !== userTochat?.id &&
        message?.myuserId === existinguser?.userinfo.id
    );
    setpopMessage(
      filteredPopup.length > 1
        ? filteredPopup[filteredPopup.length - 1]
        : filteredPopup[0]
    );
    if (filteredPopup.length) {
      popup.current.style.transform = "translateY(10%)";
      setTimeout(() => {
        popup.current.style.transform = "translateY(-120%)";
      }, 2000);
    }
  }, [recievedmessages]);
  const toggleDark = darkmode
    ? "#232a39"
    : "linear-gradient(-45deg, #4481eb 0%, #04befe 100%)";
  return (
    <div
      ref={popup}
      style={{ background: toggleDark }}
      className="message_popup-container"
    >
      <Typography variant="body1">
        {" "}
        {`${popMessage?.user} just sent you a message `}{" "}
      </Typography>
      <Typography variant="caption">
        {`${popMessage?.message /* .substring(0, 20) */}` || null}{" "}
      </Typography>
    </div>
  );
}

export default TemporalMsgPopUp;
