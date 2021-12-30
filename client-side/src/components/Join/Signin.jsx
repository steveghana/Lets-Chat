import React from "react";
import { Typography, Button } from "@material-ui/core";
import "./join.scss";
import Spinner from "../spinner/Spinner";
function Signin({
  signInuser,
  isSignInLoading,
  handleSigninChange,
  signInError,
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
      <Typography variant='body2' color="secondary" className="error">
        {isSignInLoading ? <Spinner bg={'#4481eb'} /> : signInError}
      </Typography>

      <Button onClick={handlesigninSubmit} className="btn solid" style={{ color: 'white' }}>
        Sign in
      </Button>
    </form>
  );
}

export default Signin;
