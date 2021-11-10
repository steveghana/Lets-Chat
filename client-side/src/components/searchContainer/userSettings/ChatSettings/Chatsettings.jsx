import React, { useState, useContext, useEffect } from "react";
import FileBase from "react-file-base64";
import { UserContext } from "../../../usercontext";
import { Avatar, Grid, Typography } from "@material-ui/core";
import { WallpaperOutlined, CloseOutlined } from "@material-ui/icons";
import Wallpaper from "./Wallpaper";
import "./CS.scss";
function Chatsettings() {
  const [wallpapersettings, setwallpapersettings] = useState(false);
  return (
    <Grid item lg={12} md={3} className="Cs_container">
      {wallpapersettings ? (
        <Wallpaper setwallpapersettings={setwallpapersettings} />
      ) : null}
      <div className="message_box" onClick={() => setwallpapersettings(true)}>
        <WallpaperOutlined />
        <Typography>WallPaper</Typography>
      </div>
      <div className="message_box">
        <Typography>Font Size</Typography>
      </div>
    </Grid>
  );
}

export default Chatsettings;
