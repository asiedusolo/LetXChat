import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthcontextProvider from "./contexts/auth/authcontext";

ReactDOM.render(
  <React.StrictMode>
    <AuthcontextProvider>
      <App />
    </AuthcontextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
