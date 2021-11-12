import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";

import { Spinner } from "../exports";
import { SearchOutlined, AutorenewTwoTone } from "@material-ui/icons";
import { gethistory, getusers } from "../ExternalFunction.";
import { ArrowBack } from "@material-ui/icons";
import { Grid, useMediaQuery } from "@material-ui/core";
import { UserContext } from "../usercontext";
import AllUsers from "./AllUsers";
import Usersettings from "./userSettings/Usersettings";
import "./search.scss";
function Searchcontainer() {
  const baseURL = "http://localhost:5000";
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
    darkMode,
    setuserHistoryAtProfile,
  } = useContext(UserContext);
  const isMobile = useMediaQuery("(max-width:700px)");

  const existinguser = JSON.parse(sessionStorage.getItem(`userprofile`));
  const usertoChat = JSON.parse(sessionStorage.getItem("newuser"));
  const refresh = useRef(null);
  const [allusers, setAllusers] = useState([]);
  const [chatHistory, setchatHistory] = useState([]);
  const [filteredUsers, setfilteredUsers] = useState([]);
  const [filteredValue, setfilteredValue] = useState("");
  const [showArrow, setshowArrow] = useState(false);
  const [showDeletePopup, setshowDeletePopup] = useState(false);
  const [showNotification, setshowNotification] = useState(false);
  const [chatSettings, setchatSettings] = useState(false);
  const [showAccountSetting, setshowAccountSetting] = useState(false);
  const [History, setHistory] = useState(null);

  const [Loading, setLoading] = useState(false);
  const handleDeletePop = () => setshowDeletePopup((prevValue) => !prevValue);

  const getUserById = async (id) => {
    setrecievedmessages([]);
    setDBmessages(null);
    const { data: newuser } = await axios.get(`${baseURL}/usermessages/${id}`);
    setNewUser(newuser);
    sessionStorage.setItem("newuser", JSON.stringify(newuser));
    socketInstance.emit("userhasArrived", existinguser);
    window.location.reload();
  };
  useEffect(() => {
    getusers(
      setLoading,
      existinguser,
      setHistory,
      setAllusers,
      setfilteredUsers,
      usertoChat,
      setconnectionStatus
    );
  }, [recievedmessages]);
  useEffect(() => {
    gethistory(allusers, chatHistory, setchatHistory);
    console.log(chatHistory);
    const filteredusers = allusers?.filter((user) =>
      user?.name.toLowerCase().includes(filteredValue)
    );
    setfilteredUsers(filteredusers);

    setuserHistoryAtProfile(filteredusers);
  }, [filteredValue, showChatHistory, allusers]);

  const toggleDark = darkMode
    ? "#232a39"
    : "linear-gradient(-45deg, #4481eb 0%, #04befe 100%)";
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
            ) : showChatHistory.length ? (
              filteredUsers?.map((users, i) => (
                <History
                  i={i}
                  users={users}
                  existinguser={existinguser}
                  getUserById={getUserById}
                  setrecievedmessages={setrecievedmessages}
                  setDBmessages={setDBmessages}
                  setNewUser={setNewUser}
                  socketInstance={socketInstance}
                />
              ))
            ) : (
              allusers &&
              filteredUsers?.map((users, i) => (
                <AllUsers
                  i={i}
                  existinguser={existinguser}
                  getUserById={getUserById}
                  users={users}
                  handleDeletePop={handleDeletePop}
                  showDeletePopup={showDeletePopup}
                />
              ))
            )}
          </div>
        )}
      </div>
    </Grid>
  );
}

export default Searchcontainer;
