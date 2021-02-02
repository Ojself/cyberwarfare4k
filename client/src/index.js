import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "./theme.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./pages/App.jsx";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
