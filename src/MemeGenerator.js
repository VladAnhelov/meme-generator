import React from "react";
import "./MemeGenerator.scss";
import MemeHeader from "./components/header/MemeHeader.js";
import MemeMain from "./components/main/MemeMain.js";
import MemeFooter from "./components/footer/MemeFooter.js";
import Background from "./components/main/Background.js";

function MemeGenerator() {
  return (
    <div className="container">
      <MemeHeader />
      <Background />
      <MemeMain />
      <MemeFooter />
    </div>
  );
}

export default MemeGenerator;
