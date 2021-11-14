import React from "react";
import { MoreVert } from "@material-ui/icons";
import "./search.scss";
import { Link } from "react-router-dom";
import { Typography, Avatar, Button } from "@material-ui/core";
function History({ getUserById, users, darkmode }) {
  const existinguser = JSON.parse(sessionStorage.getItem(`userprofile`));

  const usersToFilter = JSON.parse(sessionStorage.getItem("newuser"));
  const selectedUser = {
    pointerEvents: usersToFilter?.id === users.id ? "none" : "all",
    backgroundColor:
      usersToFilter?.id === users.id
        ? `${darkmode ? "rgba(35, 35, 36, 0.3)" : "rgba(68, 129, 235,0.7)"}`
        : "",
    filter: usersToFilter?.id === users.id && "blur(1px)",
  };

  const lastMessage = users?.messages.filter(
    (user) =>
      (user.user.Reciever === existinguser.userinfo.id &&
        user.user.FromMe === usersToFilter.id) ||
      (user.user.FromMe === existinguser.userinfo.id &&
        user.user.Reciever === usersToFilter.id)
  );
 
  const { backgroundColor } = selectedUser;
const {firstname, secondname} = existinguser?.userinfo
  return (
    <div style={selectedUser}>
      <Link
        to={`/chat/${firstname}${secondname}`}
        style={{ textDecoration: "none" }}
      >
        <Button
          onClick={() => getUserById(users._id)}
          style={{ width: "100%" }}
        >
          <div className="message_box" style={{ backgroundColor }}>
            <div className="user-image">
              {users?.connectionStatus === "online" &&
                usersToFilter?.id !== users.id && (
                  <div className="active_sign"></div>
                )}
              <Avatar src={users?.imagUrl} />
            </div>
            <div className="latest_activity">
              <Typography variant="body2" style={{ color: "white" }}>
                <strong>{`${users?.firstname} ${users?.secondname}`}</strong>
              </Typography>
              <Typography variant="caption" style={{ color: "white" }}>
                {lastMessage[lastMessage.length - 1]?.message.toLowerCase()}
              </Typography>
            </div>
            <div className="time_icon">
              <MoreVert style={{ cursor: "pointer" }} />
              <Typography variant="caption">
                {lastMessage[lastMessage.length - 1]?.createdAt}
              </Typography>
            </div>
          </div>
        </Button>
      </Link>
    </div>
  );
}

export default History;
