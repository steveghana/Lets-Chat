import React, { useContext, useState } from "react";
import {
  MoreHorizOutlined,
  Facebook,
  NotificationsNoneRounded,
  ArrowDropDownOutlined,
} from "@material-ui/icons";
import "./profile.scss";
import { UserContext } from "../usercontext";
import { Typography, Grid, Avatar } from "@material-ui/core";
function Profile() {
  const usertoChat = JSON.parse(sessionStorage.getItem("newuser"));
  const { darkMode, connectionStatus } = useContext(UserContext);

  const border = `1px solid ${darkMode ? "#525c6f" : "#4481eb"}`;
  return (
    usertoChat && (
      <Grid
        item
        lg={2}
        className="user_profile_container"
        style={{ borderLeft: border }}
      >
        <div
          className="appbar"
          style={{
            borderBottom: border,
          }}
        >
          <div className="icon" style={{ border }}>
            <NotificationsNoneRounded
              color={darkMode ? "disabled" : "primary"}
            />
          </div>
          <div className="user_dropdown" style={{ border }}>
            <Typography variant="body2">{usertoChat?.name}</Typography>
            <ArrowDropDownOutlined />
          </div>
        </div>
        <div className="social_toggle">
          <Facebook />
          <MoreHorizOutlined />
        </div>
        <div className="connection-status">
          <Typography variant="caption">Connection Status :</Typography>
          <Typography variant="caption" style={{ marginLeft: "auto" }}>
            {connectionStatus}
          </Typography>
          <div
            className="active_sign"
            style={{
              display: connectionStatus === "offline" ? "none" : "block",
            }}
          ></div>
        </div>
        <div className="avatar-description" style={{ borderBottom: border }}>
          <div
            className="avatar"
            style={{
              borderRadius: "50%",
              overflow: "hidden",
              backgroundColor: "#4481eb",
            }}
          >
            <img
              src={usertoChat?.imagUrl}
              alt="avatar"
              style={{ objectFit: "cover" }}
              width="200"
              height="200"
            />
          </div>
          <div className="name-destination">
            <Typography variant="h6">{usertoChat?.name}</Typography>
            <Typography variant="caption">{usertoChat?.country}</Typography>
          </div>
        </div>

        <div className="about-user">
          <div
            className="about-user_container"
            style={{ borderBottom: border }}
          >
            <div className="user_info name">
              <Typography variant="caption">Nickname:</Typography>
              <Typography variant="caption">{usertoChat?.nickName}</Typography>
            </div>
            <div className="user_info tel">
              <Typography variant="caption">Tel:</Typography>
              <Typography variant="caption">{usertoChat?.phone}</Typography>
            </div>
            <div className="user_info birth">
              <Typography variant="caption">Date Of Birth:</Typography>
              <Typography variant="caption">June 20th 1983</Typography>
            </div>
            <div className="user_info gender">
              <Typography variant="caption">Gender:</Typography>
              <Typography variant="caption">Male</Typography>
            </div>
            <div className="user_info Language">
              <Typography variant="caption">Language:</Typography>
              <Typography variant="caption">{usertoChat?.language}</Typography>
            </div>
          </div>
        </div>
      </Grid>
    )
  );
}

export default Profile;
