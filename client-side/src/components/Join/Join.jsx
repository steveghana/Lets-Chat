import React, { useContext, useRef, useState } from "react";
import { Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router";
import Register from "../assets/register.svg";
import axios from "axios";
import Login from "../assets/log.svg";
import { Link } from "react-router-dom";
import { UserContext } from "../usercontext";
import FileBase from "react-file-base64";
import "./join.scss";
function Join() {
  const { userinput, setuserinput } = useContext(UserContext);
  const container = useRef(null);
  const baseUrl = "http://localhost:5000/usermessages";
  const [eror, seteror] = useState("");
  const [userexists, setuserexists] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [signinerror, setsigninerror] = useState("");
  const history = useHistory();
  const [signInuser, setsignInuser] = useState({
    phone: "",
    password: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    setuserinput({ ...userinput, [e.target.name]: e.target.value });
  };
  const handleSigninChange = (e) => {
    e.preventDefault();
    setsignInuser({ ...signInuser, [e.target.name]: e.target.value });
  };
  const handlesigninSubmit = async (e) => {
    e.preventDefault();
    if (
      signInuser?.phone.length < 10 ||
      signInuser?.phone.length > 13 ||
      isNaN(signInuser.phone)
    ) {
      seteror({ phone: "Please enter a valid phone number" });
    }

    const { data } = await axios.post(`${baseUrl}/signin`, {
      phone: signInuser.phone,
    });
    if (data.error) {
      seteror({ phne: data.eror });
    } else if (data.userexist) {
      sessionStorage.clear();
      sessionStorage.setItem(
        "userprofile",
        JSON.stringify({ userinfo: data?.userexist, new: true })
      );
      seteror("");
      history.push(`/chat/${data?.userexist.name}`);
      //navigat to chat
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    const { data } = await axios.post(`${baseUrl}/signin`, {
      phone: userinput.phone,
    });
    if (data.userexist) {
      setisLoading(false);
      seteror({ alreadyexist: "User already exist, try signing in" });
      //navigat to chat
    } else {
      setisLoading(false);
      history.push(`/chat/${userinput.name}`);
    }
  };
  const handleSignup = () => container.current.classList.add("sign-up-mode");
  const handleSignin = () => container.current.classList.remove("sign-up-mode");

  return (
    <div className="container" ref={container}>
      <div className="forms-container">
        <div className="signin-signup">
          <form
            action="#"
            noValidate
            onSubmit={handlesigninSubmit}
            className="sign-in-form"
          >
            <h2 className="title">Sign in</h2>

            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                value={signInuser?.phone}
                required={true}
                name="phone"
                placeholder="Enter your Phone Number"
                label="Phone"
                variant="filled"
                autoComplete="off"
                onChange={handleSigninChange}
              />
            </div>
            <Typography color="secondary" className="error">
              {eror?.phone}
            </Typography>
            {/* <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="password"
                value={userinput.password}
                   required={true}
                name="password"
                placeholder="Enter your password"
                label="Password"
                variant="outlined"
                autoComplete="off"
                onChange={handleSigninChange}
              />
            </div>
            <Typography color="secondary" className="error">
              {eror?.password}
            </Typography> */}

            <input type="submit" value="Login" className="btn solid" />
            <p className="social-text">Or Sign in with social platforms</p>
            {/* <div className="social-media">
              <a>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a>
                <i className="fab fa-twitter"></i>
              </a>
              <a>
                <i className="fab fa-google"></i>
              </a>
              <a>
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div> */}
          </form>
          {/*  */}
          <form
            action="post"
            onSubmit={handleSubmit}
            noValidate
            className="sign-up-form"
          >
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                value={userinput.name}
                required={true}
                name="name"
                placeholder="Enter your name"
                label="Name"
                variant="outlined"
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                value={userinput.phone}
                required={true}
                name="phone"
                placeholder="Enter your Phone Number"
                label="Phone"
                variant="filled"
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                value={userinput.country}
                required={true}
                name="country"
                placeholder="Enter your country"
                label="Country"
                variant="outlined"
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="date"
                value={userinput.Birth}
                required={true}
                name="Birth"
                placeholder="Enter your Date of Birth"
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                value={userinput.language}
                required={true}
                name="language"
                placeholder="Enter your language"
                label="Language"
                variant="outlined"
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="password"
                value={userinput.password}
                required={true}
                name="password"
                placeholder="Enter your password"
                label="Password"
                variant="outlined"
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
            <Typography color="secondary" className="error" variant="h6">
              {eror?.alreadyexist}
            </Typography>
            <div
              className="file-type"
              style={{
                display: "flex",
                justifyContent: "space-between",
                overflow: "hidden",
                gap: "1rem",
              }}
            >
              <Typography variant="caption">Select an image</Typography>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setuserinput({ ...userinput, imagUrl: base64 })
                }
              />
            </div>
            <Button type="submit" className="btn">
              <Typography>Sign up</Typography>
            </Button>
            <p className="social-text">Or Sign up with social platforms</p>
            {/* <div className="social-media">
              <a>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a>
                <i className="fab fa-twitter"></i>
              </a>
              <a>
                <i className="fab fa-google"></i>
              </a>
              <a>
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div> */}
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>If you are new to the family please Sign up!</p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={handleSignup}
            >
              Sign up
            </button>
          </div>
          <img src={Login} className="image" alt="" />
        </div>

        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>If you are alrady part of the family, please sign in!</p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={handleSignin}
            >
              Sign in
            </button>
          </div>
          <img src={Register} className="image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Join;
