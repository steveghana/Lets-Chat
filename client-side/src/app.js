import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./home";
import { Join } from "./components/exports";
import { UserContext } from "./components/usercontext";
function App() {
  const initialState = {
    firstname: "",
    secondname: "",
    phone: "",
    imagUrl: "",
    nickName: "",
    country: "",
    language: "",
    password: "",
    gender: "",
  };
  const [DBmessages, setDBmessages] = useState(null);
  const [welcomeMessage, setwelcomeMessage] = useState("");
  const [userprofile, setuserprofile] = useState("");
  const [apimessages, setapimessages] = useState([]);
  const [userinput, setuserinput] = useState(initialState);
  const [newuser, setNewUser] = useState("");
  const [recievedmessages, setrecievedmessages] = useState([]);
  const [showINputBox, setshowInputBox] = useState(false);
  const [user, setuser] = useState("");
  const [userHistoryAtProfile, setuserHistoryAtProfile] = useState([]);
  const [socketInstance, setsocketInstance] = useState(null);
  const [showChatHistory, setshowChatHistory] = useState(false);
  const [connectionStatus, setconnectionStatus] = useState("");
  const [showmbileNav, setshowmbileNav] = useState(false);
  const [showSettings, setshowSettings] = useState(false);
  const [darkmode, setdarkMode] = useState(false);
  const [wallpaper, setwallpaper] = useState("");
  const [toggleMobileNav, settoggleMobileNav] = useState(false);
  const [allMessages, setallMessages] = useState([]);

  return (
    <UserContext.Provider
      value={{
        userHistoryAtProfile,
        setuserHistoryAtProfile,
        toggleMobileNav,
        settoggleMobileNav,
        wallpaper,
        setwallpaper,
        darkmode,
        setdarkMode,
        connectionStatus,
        setconnectionStatus,
        showChatHistory,
        setshowChatHistory,
        showINputBox,
        setshowInputBox,
        socketInstance,
        setsocketInstance,
        DBmessages,
        setDBmessages,
        newuser,
        setNewUser,
        apimessages,
        setapimessages,
        userinput,
        setuserinput,
        welcomeMessage,
        setwelcomeMessage,
        setuser,
        user,
        initialState,
        recievedmessages,
        setrecievedmessages,
        setuserprofile,
        userprofile,
        showmbileNav,
        setshowmbileNav,
        showSettings,
        setshowSettings,
        allMessages,
        setallMessages,
      }}
    >
      <div>
        <Switch>
          <Route path="/" exact>
            <Join />
          </Route>
        </Switch>
        <Switch>
          <Route path="/chat/:username">
            <Home />
          </Route>
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
