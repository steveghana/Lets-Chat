import React from "react";
import {
  Searchcontainer,
  Togglemenu,
  Inboxcontainer,
  Chat,
  Profile,
} from "./components/exports";
import "./style.scss";

function Home() {
  return (
    <div className="app_container">
      <Togglemenu />
      <Inboxcontainer />
      <Searchcontainer />
      <Chat />
      <Profile />
    </div>
  );
}

export default Home;
