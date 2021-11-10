import React from "react";
import NotificationSetting from "../profileSettings/profile";
import Chatsettings from "../ChatSettings/Chatsettings";
import Account from "../AccountSettings/Account";
function Nestedsetting({
  chatSettings,
  showAccountSetting,
  showprofileSettings,
}) {
  if (chatSettings) {
    return <Chatsettings />;
  } else if (showAccountSetting) {
    return <Account />;
  } else if (showprofileSettings) {
    return <NotificationSetting />;
  }
}

export default Nestedsetting;
