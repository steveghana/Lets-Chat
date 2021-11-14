import React from "react";
import { Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import FileBase from "react-file-base64";

import "./join.scss";
function Signup({ handleSubmit, userinput, handleChange, setuserinput, err }) {
  return (
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
          value={userinput.firstname}
          required={true}
          name="firstname"
          placeholder="Enter your name"
          label="Name"
          autoComplete="off"
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input
          type="text"
          value={userinput.secondName}
          required={true}
          name="secondname"
          placeholder="Enter your name"
          label="Name"
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
      <Typography
        ref={err}
        color="secondary"
        className="error"
        variant="h6"
      ></Typography>
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
        <Typography style={{color:'white'}}>Sign up</Typography>
      </Button>
      {/* <p className="social-text">Or Sign up with social platforms</p> */}
      {/* <div className="social-media">
             
            </div> */}
    </form>
  );
}

export default Signup;
