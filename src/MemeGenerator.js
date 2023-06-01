import React from "react";
import "./MemeGenerator.scss";
import MemeHeader from "./components/header/MemeHeader.js";
import MemeMain from "./containers/main/MemeMain.js";
import MemeFooter from "./components/footer/MemeFooter.js";
import Background from "./containers/main/Background.js";
import { ThemeProvider, ThemeContext } from "./utils/ThemeContext.js"; // Імпортуйте ваш ThemeProvider тут

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
