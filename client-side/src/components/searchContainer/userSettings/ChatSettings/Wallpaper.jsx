import React, { useEffect, useContext } from "react";
import FileBase from "react-file-base64";
import { UserContext } from "../../../usercontext";
import { CloseOutlined } from "@material-ui/icons";
import { Typography, Avatar } from "@material-ui/core";
function Wallpaper({ setwallpapersettings }) {
  const { wallpaper, setwallpaper } = useContext(UserContext);
  const Img = JSON.parse(sessionStorage.getItem("wallpaper"));
  useEffect(() => {
    if (wallpaper) {
      sessionStorage.removeItem("wallpaper");
      sessionStorage.setItem("wallpaper", JSON.stringify({ img: wallpaper }));
    }
  }, [wallpaper]);
  return (
    <div className="wallpaper_interface">
      <div
        style={{
          pointerEvents: "all",
          marginLeft: "auto",
          zIndex: "1",
        }}
      >
        <CloseOutlined
          fontSize="small"
          color="primary"
          style={{ marginRight: ".50rem" }}
          onClick={() => setwallpapersettings((prev) => !prev)}
        />
      </div>
      <div className='wallpaper-img'>
      <Avatar src={wallpaper || Img?.img || null} style={{ height: "150px", width: "150px" }} />

      </div>
      <div className="file">
        <Typography variant="caption">Select an image</Typography>
        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) => {
            setwallpaper(base64);
          }}
        />
      </div>
    </div>
  );
}

export default Wallpaper;
