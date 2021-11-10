import React, { useEffect, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Typography,
  Grid,
  ExpansionPanel,
  AccordionSummary,
  ExpandMore,
  Col,
  AccordionDetails,
} from "@material-ui/core";
import axios from "axios";
import { PersonAddOutlined } from "@material-ui/icons";
import { UserContext } from "../usercontext";
import "./inbox.scss";
function Inboxcontainer() {
  const history = useHistory();
  const existinguser = JSON.parse(sessionStorage.getItem("userprofile"));
  const [allMessages, setallMessages] = useState([]);
  const [unRead, setunRead] = useState([]);
  const {
    darkMode,
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
  useEffect(() => {
    (async () => {
      const { data: userinfo } = await axios.get(
        "http://localhost:5000/usermessages"
      );
      const theUser = userinfo?.find(
        (user) => user?.id === existinguser?.userinfo.id
      );
      const theMessages = theUser?.messages?.filter(
        (message) => message?.user.id !== existinguser?.userinfo.id
      );
      setallMessages(theMessages);
    })();
  }, [existinguser?.userinfo.id, recievedmessages]);
  return (
    <Grid
      item
      lg={2}
      md={3}
      className="inbox_container"
      style={{
        background: darkMode
          ? "#232a39"
          : "linear-gradient(-45deg, #4481eb 0%, #04befe 100%)",
        borderRight: `1px solid ${darkMode ? "#525c6f" : "white"}`,
      }}
    >
      <div
        className="inbox_header"
        style={{
          borderBottom: darkMode && "1px solid #525c6f",
        }}
      >
        <Typography variant="body1">Inbox</Typography>
        <div className="add_user_icon">
          <PersonAddOutlined color={darkMode ? "disabled" : "primary"} />
        </div>
      </div>
      {/* <Typography> Chat</Typography>
      <Typography>Notification</Typography> */}
      <div
        className="message_box"
        onClick={() => {
          setshowSettings(false);
          setshowChatHistory(false);
        }}
      >
        <Typography>All Users</Typography>
      </div>
      <div
        className="message_box"
        onClick={() => {
          setshowSettings(false);
          setshowChatHistory(true);
        }}
      >
        <Typography>Chat History</Typography>
      </div>
      <div className="message_box" onClick={() => setshowSettings(true)}>
        <Typography style={{ pointerEvents: showSettings ? "none" : "all" }}>
          Settings
        </Typography>
      </div>
      <div className="message_box">
        <Link
          to="/"
          onClick={handlerefresh}
          style={{ textDecoration: "none", color: "white" }}
        >
          <Typography>Logout</Typography>
        </Link>
      </div>
    </Grid>
  );
}

export default Inboxcontainer;
