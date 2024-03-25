import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {BrowserRouter as Router} from "react-router-dom";
import {AuthProvider} from "./contexts/AuthContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App/>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
);
