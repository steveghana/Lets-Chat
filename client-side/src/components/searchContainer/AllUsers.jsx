import React, { useState } from "react";
import { Typography, Avatar, Button } from "@material-ui/core";
import "./search.scss";
import { MoreVert } from "@material-ui/icons";
import { Link } from "react-router-dom";

function AllUsers({ getUserById, users, darkMode }) {
  const usersToFilter = JSON.parse(sessionStorage.getItem("newuser"));
  const [showDeletePopup, setshowDeletePopup] = useState(false);
  const handleDeletePop = () => setshowDeletePopup((prevValue) => !prevValue);
  const existinguser = JSON.parse(sessionStorage.getItem(`userprofile`));

  const selectedUser = {
    pointerEvents: usersToFilter?.id === users.id ? "none" : "all",
    backgroundColor:
      usersToFilter?.id === users.id
        ? `${darkMode ? "rgba(35, 35, 36, 0.3)" : "rgba(68, 129, 235,0.7)"}`
        : "",
    filter: usersToFilter?.id === users.id && "blur(1px)",
  };

  return (
    <div className="message_box" style={selectedUser}>
      <Link
        to={`/chat/${existinguser && existinguser?.userinfo?.name}`}
        style={{ textDecoration: "none" }}
      >
        <Button onClick={() => getUserById(users.id)} style={{ width: "100%" }}>
          <div className="user-image">
            {users?.connectionStatus === "online" &&
              usersToFilter?.id !== users.id && (
                <div className="active_sign"></div>
              )}
            <Avatar src={users?.imagUrl} />
          </div>
          <div className="latest_activity">
            <Typography variant="body2" style={{ color: "white" }}>
              <strong>{users?.name}</strong>
            </Typography>
          </div>
        </Button>
      </Link>
      <div className="time_icon">
        <MoreVert style={{ cursor: "pointer" }} onClick={handleDeletePop} />
        <div
          className="pop-up"
          style={{ display: showDeletePopup ? "block" : "none" }}
        >
          <Typography variant="caption">Delete</Typography>
        </div>
      </div>
    </div>
  );
}

export default AllUsers;
