import React from "react";
import App from "./app";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.querySelector("#root")
);
