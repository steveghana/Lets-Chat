import React, { useContext, useRef, useState } from "react";
import { useHistory } from "react-router";
import Register from "../assets/register.svg";
import axios from "axios";
import Login from "../assets/log.svg";
import { UserContext } from "../usercontext";
import Signin from "./Signin";
import logo from '../assets/logo.png'
import Signup from "./Signup";
import { signInAuth, inputSubmitAuth } from "../ExternalFunction.";
import "./join.scss";
function Join() {
  const { userinput, setuserinput } = useContext(UserContext);
  // const err = useRef(null);
  const signin = useRef(null);
  const container = useRef(null);
  const [signInError, setsignInError] = useState('')
  const baseUrl = "https://letschat114.herokuapp.com/usermessages"
  // "https://letschat114.herokuapp.com/usermessages";
  const [err, seteror] = useState("");
  const [serverError, setserverError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [isSignInLoading, setisSignInLoading] = useState(false);
  const history = useHistory();
  const [signInuser, setsignInuser] = useState({
    phone: "",
    password: "",
  });

  //
  const handleChange = (e) => {

    e.preventDefault();
    setuserinput({ ...userinput, [e.target.name]: e.target.value });
  };

  //
  const handleSigninChange = (e) => {
    e.preventDefault();
    setsignInuser({ ...signInuser, [e.target.name]: e.target.value });
  };

  //
  const handlesigninSubmit = async (e) => {
    e.preventDefault();
    if (signInuser.phone.length === 0) {
      setsignInError("Enter your phone Number");
    }

    else if (isNaN(signInuser.phone)) {
      setsignInError("Enter a valid phone number");
    }
    else if (signInuser.phone.length < 10) {
      setsignInError("Your number should be at least 10 characters");
    } else {
      setsignInError('')
      setisSignInLoading(true)
      const { data } = await axios.post(`${baseUrl}/signin`, {
        phone: signInuser.phone,
      });
      if (!data) return
      setisSignInLoading(false)
      if (data.error) setsignInError("User doesn't exist, try signing up");
      if (data.userexist) {
        localStorage.clear();
        localStorage.setItem(
          "userprofile",
          JSON.stringify({ userinfo: data?.userexist, new: true })
        );
        setsignInuser({ ...signInuser, signInuser: "" });
        const { firstname } = data?.userexist
        history.push(`/chat/${firstname}`);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { authenticated } = inputSubmitAuth(userinput, seteror);
    if (authenticated) {
      seteror('')
      setisLoading(true);
      const { data } = await axios.post(`${baseUrl}/signin`, {
        phone: userinput.phone,
      });
      if (!data) return
      if (data.userexist) {
        setisLoading(false);
        seteror("User already exist, try signing in");
      } else {
        seteror("");
        setisLoading(false);
        const { firstname } = userinput
        history.push(`/chat/${firstname}`);
      }
    }
  };
  //
  const handleSignup = () => {
    seteror("");
    setsignInError("");
    container.current.classList.add("sign-up-mode");
  };
  //
  const handleSignin = () => {
    seteror("");
    setsignInError("");
    container.current.classList.remove("sign-up-mode");
  };

  return (
    <div className="container" ref={container}>
      <div className="forms-container">
        <div className="signin-signup">
          <Signin
            signInuser={signInuser}
            isSignInLoading={isSignInLoading}
            handleSigninChange={handleSigninChange}
            signInError={signInError}
            handlesigninSubmit={handlesigninSubmit}
          />
          <Signup
            handleSubmit={handleSubmit}
            isLoading={isLoading}
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
            <div className="content_logo" >
              <h1>
                Let's Chat
              </h1>
              <div className="logo"><img width='50px' height='50px' src={logo} alt="logo" /></div>
            </div>
            <h3>New here ?</h3>
            <p>If you are new here please Sign up!</p>
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
            <div className="content2_logo" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <h1>
                Let's Chat
              </h1>
              <div className="logo2"><img width='50px' height='50px' src={logo} alt="logo" /></div>
            </div>
            <h3>One of us ?</h3>
            <p>If you are one of us, Please sign in!</p>
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
