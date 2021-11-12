import React from "react";
import { MoreVert } from "@material-ui/icons";
import "./search.scss";
import { Link } from "react-router-dom";
import { Typography, Avatar, Button } from "@material-ui/core";
function History({
  i,
  users,
  existinguser,
  setrecievedmessages,
  setDBmessages,
  setNewUser,
  socketInstance,
  getUserById,
}) {
  return (
    <Link
      key={i}
      to={`/chat/ ${existinguser && existinguser?.userinfo?.name}`}
      style={{ textDecoration: "none" }}
    >
      <Button onClick={() => getUserById(users._id)} style={{ width: "100%" }}>
        <div key={i} className="message_box">
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
            <Typography variant="body2">
              <strong>{users?.name}</strong>
            </Typography>
            <Typography variant="caption" style={{ color: "white" }}>
              {users.messages.filter(
                (user) => user.user.otherId === existinguser.userinfo.id
              )[
                users.messages.filter(
                  (user) => user.user.otherId === existinguser.userinfo.id
                ).length - 1
              ].message || null}
            </Typography>
          </div>
          <div className="time_icon">
            <MoreVert style={{ cursor: "pointer" }} />
            <Typography variant="caption">
              {
                users?.messages.filter(
                  (user) => user?.user?.otherId === existinguser.userinfo.id
                )[
                  users.messages.filter(
                    (user) => user?.user.otherId === existinguser.userinfo.id
                  ).length - 1
                ].createdAt
              }
            </Typography>
          </div>
        </div>
      </Button>
    </Link>
  );
}

export default History;
