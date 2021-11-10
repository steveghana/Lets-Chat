import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { Spinner } from "../exports";
import { SearchOutlined, MoreVert, AutorenewTwoTone } from "@material-ui/icons";
import { ArrowBack } from "@material-ui/icons";

import {
  Typography,
  Avatar,
  Grid,
  Button,
  useMediaQuery,
} from "@material-ui/core";
import { UserContext } from "../usercontext";
import Usersettings from "./userSettings/Usersettings";
import { Link } from "react-router-dom";
import "./search.scss";
function Searchcontainer() {
  const {
    toggleMobileNav,
    setconnectionStatus,
    showChatHistory,
    recievedmessages,
    setrecievedmessages,
    socketInstance,
    setDBmessages,
    setNewUser,
    showSettings,
    setshowSettings,
    darkMode,
  } = useContext(UserContext);
  const isMobile = useMediaQuery("(max-width:700px)");

  const existinguser = JSON.parse(sessionStorage.getItem(`userprofile`));
  const usertoChat = JSON.parse(sessionStorage.getItem("newuser"));
  const refresh = useRef(null);
  const baseUrl = "http://localhost:5000/usermessages";
  const [allusers, setAllusers] = useState([]);
  const [chatHistory, setchatHistory] = useState([]);
  const [filterHistory, setfilterHistory] = useState([]);
  const [filteredValue, setfilteredValue] = useState("");
  const [showArrow, setshowArrow] = useState(false);
  const [showDeletePopup, setshowDeletePopup] = useState(false);
  const [showNotification, setshowNotification] = useState(false);
  const [chatSettings, setchatSettings] = useState(false);
  const [showAccountSetting, setshowAccountSetting] = useState(false);
  const [History, setHistory] = useState(null);
  const [Loading, setLoading] = useState(false);
  const handleDeletePop = () => setshowDeletePopup((prevValue) => !prevValue);
  const getusers = async () => {
    setLoading(true);
    const { data: userinfo } = await axios.get(baseUrl);
    userinfo && setLoading(false);
    const myinfo = userinfo?.find(
      (user) => user?.id === existinguser?.userinfo.id
    );
    setHistory(myinfo?.ChatHistory);
    const usersExceptMe = userinfo?.filter(
      (user) => user?.id !== existinguser?.userinfo.id
    );
    setAllusers(usersExceptMe);
    const userconnection = usersExceptMe.find(
      (user) => user?.id === usertoChat?.id
    );
    setconnectionStatus(userconnection?.connectionStatus);
  };
  const getUserById = async (id) => {
    setrecievedmessages([]);
    setDBmessages(null);
    const { data: newuser } = await axios.get(`${baseUrl}/${id}`);
    setNewUser(newuser);
    sessionStorage.setItem("newuser", JSON.stringify(newuser));
    socketInstance.emit("userhasArrived", existinguser);
    window.location.reload();
  };

  const gethistory = async () => {
    if (History) {
      for (let i = 0; i < History?.length; i++) {
        for (let j = 0; j < allusers?.length; j++) {
          if (History[i]?.user.id === allusers[j]?.id) {
            const allreadyInData = chatHistory.find(
              (user) => user.id === allusers[j]?.id
            );
            !allreadyInData && setchatHistory([...chatHistory, allusers[j]]);
          }
        }
      }
    }
  };
  const toggleDark = darkMode
    ? "#232a39"
    : "linear-gradient(-45deg, #4481eb 0%, #04befe 100%)";
  useEffect(() => {
    getusers();
    setfilterHistory(allusers);
    gethistory();
    const filteredUsers = allusers?.filter((user) =>
      user?.name.toLowerCase().includes(filteredValue)
    );
    setfilterHistory(filteredUsers);
  }, [filteredValue, recievedmessages, showChatHistory]);

  return (
    <Grid
      item
      md={4}
      lg={3}
      className="search_wrapper"
      style={{
        background: toggleDark,
        transform:
          isMobile && `translateX(${toggleMobileNav ? "0%" : "-100%"})`,
      }}
    >
      <div
        className="search_icon_container"
        style={{
          borderBottom: darkMode && "1px solid #525c6f",
        }}
      >
        <div
          className="search_box"
          style={{
            background: toggleDark,
            border: darkMode && "1px solid #525c6f",
          }}
        >
          <SearchOutlined style={{ color: "white" }} />
          <input
            autoComplete="off"
            type="text"
            name="search"
            placeholder="search"
            onChange={(e) => setfilteredValue(e.target.value.toLowerCase())}
          />
        </div>
      </div>
      <div className="alluser_container">
        {showSettings ? (
          <ArrowBack
            style={{
              color: "white",
              marginRight: "auto",
              marginLeft: "7px",
            }}
            onClick={() => {
              setshowAccountSetting(false);
              setchatSettings(false);
              setshowNotification(false);
            }}
          />
        ) : (
          <AutorenewTwoTone
            ref={refresh}
            style={{ color: "white", marginLeft: "auto", width: "100%" }}
            onClick={() => {
              getusers();
              refresh.current.classList.add("rotate");
              setTimeout(refresh.current.classList.remove("rotate"), 4000);
            }}
          />
        )}
        {showSettings && (
          <Usersettings
            setshowArrow={setshowArrow}
            showNotification={showNotification}
            setshowNotification={setshowNotification}
            chatSettings={chatSettings}
            setchatSettings={setchatSettings}
            showAccountSetting={showAccountSetting}
            setshowAccountSetting={setshowAccountSetting}
          />
        )}

        {!showSettings && (
          <div className="user-box">
            {Loading ? (
              <Spinner bg={"white"} />
            ) : showChatHistory ? (
              filterHistory?.map((users, i) => (
                <Link
                  key={i}
                  to={`/chat/ ${existinguser && existinguser?.userinfo?.name}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    onClick={() => getUserById(users._id)}
                    style={{ width: "100%" }}
                  >
                    <div key={i} className="message_box">
                      <div className="user-image">
                        <div
                          className="active_sign"
                          style={{
                            display:
                              users?.connectionStatus === "offline"
                                ? "none"
                                : "block",
                          }}
                        ></div>
                        <Avatar src={users?.imagUrl} />
                      </div>
                      <div className="latest_activity">
                        <Typography variant="body2">
                          <strong>{users?.name}</strong>
                        </Typography>
                        <Typography
                          variant="caption"
                          style={{ color: "white" }}
                        >
                          {
                            users.messages.filter(
                              (user) =>
                                user.user.otherId === existinguser.userinfo.id
                            )[
                              users.messages.filter(
                                (user) =>
                                  user.user.otherId === existinguser.userinfo.id
                              ).length - 1
                            ].message
                          }
                        </Typography>
                      </div>
                      <div className="time_icon">
                        <MoreVert style={{ cursor: "pointer" }} />
                        <Typography variant="caption">
                          {
                            users?.messages.filter(
                              (user) =>
                                user?.user?.otherId === existinguser.userinfo.id
                            )[
                              users.messages.filter(
                                (user) =>
                                  user?.user.otherId ===
                                  existinguser.userinfo.id
                              ).length - 1
                            ].createdAt
                          }
                        </Typography>
                      </div>
                    </div>
                  </Button>
                </Link>
              ))
            ) : (
              allusers &&
              allusers?.map((users, i) => (
                <div key={i} className="message_box">
                  <Link
                    key={i}
                    to={`/chat/${existinguser && existinguser?.userinfo?.name}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      onClick={() => getUserById(users._id)}
                      style={{ width: "100%" }}
                    >
                      <div className="user-image">
                        <div
                          className="active_sign"
                          style={{
                            display:
                              users?.connectionStatus === "offline"
                                ? "none"
                                : "block",
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
                    <MoreVert
                      style={{ cursor: "pointer" }}
                      onClick={handleDeletePop}
                    />
                    <div
                      className="pop-up"
                      style={{ display: showDeletePopup ? "block" : "none" }}
                    >
                      <Typography variant="caption">Delete</Typography>
                    </div>
                    <Typography variant="caption">1m</Typography>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </Grid>
  );
}

export default Searchcontainer;
