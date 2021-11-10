import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import {
  DeleteOutline,
  SwapHorizOutlined,
  InfoOutlined,
} from "@material-ui/icons";
import Popup from "./Popup";
import "./account.scss";
function Account() {
  const [changenum, setchangenum] = useState(false);
  const [accountDelete, setaccountDelete] = useState(false);
  const [userInfo, setuserInfo] = useState(false);
  const changeNum = () => setchangenum((prev) => !prev);
  const acc = () => setaccountDelete((prev) => !prev);
  const info = () => setuserInfo((prev) => !prev);
  return (
    <Grid item lg={12} md={12} className="account_container" darkMode>
      <div className="message_box">
        {changenum ? (
          <Popup
            changenum={changenum}
            accountDelete={accountDelete}
            userInfo={userInfo}
            setchangenum={setchangenum}
            setaccountDelete={setaccountDelete}
            setuserInfo={setuserInfo}
          />
        ) : null}
        <SwapHorizOutlined />
        <Typography onClick={changeNum}>Change Number</Typography>
      </div>
      <div className="message_box">
        {accountDelete ? (
          <Popup
            changenum={changenum}
            accountDelete={accountDelete}
            userInfo={userInfo}
            setchangenum={setchangenum}
            setaccountDelete={setaccountDelete}
            setuserInfo={setuserInfo}
          />
        ) : null}
        <DeleteOutline />
        <Typography onClick={acc}>Delete My Account</Typography>
      </div>
      <div className="message_box">
        {userInfo ? (
          <Popup
            changenum={changenum}
            accountDelete={accountDelete}
            userInfo={userInfo}
            setchangenum={setchangenum}
            setaccountDelete={setaccountDelete}
            setuserInfo={setuserInfo}
          />
        ) : null}
        <InfoOutlined />
        <Typography onClick={info}>Request Account Info</Typography>
      </div>
    </Grid>
  );
}
export default Account;
