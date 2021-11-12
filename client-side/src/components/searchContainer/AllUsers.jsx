import React from "react";
import { Typography, Avatar, Button } from "@material-ui/core";
import "./search.scss";
import { MoreVert } from "@material-ui/icons";
import { Link } from "react-router-dom";

function AllUsers({
  i,
  existinguser,
  getUserById,
  users,
  handleDeletePop,
  showDeletePopup,
}) {
  return (
    <div key={i} className="message_box">
      <Link
        to={`/chat/${existinguser && existinguser?.userinfo?.name}`}
        style={{ textDecoration: "none" }}
      >
        <Button onClick={() => getUserById(users.id)} style={{ width: "100%" }}>
          <div className="user-image">
            <div
              className="active_sign"
              style={{
                display:
                  users?.connectionStatus === "offline" ? "none" : "block",
              }}
            ></div>
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
        <Typography variant="caption">1m</Typography>
      </div>
    </div>
  );
}

export default AllUsers;
