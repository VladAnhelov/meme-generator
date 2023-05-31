import React from "react";
import "./MemeGenerator.scss";
import MemeHeader from "./components/header/MemeHeader.js";
import MemeMain from "./components/main/MemeMain.js";
import MemeFooter from "./components/footer/MemeFooter.js";
import Background from "./components/main/Background.js";
import { ThemeProvider, ThemeContext } from "./components/main/ThemeContext.js"; // Імпортуйте ваш ThemeProvider тут

function MemeGenerator() {
  const { isDarkTheme } = React.useContext(ThemeContext);
  return (
    <ThemeProvider>
      <div className="container">
        <MemeHeader />
        <Background key={isDarkTheme} />
        <MemeMain />
        <MemeFooter />
      </div>
    </ThemeProvider>
  );
}

export default MemeGenerator;
