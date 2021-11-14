import React from "react";
import { Typography, Button } from "@material-ui/core";
import "./join.scss";
function Signin({
  signInuser,
  handleSigninChange,
  signin,
  handlesigninSubmit,
}) {
  return (
    <form noValidate className="sign-in-form">
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
      <Typography ref={signin} color="secondary" className="error">
        {" "}
      </Typography>

      <Button onClick={handlesigninSubmit} className="btn solid" style={{color:'white'}}>
        Sign in
      </Button>
      <p className="social-text">Or Sign in with social platforms</p>
    </form>
  );
}

export default Signin;
