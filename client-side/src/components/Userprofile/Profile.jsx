import React, { useContext } from "react";
import {
  MoreHorizOutlined,
  Facebook,
  NotificationsNoneRounded,
  MailRounded,
} from "@material-ui/icons";
import "./profile.scss";
import { UserContext } from "../usercontext";
import { Typography, Grid, Avatar, Badge } from "@material-ui/core";
function Profile() {
  const usertoChat = JSON.parse(sessionStorage.getItem("newuser"));
  const { allMessages, darkmode, connectionStatus } = useContext(UserContext);

  const border = `1px solid ${darkmode ? "#525c6f" : "#4481eb"}`;

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
              color={darkmode ? "disabled" : "primary"}
            />
          </div>
          <Badge
            badgeContent={allMessages ? allMessages.length : 0}
            color="secondary"
          >
            <MailRounded color={darkmode ? "action" : "primary"} />
          </Badge>
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
          <div className="avatar">
            <Avatar
              src={usertoChat?.imagUrl}
              alt="avatar"
              style={{ width: "200px", height: "200px" }}
            />
          </div>
          <div className="name-destination">
            <Typography variant="h6">{usertoChat?.firstname}</Typography>
            <Typography variant="caption">{usertoChat?.secondname}</Typography>
          </div>
        </div>

        <div className="about-user">
          <div
            className="about-user_container"
            style={{ borderBottom: border }}
          >
            <div className="user_info tel">
              <Typography variant="caption">Tel:</Typography>
              <Typography variant="caption">{usertoChat?.phone}</Typography>
            </div>
           
            <div className="user_info gender">
              <Typography variant="caption">Gender:</Typography>
              <Typography variant="caption">Male</Typography>
            </div>
            <div className="user_info Language">
              <Typography variant="caption">Language:</Typography>
              <Typography variant="caption">English</Typography>
            </div>
          </div>
        </div>
      </Grid>
    )
  );
}

export default Profile;
