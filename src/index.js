import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AiProvider from "./contexts/AiContext";
import ThemeProvider from "./contexts/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AiProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AiProvider>
  </React.StrictMode>
);

reportWebVitals();
