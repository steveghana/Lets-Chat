import React, { useState } from "react";
import { Typography, Grid, Avatar } from "@material-ui/core";
import {
  InsertCommentOutlined,
  PeopleOutline,
  NotificationsOutlined,
  AccountCircleOutlined,
} from "@material-ui/icons";
import "./settings.scss";
import Nestedsetting from "./NestedSettings/Nestedsetting";

function Usersettings({
  setshowArrow,
  showNotification,
  setshowNotification,
  chatSettings,
  setchatSettings,
  showAccountSetting,
  setshowAccountSetting,
}) {
  const existinguser = JSON.parse(sessionStorage.getItem(`userprofile`));
  return (
    <div>
      <div className="profile_box">
        <div className="user-image">
          <Avatar src={existinguser?.userinfo.imagUrl} />
        </div>
        <div className="latest_activity">
          <Typography variant="body2">
            <strong>{existinguser?.userinfo.name}</strong>
          </Typography>
          <Typography
            variant="overline"
            style={{ color: "white" }}
          ></Typography>
        </div>
      </div>
      {chatSettings || showNotification || showAccountSetting ? (
        <Nestedsetting
          chatSettings={chatSettings}
          showAccountSetting={showAccountSetting}
          showprofileSettings={showNotification}
        />
      ) : null}
      {
        <Grid
          item
          lg={12}
          md={12}
          sm={12}
          className="setting_container"
          style={{
            display:
              chatSettings || showNotification || showAccountSetting
                ? "none"
                : "flex",
          }}
        >
          <div
            className="message_box"
            onClick={() => {
              setshowArrow(true);
              setshowAccountSetting(true);
            }}
          >
            <AccountCircleOutlined />
            <Typography>Account</Typography>
          </div>
          <div
            className="message_box"
            onClick={() => {
              setchatSettings(true);
              setshowArrow(true);
            }}
          >
            <InsertCommentOutlined />
            <Typography>Chat</Typography>
          </div>
          <div
            className="message_box"
            onClick={() => {
              setshowArrow(true);
              setshowNotification(true);
            }}
          >
            <NotificationsOutlined />
            <Typography>Notification</Typography>
          </div>
          <div
            className="message_box"
            onClick={() => {
              setshowArrow(true);
            }}
          >
            <PeopleOutline />
            <Typography>Invite a Friend</Typography>
          </div>
        </Grid>
      }{" "}
    </div>
  );
}

export default Usersettings;
