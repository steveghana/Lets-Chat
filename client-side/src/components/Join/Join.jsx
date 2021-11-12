import React, { useContext, useRef, useState } from "react";
import { useHistory } from "react-router";
import Register from "../assets/register.svg";
import axios from "axios";
import Login from "../assets/log.svg";
import { UserContext } from "../usercontext";
import Signin from "./Signin";
import Signup from "./Signup";
import { signInAuth, inputSubmitAuth } from "../ExternalFunction.";
import "./join.scss";
function Join() {
  const { userinput, setuserinput } = useContext(UserContext);
  const err = useRef(null);
  const signin = useRef(null);
  const container = useRef(null);
  const baseUrl = "http://localhost:5000/usermessages";
  const [eror, seteror] = useState("");
  const [serverError, setserverError] = useState("");
  const [isLoading, setisLoading] = useState(false);
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
    signInAuth(signInuser, signin);
    const { data } = await axios.post(`${baseUrl}/signin`, {
      phone: signInuser.phone,
    });
    if (data.error) signin.current.innerText = "User doesn't exist";
    setserverError(data.eror);
    if (data.userexist) {
      sessionStorage.clear();
      sessionStorage.setItem(
        "userprofile",
        JSON.stringify({ userinfo: data?.userexist, new: true })
      );
      setsignInuser({ ...signInuser, signInuser: "" });
      history.push(`/chat/${data?.userexist.name}`);
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
      err.current.innerText = "User already exist, try signing in";
    } else {
      inputSubmitAuth(userinput, err, seteror, setisLoading, history);
    }
  };
  const handleSignup = () => {
    seteror("");
    container.current.classList.add("sign-up-mode");
  };
  const handleSignin = () => {
    seteror("");
    container.current.classList.remove("sign-up-mode");
  };

  return (
    <div className="container" ref={container}>
      <div className="forms-container">
        <div className="signin-signup">
          <Signin
            signInuser={signInuser}
            handleSigninChange={handleSigninChange}
            signin={signin}
            handlesigninSubmit={handlesigninSubmit}
          />
          <Signup
            handleSubmit={handleSubmit}
            userinput={userinput}
            handleChange={handleChange}
            setuserinput={setuserinput}
            err={err}
          />
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
