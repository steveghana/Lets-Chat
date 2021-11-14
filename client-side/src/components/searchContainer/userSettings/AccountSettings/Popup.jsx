import React, { useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router";
import Spinner from "../../../spinner/Spinner";
import { CloseOutlined } from "@material-ui/icons";
import "./pop.scss";
function Popup({
  changenum,
  accountDelete,
  userInfo,
  setchangenum,
  setaccountDelete,
  setuserInfo,
}) {
  const existinguser = JSON.parse(sessionStorage.getItem("userprofile"));
  const baseUrl = "http://localhost:5000/usermessages";
  const history = useHistory();
  const [newNum, setnewNum] = useState({
    newNumber: "",
    oldNumber: "",
  });
  const [isLoading, setisLoading] = useState(false);
  const [serverFeed, setserverFeed] = useState("");
  const [numerror, setnumerror] = useState({});
  const handleChange = (e) => {
    e.preventDefault();
    setnewNum({ ...newNum, [e.target.name]: e.target.value });
  };
  const accountDeleted = async () => {
    const id = existinguser.userinfo.id;
    setisLoading(true);
    
    const { data } = await axios.post(`${baseUrl}/delete/${id}`);
    data && setisLoading(false);
    if (data.error) {
      setserverFeed({ error: data.error });
    }
    if (data.message) {
      sessionStorage.clear();
      setserverFeed({ message: data.message });
      setTimeout(() => {
        history.push("/");
        window.location.reload();
      }, 3000);
    }
  };
  const sendChangedNum = async () => {
    const id = existinguser.userinfo.id;

    if (
      (newNum.oldNumber.length &&
        newNum.oldNumber !== existinguser.userinfo.phone) ||
      isNaN(newNum.oldNumber)
    ) {
      setnumerror({ oldnum: "Your old num is incorrect" });
    } else if (newNum.oldNumber === "") {
      setnumerror({ oldnum: "Please type in your old num" });
    } else if (newNum.newNumber === "") {
      setnumerror({ newNum: "Please type in your new num" });
    } else if (newNum.newNumber.length !== 13 || isNaN(newNum.newNumber)) {
      setnumerror({ newNum: "Your new num should be 10 characters long" });
    } else {
      setnumerror({ newNum: "" });
      setnumerror({ oldnum: "" });
      setisLoading(true);
      const { data } = await axios.post(`${baseUrl}/${id}`, {
        number: newNum.newNumber,
        id: existinguser.userinfo.id,
      });
      setserverFeed(data);
      setisLoading(false);
      setnewNum({
        newNumber: "",
        oldNumber: "",
      });
    }
  };
  // const {firstname, secondname, phone, language, country}= existinguser?.userinfo
  if (changenum) {
    return (
      <div className="popup" style={{ textAlign: "center" }}>
        {isLoading ? (
          <Spinner bg="#4481eb" />
        ) : (
          <div
            className="popcontainer"
            style={{
              display: serverFeed ? "none" : "flex",
            }}
          >
            <div className="popwrapper">
              <div className="inputfield">
                <div className="error">
                  {numerror.oldnum && numerror?.oldnum}
                </div>
                <TextField
                  type="text"
                  value={newNum.oldNumber}
                  placeholder="Enter your old number"
                  fullWidth
                  variant="outlined"
                  label="old number"
                  name="oldNumber"
                  onChange={handleChange}
                />
                <div className="error">
                  {numerror.newNum && numerror?.newNum}
                </div>
                <TextField
                  type="text"
                  value={newNum.newNumber}
                  placeholder="Enter you new number"
                  fullWidth
                  variant="outlined"
                  label="new number"
                  name="newNumber"
                  onChange={handleChange}
                />
              </div>
              <CloseOutlined
                fontSize="small"
                color="primary"
                style={{ marginLeft: ".50rem" }}
                onClick={() => setchangenum(false)}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={sendChangedNum}
            >
              Change Number
            </Button>
          </div>
        )}
        {serverFeed ? (
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            <Typography>{serverFeed.message || serverFeed.error}</Typography>
            <CloseOutlined
              fontSize="small"
              color="primary"
              style={{ marginLeft: ".50rem" }}
              onClick={() => setchangenum(false)}
            />
          </div>
        ) : null}
      </div>
    );
  } else if (accountDelete) {
    return (
      <div style={{ textAlign: "center" }}>
        {isLoading ? (
          <Spinner bg="#4481eb" />
        ) : (
          <div
            className="popup"
            style={{
              display: serverFeed ? "none" : "flex",
              flexDirection: "column",
            }}
          >
            <Typography>
              {" "}
              Are you sure you want to delete your account
            </Typography>
            <div
              className="options"
              style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={accountDeleted}
              >
                Yes
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setaccountDelete(false);
                }}
              >
                No
              </Button>
            </div>
          </div>
        )}

        {serverFeed ? (
          <div className="popup">
            <Typography>{serverFeed?.message || serverFeed?.error}</Typography>
          </div>
        ) : null}
      </div>
    );
  } else if (userInfo) {
    return (
      <div className="info-container">
        <div
          className="popup"
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <div
            className="infocontainer"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div className="info">
              <span>
                <strong>Firstname:</strong>
              </span>
              <span>{existinguser?.userinfo?.firstname}</span>
            </div>
            <div className="info">
              <span>
                <strong>Secondname:</strong>
              </span>
              <span>{existinguser?.userinfo?.secondname}</span>
            </div>
            <div className="info">
              <span>
                <strong>Phone:</strong>
              </span>
              <span>{existinguser?.userinfo?.phone}</span>
            </div>
            <div className="info">
              <span>
                <strong>Country:</strong>
              </span>
              <span>{existinguser?.userinfo?.country}</span>
            </div>
            <div className="info">
              <span>
                <strong>Language: </strong>
              </span>
              <span>{existinguser?.userinfo?.language}</span>
            </div>
          </div>
          <CloseOutlined
            fontSize="small"
            color="primary"
            style={{ marginLeft: ".50rem" }}
            onClick={() => setuserInfo(false)}
          />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default Popup;
