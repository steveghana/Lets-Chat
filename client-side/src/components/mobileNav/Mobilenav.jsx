import React, { useContext } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useMediaQuery, Typography } from "@material-ui/core";
import { UserContext } from "../usercontext";
import "./mobile.scss";
function Mobilenav() {
  const isMobile = useMediaQuery("(max-width:700px)");
  const smallText = useMediaQuery("(max-width:500px)");
  const history = useHistory();
  const {
    darkMode,
    showmbileNav,
    setshowChatHistory,
    recievedmessages,
    showSettings,
    setshowSettings,
    setshowInputBox,
  } = useContext(UserContext);

  const handlerefresh = () => {
    sessionStorage.clear();
    history.push("/");
    window.location.reload();
    setshowInputBox(true);
  };

  return (
    <nav
      style={{
        display: isMobile ? "flex" : "none",
        transform: showmbileNav ? "translateX(0%)" : "translateX(-150%)",
        background: darkMode
          ? "#232a39"
          : "linear-gradient(-45deg, #4481eb 0%, #04befe 100%)",
      }}
    >
      <ul>
        <li>
          {" "}
          <div
            className="message_box"
            onClick={() => {
              setshowSettings(false);
              setshowChatHistory(false);
            }}
          >
            <Typography variant={smallText ? "caption" : "body2"}>
              All Users
            </Typography>
          </div>
        </li>

        <li>
          <div
            className="message_box"
            onClick={() => {
              setshowSettings(false);
              setshowChatHistory(true);
            }}
          >
            <Typography variant={smallText ? "caption" : "body2"}>
              Chat History
            </Typography>
          </div>
        </li>
        <li>
          <div className="message_box" onClick={() => setshowSettings(true)}>
            <Typography
              style={{ pointerEvents: showSettings ? "none" : "all" }}
              variant={smallText ? "caption" : "body2"}
            >
              Settings
            </Typography>
          </div>
        </li>
        <li>
          <div className="message_box">
            <Link
              to="/"
              onClick={handlerefresh}
              style={{ textDecoration: "none", color: "white" }}
            >
              <Typography variant={smallText ? "caption" : "body2"}>
                Logout
              </Typography>
            </Link>
          </div>
        </li>
      </ul>
      <div className="bubble"></div>
    </nav>
  );
}

export default Mobilenav;
