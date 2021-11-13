import React, { useContext } from "react";
import { HomeOutlined, SortOutlined } from "@material-ui/icons";
import { Grid, useMediaQuery } from "@material-ui/core";
import { Facebook, YouTube, Instagram, Twitter } from "@material-ui/icons";
import { UserContext } from "../usercontext";
import "./toggle.scss";
function Togglemenu() {
  const isMobile = useMediaQuery("(max-width:700px)");
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
          <div className="icon">
            <Facebook />
          </div>
        </div>
      )}

      <div className="icon">
        <Instagram />
      </div>
      <div className="icon">
        <Twitter />
      </div>
      <div className="icon">
        <YouTube />
      </div>
      <div className="icon">
        <YouTube />
      </div>
    </Grid>
  );
}

export default Togglemenu;
