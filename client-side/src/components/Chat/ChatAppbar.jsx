import React from "react";
import { Typography, Switch } from "@material-ui/core";

import {
  StarOutline,
  PhoneOutlined,
  CameraEnhanceOutlined,
  SendOutlined,
} from "@material-ui/icons";
import TemporalMsgPopUp from "./TemporalMsgPopUp";
import "./chat.scss";

function ChatAppbar({ userTyping, showusertyping, darkMode, setdarkMode }) {
  const toggleColor = darkMode ? "disabled" : "primary";
  const toggleStyle = {
    border: `1px solid ${darkMode ? "#525c6f" : "#4481eb"}`,
  };
  const handleSwitch = () => setdarkMode((prev) => !prev);
  return (
    <div
      className="chat_appbar"
      style={{
        borderBottom: darkMode && "1px solid #525c6f",
      }}
    >
      <TemporalMsgPopUp />
      <Typography
        variant="body2"
        style={{
          visibility: showusertyping ? "visible" : "hidden",
          transition: "400ms ease-in",
        }}
      >{`${userTyping?.name} is Typing ...`}</Typography>
      <div
        className="switch"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>{darkMode ? "DarkMode" : "LightMode"}</Typography>
        <Switch
          color="primary"
          style={{ color: darkMode ? "black" : "blue" }}
          onClick={handleSwitch}
        />
      </div>
      <div className="icons">
        <div className="icon" style={toggleStyle}>
          <StarOutline style={{ padding: ".10rem" }} color={toggleColor} />
        </div>
        <div className="icon" style={toggleStyle}>
          <PhoneOutlined color={toggleColor} />
        </div>
        <div className="icon" style={toggleStyle}>
          <CameraEnhanceOutlined color={toggleColor} />
        </div>
      </div>
    </div>
  );
}

export default ChatAppbar;
