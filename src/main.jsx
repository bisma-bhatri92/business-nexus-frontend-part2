import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App"; // ✅ fixed path
import { BrowserRouter } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
