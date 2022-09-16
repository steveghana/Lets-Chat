import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { Spinner } from "../exports";
import { SearchOutlined, AutorenewTwoTone } from "@material-ui/icons";
import { gethistory } from "../ExternalFunction";
import { ArrowBack } from "@material-ui/icons";
import { Grid, useMediaQuery } from "@material-ui/core";
import { UserContext } from "../usercontext";
import AllUsers from "./AllUsers";
import History from "./History";
import Usersettings from "./userSettings/Usersettings";
import "./search.scss";
function Searchcontainer() {
  const baseURL = "http://localhost:5000/userMessages";
  // "https://letschat114.herokuapp.com";
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
    darkmode,
    setuserHistoryAtProfile,
  } = useContext(UserContext);
  const isMobile = useMediaQuery("(max-width:700px)");
  const existinguser = JSON.parse(localStorage.getItem(`userprofile`));
  const usertoChat = JSON.parse(localStorage.getItem("newuser"));
  const refresh = useRef(null);
  const [allusers, setAllusers] = useState([]);
  const [chatHistoryContainingId, setchatHistoryContainingId] = useState([]);
  const [history, sethistory] = useState([]);
  const [filteredChatHistory, setfilteredChatHistory] = useState([]);
  const [filteredUsers, setfilteredUsers] = useState([]);
  const [filteredValue, setfilteredValue] = useState("");
  const [showArrow, setshowArrow] = useState(false);
  const [showNotification, setshowNotification] = useState(false);
  const [chatSettings, setchatSettings] = useState(false);
  const [showAccountSetting, setshowAccountSetting] = useState(false);
  const [Loading, setLoading] = useState(false);
  //
  const getUserById = async (id) => {
    setrecievedmessages([]);
    setDBmessages(null);
    const { data: newuser } = await axios.get(`${baseURL}/usermessages/${id}`);
    setNewUser(newuser);
    localStorage.setItem("newuser", JSON.stringify(newuser));
    socketInstance.emit("userhasArrived", existinguser);
    window.location.reload();
  };
  //
  const getusers = async () => {
    setLoading(true);
    const { data: userinfo } = await axios.get(`${baseURL}/usermessages`);
    if (!userinfo) return;
    setLoading(false);
    const myinfo = userinfo?.find(
      (user) => user?.id === existinguser?.userinfo.id
    );
    setchatHistoryContainingId(myinfo?.ChatHistory);
    const usersExceptMe = userinfo?.filter(
      (user) => user?.id !== existinguser?.userinfo.id
    );
    setAllusers(usersExceptMe);
    setfilteredUsers(usersExceptMe);
    const userconnection = usersExceptMe.find(
      (user) => user?.id === usertoChat?.id
    );
    setconnectionStatus(userconnection?.connectionStatus);
    return userinfo;
  };
  //
  useEffect(() => {
    getusers();
    gethistory(allusers, chatHistoryContainingId, history, sethistory);
  }, [recievedmessages, showChatHistory]);
  //
  useEffect(() => {
    const filteredusers = allusers?.filter(
      (user) =>
        user?.firstname.toLowerCase().includes(filteredValue) ||
        user?.secondname.toLowerCase().includes(filteredValue)
    );

    setfilteredChatHistory(history);
    const filteredchathistory = history?.filter(
      (user) =>
        user?.firstname.toLowerCase().includes(filteredValue) ||
        user?.secondname.toLowerCase().includes(filteredValue)
    );
    setfilteredChatHistory(filteredchathistory);
    setfilteredUsers(filteredusers);

    setuserHistoryAtProfile(filteredusers);
  }, [filteredValue, showChatHistory, allusers]);

  const toggleDark = darkmode
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
          borderBottom: darkmode && "1px solid #525c6f",
        }}
      >
        <div
          className="search_box"
          style={{
            background: toggleDark,
            border: darkmode && "1px solid #525c6f",
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
      <div className="u" style={{ color: "white" }}>
        {!allusers.length ? "No active users found" : "click to refresh"}
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
            socketInstance={socketInstance}
          />
        )}

        {!showSettings && (
          <div className="user-box">
            {Loading ? (
              <Spinner bg={"white"} />
            ) : showChatHistory ? (
              filteredChatHistory?.map((users, i) => (
                <History
                  key={i}
                  getUserById={getUserById}
                  users={users}
                  darkmode={darkmode}
                />
              ))
            ) : (
              allusers &&
              filteredUsers?.map((users, i) => (
                <AllUsers
                  key={i}
                  getUserById={getUserById}
                  users={users}
                  darkmode={darkmode}
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
