import React, { useContext } from "react";
import { HomeOutlined, SortOutlined } from "@material-ui/icons";
import { Grid, useMediaQuery, Avatar } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../usercontext";
import "./toggle.scss";
function Togglemenu() {
  const history = useHistory();
  const isMobile = useMediaQuery("(max-width:700px)");
  const existinguser = JSON.parse(sessionStorage.getItem("userprofile"));
  const { darkMode, setshowmbileNav, settoggleMobileNav } =
    useContext(UserContext);

  return (
    <Grid
      item
      lg={1}
      md={1}
      sm={2}
      xs={2}
      className="togglemenu_container"
      style={{
        background: darkMode
          ? "#18202f"
          : "linear-gradient(-45deg, #4481eb 0%, #04befe 100%)",
        borderRight: `1px solid ${darkMode ? "#525c6f" : "white"}`,
      }}
    >
      {isMobile ? (
        <div
          className="icon1"
          onClick={() => {
            setshowmbileNav((prev) => !prev);
            settoggleMobileNav((prev) => !prev);
          }}
        >
          <SortOutlined />
        </div>
      ) : (
        <div
          className="icon1"
          style={{
            borderBottom: darkMode && "1px solid #525c6f",
          }}
        >
          <Avatar src={existinguser?.userinfo?.imagUrl} />
        </div>
      )}

      <div className="icon">
        <HomeOutlined />
      </div>
      <div className="icon">
        <HomeOutlined />
      </div>
      <div className="icon">
        <HomeOutlined />
      </div>
    </Grid>
  );
}

export default Togglemenu;
