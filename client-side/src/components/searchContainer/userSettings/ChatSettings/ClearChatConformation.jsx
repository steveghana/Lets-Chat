import React, { useState, useContext } from "react";

import { Typography, Button } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import { UserContext } from "../../../usercontext";
import "./CS.scss";
function ClearChatConformation({ setshowconfirmationPopup }) {
  const { socketInstance, setrecievedmessages, setDBmessages } =
    useContext(UserContext);
  const [isLoading, setisLoading] = useState(false);
  const [feedback, setfeedback] = useState("");
  const [showfeedback, setshowfeedback] = useState(false);
  const existinguser = JSON.parse(sessionStorage.getItem("userprofile"));
  const chatCleared = () => {
    setshowfeedback(true);
    setisLoading(true);
    socketInstance.emit("clearchat", existinguser?.userinfo.id);
    socketInstance.on("chatcleared", (response) => {
      if (response.err) setfeedback(response.err);
      setfeedback(response.deleted);
      setDBmessages([]);
      setrecievedmessages([]);
    });
    setisLoading(false);
  };
  return (
    <div className="clear">
      {showfeedback ? (
        isLoading ? (
          <CircularProgress />
        ) : (
          <div className="feedback">
            <Typography>{feedback}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setshowfeedback(false);
                setshowconfirmationPopup(false);
              }}
            >
              Ok
            </Button>
          </div>
        )
      ) : (
        <>
          <Typography>
            All chat will be cleared. Are you sure you want to proceed?
          </Typography>
          <div
            className="options"
            style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
          >
            <Button variant="contained" color="secondary" onClick={chatCleared}>
              Yes
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setshowconfirmationPopup(false);
              }}
            >
              No
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default ClearChatConformation;
