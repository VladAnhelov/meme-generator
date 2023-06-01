import React from "react";
import "./MemeGenerator.scss";
import MemeHeader from "./components/header/MemeHeader.js";
import MemeMain from "./containers/main/MemeMain.js";
import MemeFooter from "./components/footer/MemeFooter.js";
import { ThemeProvider } from "./utils/ThemeContext.js"; // Імпортуйте ваш ThemeProvider тут

function MemeGenerator() {
  return (
    <ThemeProvider>
      <div className="container">
        <MemeHeader />
        <MemeMain />
        <MemeFooter />
      </div>
    </ThemeProvider>
  );
}

export default MemeGenerator;
