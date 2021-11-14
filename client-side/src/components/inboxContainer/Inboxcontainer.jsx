import React, { useEffect, useContext} from "react";
import { Link, useHistory } from "react-router-dom";
import { Typography, Grid } from "@material-ui/core";
import { handleRefresh } from "../ExternalFunction.";
import axios from "axios";
import { PersonAddOutlined } from "@material-ui/icons";
import { UserContext } from "../usercontext";
import "./inbox.scss";
function Inboxcontainer() {
  const history = useHistory();
  const existinguser = JSON.parse(sessionStorage.getItem("userprofile"));

  const {
    setallMessages,
    darkmode,
    setshowChatHistory,
    recievedmessages,
    showSettings,
    setshowSettings,
    setshowInputBox,
    socketInstance,
  } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const { data: userinfo } = await axios.get(
        "http://localhost:5000/usermessages"
      );
      const theUser = userinfo?.find(
        (user) => user?.id === existinguser?.userinfo.id
      );
      const theMessages = theUser?.messages?.filter(
        (message) => message?.user.Sender
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
        background: darkmode
          ? "#232a39"
          : "linear-gradient(-45deg, #4481eb 0%, #04befe 100%)",
        borderRight: `1px solid ${darkmode ? "#525c6f" : "white"}`,
      }}
    >
      <div
        className="inbox_header"
        style={{
          borderBottom: darkmode && "1px solid #525c6f",
        }}
      >
        <Typography variant="body1">Inbox</Typography>
        <div className="add_user_icon">
          <PersonAddOutlined color={darkmode ? "disabled" : "primary"} />
        </div>
      </div>

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
          onClick={() =>
            handleRefresh(
              socketInstance,
              existinguser,
              history,
              setshowInputBox
            )
          }
          style={{ textDecoration: "none", color: "white" }}
        >
          <Typography>Logout</Typography>
        </Link>
      </div>
    </Grid>
  );
}

export default Inboxcontainer;
