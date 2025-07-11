import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { SocketProvider } from "./contexts/socketContexts.jsx";
import { UserProvider } from "./contexts/userContexts.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <SocketProvider>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </SocketProvider>
  // {/* </React.StrictMode> */}
);
