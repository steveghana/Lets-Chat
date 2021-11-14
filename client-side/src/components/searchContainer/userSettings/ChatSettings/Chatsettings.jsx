import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { WallpaperOutlined, InsertCommentOutlined } from "@material-ui/icons";
import Wallpaper from "./Wallpaper";
import ClearChatConformation from "./ClearChatConformation";
import "./CS.scss";
function Chatsettings() {
  const [wallpapersettings, setwallpapersettings] = useState(false);
  const [showconfirmationPopup, setshowconfirmationPopup] = useState(false);
  return (
    <Grid item lg={12} md={12} className="Cs_container">
      {wallpapersettings ? (
        <Wallpaper setwallpapersettings={setwallpapersettings} />
      ) : null}
      <div
        className="message_box"
        onClick={() => {
          setwallpapersettings(true);
          setshowconfirmationPopup(false);
        }}
      >
        <WallpaperOutlined />
        <Typography>WallPaper</Typography>
      </div>

      <div
        className="message_box"
        onClick={() => {
          setwallpapersettings(false);
          setshowconfirmationPopup(true);
        }}
      >
        <InsertCommentOutlined />
        <Typography>Clear Chat</Typography>
      </div>
      {showconfirmationPopup ? (
        <ClearChatConformation
          setshowconfirmationPopup={setshowconfirmationPopup}
        />
      ) : null}
    </Grid>
  );
}

export default Chatsettings;
