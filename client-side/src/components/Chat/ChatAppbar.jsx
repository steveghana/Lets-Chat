import React, { useContext } from "react";
import { Typography, Switch, useMediaQuery, Badge } from "@material-ui/core";
import { MailRounded } from "@material-ui/icons";
import { UserContext } from "../usercontext";
import {
  StarOutline,
  PhoneOutlined,
  CameraEnhanceOutlined,
} from "@material-ui/icons";
import TemporalMsgPopUp from "./TemporalMsgPopUp";
import "./chat.scss";

function ChatAppbar({ userTyping, showusertyping, darkmode, setdarkMode }) {
  const { allMessages } = useContext(UserContext);
  const isMobile = useMediaQuery("(max-width:1000px)");
  const toggleColor = darkmode ? "disabled" : "primary";
  const toggleStyle = {
    border: `1px solid ${darkmode ? "#525c6f" : "#4481eb"}`,
  };
  const handleSwitch = () => setdarkMode((prev) => !prev);
  return (
    <div
      className="chat_appbar"
      style={{
        borderBottom: darkmode && "1px solid #525c6f",
      }}
    >
      <TemporalMsgPopUp />
      <Typography
        variant="body2"
        style={{
          visibility: showusertyping ? "visible" : "hidden",
          transition: "400ms ease-in",
        }}
      >{`${userTyping?.firstname} is Typing ...`}</Typography>
      <div
        className="switch"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>{darkmode ? "DarkMode" : "LightMode"}</Typography>
        <Switch
          color="primary"
          style={{ color: darkmode ? "black" : "blue" }}
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
        {isMobile ? (
          <Badge
            badgeContent={allMessages ? allMessages.length : 0}
            color="secondary"
          >
            <MailRounded color={darkmode ? "action" : "primary"} />
          </Badge>
        ) : (
          <div className="icon" style={toggleStyle}>
            <CameraEnhanceOutlined color={toggleColor} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatAppbar;
