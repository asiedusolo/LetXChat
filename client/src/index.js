import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import AuthcontextProvider from "./contexts/auth/authcontext";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthcontextProvider>
      <App />
    </AuthcontextProvider>
  </React.StrictMode>
);