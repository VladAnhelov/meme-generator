// index.js
import React from "react";
import ReactDOM from "react-dom/client";

import "./index.scss";
import MemeGenerator from "./MemeGenerator";
import { ThemeProvider } from "./utils/ThemeContext.js";

function App() {
  return (
    <ThemeProvider>
      <MemeGenerator />
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
